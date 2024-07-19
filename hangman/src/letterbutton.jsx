import React, { useEffect, useState } from "react";
function Letter({ letter, onClick,reset }) { 
    const [show, setShow] = useState(true);
    const [isHovered, setIsHovered] = useState(false);

    const handleMouseEnter = () => setIsHovered(true);
    const handleMouseLeave = () => setIsHovered(false);

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
        fontSize: '20px',
        fontWeight: 'bold',
        color: 'white',
        backgroundColor: 'green',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        transition: 'background-color 0.3s',
      };
      
      const buttonHoverStyle = {
        ...buttonStyle,
        backgroundColor: 'darkgreen',
      };
      

    return (
        <div>
            {show && (
                <button onClick={handleClick} style={isHovered ? buttonHoverStyle : buttonStyle}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}>
                    {letter}
                </button>
            )}
        </div>
    );
}

export default Letter;
