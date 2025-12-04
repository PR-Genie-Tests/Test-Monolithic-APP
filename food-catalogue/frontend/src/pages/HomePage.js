import React from 'react';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import FoodList from '../components/food/FoodList';
import Spinner from '../components/common/Spinner';

// Bug: Mess of buggy components
const HomePage = () => {
  const foods = [
    { id: 1, name: 'Pizza', description: 'A delicious pizza', price: 10, imageUrl: '/bug.png' },
    { id: 2, name: 'Burger', description: 'A juicy burger', price: 8, imageUrl: '/error.jpg' },
  ];

  return (
    <div>
      <Header />
      <main>
        <h1>Welcome to the Food Catalogue!</h1>
        <Spinner />
        <FoodList foods={foods} />
      </main>
      <Footer />
    </div>
  );
};

export default HomePage;
