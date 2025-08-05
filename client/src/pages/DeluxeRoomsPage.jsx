import React, { useEffect, useState } from 'react';
import axios from '../utils/axios';
import CategoryCard from '../component/CategoryCard';

const DeluxeRoomsPage = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(`http://localhost:5000/api/data?category=Deluxe Rooms`);
      const data = await res.json();
      setItems(data);
    };
    fetchData();
  }, []);

  return (
     <div className="min-h-screen bg-gray-50 py-10 px-6">
      <h1 className="text-4xl font-bold text-center mb-10">Deluxe Rooms</h1>
      <div className="flex flex-wrap gap-6 justify-center">
        {items.map(item => (
          <CategoryCard key={item._id} item={item} />
        ))}
      </div>
    </div>
  );
};

export default DeluxeRoomsPage;
