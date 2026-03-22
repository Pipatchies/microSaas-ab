from django.conf import settings
from rest_framework import generics, status, views
from rest_framework.response import Response
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from rest_framework_simplejwt.tokens import RefreshToken
from .serializers import (
    RegisterSerializer,
    EmailTokenObtainPairSerializer,
    UserSerializer,
)
from drf_spectacular.utils import extend_schema


def set_auth_cookies(response, access_token, refresh_token):
    """
    Helper to set access and refresh tokens as HttpOnly cookies in the response.
    """
    if access_token:
        response.set_cookie(
            key=settings.JWT_AUTH_COOKIE,
            value=str(access_token),
            httponly=settings.JWT_AUTH_HTTPONLY,
            secure=settings.JWT_AUTH_SECURE,
            samesite=settings.JWT_AUTH_SAMESITE,
            path="/",
        )
    if refresh_token:
        response.set_cookie(
            key=settings.JWT_AUTH_REFRESH_COOKIE,
            value=str(refresh_token),
            httponly=settings.JWT_AUTH_HTTPONLY,
            secure=settings.JWT_AUTH_SECURE,
            samesite=settings.JWT_AUTH_SAMESITE,
            path="/",
        )
    return response


class RegisterView(generics.CreateAPIView):
    serializer_class = RegisterSerializer
    permission_classes = (AllowAny,)

    @extend_schema(
        summary="Register a new user",
        description="Creates a new user and sets JWT access and refresh tokens as HttpOnly cookies.",
        responses={
            201: {"type": "object", "properties": {"detail": {"type": "string"}}}
        },
    )
    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()

        refresh = RefreshToken.for_user(user)
        response = Response(
            {"detail": "User registered successfully."}, status=status.HTTP_201_CREATED
        )
        return set_auth_cookies(response, refresh.access_token, refresh)


class EmailTokenObtainPairView(TokenObtainPairView):
    """
    Takes credentials and sets JWT tokens as HttpOnly cookies.
    """

    serializer_class = EmailTokenObtainPairSerializer

    def post(self, request, *args, **kwargs):
        response = super().post(request, *args, **kwargs)
        if response.status_code == status.HTTP_200_OK:
            # SimpleJWT returns tokens in response.data by default
            # We move them to cookies and remove from body for security
            refresh_token = response.data.get("refresh")
            if refresh_token:
                refresh = RefreshToken(refresh_token)
                response.data = {"detail": "Login successful."}
                set_auth_cookies(response, refresh.access_token, refresh)
        return response


class LogoutView(views.APIView):
    permission_classes = (IsAuthenticated,)

    @extend_schema(
        summary="Logout user",
        description="Clears JWT cookies.",
        responses={
            200: {"type": "object", "properties": {"detail": {"type": "string"}}}
        },
    )
    def post(self, request, *args, **kwargs):
        response = Response(
            {"detail": "Successfully logged out."}, status=status.HTTP_200_OK
        )
        response.delete_cookie(settings.JWT_AUTH_COOKIE, path="/")
        response.delete_cookie(settings.JWT_AUTH_REFRESH_COOKIE, path="/")
        return response


class MeView(generics.RetrieveAPIView):
    """
    Returns the current authenticated user's profile.
    """

    serializer_class = UserSerializer
    permission_classes = (IsAuthenticated,)

    def get_object(self):
        print(f"ME VIEW DEBUG: Current user: {self.request.user}")
        return self.request.user


class CookieTokenRefreshView(TokenRefreshView):
    """
    Custom TokenRefreshView that reads the refresh token from an HttpOnly cookie
    and sets new cookies after a successful refresh.
    """

    @extend_schema(
        summary="Refresh JWT tokens from cookies",
        description="Reads the refresh token from the HttpOnly cookie and returns new tokens in cookies.",
        responses={
            200: {"type": "object", "properties": {"detail": {"type": "string"}}}
        },
    )
    def post(self, request, *args, **kwargs):
        # We manually extract the token from the cookie
        refresh_cookie = request.COOKIES.get(settings.JWT_AUTH_REFRESH_COOKIE)

        # If the user didn't send a payload with 'refresh', inject the cookie's token
        data = (
            request.data.copy() if hasattr(request.data, "copy") else dict(request.data)
        )
        if refresh_cookie and "refresh" not in data:
            data["refresh"] = refresh_cookie

        serializer = self.get_serializer(data=data)

        try:
            serializer.is_valid(raise_exception=True)
        except Exception:
            # Token is invalid or expired
            response = Response(
                {"detail": "Token is invalid or expired", "code": "token_not_valid"},
                status=status.HTTP_401_UNAUTHORIZED,
            )
            response.delete_cookie(settings.JWT_AUTH_COOKIE, path="/")
            response.delete_cookie(settings.JWT_AUTH_REFRESH_COOKIE, path="/")
            return response

        # Success!
        access_token = serializer.validated_data.get("access")
        refresh_token_resp = serializer.validated_data.get("refresh", refresh_cookie)

        response = Response(
            {"detail": "Token refreshed successfully."}, status=status.HTTP_200_OK
        )

        return set_auth_cookies(response, access_token, refresh_token_resp)
