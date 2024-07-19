import { useRef, useState } from 'react';
import './App.css';
import CharacterBoxes from './Box';
import Keyboard from './Keyboard';
import Modal from './Modal';

const words = [
  "APPLE", "BANANA", "CHERRY", "DATE", "ELDERBERRY", "FIG", "GRAPE", "HONEYDEW",
  "ITALIAN", "JUJUBE", "KIWI", "LEMON", "MANGO", "NECTARINE", "ORANGE", "PAPAYA",
  "QUINCE", "RASPBERRY", "STRAWBERRY", "TANGERINE", "UGLI", "VANILLA", "WATERMELON",
  "XIGUA", "YUZU", "ZUCCHINI", "AVOCADO", "BLACKBERRY", "BLUEBERRY", "CANTALOUPE",
  "COCONUT", "CRANBERRY", "CLEMENTINE", "DRAGONFRUIT", "ELDERFLOWER", "GOOSEBERRY",
  "GRAPEFRUIT", "GUAVA", "JACKFRUIT", "KUMQUAT", "LIME", "LYCHEE", "MANDARIN",
  "MULBERRY", "OLIVE", "PASSIONFRUIT", "PEACH", "PEAR", "PINEAPPLE", "PLUM"
];

function App() {
  const [word, setWord] = useState(words[Math.floor(Math.random() * words.length)]);
  const [tries, setTries] = useState(0);
  const [modal, showModal] = useState(false);
  const [win, setWin] = useState(false);
  const [wordArray, setWordArray] = useState(word.split(''));
  const [displayWord, setDisplayWord] = useState(Array(word.length).fill('_'));
  const keyboardRef = useRef(null);

  const handleLetterClick = (letter) => {
    if (!wordArray.includes(letter)) {
      setTries(prevTries => prevTries + 1);
      if (tries + 1 >= 7) {
        showModal(true);
      }
    } else {
      const updatedDisplayWord = [...displayWord];
      wordArray.forEach((char, index) => {
        if (char === letter) {
          updatedDisplayWord[index] = letter;
        }
      });
      setDisplayWord(updatedDisplayWord);
      if (!updatedDisplayWord.includes('_')) {
        setWin(true);
        showModal(true);
      }
    }
  };

  const restartGame = () => {
    const newWord = words[Math.floor(Math.random() * words.length)];
    setWord(newWord);
    setWordArray(newWord.split(''));
    setDisplayWord(Array(newWord.length).fill('_'));
    setTries(0);
    setWin(false);
    showModal(false);
    keyboardRef.current.resetKeyboard();
  };

  const getImageForTries = () => {
    return `${tries}.png`;
  };

  return (
    <div className="App">
      <img className="image" src={getImageForTries()} alt={`Tries: ${tries}`} />
      <CharacterBoxes characters={displayWord} />
      <Keyboard onLetterClick={handleLetterClick} ref={keyboardRef} />
      {modal && (
        <Modal>
          <div className="modal-content">
            {win ? 'Congratulations! You won!' : 'U freaking suck bruh!'}
            <button onClick={restartGame}>Restart</button>
          </div>
        </Modal>
      )}
    </div>
  );
}

export default App;
