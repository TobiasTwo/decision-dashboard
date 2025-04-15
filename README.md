# Decision Dashboard

Une application web pour la gestion des décisions basées sur les données, permettant aux Data Scientists et Chief Data Scientists de collaborer efficacement.

## Fonctionnalités

### Authentification
- Système de connexion avec deux rôles distincts :
  - Data Scientist
  - Chief Data Scientist
- Protection des routes en fonction du rôle de l'utilisateur
- Stockage local des informations d'authentification

### Interface Data Scientist
- Formulaire pour ajouter de nouvelles décisions avec :
  - Titre de la décision
  - Description détaillée
  - Upload d'images (support pour JPG et PNG)
  - Prévisualisation de l'image
  - Bouton dédié pour l'ajout d'image
  - Possibilité de supprimer l'image sélectionnée
- Stockage local des données
- Interface intuitive et moderne

### Interface Chief Data Scientist
- Visualisation des décisions en attente avec :
  - Titre et description
  - Image associée
  - Formulaire pour prendre une décision finale
  - Option d'approbation/rejet
  - Badge visuel indiquant le statut (approuvé/rejeté)
- Historique des décisions prises avec :
  - Date de prise de décision
  - Décision finale détaillée
  - Statut d'approbation
  - Image associée

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
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── package.json
├── tailwind.config.cjs
└── vite.config.js
```

## Technologies Utilisées

- React
- React Router pour la navigation
- Tailwind CSS pour le styling
- Vite comme bundler
- LocalStorage pour le stockage des données (en développement)

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
   - Les utilisateurs se connectent en choisissant leur rôle
   - Le système redirige vers le dashboard approprié

2. **Data Scientist**
   - Peut ajouter de nouvelles décisions
   - Peut inclure des images pour illustrer ses analyses
   - Peut voir l'historique de ses soumissions

3. **Chief Data Scientist**
   - Consulte les décisions en attente
   - Prend des décisions finales détaillées
   - Approuve ou rejette les propositions
   - Consulte l'historique des décisions prises

## Préparation pour l'Intégration Future

L'application est conçue pour faciliter l'intégration future avec :

### Base de Données
- Structure prête pour l'ajout d'une API REST
- Compatible avec PostgreSQL ou MongoDB
- Prête pour l'implémentation de JWT

### Stockage des Images
- Architecture prête pour l'intégration avec des services cloud (AWS S3, Google Cloud Storage)
- Support pour la compression et l'optimisation des images
- Gestion des permissions d'accès

### API
- Structure modulaire pour l'ajout d'endpoints RESTful
- Prête pour la validation des données
- Support pour la pagination et le filtrage

## Contribution

Les contributions sont les bienvenues ! N'hésitez pas à :
1. Fork le projet
2. Créer une branche pour votre fonctionnalité
3. Commiter vos changements
4. Pousser vers la branche
5. Ouvrir une Pull Request

## Licence

Ce projet est sous licence MIT.
