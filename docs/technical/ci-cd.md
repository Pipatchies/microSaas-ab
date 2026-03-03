# ⚙️ Intégration Continue / Déploiement Continu

## Objectif
Assurer la qualité du code et la stabilité du projet avant chaque fusion ou déploiement.

## Déclencheurs
- `push` sur n’importe quelle branche
- `pull_request` vers `develop`

## Jobs
### 🧩 Backend
- Installation de Python et des dépendances (`requirements.txt`)
- Lint : `pylint`
- Formatage : `black`
- Tests unitaires : `pytest`
- Audit de sécurité : `safety`

### ⚛️ Frontend
- Installation de Node.js et PNPM
- Lint : `eslint`
- Formatage : `prettier`
- Tests unitaires : `vitest`
- Build Next.js
- Audit : `pnpm audit`

### 🐳 Docker
- Build de `api/Dockerfile` et `client/Dockerfile`
- Vérification que les images se construisent sans erreur

## Caching
- `~/.cache/pip` pour pip
- `~/.local/share/pnpm` pour PNPM

## Notifications
En cas d’échec :
- message de log dans Actions

