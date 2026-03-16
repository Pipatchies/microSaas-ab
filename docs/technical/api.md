# 🔌 Documentation de l'API - TastyRoad

L'API de TastyRoad est construite avec **Django REST Framework (DRF)**.

## 🧭 Points d'entrée de la documentation interactive

Le projet utilise `drf-spectacular` pour générer automatiquement la documentation OpenAPI à partir du code de vos vues et serializers.

En local, l'API tourne sur `http://localhost:8800`.
Une fois les conteneurs lancés (`docker compose up`), vous pouvez accéder aux interfaces suivantes :

- **Swagger UI** : [http://localhost:8800/api/docs/](http://localhost:8800/api/docs/) (Interface interactive paramétrable, idéale pour tester les requêtes à la volée)
- **Redoc** : [http://localhost:8800/api/redoc/](http://localhost:8800/api/redoc/) (Interface statique et très lisible, excellente pour la lecture)
- **Schéma brut (YAML/JSON)** : `http://localhost:8800/api/schema/`

En production (sur Render), vous pouvez remplacer `localhost:8800` par `https://microsaas-ab.onrender.com` pour accéder aux mêmes interfaces.

## 🏗️ Structure générale des Réponses

L'API communique exclusivement au format JSON.

Exemple de structure pour une réponse réussie (pagination standard Django) :

```json
{
  "count": 10,
  "next": null,
  "previous": null,
  "results": [
    {
      "id": 1,
      "title": "Tour de la montagne",
      "description": "Un magnifique itinéraire..."
    }
  ]
}
```

Les erreurs sont remontées avec les codes HTTP sémantiques `400 Bad Request`, `401 Unauthorized`, `403 Forbidden`, `404 Not Found` et sont généralement accompagnées d'un objet expliquant l'erreur en détail.
