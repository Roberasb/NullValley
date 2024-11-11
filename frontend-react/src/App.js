import React from 'react';
import MainLayout from './components/layout/MainLayout';
import VotingPage from './components/votes/VotingPage';
import { VotingProvider } from './context/VotingContext';

function App() {
  return (
    <VotingProvider>
      <MainLayout>
        <VotingPage />
      </MainLayout>
    </VotingProvider>
  );
}

export default App;