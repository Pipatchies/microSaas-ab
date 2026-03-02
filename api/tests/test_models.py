"""
Tests unitaires des modèles Django.
Vérifie la création, les relations et les représentations __str__.
"""

import pytest
from places.models import FoodPlace
from itineraries.models import Itinerary, Step


@pytest.mark.django_db
class TestFoodPlaceModel:
    """Tests unitaires sur le modèle FoodPlace."""

    def test_create_foodplace(self):
        """On peut créer un FoodPlace avec les champs requis."""
        place = FoodPlace.objects.create(
            name="Le Bistrot",
            longitude=2.3522,
            latitude=48.8566,
        )
        assert place.id_foodplace is not None
        assert place.name == "Le Bistrot"

    def test_foodplace_str(self):
        """__str__ renvoie le nom du lieu."""
        place = FoodPlace(name="Chez Marcel")
        assert str(place) == "Chez Marcel"

    def test_foodplace_optional_fields(self):
        """Les champs optionnels peuvent être vides ou null."""
        place = FoodPlace.objects.create(
            name="Test Place",
            longitude=0.0,
            latitude=0.0,
        )
        assert place.type is None
        assert place.description == ""
        assert place.mapbox_id is None

    def test_foodplace_mapbox_id_unique(self):
        """mapbox_id doit être unique."""
        FoodPlace.objects.create(
            name="Lieu 1",
            longitude=1.0,
            latitude=1.0,
            mapbox_id="unique-id-123",
        )
        with pytest.raises(Exception):
            FoodPlace.objects.create(
                name="Lieu 2",
                longitude=2.0,
                latitude=2.0,
                mapbox_id="unique-id-123",
            )


@pytest.mark.django_db
class TestItineraryModel:
    """Tests unitaires sur le modèle Itinerary."""

    def _create_itinerary(self, title="Paris Gourmand", **kwargs):
        defaults = dict(
            title=title,
            type="Walking",
            zone="Paris",
            distance=5.5,
            duration=2.0,
            difficulty="Easy",
            diet="Omnivore",
            speciality="Croissants",
            facts="Fun facts about Paris food.",
        )
        defaults.update(kwargs)
        return Itinerary.objects.create(**defaults)

    def test_create_itinerary(self):
        """On peut créer un itinéraire avec tous les champs."""
        itinerary = self._create_itinerary()
        assert itinerary.pk is not None
        assert itinerary.title == "Paris Gourmand"

    def test_itinerary_str(self):
        """__str__ renvoie 'title (type)'."""
        itinerary = self._create_itinerary(title="Lyon Gourmet", type="Cycling")
        assert str(itinerary) == "Lyon Gourmet (Cycling)"


@pytest.mark.django_db
class TestStepModel:
    """Tests unitaires sur le modèle Step."""

    def _create_itinerary(self):
        return Itinerary.objects.create(
            title="Itinéraire Test",
            type="Walking",
            zone="Lyon",
            distance=3.0,
            duration=1.0,
            difficulty="Easy",
            diet="Vegan",
            speciality="Quenelles",
            facts="Quelques faits.",
        )

    def test_create_step(self):
        """On peut créer un Step lié à un Itinerary."""
        itinerary = self._create_itinerary()
        step = Step.objects.create(
            itinerary=itinerary,
            name="Étape 1",
            longitude=4.8357,
            latitude=45.7640,
            step_order=1,
        )
        assert step.id_step is not None
        assert step.itinerary == itinerary

    def test_step_str(self):
        """__str__ renvoie 'titre_itinéraire - Step N: nom_étape'."""
        itinerary = self._create_itinerary()
        step = Step(
            itinerary=itinerary,
            name="La Boulangerie",
            longitude=4.8,
            latitude=45.7,
            step_order=2,
        )
        assert str(step) == "Itinéraire Test - Step 2: La Boulangerie"

    def test_step_optional_food_place(self):
        """Le champ food_place est optionnel."""
        itinerary = self._create_itinerary()
        step = Step.objects.create(
            itinerary=itinerary,
            name="Étape sans food place",
            longitude=4.8,
            latitude=45.7,
            step_order=1,
        )
        assert step.food_place is None

    def test_step_linked_to_food_place(self):
        """Un step peut être lié à un FoodPlace."""
        itinerary = self._create_itinerary()
        food_place = FoodPlace.objects.create(
            name="La Brasserie",
            longitude=4.8357,
            latitude=45.7640,
        )
        step = Step.objects.create(
            itinerary=itinerary,
            name="Étape avec food place",
            longitude=4.8,
            latitude=45.7,
            step_order=1,
            food_place=food_place,
        )
        assert step.food_place == food_place
        assert food_place.steps.count() == 1

    def test_step_ordering(self):
        """Les steps sont triés par step_order."""
        itinerary = self._create_itinerary()
        Step.objects.create(
            itinerary=itinerary, name="C", longitude=0, latitude=0, step_order=3
        )
        Step.objects.create(
            itinerary=itinerary, name="A", longitude=0, latitude=0, step_order=1
        )
        Step.objects.create(
            itinerary=itinerary, name="B", longitude=0, latitude=0, step_order=2
        )
        steps = list(Step.objects.filter(itinerary=itinerary))
        assert [s.step_order for s in steps] == [1, 2, 3]

    def test_cascade_delete_steps(self):
        """La suppression d'un itinéraire supprime ses steps."""
        itinerary = self._create_itinerary()
        Step.objects.create(
            itinerary=itinerary, name="Étape", longitude=0, latitude=0, step_order=1
        )
        itinerary_id = itinerary.pk
        itinerary.delete()
        assert Step.objects.filter(itinerary_id=itinerary_id).count() == 0
