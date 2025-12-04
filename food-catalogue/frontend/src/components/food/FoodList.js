import React from 'react';
import FoodCard from './FoodCard';

// Bug: Incorrect mapping and no key prop
const FoodList = ({ foods }) => (
  <div className="food-list">
    {foods.map((food) => (
      <FoodCard food={foods} /> 
    ))}
  </div>
);

export default FoodList;
