// import React, { createContext, useContext, useState, useEffect } from "react";

// const AuthContext = createContext()

// export const useAuth = () =>{
//     const context = useContext(AuthContext);
//   if (!context) {
//     throw new Error('useAuth must be used within an AuthProvider');
//   }
//   return context;
// };

// export const AuthProvider = ( {children}) => {

//     const [ user, setUser] = useState(null);
//     const [token, setToken] =  useState(localStorage.getItem('token') || null);


//     const login  =  (token) => {
//         localStorage.setItem('token', token);
//         setToken(token);
//         fetchUser();
//     };

//     const logout = () =>{
//         localStorage.removeItem('token', 'name', 'email');
//         setToken(null);
//         setUser(null);
//     };

//     const fetchUser = async() =>{
//         if(!token) return;
//         try {
//             const response =  await fetch('http://localhost:5000/api/auth/me',{
//                 headers: { Authorizaztion: `Bearer ${token}` },
//             });
//             const data =  await response.json();
//             setUser(data);
//         } catch (error) {
//             logout();
//         }
//     };

//     useEffect( () =>{
//         if(token) fetchUser();
//     }, [token]);

//     return(
//         <AuthContext.Provider value={{ user, login, logout}}>
//             {children}
//         </AuthContext.Provider>
//     );
// };

import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token') || null);

  // Initialize BroadcastChannel for cross-tab communication
  const channel = new BroadcastChannel('auth_channel');

  const login = (token) => {
    localStorage.setItem('token', token);
    setToken(token);
    fetchUser();
  };

  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
    // Broadcast logout event to other tabs
    channel.postMessage({ type: 'LOGOUT' });
  };

  const fetchUser = async () => {
    if (!token) return;
    try {
      const response = await fetch('http://localhost:5000/api/auth/me', {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!response.ok) throw new Error('Invalid token');
      const data = await response.json();
      setUser(data);
    } catch (error) {
      logout();
    }
  };

  useEffect(() => {
    if (token) fetchUser();

    // Listen for storage changes (for fallback in case BroadcastChannel is unsupported)
    const handleStorageChange = (event) => {
      if (event.key === 'token' && !event.newValue) {
        setToken(null);
        setUser(null);
      }
    };

    // Listen for broadcast messages
    const handleBroadcast = (event) => {
      if (event.data.type === 'LOGOUT') {
        setToken(null);
        setUser(null);
        localStorage.removeItem('token');
      }
    };

    window.addEventListener('storage', handleStorageChange);
    channel.addEventListener('message', handleBroadcast);

    // Cleanup listeners on component unmount
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      channel.removeEventListener('message', handleBroadcast);
      channel.close();
    };
  }, [token]);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};