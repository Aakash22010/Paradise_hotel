import React, { useEffect, useState } from 'react';
import axios from 'axios';

const HotelList = () => {
  const [hotels, setHotels] = useState([]);
  const [city, setCity] = useState('');
  const [stars, setStars] = useState('');
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchHotels = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/hotels', {
        params: { city, stars, search, page, limit: 6 }
      });
      setHotels(res.data.hotels);
      setTotalPages(res.data.totalPages);
    } catch (err) {
      console.error('Failed to fetch hotels', err);
    }
  };

  useEffect(() => {
    fetchHotels();
  }, [city, stars, search, page]);

  return (
    <div className="p-6 max-w-screen-xl mx-auto">
      {/* Filters & Search */}
      <div className="flex flex-col md:flex-row gap-4 mb-6 items-center">
        <input
          type="text"
          placeholder="Search by hotel name"
          value={search}
          onChange={(e) => { setSearch(e.target.value); setPage(1); }}
          className="w-full md:w-1/3 border border-gray-300 p-2 rounded-md shadow-sm"
        />
        <input
          type="text"
          placeholder="Filter by city"
          value={city}
          onChange={(e) => { setCity(e.target.value); setPage(1); }}
          className="w-full md:w-1/3 border border-gray-300 p-2 rounded-md shadow-sm"
        />
        <select
          value={stars}
          onChange={(e) => { setStars(e.target.value); setPage(1); }}
          className="w-full md:w-1/4 border border-gray-300 p-2 rounded-md shadow-sm"
        >
          <option value="">All Star Ratings</option>
          <option value="5">5 Stars</option>
          <option value="4">4 Stars</option>
          <option value="3">3 Stars</option>
        </select>
      </div>

      {/* Hotel Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {hotels.map((hotel) => (
          <div key={hotel.hotel_id} className="bg-white border rounded-lg overflow-hidden shadow hover:shadow-lg transition-shadow">
            <img
              src={hotel.photo1}
              alt={hotel.hotel_name}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h2 className="text-xl font-semibold text-gray-800">{hotel.hotel_name}</h2>
              <p className="text-sm text-gray-500 mb-1">{hotel.city}, {hotel.country}</p>
              <div className="text-yellow-500 font-medium mb-2">
                {hotel.star_rating} Stars · {hotel.rating_average}/10 Rating
              </div>
              <p className="text-gray-600 text-sm line-clamp-3">{hotel.overview?.substring(0, 120)}...</p>
              <a
                href={hotel.url}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-block text-blue-600 hover:underline text-sm"
              >
                View on Agoda
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-8 space-x-2">
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i + 1}
            className={`px-3 py-1 border rounded-md ${
              page === i + 1
                ? 'bg-blue-600 text-white'
                : 'bg-white text-gray-800 hover:bg-blue-100'
            }`}
            onClick={() => setPage(i + 1)}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default HotelList;
