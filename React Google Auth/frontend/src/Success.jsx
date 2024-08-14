import React from 'react';
import { useLocation } from 'react-router-dom';

function Success() {
  const location = useLocation();
  const { name } = location.state || { name: 'User [Login successfully to display username]' }; 

  return (
    <div>
      <h1>Success!</h1>
      <p>Welcome, {name}!</p>
    </div>
  );
}

export default Success;
