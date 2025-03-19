import { useDecisions } from '../context/DecisionContext';

function DecisionCard({ decision, onClick }) {
  const { approveDecision, rejectDecision } = useDecisions();
  
  const handleApprove = (e) => {
    e.stopPropagation();
    approveDecision(decision.id);
  };
  
  const handleReject = (e) => {
    e.stopPropagation();
    rejectDecision(decision.id);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'approved':
        return 'bg-emerald-100 text-emerald-800 border border-emerald-200';
      case 'rejected':
        return 'bg-rose-100 text-rose-800 border border-rose-200';
      default:
        return 'bg-amber-100 text-amber-800 border border-amber-200';
    }
  };

  return (
    <div 
      className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer border border-gray-100"
      onClick={onClick}
    >
      <div className="p-6">
        <h2 className="text-xl font-semibold mb-2 text-slate-800">{decision.title}</h2>
        <p className="text-slate-600 mb-4 line-clamp-2">{decision.description}</p>
        <div className="flex justify-between items-center">
          <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(decision.status)}`}>
            {decision.status === 'pending' ? 'En attente' : 
             decision.status === 'approved' ? 'Approuvé' : 'Rejeté'}
          </span>
          <span className="text-sm text-slate-500">
            {new Date(decision.createdAt).toLocaleDateString()}
          </span>
        </div>
      </div>
    </div>
  );
}

export default DecisionCard;