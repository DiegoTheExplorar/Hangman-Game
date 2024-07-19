import React, { useState } from "react";

function Letter({ letter, onClick }) { // Changed onClicks to onClick
    const [show, setShow] = useState(true);

    const handleClick = () => {
        setShow(false);
        if (onClick) {
            onClick(letter); // Call onClick prop when button is clicked
        }
    };

    const buttonStyle = {
        width: '100px',
        height: '50px',
        fontSize: '30px',
        color: 'green'
    };

    return (
        <div>
            {show && (
                <button onClick={handleClick} style={buttonStyle}>
                    {letter}
                </button>
            )}
        </div>
    );
}

export default Letter;
