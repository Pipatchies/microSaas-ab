# TastyRoad 🛣️🍽️

![CI Status](https://github.com/2024-devops-alt-dist/microSaas-ab/actions/workflows/ci.yml/badge.svg)

> **L’aventure commence sur la route… et finit dans l’assiette !**

**TastyRoad** est une application web collaborative qui permet aux randonneurs, cyclistes et motards de découvrir et partager des itinéraires d’exploration régionale enrichis d'étapes gastronomiques locales (restaurants, marchés, producteurs).

<details>
  <summary>Table des matières</summary>
  <ol>
    <li><a href="#-présentation-du-projet">Présentation du projet</a></li>
    <li><a href="#-déploiement-en-ligne">Déploiement en ligne</a></li>
    <li><a href="#-stack-technique">Stack technique</a></li>
    <li><a href="#-pour-commencer">Pour commencer</a>
      <ul>
        <li><a href="#prérequis">Prérequis</a></li>
        <li><a href="#variables-denvironnement">Variables d'environnement</a></li>
        <li><a href="#installation-avec-docker-recommandé">Installation avec Docker</a></li>
        <li><a href="#installation-manuelle">Installation manuelle</a></li>
      </ul>
    </li>
    <li><a href="#-tests--qualité-du-code">Tests & Qualité</a></li>
    <li><a href="#-cicd--déploiement">CI/CD & Déploiement</a></li>
    <li><a href="#-dépannage">Dépannage</a></li>
    <li><a href="#-conception--livrables">Conception & Livrables</a></li>
    <li><a href="#-auteur">Auteur</a></li>
  </ol>
</details>

---

## 🧭 Présentation du projet

L'objectif de TastyRoad est de proposer une expérience de **slow travel** complète, à la croisée de l’exploration nature et de la découverte culinaire locale.

### 🌟 Fonctionnalités principales

- Créer, partager et suivre des itinéraires enrichis de **d'étapes culinaires** et **recommandations locales**.
- Ajouter des avis / notes sur les étapes.
- Sauvegarder des itinéraires favoris.
- Importer ou exporter des fichiers GPX.
- Recherche par région ou par plat typique 🍛.

---

## 🌐 Déploiement en ligne

L'application est déployée et accessible via les liens suivants :

- **Frontend (Vercel)** : [https://tastyroad.vercel.app/](https://tastyroad.vercel.app/)
- **Backend API (Render)** : [https://microsaas-ab.onrender.com](https://microsaas-ab.onrender.com)

---

## 🧱 Stack technique

| Composant           | Technologies                                                                                                  |
| ------------------- | ------------------------------------------------------------------------------------------------------------- |
| 💻 Frontend         | **Next.js 16**, **React 19**, **TypeScript**, **Tailwind CSS 4**, **Mapbox**                                  |
| ⚙️ Backend          | **Django 6**, **Django REST Framework**                                                                       |
| 🗃️ Base de données  | **PostgreSQL 16**                                                                                             |
| 🔐 Authentification | **Authlib**                                                                                                   |
| 🐳 Conteneurisation | **Docker Compose v2**                                                                                         |
| 🧰 CI/CD            | **GitHub Actions**                                                                                            |
| � Serveurs de Prod  | **Gunicorn**, **Whitenoise**                                                                                  |
| 🧪 Tests & Qualité  | **Pytest**, **Pylint**, **Black**, **pip-audit** _(Back)_ <br> **Vitest**, **ESLint**, **Prettier** _(Front)_ |

---

## 🚀 Pour commencer

### ⚙️ Prérequis

Avant de lancer le projet, assurez-vous d'avoir installé :

- **Docker Desktop**
- **Git**
- _Si exécution en local sans Docker_ : **Node.js 20.x**, **Python 3.14**, **PNPM** et **PostgreSQL**.

### 🧩 Variables d'environnement

Vous devez configurer les variables d'environnement dans des fichiers locaux `.env` non suivis par git.

**1. Fichier `.env` à la racine (Pour le Backend et Docker) :**

```env
DEBUG=True
SECRET_KEY=<your_secret_key_here>
ALLOWED_HOSTS=localhost,127.0.0.1
DB_ENGINE=django.db.backends.postgresql
DB_NAME=<your_database_name>
DB_USER=<your_db_user>
DB_PASSWORD=<your_db_password>
DB_HOST=postgres
DB_PORT=5462
```

**2. Fichier `.env` dans le dossier `client` (Pour le Frontend) :**

```env
NEXT_PUBLIC_API_URL=http://localhost:8800
NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN=<votre_token_mapbox>
```

### 🐳 Installation avec Docker (Recommandé)

1. Cloner le projet :

```bash
git clone https://github.com/ton-compte/tastyroad.git
cd microSaas-ab
```

2. Créer les deux fichiers `.env` comme indiqué ci-dessus.

3. Lancer les conteneurs :

```bash
docker compose up --build
```

L'application sera alors accessible aux URLs suivantes :

- **Frontend** → http://localhost:3300
- **API Backend** → http://localhost:8800

4. (Optionnel) Charger des données de test (Fixtures) :

```bash
docker compose exec api python manage.py loaddata seed_places seed_itineraries seed_steps
```

5. Stopper et réinitialiser les conteneurs :

```bash
docker compose down
docker compose down -v # Pour supprimer les volumes de données
```

### 💻 Installation manuelle (Sans Docker)

**Backend (API) :**

```bash
cd api
python -m venv env
source env/bin/activate      # (sous Windows: env\Scripts\activate)
pip install --upgrade pip
pip install -r requirements.txt
cd src
python manage.py makemigrations
python manage.py migrate
# (Optionnel) Charger des données de test :
python manage.py loaddata seed_places seed_itineraries seed_steps
python manage.py runserver 8800
```

🔗 Backend : http://localhost:8800

**Frontend (Client) :**

```bash
cd client
pnpm install
pnpm run dev
```

� Frontend : http://localhost:3000

---

## 🧪 Tests & Qualité du code

📘 [Voir la documentation complète sur les outils de qualité](docs/technical/qualite-code.md)

Le projet utilise **Lefthook** pour exécuter automatiquement des vérifications avant chaque commit ou push.
Pour l'activer, lancez cette commande à la racine du projet :

```bash
pnpm i
```

**Commandes utiles en cours de développement :**

```bash
# === Backend (depuis /api) ===
pylint src
black .
pytest
safety check

# === Frontend (depuis /client) ===
pnpm lint
pnpm format
pnpm test
pnpm build
```

---

## ⚙️ CI/CD & Déploiement

📘 [Voir la documentation CI/CD](docs/technical/ci-cd.md) | 📘 [Voir la documentation Docker](docs/technical/dockerisation.md)

Le pipeline complet tourne via **GitHub Actions** à chaque `push` ou `pull_request` vers `develop` :

- Linting et Tests côté API et Client.
- Audit de sécurité (Safety).
- Build Frontend.
- Validation des images Docker.
- Mise en cache continue (pip et pnpm).

---

## 🛠️ Dépannage

- **Si les ports sont déjà utilisés (Windows):**
  ```bash
  netstat -an | findstr :8800 # API
  netstat -an | findstr :3300 # Frontend Docker
  netstat -an | findstr :5462 # Postgres (Exemple)
  ```
- **Problème de BDD ou API :**
  Vérifiez que vos ports dans le `.env` de la racine matchent avec la configuration de votre machine et du fichier `compose.yml`. Vérifiez si le port `5480` ou `5462` est bien configuré de votre côté.

---

## 🎨 Conception & Livrables

### 💡 Expression des besoins et Cible

TastyRoad répond à un manque critique d'applications transverses combinant **outils de traçage sportif (randonnée, moto, vélo)** et **gastronomie locale authentique**. Destiné aux 25-60 ans, adeptes du _slow travel_ et du voyage collaboratif.

### 🖌️ Charte Graphique

- 🟠 Orange foncé `#F26B38` | 🌲 Vert sapin `#2E7D32`
- ⚪ Blanc cassé `#FAFAFA` | ⚫ Gris anthracite `#2E2E2E`
- **Typos** : Hind (Titres), Rubik (Sous-titres), Libre Franklin (Texte courant)
- **Ambiance** : Chaleureuse, nature, road trip, interface claire.

### 📦 Documents du projet

- 👩‍🏫 [Présentation du projet](docs/fonctional/DiapoTastyRoad.pdf)
- 🖼️ [Wireframes](docs/fonctional/Wireframes.png) | 🎨 [Maquettes Figma](https://www.figma.com/design/4bto4UsSytyuMB3l4Y6HeE/TastyRoad?node-id=0-1&t=DUBhzxmOgN0ZA66D-1)
- 🗃️ [MCD (Modèle Conceptuel de Données)](/docs/fonctional/MCD.webp)
- 🎯 [Diagramme de cas d'utilisation](/docs/fonctional/DiagrammeUseCase.webp)

---

## 👩‍💻 Auteur

**Ariane Bertaud**
Conceptrice Développeuse d’Applications – Promotion 2024 - 2026

🌍 _Avec TastyRoad, redonnez du goût à vos trajets_
