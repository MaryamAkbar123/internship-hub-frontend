import React, { createContext, useContext, useState } from 'react';

const AlertContext = createContext();

export const useAlert = () =>{
    const context = useContext(AlertContext);
    if (!context) {
      throw new Error('AlertContext must be used within an AlertProvider');
    }
    return context;
}

export const AlertProvider = ({ children }) => {
  const [alert, setAlert] = useState({ message: '', type: '' });

  const showAlert = (message, type) => {
    setAlert({ message, type });
    setTimeout(() => setAlert({ message: '', type: '' }), 3000);
  };

  return (
    <AlertContext.Provider value={{ alert, showAlert }}>
      {children}
      {alert.message && (
        <div style={{
          position: 'fixed',
          bottom: '10px',
          right: '10px',
          padding: '10px',
          borderRadius: '5px',
          color: alert.type === 'error' ? 'white' : 'black',
          backgroundColor: alert.type === 'error' ? '#D32F2F' : '#81C784',
        }}>
          {alert.message}
        </div>
      )}
    </AlertContext.Provider>
  );
};
