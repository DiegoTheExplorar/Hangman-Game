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
