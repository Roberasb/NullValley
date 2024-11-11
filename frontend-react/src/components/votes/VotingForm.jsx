import React, { useState } from 'react';
import { useVoting } from '../../context/VotingContext';
import LoadingSpinner from '../layout/LoadingSpinner';

const VotingForm = () => {
  const { addVote, loading } = useVoting();
  const [formError, setFormError] = useState('');
  const [fieldErrors, setFieldErrors] = useState({
    nickname: '',
    comment: '',
    candidate: '',
    rating: ''
  });
  
  const [formData, setFormData] = useState({
    nickname: '',
    comment: '',
    candidate: '',
    rating: ''
  });

  const validateField = (name, value) => {
    switch (name) {
      case 'nickname':
        if (value.length < 6 || value.length > 8) {
          return 'El nickname debe tener entre 6 y 8 caracteres';
        }
        if (!/^[a-zA-Z0-9]+$/.test(value)) {
          return 'Solo se permiten caracteres alfanuméricos';
        }
        break;
      case 'comment':
        if (value.length === 0) {
          return 'El comentario es requerido';
        }
        if (value.length > 120) {
          return 'El comentario no debe exceder 120 caracteres';
        }
        break;
      case 'candidate':
        if (!value) {
          return 'Debes seleccionar un candidato';
        }
        break;
      case 'rating':
        if (!value) {
          return 'Debes seleccionar una valoración';
        }
        break;
      default:
        return '';
    }
    return '';
  };

  const handleFieldChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    const error = validateField(name, value);
    setFieldErrors(prev => ({
      ...prev,
      [name]: error
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validar todos los campos antes de enviar
    const errors = {};
    Object.keys(formData).forEach(key => {
      const error = validateField(key, formData[key]);
      if (error) errors[key] = error;
    });

    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      return;
    }

    try {
      setFormError('');
      await addVote(
        formData.nickname,
        formData.comment,
        formData.candidate,
        parseInt(formData.rating)
      );

      // Limpiar formulario
      setFormData({
        nickname: '',
        comment: '',
        candidate: '',
        rating: ''
      });
      setFieldErrors({
        nickname: '',
        comment: '',
        candidate: '',
        rating: ''
      });
    } catch (error) {
      setFormError(error.message || 'Error al enviar el voto');
    }
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
              name="nickname"
              className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 ${
                fieldErrors.nickname ? 'border-red-500' : ''
              }`}
              value={formData.nickname}
              onChange={handleFieldChange}
              required
            />
            {fieldErrors.nickname && (
              <p className="mt-1 text-sm text-red-600">{fieldErrors.nickname}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Comentario (máx. 120 caracteres)</label>
            <textarea
              name="comment"
              className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 ${
                fieldErrors.comment ? 'border-red-500' : ''
              }`}
              value={formData.comment}
              onChange={handleFieldChange}
              required
            />
            {fieldErrors.comment && (
              <p className="mt-1 text-sm text-red-600">{fieldErrors.comment}</p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Candidato</label>
              <select
                name="candidate"
                className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 ${
                  fieldErrors.candidate ? 'border-red-500' : ''
                }`}
                value={formData.candidate}
                onChange={handleFieldChange}
                required
              >
                <option value="">Seleccionar...</option>
                <option value="david">David Larousse</option>
                <option value="jonathan">Jonathan Lowrie</option>
              </select>
              {fieldErrors.candidate && (
                <p className="mt-1 text-sm text-red-600">{fieldErrors.candidate}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Valoración</label>
              <select
                name="rating"
                className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 ${
                  fieldErrors.rating ? 'border-red-500' : ''
                }`}
                value={formData.rating}
                onChange={handleFieldChange}
                required
              >
                <option value="">Seleccionar...</option>
                <option value="2">+2</option>
                <option value="-1">-1</option>
              </select>
              {fieldErrors.rating && (
                <p className="mt-1 text-sm text-red-600">{fieldErrors.rating}</p>
              )}
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:bg-blue-300"
          >
            Votar
          </button>
        </div>
      )}
    </form>
  );
};

export default VotingForm;