export class ApiClient {

  constructor(endpoint = '') {
    this.baseUrl = import.meta.env.BACKEND_URL || 'http://localhost:5000/api';

    this.modelUrl = endpoint ? `${this.baseUrl}${endpoint}` : this.baseUrl;
  }

  /**
   * Método privado/auxiliar para adjuntar de forma automática el token de sesión
   * si el usuario ya está autenticado.
   */
  getHeaders() {
    const headers = {
      'Content-Type': 'application/json',
    };
    
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      try {
        const { token } = JSON.parse(savedUser);
        if (token) {
          headers['Authorization'] = `Bearer ${token}`;
        }
      } catch (error) {
        console.error(error);
      }
    }
    
    return headers;
  }

  /**
   * Centralizador de respuestas para evitar repetir bloques try/catch en los hijos que heredan esta clase
   * Echa al usuario de la aplicación en caso de que la sesión este expirada o no autorizada
   */
  async handleResponse(response) {
    if (!response.ok) {

      let errorMessage = 'Ocurrió un error en la petición';
      
      try {
        const data = await response.json();
        errorMessage = data.message || errorMessage;
      } catch {
        console.error("Ha ocurrido un error en la petición");
      }

      if (response.status === 401 && !response.url.includes('/auth/login')) {

        localStorage.removeItem('user');
        window.location.href = '/login';

        return;
      }

      return { success: false, message: errorMessage };
    }

    const data = await response.json();
    return { success: true, data };
  }
}

export default ApiClient;