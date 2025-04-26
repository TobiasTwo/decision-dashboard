import CryptoJS from 'crypto-js';

// Clé pour le stockage des utilisateurs
const USERS_STORAGE_KEY = 'users';

// Initialisation de la base de données
function initializeDatabase() {
  const users = JSON.parse(localStorage.getItem(USERS_STORAGE_KEY) || '[]');
  
  if (users.length === 0) {
    const defaultUsers = [
      { 
        id: 1,
        username: 'data_scientist',
        password: hashPassword('password123'),
        role: 'data_scientist',
        name: 'Data Scientist'
      },
      {
        id: 2,
        username: 'chief',
        password: hashPassword('password123'),
        role: 'chief_data_scientist',
        name: 'Chief Data Scientist'
      }
    ];
    
    localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(defaultUsers));
  }
}

// Fonction pour hasher un mot de passe
function hashPassword(password) {
  return CryptoJS.SHA256(password).toString();
}

// Fonction pour vérifier un mot de passe
function verifyPassword(password, hashedPassword) {
  return hashPassword(password) === hashedPassword;
}

// Initialiser la base de données au chargement
initializeDatabase();

export async function verifyCredentials(username, password) {
  // Simuler un délai réseau
  await new Promise(resolve => setTimeout(resolve, 500));

  const users = JSON.parse(localStorage.getItem(USERS_STORAGE_KEY) || '[]');
  const user = users.find(u => u.username === username);

  if (user && verifyPassword(password, user.password)) {
    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }

  return null;
} 