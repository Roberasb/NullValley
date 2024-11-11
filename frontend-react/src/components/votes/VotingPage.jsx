import React from 'react';
import CandidateCard from './CandidateCard';
import VotingForm from './VotingForm';
import LoadingSpinner from '../layout/LoadingSpinner';
import Alert from '../layout/Alert';
import { useVoting } from '../../context/VotingContext';

const VotingPage = () => {
  const { candidates, totalVotes, resetVoting, loading, error, notification } = useVoting();

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-center">Votación Null Valley</h1>
      
      {notification && (
        <Alert message={notification.message} type={notification.type} />
      )}
      
      {error && (
        <Alert message={error} type="error" />
      )}

      {loading ? <LoadingSpinner /> : (
        <>
          <div className="grid md:grid-cols-2 gap-8">
            <CandidateCard candidate={candidates.david} id="david" />
            <CandidateCard candidate={candidates.jonathan} id="jonathan" />
          </div>

          {totalVotes < 10 && <VotingForm />}

          {totalVotes >= 10 && (
            <div className="text-center p-4 bg-green-100 rounded-lg">
              <h2 className="text-xl font-bold">¡Votación finalizada!</h2>
              <p>Ganador: {candidates.david.score > candidates.jonathan.score ? 'David Larousse' : 'Jonathan Lowrie'}</p>
              <button 
                onClick={resetVoting}
                className="mt-4 bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
              >
                Reiniciar Votación
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default VotingPage;