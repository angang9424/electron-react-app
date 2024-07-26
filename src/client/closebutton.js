// CloseButton.js

import React from 'react';
const { ipcRenderer } = require('electron');

const CloseButton = () => {
  const handleCloseApp = () => {
    ipcRenderer.send('close-app');
  };

  return (
    <button onClick={handleCloseApp}>
      Close App
    </button>
  );
};

export default CloseButton;
