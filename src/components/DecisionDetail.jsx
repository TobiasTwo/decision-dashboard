import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDecisions } from '../context/DecisionContext';
import { fetchDecisionDetails } from '../api/decisionsAPI';

function DecisionDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { approveDecision, rejectDecision } = useDecisions();
  const [decision, setDecision] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadDecision = async () => {
      try {
        setLoading(true);
        const data = await fetchDecisionDetails(id);
        setDecision(data);
        setError(null);
      } catch (err) {
        setError('Erreur lors du chargement des détails de la décision');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadDecision();
  }, [id]);

  const handleApprove = async () => {
    await approveDecision(id);
    setDecision(prev => ({ ...prev, status: 'approved' }));
  };

  const handleReject = async () => {
    await rejectDecision(id);
    setDecision(prev => ({ ...prev, status: 'rejected' }));
  };

  if (loading) return <div className="text-center py-8">Chargement des détails...</div>;
  if (error) return <div className="text-center py-8 text-red-500">{error}</div>;
  if (!decision) return <div className="text-center py-8">Décision non trouvée</div>;

  return (
    <div className="bg-white shadow-lg rounded-lg p-6 max-w-4xl mx-auto border border-gray-100">
      <button 
        onClick={() => navigate('/')}
        className="mb-4 flex items-center text-slate-600 hover:text-slate-800"
      >
        &larr; Retour à la liste
      </button>
      
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2 text-slate-800">{decision.title}</h1>
        <div className="flex items-center">
          <span 
            className={`px-3 py-1 rounded-full text-sm font-medium 
              ${decision.status === 'pending' ? 'bg-amber-100 text-amber-800 border border-amber-200' : 
                decision.status === 'approved' ? 'bg-emerald-100 text-emerald-800 border border-emerald-200' : 
                'bg-rose-100 text-rose-800 border border-rose-200'}`}
          >
            {decision.status === 'pending' ? 'En attente' : 
             decision.status === 'approved' ? 'Approuvé' : 'Rejeté'}
          </span>
          <span className="ml-4 text-slate-500">ID: {decision.id}</span>
        </div>
      </div>

      <div className="border-t border-b border-slate-200 py-4 my-4">
        <h2 className="text-xl font-semibold mb-2 text-slate-800">Description</h2>
        <p className="text-slate-600">{decision.description}</p>
      </div>

      {decision.metrics && (
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-4 text-slate-800">Métriques</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {Object.entries(decision.metrics).map(([key, value]) => (
              <div key={key} className="bg-slate-50 p-4 rounded-lg border border-slate-200">
                <div className="text-sm text-slate-600">{key}</div>
                <div className="text-lg font-semibold text-slate-800">{value}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {decision.details && (
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2 text-slate-800">Détails supplémentaires</h2>
          <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
            {Object.entries(decision.details).map(([key, value]) => (
              <div key={key} className="mb-4">
                <div className="font-semibold text-slate-800">{key}</div>
                {Array.isArray(value) ? (
                  <ul className="list-disc list-inside pl-4">
                    {value.map((item, index) => (
                      <li key={index} className="text-slate-600">{item}</li>
                    ))}
                  </ul>
                ) : (
                  <div className="text-slate-600">{value}</div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {decision.status === 'pending' && (
        <div className="flex justify-end space-x-4 mt-6">
          <button 
            onClick={handleReject}
            className="px-4 py-2 bg-rose-600 text-white rounded hover:bg-rose-700 transition-colors"
          >
            Rejeter
          </button>
          <button 
            onClick={handleApprove}
            className="px-4 py-2 bg-emerald-600 text-white rounded hover:bg-emerald-700 transition-colors"
          >
            Approuver
          </button>
        </div>
      )}
    </div>
  );
}

export default DecisionDetail;