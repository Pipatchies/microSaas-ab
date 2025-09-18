from django.http import JsonResponse
from django.db import connection

def test_api(request):
    return JsonResponse({
        "status": "ok",
        "message": "Test endpoint is working!"
    })

def test_db(request):
    try:
        with connection.cursor() as cursor:
            cursor.execute("SELECT version();")  # Récupère la version PostgreSQL
            version = cursor.fetchone()[0]

        return JsonResponse({
            "status": "ok",
            "message": f"API connected to database!",
            "db_version": version
        })
    except Exception as e:
        return JsonResponse({
            "status": "error",
            "message": str(e)
        }, status=500)