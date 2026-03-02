"""
Tests unitaires des serializers DRF.
Vérifie les payloads valides et invalides (sans accès en base de données).
"""

import pytest
from places.models import FoodPlace
from places.serializers import FoodPlaceSerializer
from itineraries.models import Itinerary, Step
from itineraries.serializers import ItinerarySerializer, StepSerializer


class TestFoodPlaceSerializer:
    """Tests sur FoodPlaceSerializer."""

    def test_valid_payload(self):
        """Un payload complet est valide."""
        data = {
            "name": "Le Café du Commerce",
            "type": "Café",
            "longitude": 2.3522,
            "latitude": 48.8566,
            "description": "Un café parisien classique.",
        }
        serializer = FoodPlaceSerializer(data=data)
        assert serializer.is_valid(), serializer.errors

    def test_missing_name_is_invalid(self):
        """Un payload sans 'name' est invalide."""
        data = {
            "longitude": 2.3522,
            "latitude": 48.8566,
        }
        serializer = FoodPlaceSerializer(data=data)
        assert not serializer.is_valid()
        assert "name" in serializer.errors

    def test_missing_longitude_is_invalid(self):
        """Un payload sans 'longitude' est invalide."""
        data = {
            "name": "Test Place",
            "latitude": 48.8566,
        }
        serializer = FoodPlaceSerializer(data=data)
        assert not serializer.is_valid()
        assert "longitude" in serializer.errors

    def test_missing_latitude_is_invalid(self):
        """Un payload sans 'latitude' est invalide."""
        data = {
            "name": "Test Place",
            "longitude": 2.3522,
        }
        serializer = FoodPlaceSerializer(data=data)
        assert not serializer.is_valid()
        assert "latitude" in serializer.errors

    def test_optional_fields_can_be_omitted(self):
        """Les champs optionnels (type, description, mapbox_id) peuvent être absents."""
        data = {
            "name": "Lieu Minimal",
            "longitude": 1.0,
            "latitude": 1.0,
        }
        serializer = FoodPlaceSerializer(data=data)
        assert serializer.is_valid(), serializer.errors

    @pytest.mark.django_db
    def test_serializer_creates_instance(self):
        """save() crée bien une instance en base de données."""
        data = {
            "name": "Boulangerie Dupont",
            "longitude": 2.33,
            "latitude": 48.87,
        }
        serializer = FoodPlaceSerializer(data=data)
        assert serializer.is_valid()
        place = serializer.save()
        assert place.pk is not None
        assert FoodPlace.objects.filter(pk=place.pk).exists()


class TestItinerarySerializer:
    """Tests sur ItinerarySerializer."""

    def _valid_payload(self, **kwargs):
        data = dict(
            title="Parcours Bordeaux",
            type="Cycling",
            zone="Bordeaux",
            distance=10.0,
            duration=3.0,
            difficulty="Medium",
            diet="Omnivore",
            speciality="Huîtres",
            facts="Bordeaux est la capitale du vin.",
        )
        data.update(kwargs)
        return data

    def test_valid_payload(self):
        """Un payload complet est valide."""
        serializer = ItinerarySerializer(data=self._valid_payload())
        assert serializer.is_valid(), serializer.errors

    def test_missing_title_is_invalid(self):
        """Un payload sans 'title' est invalide."""
        data = self._valid_payload()
        del data["title"]
        serializer = ItinerarySerializer(data=data)
        assert not serializer.is_valid()
        assert "title" in serializer.errors

    def test_steps_field_is_readonly(self):
        """Le champ 'steps' est en lecture seule (ignoré à la création)."""
        data = self._valid_payload()
        data["steps"] = [{"name": "trick_step"}]
        serializer = ItinerarySerializer(data=data)
        assert serializer.is_valid(), serializer.errors
        # steps n'est pas dans les validated_data car read_only=True
        assert "steps" not in serializer.validated_data


@pytest.mark.django_db
class TestStepSerializer:
    """Tests sur StepSerializer."""

    def _create_itinerary(self):
        return Itinerary.objects.create(
            title="Itinéraire Reference",
            type="Walking",
            zone="Paris",
            distance=5.0,
            duration=2.0,
            difficulty="Easy",
            diet="Vegan",
            speciality="Tartines",
            facts="Paris en balade.",
        )

    def test_valid_payload(self):
        """Un payload complet est valide."""
        itinerary = self._create_itinerary()
        data = {
            "itinerary": itinerary.pk,
            "name": "Étape Gare du Nord",
            "longitude": 2.3554,
            "latitude": 48.8809,
            "step_order": 1,
        }
        serializer = StepSerializer(data=data)
        assert serializer.is_valid(), serializer.errors

    def test_missing_name_is_invalid(self):
        """Un payload sans 'name' est invalide (→ 400 en vue)."""
        itinerary = self._create_itinerary()
        data = {
            "itinerary": itinerary.pk,
            "longitude": 2.3554,
            "latitude": 48.8809,
            "step_order": 1,
        }
        serializer = StepSerializer(data=data)
        assert not serializer.is_valid()
        assert "name" in serializer.errors

    def test_missing_itinerary_is_invalid(self):
        """Un payload sans 'itinerary' est invalide."""
        data = {
            "name": "Étape Test",
            "longitude": 2.3554,
            "latitude": 48.8809,
            "step_order": 1,
        }
        serializer = StepSerializer(data=data)
        assert not serializer.is_valid()
        assert "itinerary" in serializer.errors

    def test_picture_must_be_valid_url(self):
        """Le champ 'picture' doit être une URL valide."""
        itinerary = self._create_itinerary()
        data = {
            "itinerary": itinerary.pk,
            "name": "Étape Photo",
            "longitude": 2.3554,
            "latitude": 48.8809,
            "step_order": 1,
            "picture": "non-une-url-valide",
        }
        serializer = StepSerializer(data=data)
        assert not serializer.is_valid()
        assert "picture" in serializer.errors

    def test_picture_valid_url_accepted(self):
        """Une URL valide pour 'picture' est acceptée."""
        itinerary = self._create_itinerary()
        data = {
            "itinerary": itinerary.pk,
            "name": "Étape Photo",
            "longitude": 2.3554,
            "latitude": 48.8809,
            "step_order": 1,
            "picture": "https://example.com/photo.jpg",
        }
        serializer = StepSerializer(data=data)
        assert serializer.is_valid(), serializer.errors
