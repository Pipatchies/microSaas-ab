# 🐳 Dockerisation du projet TastyRoad

## Objectif
Faciliter le déploiement et garantir un environnement identique entre développement et production.

## Structure des services
- **postgres** : base de données principale
- **api** : backend Django exposé sur le port 8800
- **frontend** : application Next.js exposée sur le port 3300

## Commandes principales
```bash
# Lancer tous les conteneurs
docker compose up --build

# Arrêter et nettoyer
docker compose down -v

```

## Fichiers Docker

api/Dockerfile → installe Django, psycopg, et lance manage.py runserver

client/Dockerfile → build et lance Next.js en mode dev

compose.yml → orchestre l’ensemble (volumes, dépendances, env)

## Volumes & Réseaux

Volume postgres_data persiste les données PostgreSQL.

Les conteneurs communiquent via le réseau interne bridge.


