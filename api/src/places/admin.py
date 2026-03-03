from django.contrib import admin
from .models import FoodPlace


@admin.register(FoodPlace)
class FoodPlaceAdmin(admin.ModelAdmin):
    list_display = ("name", "type", "mapbox_id")
    search_fields = ("name", "mapbox_id")
    list_filter = ("type",)
