import { useEffect, useState } from 'react';
import './App.css';
import CharacterBoxes from './Box';
import Keyboard from './keyboard';
import Modal from './Modal';
const words = [
  "APPLE",
  "BANANA",
  "CHERRY",
  "DATE",
  "ELDERBERRY",
  "FIG",
  "GRAPE",
  "HONEYDEW",
  "ITALIAN",
  "JUJUBE",
  "KIWI",
  "LEMON",
  "MANGO",
  "NECTARINE",
  "ORANGE",
  "PAPAYA",
  "QUINCE",
  "RASPBERRY",
  "STRAWBERRY",
  "TANGERINE",
  "UGLI",
  "VANILLA",
  "WATERMELON",
  "XIGUA",
  "YUZU",
  "ZUCCHINI",
  "AVOCADO",
  "BLACKBERRY",
  "BLUEBERRY",
  "CANTALOUPE",
  "COCONUT",
  "CRANBERRY",
  "CLEMENTINE",
  "DRAGONFRUIT",
  "ELDERFLOWER",
  "GOOSEBERRY",
  "GRAPEFRUIT",
  "GUAVA",
  "JACKFRUIT",
  "KUMQUAT",
  "LIME",
  "LYCHEE",
  "MANDARIN",
  "MULBERRY",
  "OLIVE",
  "PASSIONFRUIT",
  "PEACH",
  "PEAR",
  "PINEAPPLE","PLUM"]
function App() {
  const randomIndex = Math.floor(Math.random() * words.length);
  const initialWord = words[randomIndex];
  const [word, setWord] = useState(initialWord);
  const [tries, setTries] = useState(0);
  const [modal, showModal] = useState(false);
  const [win, setWin] = useState(false);
  const [clickedLetter, setLetter] = useState('');
  const [wordArray, setWordArray] = useState([]);
  const [indexArray, setIndexArray] = useState([]);
  const [displayWord, setDisplayWord] = useState([]);
  const [reset, setReset] = useState(false);

  useEffect(() => {
    setWordArray(word.split(''));
    setDisplayWord(Array(word.length).fill('_'));
  }, [word]);


  useEffect(() => {
    if (tries >= 7) {
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
    setReset(true);
  };

  const getImageForTries = () => {
    switch (tries) {
      case 0:
        return '0.png';
      case 1:
        return '1.png';
      case 2:
        return '2.png';
      case 3:
        return '3.png';
      case 4:
        return '4.png';
      case 5:
        return '5.png';
      case 6:
        return '6.png';
      case 7:
        return '7.png';
      default:
        return '0.png';
    }
  };

  return (
    <div className="App">
      <img className="image" src={getImageForTries()} alt={`Tries: ${tries}`} />
      <CharacterBoxes characters={displayWord} />
      <Keyboard onLetterClick={handleLetterClick} reset={reset} />
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
