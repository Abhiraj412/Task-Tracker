import React from 'react';

const Button = ({ onClick, text }) => {
  return (
    <button className='buttons' onClick={onClick}>
      {text}
    </button>
  );
}

export default Button;
