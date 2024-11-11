// definicion palabras prohibidas
const prohibitedWords = [
    'Manzana',
    'coliflor',
    'bombilla',
    'derecha',
    'izquierda', 
    'rojo',
    'azul'
   ];
   
   //reemplazo cada caracter por * para mantener su longitud
   const ofuscateWord = (word) => '*'.repeat(word.length);
   
   const filterComment = (comment) => {
    let filteredComment = comment;
    prohibitedWords.forEach(word => {
      const regex = new RegExp(word, 'gi');
      filteredComment = filteredComment.replace(regex, ofuscateWord(word));
    });
    
    return filteredComment;
   };
   
   export default filterComment;