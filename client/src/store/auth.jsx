import { createContext, useContext, useEffect, useState } from "react";

// AuthContext is a context object that will store and provide authentication data
//  to any component that needs it.

export const AuthContext = createContext();

// AuthProvider is a special component that will "wrap" other components
//  and provide them with access to the AuthContext.

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState("");
  const [user, setUser] = useState("");
  let isLoggedIn = !!token;
  //function to store the token in local storage
  const storeTokenLocally = (serverToken) => {
    setToken(serverToken);
    return localStorage.setItem("token", serverToken);
  };
  //function for logout
  const logoutUser = () => {
    setToken("");
    return localStorage.removeItem("token");
  };

  //function for check user Authentication
  const userAuthentication = async () => {
    try {
      const response = await fetch("https://fleco.onrender.com/api/auth/user", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        const finalResponse = await response.json();
        setUser(finalResponse.userData);
      } else {
        console.log("Error fetching user data ");
      }
    } catch (error) {
      console.log(error);
    }
  };
  // Effect to set token from localStorage on initial render
  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    if (savedToken) {
      setToken(savedToken);
    }
  }, []); // This runs once when the component mounts

  // Effect to authenticate user whenever the token changes
  useEffect(() => {
    if (token) {
      userAuthentication(); // Call only if token is not empty
    }
  }, [token]); // This runs whenever the token changes

  return (
    <AuthContext.Provider
      value={{ storeTokenLocally, logoutUser, isLoggedIn, user, token }}
    >
      {children}
    </AuthContext.Provider>
  );
};
//custom hook
export const useAuth = () => {
  const authContextValue = useContext(AuthContext);
  //   console.log(authContextValue);
  if (!authContextValue) {
    throw new Error("useAuth used outside of the provider ");
  }
  return authContextValue;
};
