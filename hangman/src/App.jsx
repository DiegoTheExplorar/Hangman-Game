import { useEffect, useRef, useState } from 'react';
import './App.css';
import CharacterBoxes from './Box';
import Keyboard from './Keyboard';
import Modal from './Modal';

function App() {
  const [word, setWord] = useState('');
  const [tries, setTries] = useState(0);
  const [modal, showModal] = useState(false);
  const [win, setWin] = useState(false);
  const [wordArray, setWordArray] = useState([]);
  const [displayWord, setDisplayWord] = useState([]);
  const [score, setScore] = useState(0);
  const [hintUsed, setHintUsed] = useState(false);
  const [timer, setTimer] = useState(60); // 60 seconds timer
  const keyboardRef = useRef(null);

  useEffect(() => {
    fetchRandomWord();
  }, []);

  const fetchRandomWord = () => {
    const apiUrl = 'https://random-word-api.herokuapp.com/word?number=1';
    fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
        const newWord = data[0].toUpperCase(); // Ensure the word is in uppercase
        setWord(newWord);
        setWordArray(newWord.split(''));
        setDisplayWord(Array(newWord.length).fill('_'));
        setTries(0);
        setWin(false);
        showModal(false);
        setHintUsed(false);
        setTimer(60); // Reset timer
        if (keyboardRef.current) {
          keyboardRef.current.resetKeyboard();
        }
      })
      .catch(error => {
        console.error('Failed to fetch word:', error);
        alert('Failed to fetch new word. Please check your internet connection and try again.');
      });
  };

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
      setTries(tries => tries + 1);
      if (tries + 1 >= 7) {
        showModal(true);
      }
    } else {
      const updatedDisplayWord = displayWord.map((char, idx) => wordArray[idx] === letter ? letter : char);
      setDisplayWord(updatedDisplayWord);
      if (!updatedDisplayWord.includes('_')) {
        setWin(true);
        setScore(score => score + 10); // Add 10 points for a win
        showModal(true);
      }
    }
  };

  const restartGame = () => {
    fetchRandomWord(); // Fetch a new word to restart the game
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
      <div className="image-container">
        <img className="image" src={getImageForTries()} alt={`Tries: ${tries}`} />
        <button className="hint-button" onClick={restartGame} disabled={hintUsed}>
          New Word
        </button>
      </div>
      <CharacterBoxes characters={displayWord} />
      <Keyboard onLetterClick={handleLetterClick} ref={keyboardRef} />
      {modal && (
        <Modal>
          <div className="modal-content">
            <h2>{win ? 'Congratulations! You won!' : 'You Lost bruh! You Suck! Try Again!'}</h2>
            <button onClick={restartGame}>Restart</button>
          </div>
        </Modal>
      )}
    </div>
  );
}

export default App;
