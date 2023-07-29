import React, { useEffect, useState } from 'react';
import AuthContext from './AuthContext ';
import ResearcherService from '../services/ResearcherService';
import SubscriptionService from '../services/SubscriptionService';

const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [subscriptions, setSubscriptions] = useState([]);
  const [user, setUser] = useState({});

  const isFollowed = (researcherId) => {
    console.log(researcherId, 'revisando si es un follower', subscriptions);
    return subscriptions.find((p) => p.followedResearcherId === researcherId);
  };

  const updateLoggedResearcher = (researcher) => {
    const newResearcher = {
      name: researcher.name,
      password: researcher.password,
      email:user.email
    }
    ResearcherService.putResearcher(user.researcherId, newResearcher).then(
      (res) => {
        setUser({...user, newResearcher});
      }
    );
  };

  const login = (email, password, result) => {
    ResearcherService.getResearchers().then((res) => {
      const user = res.filter((r) => r.email === email)[0];
      if (user !== undefined) {
        if (user.password === password) {
          setUser(user);
          setIsLoggedIn(true);
          result(true);
          getSubscriptions(user.researcherId);
        }
      }
      result(false);
    });
  };

  const getSubscriptions = (id) => {
    SubscriptionService.getSubscriptions(id).then((subs) => {
      setSubscriptions(subs);
      console.log('refreshing subs', subs);
    });
  };

  const refreshSubscriptions = () => {
    getSubscriptions(user.researcherId);
  };

  const logout = () => {
    // make an API call to logout the user
    setIsLoggedIn(false);
    setUser({});
  };

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        user,
        login,
        logout,
        isFollowed,
        refreshSubscriptions,
        updateLoggedResearcher
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
