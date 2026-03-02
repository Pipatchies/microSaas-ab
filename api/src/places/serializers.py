from rest_framework import serializers
from .models import FoodPlace


class FoodPlaceSerializer(serializers.ModelSerializer):
    class Meta:
        model = FoodPlace
        fields = "__all__"
