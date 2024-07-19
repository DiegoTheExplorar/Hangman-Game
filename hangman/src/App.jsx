import { useEffect, useState } from 'react'
import Keyboard from './keyboard'


function App() {
  const word = 'HELLO'
  const [tries,setTries] = useState(0)
  const [modal, ShowModal] = useState(false)
  const [win, setWin] = useState(false)
  const [clickedLetter, setLetter] = useState('')
  const [wordArray, setWordArray] = useState([])
  const [indexArray, setIndexArray] = useState([])
  useEffect(() => {
    setWordArray(word.split(''))
  }, [word])

  const handleLetterClick = (clickedLetter) => {
    setLetter(clickedLetter); 
    console.log(clickedLetter); 
    if(!wordArray.includes(clickedLetter)) {
      setTries(tries + 1)
    }
    else {
      checkLetter(clickedLetter)
    }

  };

  const checkLetter = (letter) => {
    for(let i = 0; i < wordArray.length; i++) {
      if(wordArray[i] === letter) {
        setIndexArray([...indexArray, i])
      }
    }
  }



  return (
    <Keyboard onLetterClick={handleLetterClick}/>
  )
}

export default App
