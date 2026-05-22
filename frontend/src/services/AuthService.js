import { ApiClient } from './ApiClient';

class AuthService extends ApiClient {
  constructor() {
    super('/auth'); 
  }

  async login(username, password) {
    try {
      const response = await fetch(`${this.modelUrl}/login`, {
        method: 'POST',
        headers: this.getHeaders(),
        body: JSON.stringify({ username, password }),
      });
      
      return await this.handleResponse(response);
    } catch {
      return { success: false, message: 'No se pudo conectar con el servidor.' };
    }
  }

  async register(username, password) {
    try {
      const response = await fetch(`${this.modelUrl}/register`, {
        method: 'POST',
        headers: this.getHeaders(),
        body: JSON.stringify({ username, password }),
      });
      
      return await this.handleResponse(response);
    } catch {
      return { success: false, message: 'No se pudo conectar con el servidor.' };
    }
  }
}

export const authService = new AuthService();