import React, { useState } from 'react';
import { useVoting } from '../../context/VotingContext';
import LoadingSpinner from '../layout/LoadingSpinner';

const VotingForm = () => {
  const { addVote, loading } = useVoting();
  const [formError, setFormError] = useState('');
  const [formData, setFormData] = useState({
    nickname: '',
    comment: '',
    candidate: '',
    rating: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isValidForm()) return;

    try {
      setFormError('');
      await addVote(
        formData.nickname,
        formData.comment,
        formData.candidate,
        parseInt(formData.rating)
      );

      setFormData({
        nickname: '',
        comment: '',
        candidate: '',
        rating: ''
      });
    } catch (error) {
      setFormError(error.message || 'Error al enviar el voto');
    }
  };

  const isValidForm = () => {
    return (
      formData.nickname.length >= 6 &&
      formData.nickname.length <= 8 &&
      formData.comment.length > 0 &&
      formData.comment.length <= 120 &&
      formData.candidate &&
      formData.rating
    );
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6 max-w-2xl mx-auto">
      {formError && (
        <div className="mb-4 p-2 bg-red-100 text-red-600 rounded">
          {formError}
        </div>
      )}
      
      {loading ? <LoadingSpinner /> : (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Nickname (6-8 caracteres)</label>
            <input
              type="text"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              value={formData.nickname}
              onChange={(e) => setFormData({...formData, nickname: e.target.value})}
              minLength={6}
              maxLength={8}
              pattern="[a-zA-Z0-9]+"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Comentario (máx. 120 caracteres)</label>
            <textarea
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              value={formData.comment}
              onChange={(e) => setFormData({...formData, comment: e.target.value})}
              maxLength={120}
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Candidato</label>
              <select
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                value={formData.candidate}
                onChange={(e) => setFormData({...formData, candidate: e.target.value})}
                required
              >
                <option value="">Seleccionar...</option>
                <option value="david">David Larousse</option>
                <option value="jonathan">Jonathan Lowrie</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Valoración</label>
              <select
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                value={formData.rating}
                onChange={(e) => setFormData({...formData, rating: e.target.value})}
                required
              >
                <option value="">Seleccionar...</option>
                <option value="2">+2</option>
                <option value="-1">-1</option>
              </select>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            disabled={!isValidForm()}
          >
            Votar
          </button>
        </div>
      )}
    </form>
  );
};

export default VotingForm;
