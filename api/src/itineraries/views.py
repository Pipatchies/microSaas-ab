from django.db.models import Avg
from rest_framework import viewsets, filters
from django_filters.rest_framework import DjangoFilterBackend
from .models import Itinerary, Step, Comment
from .serializers import ItinerarySerializer, StepSerializer, CommentSerializer


class ItineraryViewSet(viewsets.ModelViewSet):
    # We remove the static queryset and use get_queryset to annotate dynamically
    serializer_class = ItinerarySerializer
    filter_backends = [
        DjangoFilterBackend,
        filters.OrderingFilter,
        filters.SearchFilter,
    ]

    # Enable filtering by these exact fields
    filterset_fields = ["type", "zone", "difficulty", "diet"]
    # Enable searching across these fields
    search_fields = ["title", "speciality", "facts"]
    # Enable ordering by these fields (including the new annotated field)
    ordering_fields = ["id", "distance", "duration", "average_rating"]
    ordering = ["id"]  # Default ordering

    def get_queryset(self):
        """
        CP 8 Argument: Instead of calculating the average rating in Python,
        we ask PostgreSQL to annotate each Itinerary with the average of its comments' review scores
        using the ORM `Avg` aggregation.
        """
        return Itinerary.objects.annotate(average_rating=Avg("comments__review"))


class StepViewSet(viewsets.ModelViewSet):
    queryset = Step.objects.all()
    serializer_class = StepSerializer


class CommentViewSet(viewsets.ModelViewSet):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer

    def perform_create(self, serializer):
        # Automatically assign the logged-in user if available
        user = self.request.user if self.request.user.is_authenticated else None
        serializer.save(user=user)
