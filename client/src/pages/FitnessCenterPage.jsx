import React, { useEffect, useState } from 'react';
import axios from '../utils/axios';
import CategoryCard from '../component/CategoryCard';

const FitnessCenterPage = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch('https://paradise-backend-fkix.onrender.com/api/data?category=Fitness Center')
      .then(res => res.json())
      .then(setItems);
  }, []);

  return (
    <div className="min-h-screen px-4 py-8 bg-gray-100">
      <h1 className="text-3xl font-bold mb-6 text-center">Fitness Center</h1>
      <div className="flex flex-wrap gap-6 justify-center">
        {items.map(item => <CategoryCard key={item._id} item={item} />)}
      </div>
    </div>
  );
};

export default FitnessCenterPage;
