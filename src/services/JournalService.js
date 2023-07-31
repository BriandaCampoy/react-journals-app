
const service_endpoint= `${import.meta.env.VITE_API_URL}/Journal`;

/**
 * JournalService module to interact with the Journal API service.
 */

export default {
  /**
   * Fetches a specific journal entry by its ID from the API.
   * @param {string} journalId - The ID of the journal entry to fetch.
   * @returns {Promise<object>} A Promise that resolves to the journal data if successful, otherwise null.
   */
  getJournalById: async (journalId) => {
    try {
      const response = await fetch(`${service_endpoint}/${journalId}`);
      const data = response.json();
      return data;
    } catch (error) {}
  },

  /**
   * Fetches all journal entries authored by a specific researcher from the API.
   * @param {string} researcherId - The ID of the researcher whose journals to fetch.
   * @returns {Promise<Array<object>>} A Promise that resolves to an array of journal data if successful, otherwise an empty array.
   */
  getJournalByResearcher: async (researcherId) => {
    try {
      const response = await fetch(
        `${service_endpoint}/researcher/${researcherId}`
      );
      const data = await response.json();
      return data;
    } catch (error) {}
  },

  /**
   * Uploads a new journal entry to the API.
   * @param {object} journal - The journal object containing researcherId and title.
   * @param {File} journalFile - The file associated with the journal entry.
   * @returns {Promise<object>} A Promise that resolves to the uploaded journal data if successful, otherwise null.
   */
  uploadJournal: async (journal, journalFile) => {
    try {
      const formData = new FormData();
      formData.append('ResearcherId', journal.researcherId);
      formData.append('Title', journal.title);
      formData.append('journalFile', journalFile);

      const response = await fetch(service_endpoint, {
        method: 'POST',
        body: formData
      });
      const data = await response.json();
      return data;
    } catch (error) {}
  },

  /**
   * Updates an existing journal entry in the API.
   * @param {object} journal - The updated journal object containing the journalId and title.
   * @param {File} journalFile - The optional updated file associated with the journal entry.
   * @returns {Promise<object>} A Promise that resolves to the updated journal data if successful, otherwise null.
   */
  updateJournal: async (journal, journalFile) => {
    try {
      const formData = new FormData();
      formData.append('title', journal.title);
      if (journalFile != undefined) {
        formData.append('journalFile', journalFile);
      }
      const response = await fetch(`${service_endpoint}/${journal.journalId}`, {
        method: 'PUT',
        body: formData
      });
      const data = await response.json();
      return data;
    } catch (error) {}
  },

  /**
   * Deletes a specific journal entry from the API.
   * @param {string} journalId - The ID of the journal entry to delete.
   * @returns {Promise<object>} A Promise that resolves to the deleted journal data if successful, otherwise null.
   */
  deleteJournal: async (journalId) => {
    try {
      const response = await fetch(`${service_endpoint}/${journalId}`, {
        method: 'DELETE'
      });
      const data = await response.json();
      return data;
    } catch (error) {}
  }
};
