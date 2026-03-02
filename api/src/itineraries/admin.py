from django.contrib import admin
from .models import Itinerary, Step


class StepInline(admin.TabularInline):
    model = Step
    extra = 1


@admin.register(Itinerary)
class ItineraryAdmin(admin.ModelAdmin):
    list_display = ("title", "type", "zone", "distance", "duration", "difficulty")
    list_filter = ("type", "difficulty", "diet")
    search_fields = ("title", "zone", "speciality")
    inlines = [StepInline]
