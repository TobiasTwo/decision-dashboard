const mockDecisions = [
    {
      id: '1',
      title: 'Modèle de prédiction de churn',
      description: 'Déploiement d\'un nouveau modèle ML pour prédire le churn des clients avec une précision accrue de 15%',
      status: 'pending',
      createdAt: '2023-05-10T10:30:00Z',
      updatedAt: '2023-05-10T10:30:00Z'
    },
    {
      id: '2',
      title: 'Segmentation de la clientèle',
      description: 'Nouvelle méthode de segmentation basée sur le comportement d\'achat et les préférences utilisateur',
      status: 'approved',
      createdAt: '2023-05-08T14:15:00Z',
      updatedAt: '2023-05-09T09:45:00Z'
    },
    {
      id: '3',
      title: 'Optimisation des recommandations produits',
      description: 'Ajustement de l\'algorithme de recommandation pour améliorer le taux de conversion de 8%',
      status: 'rejected',
      createdAt: '2023-05-05T16:20:00Z',
      updatedAt: '2023-05-06T11:10:00Z'
    },
    {
      id: '4',
      title: 'Prévision des ventes trimestrielles',
      description: 'Nouveau modèle de prévision des ventes avec une erreur moyenne réduite de 12%',
      status: 'pending',
      createdAt: '2023-05-03T09:00:00Z',
      updatedAt: '2023-05-03T09:00:00Z'
    },
    {
      id: '5',
      title: 'Détection de fraude en temps réel',
      description: 'Amélioration de l\'algorithme de détection de fraude pour réduire les faux positifs de 20%',
      status: 'pending',
      createdAt: '2023-05-01T11:30:00Z',
      updatedAt: '2023-05-01T11:30:00Z'
    }
  ];
  
  const mockDecisionDetails = {
    '1': {
      id: '1',
      title: 'Modèle de prédiction de churn',
      description: 'Déploiement d\'un nouveau modèle ML pour prédire le churn des clients avec une précision accrue de 15%',
      status: 'pending',
      createdAt: '2023-05-10T10:30:00Z',
      updatedAt: '2023-05-10T10:30:00Z',
      metrics: {
        'Précision': '87%',
        'Rappel': '82%',
        'F1-Score': '84.5%',
        'AUC': '0.91'
      },
      details: {
        'Algorithme': 'XGBoost',
        'Features principales': [
          'Temps depuis le dernier achat',
          'Fréquence d\'achat',
          'Valeur moyenne de commande',
          'Nombre de retours produits',
          'Temps passé sur l\'application'
        ],
        'Impact estimé': 'Réduction du churn de 12% sur 6 mois',
        'Coût de mise en œuvre': 'Modéré',
        'Équipe': 'Équipe Data Science - Rétention Client'
      }
    },
    '2': {
      id: '2',
      title: 'Segmentation de la clientèle',
      description: 'Nouvelle méthode de segmentation basée sur le comportement d\'achat et les préférences utilisateur',
      status: 'approved',
      createdAt: '2023-05-08T14:15:00Z',
      updatedAt: '2023-05-09T09:45:00Z',
      metrics: {
        'Nombre de segments': '7',
        'Silhouette Score': '0.68',
        'Variance expliquée': '78%'
      },
      details: {
        'Méthode': 'K-means clustering avec PCA',
        'Segments identifiés': [
          'Acheteurs premium',
          'Chasseurs de bonnes affaires',
          'Acheteurs occasionnels',
          'Acheteurs saisonniers',
          'Nouveaux clients',
          'Clients fidèles',
          'À risque de churn'
        ],
        'Applications': 'Marketing ciblé, personnalisation de l\'expérience utilisateur, stratégies de fidélisation',
        'Équipe': 'Équipe Data Science - Comportement Client'
      }
    },
    '3': {
      id: '3',
      title: 'Optimisation des recommandations produits',
      description: 'Ajustement de l\'algorithme de recommandation pour améliorer le taux de conversion de 8%',
      status: 'rejected',
      createdAt: '2023-05-05T16:20:00Z',
      updatedAt: '2023-05-06T11:10:00Z',
      metrics: {
        'Amélioration du CTR': '+12%',
        'Amélioration des conversions': '+8%',
        'Diversité des recommandations': '+15%'
      },
      details: {
        'Algorithme': 'Filtrage collaboratif hybride',
        'Modifications': 'Ajout de facteurs de saisonnalité et tendances du marché',
        'Raison du rejet': 'Préoccupations concernant l\'impact sur la performance du site web et temps de chargement augmenté',
        'Recommandations': 'Optimiser l\'algorithme pour réduire la charge sur les serveurs avant déploiement',
        'Équipe': 'Équipe Data Science - Recommandations'
      }
    },
    '4': {
      id: '4',
      title: 'Prévision des ventes trimestrielles',
      description: 'Nouveau modèle de prévision des ventes avec une erreur moyenne réduite de 12%',
      status: 'pending',
      createdAt: '2023-05-03T09:00:00Z',
      updatedAt: '2023-05-03T09:00:00Z',
      metrics: {
        'MAPE': '8.3%',
        'Erreur réduite': '12%',
        'Précision à 90 jours': '91%'
      },
      details: {
        'Méthodologie': 'Série temporelle avec LSTM et facteurs exogènes',
        'Facteurs externes': 'Données économiques, tendances saisonnières, activités marketing',
        'Granularité': 'Prévisions par catégorie de produit et région',
        'Bénéfice attendu': 'Amélioration de la gestion des stocks et de la planification des ressources',
        'Équipe': 'Équipe Data Science - Prévisions'
      }
    },
    '5': {
      id: '5',
      title: 'Détection de fraude en temps réel',
      description: 'Amélioration de l\'algorithme de détection de fraude pour réduire les faux positifs de 20%',
      status: 'pending',
      createdAt: '2023-05-01T11:30:00Z',
      updatedAt: '2023-05-01T11:30:00Z',
      metrics: {
        'Réduction des faux positifs': '20%',
        'Taux de détection': '95%',
        'Temps de réponse': '<100ms'
      },
      details: {
        'Algorithme': 'Ensemble de modèles avec Random Forest et règles métier',
        'Améliorations': 'Intégration de l\'analyse comportementale et détection d\'anomalies',
        'Impact attendu': 'Réduction des pertes dues à la fraude estimée à 1.2M€ par an',
        'Complexité d\'implémentation': 'Élevée - nécessite mise à jour de l\'infrastructure',
        'Équipe': 'Équipe Data Science - Sécurité'
      }
    }
  };
  

  // Simuler un délai réseau
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Récupérer toutes les décisions
export const fetchDecisions = async () => {
  await delay(800);
  return [...mockDecisions];
};

// Récupérer les détails d'une décision spécifique
export const fetchDecisionDetails = async (id) => {
  await delay(600);
  const decision = mockDecisionDetails[id];
  if (!decision) {
    throw new Error('Décision non trouvée');
  }
  return decision;
};

// Mettre à jour le statut d'une décision
export const updateDecisionStatus = async (id, status) => {
  await delay(500);
  // Dans un vrai cas, vous feriez un appel API ici
  return { success: true };
};