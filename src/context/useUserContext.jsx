import { createContext, useContext, useReducer } from 'react';
import ResearcherService from '../services/ResearcherService';
import SubscriptionService from '../services/SubscriptionService';
import { userReducer } from './userReducer';

/**
 * UserContext
 *
 * The UserContext represents a React Context that provides access to user-related data and actions.
 * It includes the user state and actions such as login, logout, adding subscriptions, removing subscriptions, and updating user information.
 */
const UserContext = createContext();

/**
 * UserProvider
 *
 * The UserProvider component is a Context Provider that wraps the application and provides access to the UserContext.
 * It manages the user state using the userReducer and provides actions for interacting with the user data.
 *
 * @param {Object} children - The child components that will have access to the UserContext.
 * @returns {JSX.Element} - The wrapped component with access to user data and actions.
 */
const UserProvider = ({ children }) => {
  const [userState, dispatch] = useReducer(userReducer, {});

  /**
   * Login Function
   *
   * Attempts to log in the user with the provided email and password.
   * If successful, sets the user state with the user data including their subscriptions.
   *
   * @param {string} email - The user's email.
   * @param {string} password - The user's password.
   * @returns {boolean} - Returns true if the login is successful, otherwise false.
   */
  const login = async (email, password) => {
    try {
      const researchers = await ResearcherService.getResearchers();
      const user = researchers.filter((r) => r.email === email)[0];
      if (user) {
        if (user.password === password) {
          const subsData = await SubscriptionService.getSubscriptions(
            user.researcherId
          ); 
          const userWithSubs = { ...user, subs: subsData };
          dispatch({ type: 'LOGIN', payload: userWithSubs });
          return true;
        }
      }
      return false;
    } catch (error) {
      console.error('Error logging in:', error);
    }
  };

  /**
   * Logout Function
   *
   * Logs out the user by clearing the user state.
   */
  const logout = () => {
    dispatch({ type: 'LOGOUT' });
  };

  /**
   * Add Subscription Function
   *
   * Adds a new subscription for the current user to follow a researcher with the specified ID.
   *
   * @param {string} researcherFollowedId - The ID of the researcher to follow.
   */
  const addSub = async (researcherFollowedId) => {
    try {
      const newSub = {
        researcherId: userState.researcherId,
        followedResearcherId: researcherFollowedId
      };
      const sub = await SubscriptionService.setSubscription(newSub); 
      dispatch({ type: 'ADD_SUB', payload: sub.value });
    } catch (error) {
      console.error('Error adding sub:', error);
    }
  };

  /**
   * Remove Subscription Function
   *
   * Removes a subscription for the current user to stop following a researcher with the specified subscription ID.
   *
   * @param {string} sub - The ID of the subscription to remove.
   */
  const removeSub = async (sub) => {
    try {
      await SubscriptionService.unSubscribe(sub); 
      dispatch({ type: 'REMOVE_SUB', payload: sub });
    } catch (error) {
      console.error('Error removing sub:', error);
    }
  };

  /**
   * Update Function
   *
   * Updates the user's name and password with the provided values.
   *
   * @param {string} name - The updated name for the user.
   * @param {string} password - The updated password for the user.
   */
  const update = async (name, password) => {
    try {
      const newResearcher = {
        name,
        password,
        email: userState.email
      };
      await ResearcherService.putResearcher(
        userState.researcherId,
        newResearcher
      ); 
      dispatch({ type: 'UPDATE', payload: { name, password } });
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  return (
    <UserContext.Provider
      value={{ user: userState, login, logout, addSub, removeSub, update }}
    >
      {children}
    </UserContext.Provider>
  );
};

/**
 * useUserContext Hook
 *
 * A custom hook that provides access to the UserContext data and actions.
 * Throws an error if used outside of a UserProvider.
 *
 * @returns {Object} - The user context with user data and actions.
 */
const useUserContext = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('context undefined');
  }
  return context;
};

export { UserProvider, useUserContext };
