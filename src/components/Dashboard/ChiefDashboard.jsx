import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const ChiefDashboard = () => {
  const [decisions, setDecisions] = useState([]);
  const [selectedDecision, setSelectedDecision] = useState(null);
  const [finalDecision, setFinalDecision] = useState('');
  const [isApproved, setIsApproved] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Charger les décisions depuis le localStorage
    const storedDecisions = JSON.parse(localStorage.getItem('decisions') || '[]');
    setDecisions(storedDecisions);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };

  const handleSubmitDecision = (decisionId) => {
    const updatedDecisions = decisions.map(decision => {
      if (decision.id === decisionId) {
        return {
          ...decision,
          status: 'completed',
          finalDecision,
          isApproved,
          decidedAt: new Date().toISOString()
        };
      }
      return decision;
    });

    localStorage.setItem('decisions', JSON.stringify(updatedDecisions));
    setDecisions(updatedDecisions);
    setSelectedDecision(null);
    setFinalDecision('');
    setIsApproved(true);
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
          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Décisions en attente</h2>
            <div className="space-y-4">
              {decisions
                .filter(decision => decision.status === 'pending')
                .map(decision => (
                  <div
                    key={decision.id}
                    className="border rounded-lg p-4 hover:bg-gray-50 cursor-pointer"
                    onClick={() => setSelectedDecision(decision)}
                  >
                    <h3 className="font-medium text-gray-900">{decision.title}</h3>
                    <p className="text-gray-700 mt-1">{decision.description}</p>
                    {decision.image && (
                      <img
                        src={decision.image}
                        alt="Decision"
                        className="mt-2 h-32 w-32 object-cover rounded"
                      />
                    )}
                  </div>
                ))}
            </div>

            {selectedDecision && (
              <div className="mt-6 border-t pt-6">
                <h3 className="text-lg font-medium text-gray-900">Prendre une décision</h3>
                <div className="mt-4">
                  <label htmlFor="finalDecision" className="block text-sm font-medium text-gray-700">
                    Décision finale
                  </label>
                  <textarea
                    id="finalDecision"
                    value={finalDecision}
                    onChange={(e) => setFinalDecision(e.target.value)}
                    rows={4}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                    placeholder="Entrez votre décision finale..."
                    required
                  />
                </div>
                <div className="mt-4">
                  <label className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      checked={isApproved}
                      onChange={(e) => setIsApproved(e.target.checked)}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <span className="text-gray-700">Approuver cette décision</span>
                  </label>
                </div>
                <div className="mt-4 flex justify-end space-x-3">
                  <button
                    onClick={() => {
                      setSelectedDecision(null);
                      setFinalDecision('');
                      setIsApproved(true);
                    }}
                    className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                  >
                    Annuler
                  </button>
                  <button
                    onClick={() => handleSubmitDecision(selectedDecision.id)}
                    className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
                  >
                    Valider la décision
                  </button>
                </div>
              </div>
            )}

            <div className="mt-8">
              <h3 className="text-lg font-medium text-gray-900">Décisions prises</h3>
              <div className="mt-4 space-y-4">
                {decisions
                  .filter(decision => decision.status === 'completed')
                  .map(decision => (
                    <div key={decision.id} className="border rounded-lg p-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-medium text-gray-900">{decision.title}</h4>
                          <p className="text-gray-700 mt-1">{decision.description}</p>
                        </div>
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                          decision.isApproved 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {decision.isApproved ? 'Approuvé' : 'Rejeté'}
                        </span>
                      </div>
                      {decision.image && (
                        <img
                          src={decision.image}
                          alt="Decision"
                          className="mt-2 h-32 w-32 object-cover rounded"
                        />
                      )}
                      <div className="mt-2">
                        <p className="font-medium text-gray-900">Décision finale:</p>
                        <p className="text-gray-700">{decision.finalDecision}</p>
                        <p className="text-sm text-gray-500 mt-1">
                          Pris le: {new Date(decision.decidedAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ChiefDashboard; 