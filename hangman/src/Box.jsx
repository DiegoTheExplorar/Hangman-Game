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
