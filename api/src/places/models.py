from django.db import models


class FoodPlace(models.Model):
    id_foodplace = models.AutoField(primary_key=True)
    name = models.CharField(max_length=100)
    type = models.CharField(max_length=100, blank=True, null=True)
    longitude = models.FloatField()
    latitude = models.FloatField()
    description = models.TextField(blank=True)
    mapbox_id = models.IntegerField(unique=True, null=True, blank=True)

    class Meta:
        ordering = ["id_foodplace"]

    def __str__(self):
        return self.name
