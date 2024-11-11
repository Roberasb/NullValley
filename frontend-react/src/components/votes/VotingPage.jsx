import React from 'react';
import CandidateCard from './CandidateCard';
import VotingForm from './VotingForm';
import LoadingSpinner from '../layout/LoadingSpinner';
import Alert from '../layout/Alert';
import { useVoting } from '../../context/VotingContext';

const prohibitedWords = [
 'Manzana',
 'coliflor',
 'bombilla',
 'derecha',
 'izquierda', 
 'rojo',
 'azul'
];

const VotingPage = () => {
 const { candidates, totalVotes, resetVoting, loading, error, notification } = useVoting();

 const getAllComments = () => {
   return [
     ...candidates.david.comments.map(c => ({ ...c, candidato: 'David Larousse' })),
     ...candidates.jonathan.comments.map(c => ({ ...c, candidato: 'Jonathan Lowrie' }))
   ];
 };

 const hasProhibitedWord = (text) => {
   return prohibitedWords.some(word => {
     const regex = new RegExp(`\\b${word}\\b`, 'gi');
     return regex.test(text);
   });
 };

 const getCommentsLists = () => {
   const allComments = getAllComments();
   const withBadWords = allComments.filter(comment => 
     hasProhibitedWord(comment.originalComment)
   );
   const withoutBadWords = allComments.filter(comment => 
     !hasProhibitedWord(comment.originalComment)
   );
   
   return { withBadWords, withoutBadWords };
 };

 const getWinner = () => {
   const davidScore = candidates.david.score;
   const jonathanScore = candidates.jonathan.score;

   // Si ambos tienen puntaje negativo o cero, no hay ganador
   if (davidScore <= 0 && jonathanScore <= 0) {
     return null;
   }

   if (davidScore > jonathanScore && davidScore > 0) {
     return {
       ...candidates.david,
       id: 'david'
     };
   }

   if (jonathanScore > davidScore && jonathanScore > 0) {
     return {
       ...candidates.jonathan,
       id: 'jonathan'
     };
   }

   // Si llega aquí es empate
   return null;
 };

 return (
   <div className="space-y-8">
     <h1 className="text-3xl font-bold text-center">Votación Null Valley</h1>
     
     <div className="text-center">
       <div className="bg-blue-50 inline-block px-6 py-3 rounded-lg">
         <span className="font-semibold">Votos totales: </span>
         <span className="text-2xl font-bold text-blue-600">{totalVotes}/10</span>
         {totalVotes < 10 && (
           <p className="text-sm text-gray-600 mt-1">
             Faltan {10 - totalVotes} votos para determinar al ganador
           </p>
         )}
       </div>
     </div>

     {notification && <Alert message={notification.message} type={notification.type} />}
     {error && <Alert message={error} type="error" />}

     {loading ? <LoadingSpinner /> : (
       <>
         {totalVotes < 10 ? (
           <>
             <div className="grid md:grid-cols-2 gap-8">
               <CandidateCard candidate={candidates.david} id="david" />
               <CandidateCard candidate={candidates.jonathan} id="jonathan" />
             </div>
             <VotingForm />
           </>
         ) : (
           <div className="space-y-8">
             <div className="text-center p-6 bg-green-100 rounded-lg">
               <h2 className="text-2xl font-bold mb-4">¡Votación finalizada!</h2>
               {getWinner() ? (
                 <div className="max-w-md mx-auto">
                   <img 
                     src={getWinner().image} 
                     alt={getWinner().name}
                     className="w-48 h-48 mx-auto rounded-full object-cover mb-4 border-4 border-green-500"
                   />
                   <h3 className="text-xl font-bold text-green-800">
                     Ganador: {getWinner().name}
                   </h3>
                   <p className="text-lg font-semibold text-green-700 mt-2">
                     Puntuación final: {getWinner().score} puntos
                   </p>
                 </div>
               ) : (
                 <div className="text-xl text-gray-700">
                   No hay un ganador claro en esta votación.
                   <p className="mt-2 text-base">
                     (Se requiere puntaje positivo para ganar)
                   </p>
                 </div>
               )}
               <button 
                 onClick={resetVoting}
                 className="mt-6 bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-blue-700 transition-colors"
               >
                 Reiniciar Votación
               </button>
             </div>

             <div className="bg-white rounded-lg shadow-md p-6">
               <h3 className="text-xl font-bold mb-4 text-yellow-600">
                 Comentarios con palabras ofuscadas
               </h3>
               <div className="space-y-3">
                 {getCommentsLists().withBadWords.map((comment, index) => (
                   <div 
                     key={`bad-${index}`}
                     className={`p-3 rounded ${comment.rating > 0 ? 'bg-yellow-50' : 'bg-red-50'}`}
                   >
                     <div className="flex justify-between items-start">
                       <div>
                         <p className="font-semibold">{comment.nickname}</p>
                         <p className="text-gray-700 mt-1">{comment.comment}</p>
                       </div>
                       <span className={`px-2 py-1 rounded text-sm ${
                         comment.rating > 0 ? 'bg-green-200 text-green-800' : 'bg-red-200 text-red-800'
                       }`}>
                         {comment.rating > 0 ? '+2' : '-1'}
                       </span>
                     </div>
                     <p className="text-sm text-gray-500 mt-2">Votó por: {comment.candidato}</p>
                   </div>
                 ))}
                 {getCommentsLists().withBadWords.length === 0 && (
                   <p className="text-gray-500 text-center py-4">No hay comentarios con palabras ofuscadas</p>
                 )}
               </div>
             </div>

             <div className="bg-white rounded-lg shadow-md p-6">
               <h3 className="text-xl font-bold mb-4 text-green-600">
                 Comentarios sin palabras ofuscadas
               </h3>
               <div className="space-y-3">
                 {getCommentsLists().withoutBadWords.map((comment, index) => (
                   <div 
                     key={`good-${index}`}
                     className={`p-3 rounded ${comment.rating > 0 ? 'bg-green-50' : 'bg-red-50'}`}
                   >
                     <div className="flex justify-between items-start">
                       <div>
                         <p className="font-semibold">{comment.nickname}</p>
                         <p className="text-gray-700 mt-1">{comment.comment}</p>
                       </div>
                       <span className={`px-2 py-1 rounded text-sm ${
                         comment.rating > 0 ? 'bg-green-200 text-green-800' : 'bg-red-200 text-red-800'
                       }`}>
                         {comment.rating > 0 ? '+2' : '-1'}
                       </span>
                     </div>
                     <p className="text-sm text-gray-500 mt-2">Votó por: {comment.candidato}</p>
                   </div>
                 ))}
                 {getCommentsLists().withoutBadWords.length === 0 && (
                   <p className="text-gray-500 text-center py-4">No hay comentarios sin palabras ofuscadas</p>
                 )}
               </div>
             </div>
           </div>
         )}
       </>
     )}
   </div>
 );
};

export default VotingPage;
