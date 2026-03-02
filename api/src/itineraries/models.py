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


class Step(models.Model):
    id_step = models.AutoField(primary_key=True)
    itinerary = models.ForeignKey(
        Itinerary, on_delete=models.CASCADE, related_name="steps"
    )
    name = models.CharField(max_length=200)
    description = models.TextField(blank=True, null=True)
    longitude = models.FloatField()
    latitude = models.FloatField()
    picture = models.URLField(blank=True, null=True)
    step_order = models.PositiveIntegerField()
    food_place = models.ForeignKey(
        "places.FoodPlace",
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name="steps",
    )

    class Meta:
        ordering = ["step_order"]
        verbose_name = "Step"
        verbose_name_plural = "Steps"

    def __str__(self):
        return f"{self.itinerary.title} - Step {self.step_order}: {self.name}"
