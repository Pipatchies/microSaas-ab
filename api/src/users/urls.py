from django.urls import path
from rest_framework_simplejwt.views import TokenRefreshView
from .views import RegisterView, EmailTokenObtainPairView, LogoutView, MeView

urlpatterns = [
    path("register/", RegisterView.as_view(), name="jwt_register"),
    path("login/", EmailTokenObtainPairView.as_view(), name="jwt_login"),
    path("logout/", LogoutView.as_view(), name="jwt_logout"),
    path("me/", MeView.as_view(), name="user_me"),
    path("token/refresh/", TokenRefreshView.as_view(), name="jwt_refresh"),
]
