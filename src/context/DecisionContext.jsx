import { createContext, useState, useContext, useEffect } from 'react';
import { fetchDecisions, updateDecisionStatus } from '../api/decisionsAPI';

const DecisionContext = createContext();

export function useDecisions() {
  return useContext(DecisionContext);
}

export function DecisionProvider({ children }) {
  const [decisions, setDecisions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadDecisions();
  }, []);

  const loadDecisions = async () => {
    try {
      setLoading(true);
      const data = await fetchDecisions();
      setDecisions(data);
      setError(null);
    } catch (err) {
      setError('Erreur lors du chargement des décisions');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const approveDecision = async (id) => {
    try {
      await updateDecisionStatus(id, 'approved');
      setDecisions(decisions.map(decision => 
        decision.id === id ? { ...decision, status: 'approved' } : decision
      ));
    } catch (err) {
      setError('Erreur lors de l\'approbation de la décision');
      console.error(err);
    }
  };

  const rejectDecision = async (id) => {
    try {
      await updateDecisionStatus(id, 'rejected');
      setDecisions(decisions.map(decision => 
        decision.id === id ? { ...decision, status: 'rejected' } : decision
      ));
    } catch (err) {
      setError('Erreur lors du rejet de la décision');
      console.error(err);
    }
  };

  const value = {
    decisions,
    loading,
    error,
    approveDecision,
    rejectDecision,
    refreshDecisions: loadDecisions
  };

  return (
    <DecisionContext.Provider value={value}>
      {children}
    </DecisionContext.Provider>
  );
}
