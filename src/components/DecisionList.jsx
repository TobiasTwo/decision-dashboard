import { useNavigate } from 'react-router-dom';
import { useDecisions } from '../context/DecisionContext';
import DecisionCard from './DecisionCard';
import { useState } from 'react';

function DecisionList() {
  const { decisions, loading, error } = useDecisions();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredDecisions = decisions.filter(decision =>
    decision.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    decision.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-slate-800">Liste des décisions</h1>
        <input
          type="text"
          placeholder="Rechercher une décision..."
          className="px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      
      {loading ? (
        <div className="text-center py-8">Chargement des décisions...</div>
      ) : error ? (
        <div className="text-center py-8 text-red-500">{error}</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDecisions.map(decision => (
            <DecisionCard 
              key={decision.id} 
              decision={decision} 
              onClick={() => navigate(`/decision/${decision.id}`)} 
            />
          ))}
        </div>
      )}
      
      {!loading && !error && filteredDecisions.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          {searchTerm ? "Aucune décision ne correspond à votre recherche" : "Aucune décision à afficher"}
        </div>
      )}
    </div>
  );
}

export default DecisionList;