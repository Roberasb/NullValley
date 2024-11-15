import filterComment from '../utils/wordFilter';

// URL base dinámica según el puerto correcto
const API_URL = process.env.NODE_ENV === 'development' 
  ? 'http://localhost:8888/.netlify/functions'  // Puerto 8888 para Netlify Dev
  : '/.netlify/functions';                      // Para producción

const VotingService = {
  // Obtener todos los votos
  async getVotes() {
    try {
      //Comentario dejado ya que me es util para debuguear console.log('Consultando:', `${API_URL}/resultados`);  // Para debug
      const response = await fetch(`${API_URL}/resultados`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      //Comentario dejado ya que me es util para debuguear console.log('Datos recibidos:', data);  // Para debug
      return this.formatVotesData(data);
    } catch (error) {
      console.error('Error completo:', error);
      throw new Error('Error al obtener votos');
    }
  },

  // Registrar un voto
  async submitVote({ nickname, comment, candidate, rating }) {
    try {
      //Comentario dejado ya que me es util para debuguear console.log('Enviando voto a:', `${API_URL}/votar`);  // Para debug
      const response = await fetch(`${API_URL}/votar`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nickname,
          comentario: comment,
          valoracion: rating,
          candidato: candidate
        })
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error al votar:', error);
      throw new Error('Error al registrar voto');
    }
  },

  // Resetear votación
  async resetVotes() {
    try {
      // En Netlify la ruta será /.netlify/functions/reset
      const response = await fetch(`${API_URL}/reset`, {
        method: 'POST'
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error en resetVotes:', error);
      throw new Error('Error al resetear votación');
    }
  },

  // Función auxiliar para formatear datos
  formatVotesData(votesData) {

    // Para debug
    //Comentario dejado ya que me es util para debuguear console.log('Datos recibidos del backend:', votesData);

    const formattedData = {
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

    if (!Array.isArray(votesData)) {
      console.error('Datos no válidos del backend');
      return formattedData;
    }

    votesData.forEach(vote => {
      const candidateKey = vote.candidato === 'David Larousse' ? 'david' : 'jonathan';
      
      //Comentario dejado ya que me es util para debuguear console.log("hola1", candidateKey, vote.candidato );

      formattedData[candidateKey].score += Number(vote.valoracion);

      //Comentario dejado ya que me es util para debuguear console.log("hola2", vote.valoracion );

      formattedData[candidateKey].comments.push({
        nickname: vote.nickname,
        comment: filterComment(vote.comentario), // comentario ofuscado para mostrar
        originalComment: vote.comentario,        // comentario original para verificar
        rating: vote.valoracion
      });
      
      formattedData.totalVotes++;
    });

    return formattedData;
  }
};

export default VotingService;
