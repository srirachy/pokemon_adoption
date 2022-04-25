import React from 'react';

const Button = ({ value, children, onClick, className }) => {
    return (
        <button type="button" onClick={onClick} value={value} className={className}>
            {children}
        </button>
    );
};

export default Button;