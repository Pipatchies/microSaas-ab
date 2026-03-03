"""Core Django app configuration and models."""

from django.test import TestCase

# Create your tests here.


class DummyTest(TestCase):
    """Test dummy."""

    def test_dummy(self):
        """Test factice pour valider la pipeline CI."""
        self.assertEqual(1, 1)
