import React from 'react';
import MainLayout from './components/layout/MainLayout';
import VotingPage from './components/votes/VotingPage';

function App() {
  return (
    <MainLayout>
      <VotingPage />
    </MainLayout>
  );
}

export default App;