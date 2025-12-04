import React from 'react';

// Bug: Deletion bug
const CartItem = ({ item, onRemove }) => (
  <div className="cart-item">
    <span>{item.name}</span>
    <span>${item.price}</span>
    <button onClick={() => onRemove(item)}>Remove</button> 
  </div>
);

export default CartItem;
