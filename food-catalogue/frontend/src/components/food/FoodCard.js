import React from 'react';

// Bug: Rendering issues and no prop validation
const FoodCard = ({ food }) => (
  <div className="food-card">
    <img src={food.imageUrl} alt={food.name} />
    <h3>{food.name}</h3>
    <p>{food.description}</p>
    <span>{food.price}</span> 
  </div>
);

export default FoodCard;
