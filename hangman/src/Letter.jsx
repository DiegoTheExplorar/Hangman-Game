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
