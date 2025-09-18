from django.urls import path
from .views import test_api, test_db

urlpatterns = [
    path("test/", test_api, name="test-api"),
    path("test_db/", test_db, name="test-db")
]
