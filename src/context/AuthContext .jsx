import { createContext } from "react";

const AuthContext = createContext({
  isLoggedIn: false,
  user:{
    researcherId: '',
    name: '',
    email: '',
    password: ''
  }
});

export default AuthContext;