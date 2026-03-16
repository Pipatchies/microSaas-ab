from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ItineraryViewSet, StepViewSet, CommentViewSet

router = DefaultRouter()
router.register(r"itineraries", ItineraryViewSet, basename="itinerary")
router.register(r"steps", StepViewSet)
router.register(r"comments", CommentViewSet)

urlpatterns = [
    path("", include(router.urls)),
]
