class VotingService {
    // URL base para futuro backend
    static BASE_URL = 'http://localhost:5000/api';
   
    // Obtener todos los votos
    static async getVotes() {
      // Simulación con localStorage
      try {
        const data = localStorage.getItem('votingState');
        return data ? JSON.parse(data) : null;
      } catch (error) {
        throw new Error('Error al obtener votos');
      }
    }
   
    // Registrar un voto
    static async submitVote(voteData) {
      try {
        const { nickname, comment, candidate, rating } = voteData;
        
        // Validaciones básicas
        if (!nickname || !comment || !candidate || !rating) {
          throw new Error('Datos de voto incompletos');
        }
   
        // Cuando tengamos backend, aquí irá el POST
        return {
          success: true,
          message: 'Voto registrado exitosamente'
        };
      } catch (error) {
        throw new Error(error.message || 'Error al registrar voto');
      }
    }
   
    // Resetear votación
    static async resetVotes() {
      try {
        localStorage.removeItem('votingState');
        return {
          success: true,
          message: 'Votación reiniciada exitosamente'
        };
      } catch (error) {
        throw new Error('Error al resetear votación');
      }
    }
   }
   
   export default VotingService;