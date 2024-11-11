import filterComment from '../utils/wordFilter';

const API_URL = 'http://localhost:5000/api'; //esto debiese moverse al ENV, pero como no subire env lo dejo aca.

const VotingService = {
  // Obtener todos los votos
  async getVotes() {
    try {
      const response = await fetch(`${API_URL}/resultados`);
      const data = await response.json();
      return this.formatVotesData(data);
    } catch (error) {
      throw new Error('Error al obtener votos');
    }
  },

  // Registrar un voto
  async submitVote({ nickname, comment, candidate, rating }) {
    try {
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
      return await response.json();
    } catch (error) {
      throw new Error('Error al registrar voto');
    }
  },

  // Resetear votación
  async resetVotes() {
    try {
      const response = await fetch(`${API_URL}/reset`, {
        method: 'POST'
      });
      return await response.json();
    } catch (error) {
      throw new Error('Error al resetear votación');
    }
  },

  // Función auxiliar para formatear datos
  formatVotesData(votesData) {

    // Para debug
    console.log('Datos recibidos del backend:', votesData);

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
      
      //console.log("hola1", candidateKey, vote.candidato );

      formattedData[candidateKey].score += Number(vote.valoracion);

      //console.log("hola2", vote.valoracion );

      formattedData[candidateKey].comments.push({
        nickname: vote.nickname,
        comment: filterComment(vote.comentario), // Ahora aplico la ofuscación aca, al cargar
        rating: vote.valoracion
      });
      
      formattedData.totalVotes++;
    });

    return formattedData;
  }
};

export default VotingService;
