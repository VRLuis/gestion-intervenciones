import ApiClient from "./ApiClient";

class IntervencionService extends ApiClient {
  constructor() {
    super('/intervention'); 
  }

  /**
   * Consigue todos las intervenciones que ha creado un tenant
   * @returns 
   */
  async getByTenant() {
    try {
      const response = await fetch(`${this.modelUrl}`, {
        method: 'GET',
        headers: this.getHeaders()
      });
      return await this.handleResponse(response);
    } catch {
      return { success: false, message: 'Error al conectar con el servidor para obtener intervenciones.' };
    }
  }

  /**
   * Consigue todos los tipos de intervenciones que existen
   * @returns 
   */
  async getTypes() {
    try {
      const response = await fetch(`${this.modelUrl}/types`, {
        method: 'GET',
        headers: this.getHeaders()
      });
      return await this.handleResponse(response);
    } catch {
      return { success: false, message: 'Error al cargar los tipos de intervenciones.' };
    }
  }

  async create(data) {
    try {
      const response = await fetch(`${this.modelUrl}`, {
        method: 'POST',
        headers: this.getHeaders(),
        body: JSON.stringify(data)
      });
      return await this.handleResponse(response);
    } catch {
      return { success: false, message: 'Error de conexión al guardar la intervención.' };
    }
  }
}

export const interventionService = new IntervencionService();