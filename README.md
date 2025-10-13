# TastyRoad 🛣️🍽️

![CI Status](https://github.com/2024-devops-alt-dist/microSaas-ab/actions/workflows/ci.yml/badge.svg)

**L’aventure commence sur la route… et finit dans l’assiette !**

## 🧭 Présentation du service

**TastyRoad** est une application web collaborative qui permet aux randonneurs, cyclistes et motards de :

- Découvrir et partager des itinéraires d’exploration régionale
- Intégrer des étapes gastronomiques locales (restaurants, marchés, producteurs)
- Recommander ou ajouter des anecdotes culinaires authentiques

### 🎯 Objectif

Proposer une expérience de **slow travel** complète, à la croisée de l’exploration nature et de la découverte culinaire locale .

---

### ⭐ Fonctionnalité principale

- Créer, partager et suivre des itinéraires enrichis de **d'étapes culinaires** et **recommandations locales**.

### ➕ Fonctionnalités secondaires

- Ajouter des avis / notes sur les étapes
- Sauvegarder des itinéraires favoris
- Importer ou exporter des fichiers GPX
- Recherche par région ou par plat typique 🍛

---

## 🎨 Charte graphique

###  Palette de couleurs

- 🟠 Orange foncé `#F26B38`
- 🌲 Vert sapin `#2E7D32`
- ⚪ Blanc cassé `#FAFAFA`
- ⚫ Gris anthracite `#2E2E2E`

### ✍️ Typographies

- **Titres** : Hind  
- **Sous-titres** : Rubik  
- **Texte courant** : Libre Franklin

### 🖼️ Ambiance visuelle

- Chaleureuse, naturelle, minimaliste  
- Road trip, outdoor, gastronomie locale  
- Cartes immersives, photos panoramiques, interface claire

---

## 💡 Expression des besoins

### ❗ Problème

Il existe des applications pour :
- tracer des itinéraires sportifs (Komoot, AllTrails, Strava)
- découvrir des lieux de restauration (TripAdvisor, Yelp)

**Mais aucune ne combine les deux.**  

TastyRoad répond à ce besoin croissant d’expériences intégrées : **un trajet + un plaisir gustatif local**.

### 👥 Public cible

- Randonneurs, motards, cyclistes 
- Voyageurs en solo, groupes d’amis ou clubs
- Âge : 25-60 ans
- Adepte du slow travel et de la cuisine locale

---

## 🧱 Stack technique

| Côté | Technologies |
|------|---------------|
| 💻 Frontend | **Next.js 15**, **TypeScript**, **Tailwind CSS**, **Mapbox** |
| ⚙️ Backend | **Django 5.2**, **REST Framework** |
| 🗃️ Base de données | **PostgreSQL 16** |
| 🧰 CI/CD | **GitHub Actions** |
| 🐳 Conteneurisation | **Docker Compose v2** |
| 🔐 Authentification | **A suivre** |
| 🧪 Tests & Qualité | **Pylint**, **Black**, **Pytest**, **ESLint**, **Prettier**, **Vitest**, **Safety** |

---

## 🧰 Environnement de développement

### ⚙️ Prérequis
- **Docker Desktop**
- **Node.js 20.x** et **Python 3.11**
- **PNPM** (pour le frontend)
- **Git**

### 🔧 Installation rapide
```bash
# Cloner le projet
git clone https://github.com/ton-compte/tastyroad.git
cd tastyroad

# Lancer toute la stack
docker compose up --build
```

API → http://localhost:8000

Frontend → http://localhost:3000

---

## 🧩 Variables d’environnement

Fichier .env à la racine :

```bash
DEBUG=True
SECRET_KEY=<your_secret_key_here>
ALLOWED_HOSTS=localhost,127.0.0.1
DB_ENGINE=django.db.backends.postgresql
DB_NAME=<your_database_name>
DB_USER=<your_db_user>
DB_PASSWORD=<your_db_password>
DB_HOST=postgres
DB_PORT=5432
NEXT_PUBLIC_API_URL=http://localhost:8000
```

---

## 🧪 Tests & Qualité du code

📘 [Voir la documentation complète sur les outils de qualité](docs/technical/qualite-code.md)

Commandes principales :
```bash
# Backend
pylint src
black --check .
pytest
safety check

# Frontend
pnpm lint
pnpm prettier --check .
pnpm test
pnpm build
```

---

## ⚙️ CI/CD Pipeline

📘 [Voir la documentation complète sur la CI/CD](docs/technical/ci-cd.md)

🔄 Automatisations

- Lancement sur push ou pull_request → develop

- Jobs :

    - Backend : lint, test, sécurité

    - Frontend : lint, test, build

    - Docker : validation des images

- Cache des dépendances (pip et pnpm)

- Notifications Discord (optionnelles)

---

## 🐳 Dockerisation

📘 [Voir la documentation Docker complète](docs/technical/dockerisation.md)

Commandes principales :
```bash
docker compose up --build
docker compose down -v
docker exec -it tastyroad_api 
```

---

## 🧰 Outils de développement

📘 Voir la documentation détaillée

- VSCode (lint/format)

- Docker Desktop

- Git + GitHub

- Lefthook (pré-commit hooks)

- Node 20 / Python 3.11

---

## 📦 Livrables

### 👩‍🏫 Présentation
📄 [Voir la présentation](docs/fonctional/DiapoTastyRoad.pdf)

### 🖼️ Wireframes
🔗 [Voir les wireframes](docs/fonctional/Wireframes.png)

### 🗃️ MCD (Modèle Conceptuel de Données)
📄 [Voir le MCD](/docs/fonctional/MCD.webp)

### 🎯 Diagramme de cas d'utilisation
📄 [Voir le diagramme de cas d'utilisation](/docs/fonctional/DiagrammeUseCase.webp)

### 🎨 Maquettes figma
📄 [Voir les maquettes figma](https://www.figma.com/design/4bto4UsSytyuMB3l4Y6HeE/TastyRoad?node-id=0-1&t=DUBhzxmOgN0ZA66D-1)

---

## 👩‍💻 Auteur

**Ariane Bertaud**

Conceptrice Développeuse d’Applications – Promotion 2025

---

🌍 *Avec TastyRoad, redonnez du goût à vos trajets*