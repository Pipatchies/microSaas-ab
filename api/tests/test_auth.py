import pytest
from django.contrib.auth import get_user_model
from rest_framework import status
from rest_framework.test import APIClient

User = get_user_model()


@pytest.fixture
def api_client():
    return APIClient()


@pytest.mark.django_db
class TestAuthentication:
    def test_register_success(self, api_client):
        url = "/api/auth/register/"
        data = {"email": "newuser@example.com", "password": "StrongPassword123!"}
        response = api_client.post(url, data, format="json")

        assert response.status_code == status.HTTP_201_CREATED
        assert "access" in response.data
        assert "refresh" in response.data
        assert User.objects.filter(email="newuser@example.com").exists()

    def test_register_duplicate_email(self, api_client):
        User.objects.create_user(
            username="existing@example.com",
            email="existing@example.com",
            password="password123",
        )

        url = "/api/auth/register/"
        data = {"email": "existing@example.com", "password": "anotherPassword123!"}
        response = api_client.post(url, data, format="json")

        assert response.status_code == status.HTTP_400_BAD_REQUEST
        assert "email" in response.data

    def test_login_success(self, api_client):
        User.objects.create_user(
            username="loginuser@example.com",
            email="loginuser@example.com",
            password="password123",
        )

        url = "/api/auth/login/"
        data = {"email": "loginuser@example.com", "password": "password123"}
        response = api_client.post(url, data, format="json")

        assert response.status_code == status.HTTP_200_OK
        assert "access" in response.data
        assert "refresh" in response.data

    def test_login_invalid_credentials(self, api_client):
        User.objects.create_user(
            username="wrongpass@example.com",
            email="wrongpass@example.com",
            password="correct_password",
        )

        url = "/api/auth/login/"
        data = {"email": "wrongpass@example.com", "password": "wrong_password"}
        response = api_client.post(url, data, format="json")

        assert response.status_code == status.HTTP_401_UNAUTHORIZED
        assert "detail" in response.data

    def test_protected_route_unauthenticated(self, api_client):
        # GET is allowed (ReadOnly), but POST should be forbidden (401)
        url = "/api/places/"
        data = {"name": "Test Place", "longitude": 0, "latitude": 0}
        response = api_client.post(url, data, format="json")

        assert response.status_code == status.HTTP_401_UNAUTHORIZED

    def test_protected_route_authenticated(self, api_client):
        User.objects.create_user(
            username="auth@example.com",
            email="auth@example.com",
            password="password123",
        )

        # Get token
        login_url = "/api/auth/login/"
        login_res = api_client.post(
            login_url,
            {"email": "auth@example.com", "password": "password123"},
            format="json",
        )
        token = login_res.data["access"]

        api_client.credentials(HTTP_AUTHORIZATION=f"Bearer {token}")

        url = "/api/places/"
        data = {"name": "Auth Place", "longitude": 2.1, "latitude": 41.3}
        response = api_client.post(url, data, format="json")

        assert response.status_code == status.HTTP_201_CREATED
        assert response.data["name"] == "Auth Place"
