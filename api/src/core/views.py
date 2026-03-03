# pylint: disable=broad-exception-caught

"""
Core views for health check and database test endpoints.
"""

from django.http import JsonResponse
from django.db import connection, OperationalError


def test_api(_request):
    """
    Simple endpoint to check if the API is running.
    """
    return JsonResponse({"status": "ok", "message": "Test endpoint is working!"})


def test_db(_request):
    """
    Endpoint to test the database connection by running a simple query.
    """
    try:
        with connection.cursor() as cursor:
            cursor.execute("SELECT version();")
            version = cursor.fetchone()[0]

        return JsonResponse(
            {
                "status": "ok",
                "message": "API connected to database!",
                "db_version": version,
            }
        )
    except OperationalError as e:
        return JsonResponse(
            {
                "status": "error",
                "message": "Database connection failed",
                "details": str(e),
            },
            status=500,
        )

    except Exception as e:
        print(f"Error: {e}")
        return JsonResponse(
            {"message": "Unexpected error occurred", "details": str(e)}, status=500
        )
