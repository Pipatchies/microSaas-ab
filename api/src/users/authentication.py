from rest_framework_simplejwt.authentication import JWTAuthentication
from django.conf import settings


class JWTAuthenticationFromCookie(JWTAuthentication):
    """
    Custom authentication class that reads the JWT from a cookie instead of the Authorization header.
    """

    def authenticate(self, request):
        header = self.get_header(request)
        cookie_name = getattr(settings, "JWT_AUTH_COOKIE", "access_token")

        if header is None:
            raw_token = request.COOKIES.get(cookie_name)
            if raw_token:
                print(f"AUTH DEBUG: Found token in cookie '{cookie_name}'")
            else:
                # No token in cookies, let's just return None so other auth classes can try
                # (though we only have this one in settings)
                return None
        else:
            raw_token = self.get_raw_token(header)
            print("AUTH DEBUG: Found token in Authorization header")

        if raw_token is None:
            return None

        try:
            validated_token = self.get_validated_token(raw_token)
            user = self.get_user(validated_token)
            if user:
                print(
                    f"AUTH DEBUG: Successfully authenticated user: {user.email} (ID: {user.id})"
                )
            return user, validated_token
        except Exception as e:
            print(f"AUTH DEBUG: Authentication failed for token: {str(e)}")
            return None
