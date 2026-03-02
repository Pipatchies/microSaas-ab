from rest_framework import serializers
from .models import Itinerary, Step


class StepSerializer(serializers.ModelSerializer):
    class Meta:
        model = Step
        fields = "__all__"


class ItinerarySerializer(serializers.ModelSerializer):
    steps = StepSerializer(many=True, read_only=True)

    class Meta:
        model = Itinerary
        fields = "__all__"
