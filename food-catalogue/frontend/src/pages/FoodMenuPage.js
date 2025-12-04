import React, { useState, useEffect } from 'react';
import { getFoods } from '../api/foodApi';
import FoodList from '../components/food/FoodList';
import Spinner from '../components/common/Spinner';

// Bug: Pagination bugs
const FoodMenuPage = () => {
  const [foods, setFoods] = useState([]);
  const [page, setPage] = useState(0);

  useEffect(() => {
    const fetchFoods = async () => {
      const data = await getFoods();
      setFoods(data);
    };
    fetchFoods();
  }, [page]);

  return (
    <div>
      <h1>Food Menu</h1>
      <Spinner />
      <FoodList foods={foods} />
      <button onClick={() => setPage(page + 1)}>Next Page</button>
    </div>
  );
};

export default FoodMenuPage;
