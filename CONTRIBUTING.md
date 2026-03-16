# Guide de Contribution - TastyRoad 🛣️🍽️

Merci de l'intérêt porté à TastyRoad ! Ce document explique les conventions à respecter pour participer au développement du projet.

## 🌿 Stratégie de Branches (Git Flow)

Nous utilisons une stratégie basée sur le Git Flow classique :

- `main` : Branche de production. Le code y est toujours stable et corresponds à ce qui est en ligne.
- `develop` : Branche principale de développement. Les nouvelles fonctionnalités y sont fusionnées avant de passer en production sur `main`.
- `feature/*` : Branches de travail pour les nouvelles fonctionnalités (ex: `feature/auth`, `feature/map-markers`).
- `fix/*` : Branches pour la correction de bugs.

**Processus de travail :**

1. Mettez à jour votre branche `develop` locale : `git checkout develop && git pull origin develop`
2. Créez une nouvelle branche de travail : `git checkout -b feature/nom-de-la-fonctionnalite`
3. Poussez vos commits régulièrement sur GitHub.
4. Ouvrez une Pull Request (PR) ciblant obligatoirement la branche `develop`.

## ✍️ Conventions des Commits (Conventional Commits)

Nous utilisons [Commitlint](https://commitlint.js.org/) via **Lefthook** pour valider automatiquement la syntaxe des messages de commit.
Votre message de commit **doit** respecter ce format :

```text
type(contexte): description courte
```

**Types autorisés :**

- `feat` : Ajout d'une nouvelle fonctionnalité
- `fix` : Correction d'un bug
- `docs` : Mise à jour de la documentation
- `style` : Changements de formatage (espaces, virgules, etc.) qui n'affectent pas la logique de code
- `refactor` : Refactorisation du code (ni ajout de feature, ni correction de bug)
- `test` : Ajout ou modification de tests (ex: pytest, vitest)
- `chore` : Tâches de maintenance (mise à jour des dépendances, configuration CI/CD, lefthook)

**Exemples valides :**

- `feat(auth): ajout de la connexion utilisateur`
- `fix(map): correction du bug d'affichage des marqueurs`
- `docs: mise à jour du README`

_(Si votre message de commit ne respecte pas ce format, Lefthook bloquera le commit avec un message d'erreur expliquant pourquoi)._

## 🧪 Qualité et Intégration Continue (CI)

Avant d'ouvrir ou de demander la validation d'une Pull Request, assurez-vous que :

1. **Lefthook passe en local** : Lefthook s'exécute de toute manière avant votre commit pour formater avec Prettier/Black et faire du Lint basique.
2. **Les tests passent** : Lancez `pytest` (Backend) ou `pnpm test` (Frontend) pour vous assurer qu'il n'y a pas de régressions.
3. L'intégration continue (GitHub Actions) vérifiera tous ces points à la réception de votre Pull Request (lint, formattage, tests, et audit de sécurité via `pip-audit`). La fusion sera bloquée tant que la CI ne passe pas au vert.
