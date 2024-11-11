import React, { useState } from 'react';
import CandidateCard from './CandidateCard';
import VotingForm from './VotingForm';

/* esta sera la data inicial, la idea es obtenerla desde la bd despues */
const initialCandidates = {
  david: {
    name: 'David Larousse',
    image: '/david.jpg',
    score: 0,
    comments: []
  },
  jonathan: {
    name: 'Jonathan Lowrie',
    image: '/jonathan.jpg',
    score: 0,
    comments: []
  }
};

const VotingPage = () => {
  const [candidates, setCandidates] = useState(initialCandidates);
  const [totalVotes, setTotalVotes] = useState(0);

  const handleVote = (nickname, comment, selectedCandidate, rating) => {
    if (totalVotes >= 10) return;

    setCandidates(prev => ({
      ...prev,
      [selectedCandidate]: {
        ...prev[selectedCandidate],
        score: prev[selectedCandidate].score + rating,
        comments: [...prev[selectedCandidate].comments, { nickname, comment, rating }]
      }
    }));
    setTotalVotes(prev => prev + 1);
  };

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-center">Votación Null Valley</h1>
      
      <div className="grid md:grid-cols-2 gap-8">
        <CandidateCard candidate={candidates.david} />
        <CandidateCard candidate={candidates.jonathan} />
      </div>

      {totalVotes < 10 && (
        <VotingForm onVote={handleVote} />
      )}

      {totalVotes >= 10 && (
        <div className="text-center p-4 bg-green-100 rounded-lg">
          <h2 className="text-xl font-bold">¡Votación finalizada!</h2>
          <p>Ganador: {candidates.david.score > candidates.jonathan.score ? 'David Larousse' : 'Jonathan Lowrie'}</p>
        </div>
      )}
    </div>
  );
};

export default VotingPage;