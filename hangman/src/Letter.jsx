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
