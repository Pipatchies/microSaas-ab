# Plan d'implémentation
======================

## 1. Frontend

### 1.1 Nextjs 

- Créer le projet :

```bash
npx create-next-app@latest tastyroad
```

- Choisir TypeScript pour typer correctement le code et éviter les erreurs de compilation.

- Choisir Tailwind CSS pour la stylisation.

- Choisir ESlint pour la gestion des erreurs de code.

- Choisir de mettre tout le code de l'application dans un dossier `src` puis `app`. Cela permet de structurer le projet et de ne pas se mélanger avec les fichiers de config ou statiques (`public`, `next.config.js`, etc.)

- Choisir d'utiliser App Router pour la gestion des routes. C'est plus moderne, désormais utilisé pour le dev de Next.js. Surtout, cela permet de créer des layouts différents selon les pages, des fichiers style not-found.tsx ou loading.tsx et de fetch beaucoup plus facilement les données via les React Server Components, sans utiliser ``getServerSideProps`` et ``getStaticProps``.

- Choisir d'utiliser Turbopack. Bundler ultra rapide qui permet d'optimiser le code et de réduire le temps de chargement des pages. Bien pour améliorer les performences de l'appli.

- Ajouter Prettier pour formatter le code.

## 1.2 Shadcn

- Installer le package `shadcn` avec `pnpm dlx shadcn@latest init`

- Possibilité d'installer des composants shadcn dans le projet.

- Créer un fichier de configuration `components.json` avec la config Tailwind CSS (`global.css`)

- Ajoute les dépendances : Tailwind CSS, class-variance-authority, tailwind-variants, lucide-react (les icônes), radix-ui/react...

## 1.3 Mapbox

- Création du compte Mapbox

- Création du token d'accès pour initialiser la map

- Installer la dépendance `mapbox-gl` avec `pnpm add mapbox-gl`

- Stocker le token dans le.env.local

# 2. Backend

### 2.1 Django

- Créer l'environnement de dev Python :

```bash
python -m venv env
env/Scripts/activate
```

- Installer Django et Django REST Framework :

```bash
pip install django djangorestframework
```

- Installer le package qui sert à gérer les règles CORS :

```bash
pip install django-cors-headers
```

- Créer le projet dans le dossier `api` :

```bash
django-admin startproject config src 
```

Cela va créer manage.py, un script qui va permettre de lancer les commandes Django (lancer le serveur, créer une app, faire les migrations, etc...), et un dossier config qui va regrouper la config générale, les routes principales et le déploiement du serveur.

- Installer Pylint et Black pour le linting et le formatage du code. 

```bash
pip install pylint black
```

Toutes les commandes doivent être lancées depuis l'environnement de dev créé précédemment.

- Créer mes différentes app Django (à suivre...)