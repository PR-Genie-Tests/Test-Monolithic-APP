import React from 'react';

// Bug: Inline styles that are hard to override and inconsistent
const Button = ({ children, onClick }) => (
  <button
    onClick={onClick}
    style={{
      backgroundColor: 'blue', // Bug: Not using theme colors
      color: 'white',
      padding: '10px 20px',
      border: 'none',
      borderRadius: '5px',
      cursor: 'pointer',
    }}
  >
    {children}
  </button>
);

export default Button;
