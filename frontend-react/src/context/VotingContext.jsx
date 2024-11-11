import React, { createContext, useContext, useState, useEffect } from 'react';
import filterComment from '../utils/wordFilter';

const VotingContext = createContext();

/* esta sera la data inicial, la idea es obtenerla desde la bd despues */
const initialState = {
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
 },
 totalVotes: 0
};

export const VotingProvider = ({ children }) => {
 const [votingState, setVotingState] = useState(() => {
   const savedState = localStorage.getItem('votingState');
   return savedState ? JSON.parse(savedState) : initialState;
 });

 useEffect(() => {
   localStorage.setItem('votingState', JSON.stringify(votingState));
 }, [votingState]);

 const addVote = (nickname, comment, candidate, rating) => {
   if (votingState.totalVotes >= 10) return;

   const filteredComment = filterComment(comment);

   setVotingState(prev => ({
     ...prev,
     [candidate]: {
       ...prev[candidate],
       score: prev[candidate].score + rating,
       comments: [...prev[candidate].comments, { nickname, comment: filteredComment, rating }]
     },
     totalVotes: prev.totalVotes + 1
   }));
 };

 const resetVoting = () => {
   setVotingState(initialState);
 };

 const value = {
   candidates: votingState,
   totalVotes: votingState.totalVotes,
   addVote,
   resetVoting
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