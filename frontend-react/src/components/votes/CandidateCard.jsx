import React from 'react';

const CandidateCard = ({ candidate, id }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <div className="text-center">
        <img 
          src={candidate.image} 
          alt={candidate.name}
          className="w-32 h-32 mx-auto rounded-full object-cover mb-4"
        />
        <h2 className="text-xl font-bold">{candidate.name}</h2>
        <p className="text-2xl font-bold text-blue-600 mt-2">
          Puntaje: {candidate.score}
        </p>
      </div>

      <div className="mt-6">
        <h3 className="font-bold mb-2">Comentarios:</h3>
        <div className="space-y-2 max-h-60 overflow-y-auto">
          {candidate.comments.map((comment, index) => (
            <div 
              key={`${id}-${index}`} 
              className={`p-2 rounded ${comment.rating > 0 ? 'bg-green-50' : 'bg-red-50'}`}
            >
              <p className="font-semibold">{comment.nickname}</p>
              <p className="text-gray-600">{comment.comment}</p>
              <span className={`text-sm ${comment.rating > 0 ? 'text-green-600' : 'text-red-600'}`}>
                {comment.rating > 0 ? '+2' : '-1'}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CandidateCard;