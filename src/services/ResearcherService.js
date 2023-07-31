
const service_endpoint= `${import.meta.env.VITE_API_URL}/Researcher`;

/**
 * ResearcherService module to interact with the Researcher API service.
 */
export default {
  /**
   * Fetches a list of all researchers from the API.
   * @returns {Promise<Array<object>>} A Promise that resolves to an array of researcher data if successful, otherwise throws an error.
   */
  getResearchers: async () => {
    try {
      const response = await fetch(service_endpoint);
      const data = await response.json();
      return data;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Fetches a specific researcher by their ID from the API.
   * @param {string} id - The ID of the researcher to fetch.
   * @returns {Promise<object>} A Promise that resolves to the researcher data if successful, otherwise throws an error.
   */
  getResearcherById: async (id) => {
    try {
      const response = await fetch(`${service_endpoint}/${id}`);
      const data = await response.json();
      return data;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Creates a new researcher account by sending researcher data to the API.
   * @param {object} researcher - The researcher object containing name, email, and password.
   * @returns {Promise<number>} A Promise that resolves to the HTTP status code if successful, otherwise throws an error.
   */
  postResearcher: async (researcher) => {
    try {
      const response = await fetch(service_endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(researcher)
      });
      const data = await response.status;
      return data;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Updates an existing researcher's information in the API.
   * @param {string} id - The ID of the researcher to update.
   * @param {object} researcher - The updated researcher object containing new name, email, and/or password.
   * @returns {Promise<object>} A Promise that resolves to the updated researcher data if successful, otherwise throws an error.
   */
  putResearcher: async (id, researcher) => {
    try {
      const response = await fetch(`${service_endpoint}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(researcher)
      });
      const data = await response.json();
      return data;
    } catch (error) {
      throw error;
    }
  }
};
