import React, { createContext, useContext, useState, useEffect } from 'react';
//import filterComment from '../utils/wordFilter';
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

 // Cargar votos al iniciar
 useEffect(() => {
   loadVotes();
 }, []);

 const loadVotes = async () => {
   try {
     setLoading(true);
     const data = await VotingService.getVotes();
     setVotingState(data);
   } catch (err) {
     setError('Error al cargar los votos');
     setNotification({ type: 'error', message: 'Error al cargar los votos' });
   } finally {
     setLoading(false);
   }
 };

 const addVote = async (nickname, comment, candidate, rating) => {
   try {
     setLoading(true);
     //Por error estaba guardando el comentario ofuscado con *** pero segun entiendo la idea es mostrarlo con ** no almacenarlo asi.
     //const filteredComment = filterComment(comment);
     
     await VotingService.submitVote({
       nickname,
       comment, //: filteredComment,
       candidate: candidate === 'david' ? 'David Larousse' : 'Jonathan Lowrie',
       rating
     });

     // Recargar los votos después de agregar uno nuevo
     await loadVotes();
     
     setNotification({ 
       type: 'success', 
       message: 'Voto registrado exitosamente' 
     });
   } catch (err) {
     setError('Error al registrar el voto');
     setNotification({ 
       type: 'error', 
       message: 'Error al registrar el voto' 
     });
     throw err;
   } finally {
     setLoading(false);
   }
 };

 const resetVoting = async () => {
   try {
     setLoading(true);
     await VotingService.resetVotes();
     await loadVotes();
     setNotification({ 
       type: 'success', 
       message: 'Votación reiniciada exitosamente' 
     });
   } catch (err) {
     setError('Error al resetear la votación');
     setNotification({ 
       type: 'error', 
       message: 'Error al resetear la votación' 
     });
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
