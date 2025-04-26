import { useNavigate } from 'react-router-dom';
import { AuthService } from '../services/authService';

function Navbar() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));

  const handleLogout = () => {
    AuthService.logout();
    navigate('/login');
  };

  if (!user) return null;

  const getTitle = () => {
    switch (user.role) {
      case 'data_scientist':
        return 'Tableau de bord - Data Scientist';
      case 'chief_data_scientist':
        return 'Tableau de bord - Chief Data Scientist';
      default:
        return 'Tableau de bord';
    }
  };

  return (
    <nav className="bg-slate-800 text-white shadow-lg">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="text-xl font-bold">{getTitle()}</div>
        <div className="flex items-center space-x-4">
          <div className="flex items-center bg-slate-700 px-4 py-2 rounded-lg">
            <span className="mr-2">👤</span>
            <span>{user.name}</span>
          </div>
          <button
            onClick={handleLogout}
            className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg transition-colors"
          >
            Déconnexion
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;