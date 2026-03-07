"""
Tests d'intégration des vues DRF (via APIClient).
Teste le flux complet HTTP → View → Serializer → DB → Réponse.
"""

import pytest
from rest_framework.test import APIClient
from rest_framework import status
from places.models import FoodPlace
from itineraries.models import Itinerary


@pytest.fixture
def client():
    return APIClient()


@pytest.fixture
def itinerary(db):
    return Itinerary.objects.create(
        title="Itinéraire Fixture",
        type="Walking",
        zone="Bordeaux",
        distance=8.0,
        duration=2.5,
        difficulty="Medium",
        diet="Omnivore",
        speciality="Canelés",
        facts="Bordeaux et ses canelés.",
    )


@pytest.fixture
def food_place(db):
    return FoodPlace.objects.create(
        name="La Guinguette",
        longitude=2.3522,
        latitude=48.8566,
    )


# ─────────────────────────────────────────────
# FoodPlace Endpoints
# ─────────────────────────────────────────────
@pytest.mark.django_db
class TestFoodPlaceViews:
    """Tests d'intégration pour /api/places/."""

    def test_list_food_places_empty(self, client):
        """GET /api/places/ retourne 200 et une liste vide (paginée)."""
        response = client.get("/api/places/")
        assert response.status_code == status.HTTP_200_OK
        assert "results" in response.data
        assert isinstance(response.data["results"], list)

    def test_create_food_place_valid(self, client):
        """POST /api/places/ avec payload valide retourne 201."""
        payload = {
            "name": "Café des Artistes",
            "longitude": 2.3522,
            "latitude": 48.8566,
            "type": "Café",
        }
        response = client.post("/api/places/", data=payload, format="json")
        assert response.status_code == status.HTTP_201_CREATED
        assert response.data["name"] == "Café des Artistes"
        assert FoodPlace.objects.filter(name="Café des Artistes").exists()

    def test_create_food_place_missing_name_returns_400(self, client):
        """POST /api/places/ sans 'name' retourne 400, pas de crash serveur."""
        payload = {
            "longitude": 2.3522,
            "latitude": 48.8566,
        }
        response = client.post("/api/places/", data=payload, format="json")
        assert response.status_code == status.HTTP_400_BAD_REQUEST
        assert "name" in response.data

    def test_create_food_place_missing_coordinates_returns_400(self, client):
        """POST /api/places/ sans longitude/latitude retourne 400."""
        payload = {"name": "Lieu Incomplet"}
        response = client.post("/api/places/", data=payload, format="json")
        assert response.status_code == status.HTTP_400_BAD_REQUEST

    def test_retrieve_food_place(self, client, food_place):
        """GET /api/places/{id}/ retourne 200 avec le bon objet."""
        response = client.get(f"/api/places/{food_place.id_foodplace}/")
        assert response.status_code == status.HTTP_200_OK
        assert response.data["name"] == food_place.name

    def test_retrieve_nonexistent_food_place_returns_404(self, client):
        """GET /api/places/9999/ retourne 404."""
        response = client.get("/api/places/9999/")
        assert response.status_code == status.HTTP_404_NOT_FOUND

    def test_update_food_place(self, client, food_place):
        """PUT /api/places/{id}/ met à jour le lieu."""
        payload = {
            "name": "La Guinguette Rénovée",
            "longitude": food_place.longitude,
            "latitude": food_place.latitude,
        }
        response = client.put(
            f"/api/places/{food_place.id_foodplace}/",
            data=payload,
            format="json",
        )
        assert response.status_code == status.HTTP_200_OK
        food_place.refresh_from_db()
        assert food_place.name == "La Guinguette Rénovée"

    def test_delete_food_place(self, client, food_place):
        """DELETE /api/places/{id}/ supprime le lieu et retourne 204."""
        response = client.delete(f"/api/places/{food_place.id_foodplace}/")
        assert response.status_code == status.HTTP_204_NO_CONTENT
        assert not FoodPlace.objects.filter(pk=food_place.id_foodplace).exists()


