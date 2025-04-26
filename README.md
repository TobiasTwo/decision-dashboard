# Decision Dashboard

Une application web pour la gestion des décisions basée sur les données, permettant aux Data Scientists et Chief Data Scientists de collaborer efficacement.

## Fonctionnalités

### Authentification locale
- Système de connexion sécurisé via une base locale (localStorage)
- Deux utilisateurs par défaut :
  - **Data Scientist** :
    - Nom d'utilisateur : `data_scientist`
    - Mot de passe : `password123`
  - **Chief Data Scientist** :
    - Nom d'utilisateur : `chief`
    - Mot de passe : `password123`
- Les rôles sont automatiquement détectés à la connexion (plus de sélection manuelle)
- Les routes sont protégées selon le rôle
- Pas de page de création de compte (utilisateurs créés automatiquement au premier lancement)

### Interface Data Scientist
- Formulaire pour ajouter de nouvelles décisions avec :
  - Description détaillée
  - Upload d'images (JPG, PNG)
  - Prévisualisation de l'image
  - Bouton dédié pour l'ajout d'image
  - Possibilité de supprimer l'image sélectionnée
- Les décisions sont envoyées à l'API externe
- Interface intuitive et moderne

### Interface Chief Data Scientist
- Visualisation des décisions en attente (récupérées via l'API)
- Affichage de la description et de l'image (base64)
- Formulaire pour écrire une décision finale
- Enregistrement de la décision finale via l'API externe
- Historique des décisions traitées

## Structure du Projet

```
decision-dashboard/
├── public/
├── src/
│   ├── components/
│   │   ├── Auth/
│   │   │   └── Login.jsx
│   │   └── Dashboard/
│   │       ├── DataScientistDashboard.jsx
│   │       └── ChiefDashboard.jsx
│   ├── context/
│   ├── assets/
│   ├── api/
│   ├── db/
│   │   └── database.js
│   ├── services/
│   │   └── authService.js
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── package.json
├── tailwind.config.cjs
├── postcss.config.cjs
└── vite.config.js
```

## Technologies Utilisées

- React
- React Router pour la navigation
- Tailwind CSS pour le styling
- Vite comme bundler
- localStorage pour l'authentification locale
- API externe pour la gestion des décisions

## Installation

1. Cloner le repository :
```bash
git clone [URL_DU_REPO]
```

2. Installer les dépendances :
```bash
npm install
```

3. Lancer l'application en mode développement :
```bash
npm run dev
```

## Fonctionnement

1. **Connexion**
   - Utilisez l'un des deux comptes par défaut :
     - Data Scientist : `data_scientist` / `password123`
     - Chief Data Scientist : `chief` / `password123`
   - Le système redirige automatiquement vers le dashboard approprié selon le rôle

2. **Data Scientist**
   - Peut ajouter de nouvelles décisions (description + image)
   - Les décisions sont envoyées à l'API externe

3. **Chief Data Scientist**
   - Consulte les décisions en attente (récupérées via l'API)
   - Prend une décision finale (texte libre)
   - Enregistre la décision finale via l'API externe

## Sécurité

- Les mots de passe sont stockés de façon hachée (SHA256) dans le localStorage
- Les routes sont protégées selon le rôle de l'utilisateur
- Les identifiants par défaut sont créés automatiquement si la base locale est vide

## Contribution

Les contributions sont les bienvenues ! N'hésitez pas à :
1. Fork le projet
2. Créer une branche pour votre fonctionnalité
3. Commiter vos changements
4. Pousser vers la branche
5. Ouvrir une Pull Request

## Licence

Ce projet est sous licence MIT.
