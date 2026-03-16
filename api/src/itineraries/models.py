from django.db import models
from django.core.validators import MinValueValidator, MaxValueValidator
from django.contrib.auth import get_user_model

User = get_user_model()


class Itinerary(models.Model):
    id_itinerary = models.AutoField(primary_key=True)
    title = models.CharField(max_length=100)
    type = models.CharField(max_length=50)
    zone = models.CharField(max_length=50)
    distance = models.FloatField(help_text="Distance en km")
    duration = models.FloatField(help_text="Durée en heures")
    difficulty = models.CharField(max_length=50)
    diet = models.CharField(max_length=50)
    speciality = models.CharField(max_length=50)
    facts = models.TextField()
    user = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name="itineraries",
        null=True,
        blank=True,
    )
    favorites = models.ManyToManyField(
        User, related_name="favorite_itineraries", blank=True
    )

    class Meta:
        verbose_name_plural = "Itineraries"
        ordering = ["id_itinerary"]

    def __str__(self):
        return f"{self.title} ({self.type})"


class Step(models.Model):
    id_step = models.AutoField(primary_key=True)
    itinerary = models.ForeignKey(
        Itinerary, on_delete=models.CASCADE, related_name="steps"
    )
    name = models.CharField(max_length=100)
    description = models.TextField(blank=True, null=True)
    longitude = models.FloatField()
    latitude = models.FloatField()
    picture = models.URLField(max_length=200, blank=True, null=True)
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


class Comment(models.Model):
    id_comment = models.AutoField(primary_key=True)
    itinerary = models.ForeignKey(
        Itinerary, on_delete=models.CASCADE, related_name="comments"
    )
    user = models.ForeignKey(
        User, on_delete=models.SET_NULL, null=True, related_name="comments"
    )
    review = models.IntegerField(
        validators=[MinValueValidator(1), MaxValueValidator(5)]
    )
    content = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["-created_at"]

    def __str__(self):
        return f"Comment {self.review}/5 for {self.itinerary.title}"
