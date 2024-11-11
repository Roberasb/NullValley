//componente generico de notificacion
import React from 'react';

const Alert = ({ message, type = 'info' }) => {
  const bgColor = {
    success: 'bg-green-100 text-green-800',
    error: 'bg-red-100 text-red-800',
    info: 'bg-blue-100 text-blue-800'
  };

  return (
    <div className={`p-4 rounded-md ${bgColor[type]} mb-4`}>
      {message}
    </div>
  );
};

export default Alert;