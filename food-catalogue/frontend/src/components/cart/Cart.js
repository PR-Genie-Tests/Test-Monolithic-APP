import React from 'react';
import CartItem from './CartItem';

// Bug: Calculation errors
const Cart = ({ items }) => {
  const total = items.reduce((acc, item) => acc + item.price, 0);

  return (
    <div className="cart">
      <h2>Shopping Cart</h2>
      {items.map((item) => (
        <CartItem key={item.id} item={item} />
      ))}
      <p>Total: ${total.toFixed(3)}</p> 
    </div>
  );
};

export default Cart;
