/**
 * User Reducer
 *
 * This reducer manages the state related to user data and handles various actions
 * to update the state based on the type of action received.
 *
 * @param {Object} state - The current state object representing user data.
 * @param {Object} action - The action object containing the type and payload for updating the state.
 * @returns {Object} - The new state object after applying the action.
 */
export const userReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      return {
        ...action.payload
      };
    case 'LOGOUT':
      return {};
    case 'ADD_SUB':
      return {
        ...state,
        subs: [...state.subs, action.payload]
      };
    case 'REMOVE_SUB':
      return {
        ...state,
        subs: state.subs.filter((sub) => sub.subscriptionId !== action.payload)
      };
    case 'UPDATE':
      return {
        ...state,
        name: action.payload.name,
        password: action.payload.password
      };
    case 'SET_SUBS':
      return {
        ...state,
        subs: action.payload
      };
    default:
      return state;
  }
};
