import React, { useEffect, useState } from "react";
function Letter({ letter, onClick,reset }) { 
    const [show, setShow] = useState(true);

    useEffect(() => {
        if (reset) {
            setShow(true);
        }
    }, [reset]);

    const handleClick = () => {
        setShow(false);
        if (onClick) {
            onClick(letter); 
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
