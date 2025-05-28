import React, { useState } from 'react';

const Alert = ({ message, type }) => {
  if (!message) return null;

  return (
    <div style={{
      padding: '10px',
      margin: '10px 0',
      borderRadius: '5px',
      color: type === 'error' ? 'white' : 'black',
      backgroundColor: type === 'error' ? '#D32F2F' : '#81C784'
    }}>
      {message}
    </div>
  );
};

const App = () => {
  const [alert, setAlert] = useState({ message: '', type: '' });

  const showAlert = (message, type) => {
    setAlert({ message, type });
    setTimeout(() => setAlert({ message: '', type: '' }), 3000); // Auto-close after 3s
  };

  return (
    <div>
      <h1>React Alert Example</h1>
      <Alert message={alert.message} type={alert.type} />
      <button onClick={() => showAlert('This is a success alert!', 'success')}>Show Success Alert</button>
      <button onClick={() => showAlert('This is an error alert!', 'error')}>Show Error Alert</button>
    </div>
  );
};

export default App;
