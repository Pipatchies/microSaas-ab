# 🧹 Outils de qualité et vérification du code

## Backend
| Type | Outil | Commande | Objectif |
|------|--------|-----------|-----------|
| Linter | `pylint` | `pylint src` | Vérifie le style et les erreurs courantes |
| Format | `black` | `black --check .` | Formate le code selon PEP8 |
| Tests | `pytest` | `pytest` | Exécute les tests unitaires |
| Sécurité | `safety` | `safety check` | Analyse les dépendances vulnérables |

## Frontend
| Type | Outil | Commande | Objectif |
|------|--------|-----------|-----------|
| Linter | `eslint` | `pnpm lint` | Vérifie les erreurs JS/React |
| Format | `prettier` | `pnpm prettier --check .` | Vérifie la cohérence du style |
| Tests | `vitest` | `pnpm test` | Lance les tests unitaires |
| Audit | `pnpm audit` | `pnpm audit` | Détecte les dépendances à risque |
