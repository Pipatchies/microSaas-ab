"""
URL configuration for the TastyRoad Django project.

Defines admin and core application routes.
"""

from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/", include("core.urls")),
    path("api/", include("itineraries.urls")),
    path("api/", include("places.urls")),
]
