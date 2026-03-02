from django.db import models


class Itinerary(models.Model):
    title = models.CharField(max_length=200)
    type = models.CharField(max_length=50)
    zone = models.CharField(max_length=100)
    distance = models.FloatField(help_text="Distance in km")
    duration = models.FloatField(help_text="Duration in hours")
    difficulty = models.CharField(max_length=50)
    diet = models.CharField(max_length=50)
    speciality = models.CharField(max_length=200)
    facts = models.TextField()

    class Meta:
        verbose_name_plural = "Itineraries"

    def __str__(self):
        return f"{self.title} ({self.type})"
