import { useEffect, useRef, useState } from 'react';
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
  const [score, setScore] = useState(0);
  const [hintUsed, setHintUsed] = useState(false);
  const [timer, setTimer] = useState(60); // 60 seconds timer
  const keyboardRef = useRef(null);

  useEffect(() => {
    if (timer > 0 && !modal) {
      const interval = setInterval(() => {
        setTimer(timer - 1);
      }, 1000);
      return () => clearInterval(interval);
    } else if (timer === 0) {
      showModal(true);
    }
  }, [timer, modal]);

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
        setScore(prevScore => prevScore + 10); // Add 10 points for a win
        showModal(true);
      }
    }
  };

  const handleHintClick = () => {
    if (!hintUsed) {
      const remainingLetters = wordArray.filter((letter, index) => displayWord[index] === '_');
      if (remainingLetters.length > 0) {
        const hintLetter = remainingLetters[Math.floor(Math.random() * remainingLetters.length)];
        handleLetterClick(hintLetter);
        setHintUsed(true);
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
    setHintUsed(false);
    setTimer(60); // Reset timer
    keyboardRef.current.resetKeyboard();
  };

  const getImageForTries = () => {
    return `/${tries}.webp`;
  };

  return (
    <div className="App">
      <h1>Guess the Word!</h1>
      <div className="score-timer">
        <div>Score: {score}</div>
        <div>Time Left: {timer}s</div>
      </div>
      <img className="image" src={getImageForTries()} alt={`Tries: ${tries}`} />
      <CharacterBoxes characters={displayWord} />
      <Keyboard onLetterClick={handleLetterClick} ref={keyboardRef} />
      <button className="hint-button" onClick={handleHintClick} disabled={hintUsed}>Hint</button>
      {modal && (
        <Modal>
          <div className="modal-content">
            <h2>{win ? 'Congratulations! You won!' : 'You Lost! Try Again!'}</h2>
            <button onClick={restartGame}>Restart</button>
          </div>
        </Modal>
      )}
    </div>
  );
}

export default App;
