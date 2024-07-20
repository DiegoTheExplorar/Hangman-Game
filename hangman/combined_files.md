# Combined JSX and CSS Files

## JSX Files

### src\App.jsx
```jsx
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

```

### src\Box.jsx
```jsx
import React from 'react';
import './Box.css';

const CharacterBoxes = ({ characters }) => {
  return (
    <div className="character-container">
      {characters.map((char, index) => (
        <div key={index} className="character-box">
          {char}
        </div>
      ))}
    </div>
  );
};

export default CharacterBoxes;

```

### src\Keyboard.jsx
```jsx
import React, { forwardRef, useImperativeHandle, useState } from "react";
import './Keyboard.css';
import Letter from "./Letter";

const Keyboard = forwardRef(({ onLetterClick }, ref) => {
  const [usedLetters, setUsedLetters] = useState([]);

  useImperativeHandle(ref, () => ({
    resetKeyboard() {
      setUsedLetters([]);
    }
  }));

  const handleLetterClick = (letter) => {
    if (!usedLetters.includes(letter)) {
      setUsedLetters([...usedLetters, letter]);
      onLetterClick(letter);
    }
  };

  const firstRow = ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'];
  const secondRow = ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'];
  const thirdRow = ['Z', 'X', 'C', 'V', 'B', 'N', 'M'];

  const renderRow = (row) => {
    return row.map(val => (
      <Letter key={val} letter={val} onClick={handleLetterClick} disabled={usedLetters.includes(val)} />
    ));
  };

  return (
    <div className="keyboard">
      <div className="row">{renderRow(firstRow)}</div>
      <div className="row">{renderRow(secondRow)}</div>
      <div className="row">{renderRow(thirdRow)}</div>
    </div>
  );
});

export default Keyboard;

```

### src\Letter.jsx
```jsx
import React from "react";

function Letter({ letter, onClick, disabled }) {
  const handleClick = () => {
    if (!disabled) {
      onClick(letter);
    }
  };

  return (
    <button 
      className={`letter-button ${disabled ? 'disabled' : ''}`} 
      onClick={handleClick} 
      disabled={disabled}
    >
      {letter}
    </button>
  );
}

export default Letter;

```

### src\main.jsx
```jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);

```

### src\Modal.jsx
```jsx
import React from 'react';
import './Modal.css';

const Modal = ({ children }) => {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        {children}
      </div>
    </div>
  );
};

export default Modal;

```

## CSS Files

### src\App.css
```css
.App {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  text-align: center;
  background-color: #f7f9fc; /* Light background color for better contrast */
  font-family: 'Arial', sans-serif; /* Add a clean, modern font */
  color: #333; /* Dark color for text */
  padding: 20px; /* Add padding to the sides */
}

h1 {
  font-size: 2rem;
  margin-bottom: 20px;
}

.image {
  width: 250px; /* Increase the width */
  height: 250px; /* Increase the height */
  margin-bottom: 20px;
  object-fit: cover; /* Ensure images cover the assigned space without distortion */
  border-radius: 10px; /* Optional: add rounded corners for images */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* Add a subtle shadow */
}

.score-timer {
  display: flex;
  justify-content: space-between;
  width: 100%;
  max-width: 400px;
  margin-bottom: 20px;
}

.hint-button {
  margin-top: 20px;
  padding: 10px 20px;
  font-size: 1rem;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.hint-button:hover {
  background-color: #0056b3;
}

.modal-content {
  text-align: center;
  max-width: 80%; /* Limit the width of the modal content */
  margin: 0 auto; /* Center the modal content horizontally */
  padding: 20px; /* Add padding for better spacing */
  border-radius: 10px; /* Rounded corners for modal */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* Optional shadow for modal */
  background-color: white; /* Ensure modal background is white */
}

.modal-content h2 {
  margin-bottom: 20px;
  font-size: 1.5rem;
  color: #333;
}

.modal-content button {
  padding: 10px 20px;
  font-size: 1rem;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.modal-content button:hover {
  background-color: #0056b3;
}

/* Responsive styles */
@media (max-width: 768px) {
  .App {
    padding: 10px;
  }

  .image {
    width: 200px; /* Adjust width for mobile */
    height: 200px; /* Adjust height for mobile */
  }

  .score-timer {
    flex-direction: column;
    align-items: center;
  }

  .hint-button {
    width: 100%;
    max-width: 200px;
  }
}

```

### src\Box.css
```css
.character-container {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
}

.character-box {
  width: 40px;
  height: 40px;
  border: 2px solid #333;
  text-align: center;
  line-height: 40px;
  font-size: 24px;
  font-weight: bold;
  background-color: #f0f0f0;
  color: #333;
  border-radius: 5px;
  transition: background-color 0.3s, color 0.3s;
}

.character-box.correct {
  background-color: #4caf50;
  color: white;
}

.character-box.wrong {
  background-color: #f44336;
  color: white;
}

/* Responsive styles */
@media (max-width: 768px) {
  .character-box {
    width: 30px;
    height: 30px;
    font-size: 18px;
    line-height: 30px;
  }
}

```

### src\index.css
```css
body {
  margin: 0;
  font-family: Arial, sans-serif;
  background-color: #f7f9fc; /* Match the background of the app */
  color: #333; /* Dark color for text */
}

#root {
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

```

### src\Keyboard.css
```css
.keyboard {
  display: flex;
  flex-direction: column;
  align-items: center;
  position: absolute;
  bottom: 10px;
  left: 50%;
  transform: translateX(-50%);
}

.row {
  display: flex;
  justify-content: center;
  margin-bottom: 5px;
}

.letter-button {
  margin: 2px;
  padding: 10px 15px;
  font-size: 18px;
  background-color: #2196f3;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.letter-button:hover {
  background-color: #1976d2;
}

.letter-button.disabled {
  background-color: #d3d3d3;
  cursor: not-allowed;
}

```

### src\Modal.css
```css
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal-content {
  background: white;
  padding: 30px;
  border-radius: 10px;
  text-align: center;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
  max-width: 90%;
  width: 400px;
}

.modal-content h2 {
  margin-bottom: 20px;
  font-size: 24px;
  color: #333;
}

.modal-content button {
  padding: 10px 20px;
  font-size: 16px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.modal-content button:hover {
  background-color: #388e3c;
}

```