# ─────────────────────────────────────────────
# Itinerary Endpoints
# ─────────────────────────────────────────────
@pytest.mark.django_db
class TestItineraryViews:
    """Tests d'intégration pour /api/itineraries/."""

    def _valid_payload(self, **kwargs):
        data = dict(
            title="Nantes Food Tour",
            type="Walking",
            zone="Nantes",
            distance=6.0,
            duration=2.0,
            difficulty="Easy",
            diet="Vegan",
            speciality="Gâteau Nantais",
            facts="Nantes en quelques mots.",
        )
        data.update(kwargs)
        return data

    def test_list_itineraries(self, client, itinerary):
        """GET /api/itineraries/ retourne 200 avec la liste (paginée)."""
        response = client.get("/api/itineraries/")
        assert response.status_code == status.HTTP_200_OK
        assert "results" in response.data
        assert len(response.data["results"]) >= 1

    def test_create_itinerary_valid(self, client):
        """POST /api/itineraries/ avec payload complet retourne 201."""
        response = client.post(
            "/api/itineraries/", data=self._valid_payload(), format="json"
        )
        assert response.status_code == status.HTTP_201_CREATED
        assert response.data["title"] == "Nantes Food Tour"

    def test_create_itinerary_missing_title_returns_400(self, client):
        """POST /api/itineraries/ sans 'title' retourne 400."""
        data = self._valid_payload()
        del data["title"]
        response = client.post("/api/itineraries/", data=data, format="json")
        assert response.status_code == status.HTTP_400_BAD_REQUEST
        assert "title" in response.data

    def test_retrieve_itinerary_includes_steps(self, client, itinerary):
        """GET /api/itineraries/{id}/ inclut un tableau 'steps'."""
        response = client.get(f"/api/itineraries/{itinerary.pk}/")
        assert response.status_code == status.HTTP_200_OK
        assert "steps" in response.data
        assert isinstance(response.data["steps"], list)

    def test_delete_itinerary(self, client, itinerary):
        """DELETE /api/itineraries/{id}/ retourne 204."""
        response = client.delete(f"/api/itineraries/{itinerary.pk}/")
        assert response.status_code == status.HTTP_204_NO_CONTENT


# ─────────────────────────────────────────────
# Step Endpoints
# ─────────────────────────────────────────────
@pytest.mark.django_db
class TestStepViews:
    """Tests d'intégration pour /api/steps/."""

    def test_create_step_valid(self, client, itinerary):
        """POST /api/steps/ avec payload valide retourne 201."""
        payload = {
            "itinerary": itinerary.pk,
            "name": "Place Bellecour",
            "longitude": 4.8321,
            "latitude": 45.7577,
            "step_order": 1,
        }
        response = client.post("/api/steps/", data=payload, format="json")
        assert response.status_code == status.HTTP_201_CREATED
        assert response.data["name"] == "Place Bellecour"

    def test_create_step_missing_name_returns_400(self, client, itinerary):
        """POST /api/steps/ sans 'name' retourne 400 – l'API ne crache pas."""
        payload = {
            "itinerary": itinerary.pk,
            "longitude": 4.8321,
            "latitude": 45.7577,
            "step_order": 1,
        }
        response = client.post("/api/steps/", data=payload, format="json")
        assert response.status_code == status.HTTP_400_BAD_REQUEST
        assert "name" in response.data

    def test_create_step_invalid_picture_url_returns_400(self, client, itinerary):
        """POST /api/steps/ avec une URL 'picture' invalide retourne 400."""
        payload = {
            "itinerary": itinerary.pk,
            "name": "Étape Photo",
            "longitude": 4.8321,
            "latitude": 45.7577,
            "step_order": 1,
            "picture": "pas-une-url",
        }
        response = client.post("/api/steps/", data=payload, format="json")
        assert response.status_code == status.HTTP_400_BAD_REQUEST
        assert "picture" in response.data

    def test_create_step_linked_to_food_place(self, client, itinerary, food_place):
        """POST /api/steps/ avec food_place valide retourne 201 et lie le lieu."""
        payload = {
            "itinerary": itinerary.pk,
            "name": "Étape Liée",
            "longitude": 4.8321,
            "latitude": 45.7577,
            "step_order": 1,
            "food_place": food_place.id_foodplace,
        }
        response = client.post("/api/steps/", data=payload, format="json")
        assert response.status_code == status.HTTP_201_CREATED
        assert response.data["food_place"] == food_place.id_foodplace

    def test_list_steps(self, client, itinerary):
        """GET /api/steps/ retourne 200."""
        response = client.get("/api/steps/")
        assert response.status_code == status.HTTP_200_OK
