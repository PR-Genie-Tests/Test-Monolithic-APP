import React from 'react';

// Bug: Spinner that only shows 50% of the time
const Spinner = () => {
  const show = Math.random() > 0.5;
  return show ? <div className="spinner">Loading...</div> : null;
};

export default Spinner;
