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

## 🚀 Installation et exécution du projet

### ⚙️ Prérequis

Avant de lancer le projet, assurez-vous d'avoir installé :

- **Docker Desktop**
- **Node.js 20.x** et **Python 3.11**
- **PNPM** (pour le frontend)
- **Git**

### 🔧 Installation rapide avec Docker (recommandé)

*1. Cloner le projet*

```bash
git clone https://github.com/ton-compte/tastyroad.git
cd microSaas-ab
```

*2. Ajout des fichiers .env*

- A la racine du projet avec les variables suivantes :

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
NEXT_PUBLIC_API_URL=http://localhost:8800
```

- Dans le dossier `client` avec la variable suivante :

```bash
NEXT_PUBLIC_API_URL=http://localhost:8800
```

*3. Lancer tout le projet*

```bash
docker compose up --build
```

*4. Stopper les conteneurs*

```bash
docker compose down
```

Le projet est accessible aux urls suivants :

API → http://localhost:8800

Frontend → http://localhost:3300

### Installation manuelle (Pour lancer le projet en local sans Docker)

*1. Cloner le projet* (Même commande que pour Docker)

*2. Ajout des fichiers .env* (Même commande que pour Docker)


*3. Installation du backend*

```bash
cd api
python -m venv env
source env/bin/activate      # (sous Windows: env\Scripts\activate)
pip install --upgrade pip
pip install -r requirements.txt
```
Appliquer les migrations :
```bash
python manage.py makemigrations
python manage.py migrate
python manage.py runserver 8800
```

🔗 Backend : http://localhost:8800

*4. Installation du frontend*

```bash
cd client
pnpm install
pnpm run dev
```

💻 Frontend : http://localhost:3300

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
DB_PORT=5480
NEXT_PUBLIC_API_URL=http://localhost:8800
```

Fichier .env dans le dossier `client` :

```bash
NEXT_PUBLIC_API_URL=http://localhost:8800
``` 

---

## 🐳 Dockerisation

📘 [Voir la documentation Docker complète](docs/technical/dockerisation.md)

Commandes principales :
```bash
docker compose up --build
docker compose down
docker compose down -v # Pour supprimer les données
```

Commandes annexes mais utiles :
```bash
docker compose logs -f # Voir les logs des conteneurs
docker compose logs -f api # Voir les logs du backend
docker compose logs -f client # Voir les logs du frontend
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

---

## 🧰 Outils de développement

📘 Voir la documentation détaillée

- VSCode (lint/format)

- Docker Desktop

- Git + GitHub

- Lefthook (pré-commit hooks)

- Node 20 / Python 3.11

---

## 🛠️ Depannage

### Si les ports sont déjà utilisés

Vérifier que les ports sont libres :

```bash
netstat -an | findstr :8800 # API
netstat -an | findstr :3300 # Frontend
netstat -an | findstr :5462 # Postgres
```

Si les ports sont déjà utilisés, changer le port dans le fichier `compose.yml` et dans le fichier `.env`.

### S'il y a un problème de connexion à la base de données

- Vérifier que le port 5462 est ouvert sur le serveur.

- Si le port est ouvert, vérifier que le nom de la base de données et les informations de connexion sont correctes dans le fichier `.env`.

- Si le port est fermé, ouvrir le port sur le serveur.

### S'il y a un problème de connexion au serveur API

Vérifier que le port 8800 est ouvert sur le serveur.

Si le port est ouvert, vérifier que le nom de l'hôte et le port de l'API sont corrects dans le fichier `.env`.

Si le port est fermé, ouvrir le port sur le serveur.

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