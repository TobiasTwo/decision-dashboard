import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const ChiefDashboard = () => {
  const [decisions, setDecisions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedDecision, setSelectedDecision] = useState(null);
  const [finalDecision, setFinalDecision] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);


  useEffect(() => {
    fetchDecisions();
  }, []);

  const fetchDecisions = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Récupérer l'utilisateur depuis le localStorage
      const user = JSON.parse(localStorage.getItem('user'));
      const userId = /*user?.id ||*/ 1; // Utiliser 1 comme valeur par défaut si l'ID n'est pas disponible
      
      const response = await fetch(`/api/v1/decision/user/${userId}`, {
        method: 'GET',
        headers: {
          'accept': '*/*',
        },
      });

      if (!response.ok) {
        throw new Error(`Erreur HTTP: ${response.status}`);
      }

      const data = await response.json();
      console.log('Décisions récupérées:', data);
      
      // Formater les données pour l'affichage
      const formattedDecisions = data.map(decision => ({
        ...decision,
        // Ajouter un préfixe data:image/jpeg;base64, si l'image est en base64
        imageUrl: decision.image ? `data:image/jpeg;base64,${decision.image}` : null,
        status: 'pending', // Statut par défaut
        finalDecision: '', // Décision finale vide par défaut
      }));
      
      setDecisions(formattedDecisions);
    } catch (err) {
      console.error('Erreur lors de la récupération des décisions:', err);
      setError('Une erreur est survenue lors de la récupération des décisions. Veuillez réessayer.');
    } finally {
      setLoading(false);
    }
  };

  const handleDecisionSelect = (decision) => {
    setSelectedDecision(decision);
    setFinalDecision(decision.finalDecision || '');
  };

  const handleSubmitDecision = async () => {
    if (!selectedDecision) return;
    
    setIsSubmitting(true);
    
    try {
      // Appel API pour enregistrer la décision finale
      const response = await fetch('/api/v1/defdecision', {
        method: 'POST',
        headers: {
          'accept': '*/*',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          description: finalDecision
        }),
      });

      if (!response.ok) {
        throw new Error(`Erreur HTTP: ${response.status}`);
      }

      const data = await response.json();
      console.log('Décision finale enregistrée:', data);
      
      // Mettre à jour la décision localement
      const updatedDecisions = decisions.map(decision => {
        if (decision.id === selectedDecision.id) {
          return {
            ...decision,
            status: 'completed',
            finalDecision,
          };
        }
        return decision;
      });
      
      setDecisions(updatedDecisions);
      setSelectedDecision(null);
      setFinalDecision('');
      
      alert('Décision enregistrée avec succès!');
    } catch (err) {
      console.error('Erreur lors de l\'enregistrement de la décision:', err);
      alert('Une erreur est survenue lors de l\'enregistrement de la décision.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-semibold text-gray-900">Dashboard Chief Data Scientist</h1>
            </div>
            <div className="flex items-center">
              <button
                onClick={handleLogout}
                className="ml-4 px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700"
              >
                Déconnexion
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          {error && (
            <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-md">
              <p className="text-red-700">{error}</p>
            </div>
          )}
          
          {loading ? (
            <div className="text-center py-12">
              <p className="text-gray-500">Chargement des décisions...</p>
            </div>
          ) : decisions.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500">Aucune décision en attente.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Liste des décisions */}
              <div className="md:col-span-1 bg-white shadow rounded-lg p-4">
                <h2 className="text-lg font-medium text-gray-900 mb-4">Décisions en attente</h2>
                <div className="space-y-2">
                  {decisions.map((decision) => (
                    <div
                      key={decision.id}
                      className={`p-3 rounded-md cursor-pointer ${
                        selectedDecision?.id === decision.id
                          ? 'bg-blue-50 border border-blue-200'
                          : 'hover:bg-gray-50 border border-gray-200'
                      }`}
                      onClick={() => handleDecisionSelect(decision)}
                    >
                      <p className="font-medium text-gray-900 truncate">
                        Décision #{decision.id}
                      </p>
                      <p className="text-sm text-gray-500 truncate">
                        {decision.description.substring(0, 50)}...
                      </p>
                      {decision.status !== 'pending' && (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          Traitée
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Détails de la décision sélectionnée */}
              <div className="md:col-span-2 bg-white shadow rounded-lg p-6">
                {selectedDecision ? (
                  <div>
                    <h2 className="text-lg font-medium text-gray-900 mb-4">
                      Décision #{selectedDecision.id}
                    </h2>
                    
                    <div className="mb-6">
                      <h3 className="text-sm font-medium text-gray-700 mb-1">Description</h3>
                      <p className="text-gray-900 whitespace-pre-wrap">{selectedDecision.description}</p>
                    </div>
                    
                    {selectedDecision.imageUrl && (
                      <div className="mb-6">
                        <h3 className="text-sm font-medium text-gray-700 mb-1">Image</h3>
                        <div className="border border-gray-200 rounded-md overflow-hidden">
                          <img
                            src={selectedDecision.imageUrl}
                            alt="Décision"
                            onClick={() => setIsModalOpen(true)}
                            className="max-h-64 w-auto mx-auto cursor-zoom-in transition-transform hover:scale-105"
                          />
                        </div>
                      </div>
                    )}
                    
                    {selectedDecision.status === 'pending' ? (
                      <div className="space-y-4">
                        <div>
                          <label htmlFor="finalDecision" className="block text-sm font-medium text-gray-700">
                            Décision finale
                          </label>
                          <textarea
                            id="finalDecision"
                            rows={4}
                            value={finalDecision}
                            onChange={(e) => setFinalDecision(e.target.value)}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                            placeholder="Expliquez votre décision finale..."
                          />
                        </div>
                        
                        <button
                          onClick={handleSubmitDecision}
                          disabled={isSubmitting}
                          className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
                            isSubmitting ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
                          } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}
                        >
                          {isSubmitting ? 'Enregistrement...' : 'Enregistrer la décision'}
                        </button>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        <div>
                          <h3 className="text-sm font-medium text-gray-700 mb-1">Statut</h3>
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                            Traitée
                          </span>
                        </div>
                        
                        <div>
                          <h3 className="text-sm font-medium text-gray-700 mb-1">Décision finale</h3>
                          <p className="text-gray-900 whitespace-pre-wrap">
                            {selectedDecision.finalDecision || 'Aucune décision finale fournie.'}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <p className="text-gray-500">Sélectionnez une décision pour voir les détails.</p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </main>
          {isModalOpen && (
      <div
        className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50"
        onClick={() => setIsModalOpen(false)}
      >
        <img
          src={selectedDecision.imageUrl}
          alt="Image agrandie"
          className="max-h-[90%] max-w-[90%] object-contain rounded shadow-lg"
        />
      </div>
    )}
    </div>
    
  );
};

export default ChiefDashboard; 