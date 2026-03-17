"""
Management command to create a superuser from environment variables if none exists.
Safe to run at every startup (idempotent).
"""

import os

from django.contrib.auth import get_user_model
from django.core.management.base import BaseCommand


class Command(BaseCommand):
    help = "Create a superuser from env vars if no superuser exists yet."

    def handle(self, *args, **options):
        User = get_user_model()

        if User.objects.filter(is_superuser=True).exists():
            self.stdout.write(
                self.style.WARNING("ℹ️  Superuser already exists — skipping creation.")
            )
            return

        username = os.environ.get("DJANGO_SUPERUSER_USERNAME")
        email = os.environ.get("DJANGO_SUPERUSER_EMAIL")
        password = os.environ.get("DJANGO_SUPERUSER_PASSWORD")

        if not all([username, email, password]):
            self.stdout.write(
                self.style.WARNING(
                    "⚠️  DJANGO_SUPERUSER_USERNAME, DJANGO_SUPERUSER_EMAIL or "
                    "DJANGO_SUPERUSER_PASSWORD not set — skipping superuser creation."
                )
            )
            return

        User.objects.create_superuser(username=username, email=email, password=password)
        self.stdout.write(
            self.style.SUCCESS(f"✅ Superuser '{username}' created successfully.")
        )
