# Combined JSX and CSS Files

## JSX Files

### src\App.jsx
```jsx
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

  const buttonStyle = {
    width: '100px',
    height: '50px',
    fontSize: '20px',
    fontWeight: 'bold',
    color: 'white',
    backgroundColor: disabled ? 'grey' : 'green',
    border: 'none',
    borderRadius: '5px',
    cursor: disabled ? 'not-allowed' : 'pointer',
    transition: 'background-color 0.3s',
  };

  return (
    <button 
      onClick={handleClick} 
      style={buttonStyle}
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
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)

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
  height: 100vh;
  text-align: center;
  background-color: #e9ecef; /* Light background color for better contrast */
  font-family: 'Arial', sans-serif; /* Add a clean, modern font */
}

.image {
  width: 200px; /* Set a consistent width for all images */
  height: 200px; /* Set a consistent height for all images */
  margin-bottom: 20px;
  object-fit: cover; /* Ensure images cover the assigned space without distortion */
  border-radius: 10px; /* Optional: add rounded corners for images */
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

```

### src\Box.css
```css
.character-container {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  justify-content: center;
  align-items: center;
  position: absolute;
  bottom: 190px;
  left: 50%;
  transform: translateX(-50%);
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

```

### src\index.css
```css
body {
    margin: 0;
    font-family: Arial, sans-serif;
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

.letter-button:disabled {
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

.modal-content h1 {
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
