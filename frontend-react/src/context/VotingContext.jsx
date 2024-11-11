import React, { createContext, useContext, useState, useEffect } from 'react';
import filterComment from '../utils/wordFilter';
import VotingService from '../services/api';

const VotingContext = createContext();

const initialState = {
  david: {
    name: 'David Larousse',
    image: '/images/david.jpg',
    score: 0,
    comments: []
  },
  jonathan: {
    name: 'Jonathan Lowrie',
    image: '/images/jonathan.jpg',
    score: 0,
    comments: []
  },
  totalVotes: 0
};

export const VotingProvider = ({ children }) => {
  const [votingState, setVotingState] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    const loadVotes = async () => {
      try {
        setLoading(true);
        const data = await VotingService.getVotes();
        if (data) {
          setVotingState(data);
        }
      } catch (err) {
        setError('Error al cargar los votos');
        setNotification({ type: 'error', message: 'Error al cargar los votos' });
      } finally {
        setLoading(false);
      }
    };

    loadVotes();
  }, []);

  const addVote = async (nickname, comment, candidate, rating) => {
    if (votingState.totalVotes >= 10) return;

    try {
      setLoading(true);
      const filteredComment = filterComment(comment);
      
      await VotingService.submitVote({
        nickname,
        comment: filteredComment,
        candidate,
        rating
      });

      setVotingState(prev => ({
        ...prev,
        [candidate]: {
          ...prev[candidate],
          score: prev[candidate].score + rating,
          comments: [...prev[candidate].comments, { nickname, comment: filteredComment, rating }]
        },
        totalVotes: prev.totalVotes + 1
      }));

      setNotification({ type: 'success', message: 'Voto registrado exitosamente' });
    } catch (err) {
      setError('Error al registrar el voto');
      setNotification({ type: 'error', message: 'Error al registrar el voto' });
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const resetVoting = async () => {
    try {
      setLoading(true);
      await VotingService.resetVotes();
      setVotingState(initialState);
      setNotification({ type: 'success', message: 'Votación reiniciada exitosamente' });
    } catch (err) {
      setError('Error al resetear la votación');
      setNotification({ type: 'error', message: 'Error al resetear la votación' });
    } finally {
      setLoading(false);
    }
  };

  const value = {
    candidates: votingState,
    totalVotes: votingState.totalVotes,
    addVote,
    resetVoting,
    loading,
    error,
    notification,
    setNotification
  };

  return <VotingContext.Provider value={value}>{children}</VotingContext.Provider>;
};

export const useVoting = () => {
  const context = useContext(VotingContext);
  if (!context) {
    throw new Error('useVoting must be used within a VotingProvider');
  }
  return context;
};