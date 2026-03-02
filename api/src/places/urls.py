from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import FoodPlaceViewSet

router = DefaultRouter()
router.register(r"places", FoodPlaceViewSet)

urlpatterns = [
    path("", include(router.urls)),
]
