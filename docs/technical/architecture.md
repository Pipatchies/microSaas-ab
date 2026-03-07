# 🏗️ Architecture du Projet TastyRoad

TastyRoad repose sur une architecture moderne de type "Client-Serveur", divisée en deux sous-projets indépendants communiquant de manière asynchrone via des requêtes HTTP (API REST).

## 🌐 1. Le Frontend (Client Web)

Le frontend se trouve dans le dossier `client/` et exploite les dernières avancées technologiques frontend : **Next.js 16 (App Router)** et **React 19**.

**Points clés de l'architecture Front :**

- **Dossier `src/app/`** : Utilisation de l'App Router. Chaque dossier correspond à une route de l'application cliente (ex: `/itineraries`). C'est le centre nerveux des pages.
- **Dossier `src/components/`** : Renferme l'ensemble des composants d'interface utilisateur (UI). Ces composants utilisent principalement des primitives accessibles via radix-ui et stylisées via **TailwindCSS 4**.
- **Gestion d'état et Formulaires** : Les formulaires complexes sont interfacés via `react-hook-form` couplé à `zod` pour garantir la validation forte des schémas de données avant l'envoi au serveur.
- **Cartographie** : Intégration fondamentale de `mapbox-gl` (et `react-map-gl`) pour le tracé visuel des itinéraires.
- **Communication avec le Backend** : Le front cible l'API désignée par la variable d'environnement `NEXT_PUBLIC_API_URL`.

## ⚙️ 2. Le Backend (Le Cerveau)

Le backend, localisé dans le dossier `api/`, est propulsé par **Django 6** et **Django REST Framework (DRF)**.

**Points clés de l'architecture Back :**

- L'architecture monolithique interne de Django est organisée en "Apps" spécialisées par métier :
  - **`core`** : Règle l'ensemble de la base, de la configuration et des utilitaires transverses du projet.
  - **`itineraries`** : Pilote la logique métier relative aux parcours des utilisateurs et la gestion des étapes du tracé.
  - **`places`** : Focalisée sur la composante "gastronomique" : la gestion des établissements, avis et spécificités culinaires.
- **Le Motif MVT / DRF** :
  - `models.py` : L'Object-Relational Mapping (ORM) traduisant le code Python en tables SQL.
  - `serializers.py` : Contrôle la conversion des objets complexes en JSON transitant vers le Front.
  - `views.py` : Gère le routage final, l'authentification et les réponses HTTP.

## 🗃️ 3. La Base de Données (Stockage)

Le système de choix est **PostgreSQL 16**.

- Assure une intégrité référentielle infaillible.
- Dans notre environnement Docker, les données persistent sur la machine-hôte via le volume nommé `postgres_data`.
