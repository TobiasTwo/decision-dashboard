import { verifyCredentials } from '../db/database';

export class AuthService {
  static async login(username, password) {
    try {
      const user = await verifyCredentials(username, password);
      if (user) {
        localStorage.setItem('user', JSON.stringify(user));
        return user;
      }
      throw new Error('Identifiants invalides');
    } catch (error) {
      throw new Error('Erreur lors de la connexion');
    }
  }

  static logout() {
    localStorage.removeItem('user');
  }

  static getCurrentUser() {
    const userStr = localStorage.getItem('user');
    if (!userStr) return null;
    try {
      return JSON.parse(userStr);
    } catch (error) {
      console.error('Erreur lors de la récupération de l\'utilisateur:', error);
      return null;
    }
  }

  static isAuthenticated() {
    return !!this.getCurrentUser();
  }

  static getUserRole() {
    const user = this.getCurrentUser();
    return user ? user.role : null;
  }
} 