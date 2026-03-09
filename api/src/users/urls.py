from django.urls import path
from rest_framework_simplejwt.views import TokenRefreshView
from .views import RegisterView, EmailTokenObtainPairView

urlpatterns = [
    path("register/", RegisterView.as_view(), name="jwt_register"),
    path("login/", EmailTokenObtainPairView.as_view(), name="jwt_login"),
    path("token/refresh/", TokenRefreshView.as_view(), name="jwt_refresh"),
]
