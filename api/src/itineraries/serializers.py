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
    average_rating = serializers.FloatField(read_only=True, default=None)

    class Meta:
        model = Itinerary
        fields = "__all__"

    def create(self, validated_data):
        """
        Mapbox returns distance in meters and duration in seconds.
        Convert to km and hours before saving to match Decimal(5,2) in DB.
        """
        favorites = validated_data.pop("favorites", [])
        raw_distance = validated_data.get("distance")
        raw_duration = validated_data.get("duration")

        if raw_distance is not None:
            validated_data["distance"] = round(float(raw_distance) / 1000, 2)
        if raw_duration is not None:
            validated_data["duration"] = round(float(raw_duration) / 3600, 2)

        itinerary = Itinerary.objects.create(**validated_data)
        itinerary.favorites.set(favorites)
        return itinerary
