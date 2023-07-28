import React, { useEffect, useState } from 'react';
import AuthContext from './AuthContext ';
import ResearcherService from '../services/ResearcherService';
import SubscriptionService from '../services/SubscriptionService';

const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [subscriptions, setSubscriptions] = useState([]);
  useEffect(()=>{
    getSubscriptions('2e52b78b-f524-40ac-9704-3bd1543939de')
  },[])
  const [user, setUser] = useState({
    researcherId: '2e52b78b-f524-40ac-9704-3bd1543939de',
    name: 'Brianda Campoy',
    email: 'rakka@gmail.com',
    password: '94511Cam'
  });

  const isFollowed = (researcherId) => {
    return subscriptions.find((p) => p.followedResearcherId === researcherId);
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
    });
  };

  const refreshSubscriptions = () => {
    getSubscriptions(user.researcherId)
  }

  const logout = () => {
    // make an API call to logout the user
    setIsLoggedIn(false);
    setUser({});
  };

  return (
    <AuthContext.Provider
      value={{ isLoggedIn, user, login, logout, isFollowed, refreshSubscriptions }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
