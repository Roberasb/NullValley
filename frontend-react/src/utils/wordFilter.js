// definicion palabras prohibidas
export const prohibitedWords = [
  'Manzana',
  'coliflor',
  'bombilla',
  'derecha',
  'izquierda', 
  'rojo',
  'azul'
];

const ofuscateWord = (word) => '*'.repeat(word.length);

const filterComment = (comment) => {
  let filteredComment = comment;
  prohibitedWords.forEach(word => {
    // fix: Usamos word boundary (\b) para matchear palabras completas
    const regex = new RegExp(`\\b${word}\\b`, 'gi');
    filteredComment = filteredComment.replace(regex, ofuscateWord(word));
  });
  
  return filteredComment;
};

export default filterComment;