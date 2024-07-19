import { useEffect, useState } from 'react';
import CharacterBoxes from './Box';
import Keyboard from './keyboard';
import Modal from './Modal';

function App() {
  const initialWord = 'HELLO';
  const [word, setWord] = useState(initialWord);
  const [tries, setTries] = useState(0);
  const [modal, showModal] = useState(false);
  const [win, setWin] = useState(false);
  const [clickedLetter, setLetter] = useState('');
  const [wordArray, setWordArray] = useState([]);
  const [indexArray, setIndexArray] = useState([]);
  const [displayWord, setDisplayWord] = useState([]);

  useEffect(() => {
    setWordArray(word.split(''));
    setDisplayWord(Array(word.length).fill('_'));
  }, [word]);

  useEffect(() => {
    if (tries >= 6) {
      showModal(true);
    }
  }, [tries]);

  useEffect(() => {
    if (win) {
      showModal(true);
    }
  }, [win]);

  const handleLetterClick = (letter) => {
    setLetter(letter); 
    console.log(letter); 

    if (!wordArray.includes(letter)) {
      setTries((prevTries) => prevTries + 1);
    } else {
      checkLetter(letter);
    }
  };

  const checkLetter = (letter) => {
    setIndexArray((prevIndexArray) => {
      const newIndexes = [];
      wordArray.forEach((char, index) => {
        if (char === letter && !prevIndexArray.includes(index)) {
          newIndexes.push(index);
        }
      });

      const updatedIndexArray = [...prevIndexArray, ...newIndexes];

      setDisplayWord((prevDisplayWord) => {
        const newDisplayWord = [...prevDisplayWord];
        newIndexes.forEach((index) => {
          newDisplayWord[index] = letter;
        });
        return newDisplayWord;
      });
      if (updatedIndexArray.length === wordArray.length) {
        setWin(true);
      }

      return updatedIndexArray;
    });
  };

  const restartGame = () => {
    setTries(0);
    setWin(false);
    setLetter('');
    setIndexArray([]);
    setWord(initialWord);
    showModal(false);
    setDisplayWord(Array(initialWord.length).fill('_'));
  };

  return (
    <div>
      <CharacterBoxes characters={displayWord} />
      <Keyboard onLetterClick={handleLetterClick} />
      {modal && (
        <Modal>
          <div>
            {win ? 'Congratulations! You won!' : 'U freaking suck bruh!'}
            <button onClick={restartGame}>Restart</button>
          </div>
        </Modal>
      )}
    </div>
  );
}

export default App;
