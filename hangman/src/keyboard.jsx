import React from "react";
import './keyboard.css';
import Letter from "./letterbutton";

function Keyboard({ onLetterClick ,reset}) {
    const first_row = ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'];
    const second_row = ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'];
    const third_row = ['Z', 'X', 'C', 'V', 'B', 'N', 'M'];

    const renderRow = (row) => {
        return row.map(val => (
            <Letter key={val} letter={val} onClick={onLetterClick} reset={reset}/>
        ));
    };

    return (
        <div className="keyboard">
            <div className="row">{renderRow(first_row)}</div>
            <div className="row">{renderRow(second_row)}</div>
            <div className="row">{renderRow(third_row)}</div>
        </div>
    );
}

export default Keyboard;
