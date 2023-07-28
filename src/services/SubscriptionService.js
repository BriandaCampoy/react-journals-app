import { BASE_URL } from './config';

const service_enpoint = `${BASE_URL}/Subscription`;

export default {
  getFeed: async (researcherId) => {
    try {
      const response = await fetch(`${service_enpoint}/feed/${researcherId}`);
      const data = await response.json();
      return data;
    } catch (error) {}
  },
  getSubscriptors: async (researcherId) => {
    try {
      const response = await fetch(`${service_enpoint}/subscriptors/${researcherId}`)
      const data = await response.json();
      return data;
    } catch (error) {}
  },
  getSubscriptions: async (researcherId) => {
    try {
      const response = await fetch(`${service_enpoint}/subscriptions/${researcherId}`)
      const data = await response.json();
      return data;
    } catch (error) {}
  },
  setSubscription: async (subscription) => {
    try {
      const response = await fetch(`${service_enpoint}`,{
        method:'POST',
        headers:{
          'Content-Type': 'application/json'
        },
        body:JSON.stringify(subscription)
      })
      const data = await response.json();
      return data;
    } catch (error) {}
  },
  unSubscribe: async (subscriptionId, subscription) => {
    try {
      const response = await fetch(`${service_enpoint}/${subscriptionId}`, {
        method: 'DELETE'
      })
      const data = await response.json();
      return data;
    } catch (error) {}
  }
};
