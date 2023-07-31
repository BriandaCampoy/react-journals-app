
const service_endpoint= `${import.meta.env.VITE_API_URL}/Subscription`;


/**
 * SubscriptionService module to interact with the Subscription API service.
 */
export default {
  /**
   * Fetches the user's feed data from the API based on their researcherId.
   * @param {string} researcherId - The ID of the researcher whose feed to fetch.
   * @returns {Promise<Array<object>>} A Promise that resolves to an array of journal data in the user's feed if successful, otherwise throws an error.
   */
  getFeed: async (researcherId) => {
    try {
      const response = await fetch(`${service_endpoint}/feed/${researcherId}`);
      const data = await response.json();
      return data;
    } catch (error) {}
  },
  /**
   * Fetches the list of subscribers for a specific researcher from the API.
   * @param {string} researcherId - The ID of the researcher whose subscribers to fetch.
   * @returns {Promise<Array<object>>} A Promise that resolves to an array of researcher data representing subscribers if successful, otherwise throws an error.
   */
  getSubscriptors: async (researcherId) => {
    try {
      const response = await fetch(
        `${service_endpoint}/subscriptors/${researcherId}`
      );
      const data = await response.json();
      return data;
    } catch (error) {}
  },

  /**
   * Fetches the list of subscriptions for a specific researcher from the API.
   * @param {string} researcherId - The ID of the researcher whose subscriptions to fetch.
   * @returns {Promise<Array<object>>} A Promise that resolves to an array of researcher data representing subscriptions if successful, otherwise throws an error.
   */
  getSubscriptions: async (researcherId) => {
    try {
      const response = await fetch(
        `${service_endpoint}/subscriptions/${researcherId}`
      );
      const data = await response.json();
      return data;
    } catch (error) {}
  },

  /**
   * Creates a new subscription by sending subscription data to the API.
   * @param {object} subscription - The subscription object containing the researcherId and subscriberId.
   * @returns {Promise<object>} A Promise that resolves to the created subscription data if successful, otherwise throws an error.
   */
  setSubscription: async (subscription) => {
    try {
      const response = await fetch(`${service_endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(subscription)
      });
      const data = await response.json();
      return data;
    } catch (error) {}
  },

  /**
   * Unsubscribes from a researcher by sending the subscription ID to the API.
   * @param {string} subscriptionId - The ID of the subscription to delete (unsubscribe).
   * @returns {Promise<object>} A Promise that resolves to the deleted subscription data if successful, otherwise throws an error.
   */
  unSubscribe: async (subscriptionId) => {
    try {
      const response = await fetch(`${service_endpoint}/${subscriptionId}`, {
        method: 'DELETE'
      });
      const data = await response.json();
      return data;
    } catch (error) {}
  }
};
