from rest_framework import serializers
from .models import Itinerary, Step, Comment


class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = "__all__"
        read_only_fields = ["user"]  # Will be set by the view


class StepSerializer(serializers.ModelSerializer):
    class Meta:
        model = Step
        fields = "__all__"


class ItinerarySerializer(serializers.ModelSerializer):
    steps = StepSerializer(many=True, read_only=True)
    comments = CommentSerializer(many=True, read_only=True)
    # The view will annotate this field on the queryset
    average_rating = serializers.FloatField(read_only=True)

    class Meta:
        model = Itinerary
        fields = "__all__"
