import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Trash2, PlusCircle } from 'lucide-react';
import { Mirage } from 'ldrs/react'
import 'ldrs/react/Mirage.css'

const AdminDashboard = () => {
  const [offers, setOffers] = useState([]);
  const [feedbacks, setFeedbacks] = useState([]);
  const [hotels, setHotels] = useState([]);
  const [categories, setCategories] = useState([]);
  const [form, setForm] = useState({});
  const [loading, setLoading] = useState(false);
  const [expanded, setExpanded] = useState(null);

  const fetchAll = async () => {
    setLoading(true);
    try {
      const [o, f, h, c] = await Promise.all([
        axios.get('/api/admin/offers'),
        axios.get('/api/admin/feedbacks'),
        axios.get('/api/admin/hotels'),
        axios.get('/api/admin/categories'),
      ]);
      setOffers(o.data);
      setFeedbacks(f.data);
      setHotels(h.data);
      setCategories(c.data);
    } catch (err) {
      alert("Failed to fetch data.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAll();
  }, []);

  const handleInput = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const addItem = async (type) => {
    if (!Object.keys(form).length) return alert("Form is empty!");
    try {
      await axios.post(`/api/admin/${type}`, form);
      setForm({});
      fetchAll();
    } catch (err) {
      alert(err.response.data.error || 'Add failed.');
    }
  };

  const deleteItem = async (type, id) => {
    if (!window.confirm("Are you sure?")) return;
    try {
      await axios.delete(`/api/admin/${type}/${id}`);
      fetchAll();
    } catch {
      alert("Delete failed.");
    }
  };

  const Section = ({ title, children, index }) => (
    <div className="bg-white shadow rounded p-5 mb-6">
      <button
        onClick={() => setExpanded(expanded === index ? null : index)}
        className="w-full text-left text-2xl font-bold mb-3 flex justify-between items-center"
      >
        {title}
        <span>{expanded === index ? '▲' : '▼'}</span>
      </button>
      {expanded === index && children}
    </div>
  );

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-4xl font-bold mb-8">Admin Dashboard</h1>
      {loading && <Mirage size={64} speed={2.5} color="white" />}

      {/* Offers Section */}
      <Section title="🎁 Offers" index={0}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 mb-4">
          <input name="title" placeholder="Title" onChange={handleInput} className="input" />
          <input name="description" placeholder="Description" onChange={handleInput} className="input" />
          <input name="imageUrl" placeholder="Image URL" onChange={handleInput} className="input" />
          <input name="validTill" type="date" onChange={handleInput} className="input" />
        </div>
        <button onClick={() => addItem('offers')} className="btn-primary mb-4 flex items-center gap-2">
          <PlusCircle size={18} /> Add Offer
        </button>
        <ul className="space-y-3">
          {offers.map(offer => (
            <li key={offer._id} className="card">
              <div>
                <h3 className="font-bold">{offer.title}</h3>
                <p>{offer.description}</p>
                <p className="text-sm text-gray-500">Valid Till: {offer.validTill?.substring(0, 10)}</p>
              </div>
              <button onClick={() => deleteItem('offers', offer._id)} className="text-red-500 hover:text-red-700">
                <Trash2 size={20} />
              </button>
            </li>
          ))}
        </ul>
      </Section>

      {/* Feedback Section */}
      <Section title="📝 Feedback" index={1}>
        <ul className="space-y-3">
          {feedbacks.map(f => (
            <li key={f._id} className="card">
              <p>
                <strong>{f.name}</strong> from <em>{f.location}</em>
              </p>
              <p>{f.feedback}</p>
            </li>
          ))}
        </ul>
      </Section>

      {/* Hotels Section */}
      <Section title="🏨 Hotels" index={2}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4">
          <input name="hotel_name" placeholder="Hotel Name" onChange={handleInput} className="input" />
          <input name="city" placeholder="City" onChange={handleInput} className="input" />
          <input name="country" placeholder="Country" onChange={handleInput} className="input" />
        </div>
        <button onClick={() => addItem('hotels')} className="btn-primary mb-4 flex items-center gap-2">
          <PlusCircle size={18} /> Add Hotel
        </button>
        <ul className="space-y-3">
          {hotels.map(h => (
            <li key={h._id} className="card">
              <p>{h.hotel_name} — {h.city}, {h.country}</p>
              <button onClick={() => deleteItem('hotels', h._id)} className="text-red-500 hover:text-red-700">
                <Trash2 size={20} />
              </button>
            </li>
          ))}
        </ul>
      </Section>

      {/* Categories Section */}
      <Section title="📂 Category Data" index={3}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4">
          <input name="title" placeholder="Title" onChange={handleInput} className="input" />
          <input name="category" placeholder="Category" onChange={handleInput} className="input" />
          <input name="location" placeholder="Location" onChange={handleInput} className="input" />
        </div>
        <button onClick={() => addItem('categories')} className="btn-primary mb-4 flex items-center gap-2">
          <PlusCircle size={18} /> Add Category
        </button>
        <ul className="space-y-3">
          {categories.map(cat => (
            <li key={cat._id} className="card">
              <p>{cat.title} — {cat.category} ({cat.location})</p>
              <button onClick={() => deleteItem('categories', cat._id)} className="text-red-500 hover:text-red-700">
                <Trash2 size={20} />
              </button>
            </li>
          ))}
        </ul>
      </Section>
    </div>
  );
};

export default AdminDashboard;
