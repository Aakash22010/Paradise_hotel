import React, { useState } from 'react';
import { Dialog } from '@headlessui/react';
import axios from 'axios';
import { FaCalendarAlt, FaUser, FaEnvelope, FaPhone, FaBed, FaMoneyCheckAlt, FaTimes } from 'react-icons/fa';

const BookingModal = ({ isOpen, closeModal }) => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    checkin: '',
    checkout: '',
    guests: 1,
    roomType: 'Single',
    specialRequests: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

 const handlePayment = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/api/bookings', form);
      const { order } = response.data;

      const options = {
        key: "rzp_test_1uH9rzNOKH95Bn",
        amount: order.amount,
        currency: "INR",
        name: "Paradise Hotel",
        description: "Room Booking Payment",
        order_id: order.id,
        handler: function (response) {
          alert('Payment successful!');
          closeModal();
        },
        prefill: {
          name: form.name,
          email: form.email,
          contact: form.phone
        },
        theme: {
          color: "#4F46E5"
        }
      };

      const razor = new window.Razorpay(options);
      razor.open();

    } catch (err) {
      console.error(err);
      alert('Booking failed!');
    }
  };

  
  const today = new Date().toISOString().split('T')[0];

  return (
    <Dialog open={isOpen} onClose={closeModal} className="relative z-50">
      <div className="fixed inset-0 bg-black/70 backdrop-blur-sm" aria-hidden="true" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="w-full max-w-2xl max-h-[90vh] bg-gradient-to-br from-white to-gray-50 rounded-2xl overflow-hidden shadow-2xl border border-gray-100 flex flex-col">
          <div className="bg-indigo-700 p-6 text-white relative">
            <Dialog.Title className="text-2xl font-bold flex items-center gap-2">
              <FaBed className="text-yellow-300" />
              <span>Book Your Perfect Stay</span>
            </Dialog.Title>
            <p className="text-indigo-200 mt-1">Complete your reservation in just a few steps</p>
            
            <button 
              onClick={closeModal}
              className="absolute top-4 right-4 text-gray-200 hover:text-white transition-colors"
              aria-label="Close modal"
            >
              <FaTimes className="h-6 w-6" />
            </button>
          </div>
          
          <div className="overflow-y-auto flex-1 px-6">
            <form onSubmit={handlePayment} className="py-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Personal Info Section */}
                <div className="space-y-4">
                  <h3 className="font-semibold text-gray-700 flex items-center gap-2 pb-2 border-b">
                    <FaUser className="text-indigo-600" />
                    Personal Information
                  </h3>
                  
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                      Full Name *
                    </label>
                    <div className="relative">
                      <input 
                        type="text" 
                        id="name"
                        name="name" 
                        required 
                        placeholder="John Doe" 
                        value={form.name} 
                        onChange={handleChange} 
                        className="w-full pl-10 border border-gray-300 p-2.5 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent" 
                      />
                      <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      Email Address *
                    </label>
                    <div className="relative">
                      <input 
                        type="email" 
                        id="email"
                        name="email" 
                        required 
                        placeholder="john@example.com" 
                        value={form.email} 
                        onChange={handleChange} 
                        className="w-full pl-10 border border-gray-300 p-2.5 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent" 
                      />
                      <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                      Phone Number *
                    </label>
                    <div className="relative">
                      <input 
                        type="tel" 
                        id="phone"
                        name="phone" 
                        required 
                        placeholder="+91**********" 
                        value={form.phone} 
                        onChange={handleChange} 
                        className="w-full pl-10 border border-gray-300 p-2.5 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent" 
                      />
                      <FaPhone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    </div>
                  </div>
                </div>
                
                {/* Booking Details Section */}
                <div className="space-y-4">
                  <h3 className="font-semibold text-gray-700 flex items-center gap-2 pb-2 border-b">
                    <FaCalendarAlt className="text-indigo-600" />
                    Booking Details
                  </h3>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="checkin" className="block text-sm font-medium text-gray-700 mb-1">
                        Check-in *
                      </label>
                      <div className="relative">
                        <input 
                          type="date" 
                          id="checkin"
                          name="checkin" 
                          required 
                          min={today}
                          value={form.checkin} 
                          onChange={handleChange} 
                          className="w-full pl-10 border border-gray-300 p-2.5 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent" 
                        />
                        <FaCalendarAlt className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      </div>
                    </div>
                    
                    <div>
                      <label htmlFor="checkout" className="block text-sm font-medium text-gray-700 mb-1">
                        Check-out *
                      </label>
                      <div className="relative">
                        <input 
                          type="date" 
                          id="checkout"
                          name="checkout" 
                          required 
                          min={form.checkin || today}
                          value={form.checkout} 
                          onChange={handleChange} 
                          className="w-full pl-10 border border-gray-300 p-2.5 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent" 
                        />
                        <FaCalendarAlt className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="guests" className="block text-sm font-medium text-gray-700 mb-1">
                      Number of Guests *
                    </label>
                    <input 
                      type="number" 
                      id="guests"
                      name="guests" 
                      required 
                      value={form.guests} 
                      onChange={handleChange} 
                      className="w-full border border-gray-300 p-2.5 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent" 
                      min={1} 
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="roomType" className="block text-sm font-medium text-gray-700 mb-1">
                      Room Type *
                    </label>
                    <select 
                      id="roomType"
                      name="roomType" 
                      required 
                      value={form.roomType} 
                      onChange={handleChange} 
                      className="w-full border border-gray-300 p-2.5 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    >
                      <option value="Single">Single Room ($99/night)</option>
                      <option value="Double">Double Room ($149/night)</option>
                      <option value="Deluxe">Deluxe Room ($199/night)</option>
                      <option value="Suite">Luxury Suite ($299/night)</option>
                    </select>
                  </div>
                </div>
              </div>
              
              <div>
                <label htmlFor="specialRequests" className="block text-sm font-medium text-gray-700 mb-1">
                  Special Requests
                </label>
                <textarea 
                  id="specialRequests"
                  name="specialRequests" 
                  placeholder="Any special requirements or preferences..." 
                  value={form.specialRequests} 
                  onChange={handleChange} 
                  className="w-full border border-gray-300 p-2.5 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent h-32"
                />
              </div>
            </form>
          </div>
          
          <div className="px-6 pb-6 pt-4 border-t border-gray-200">
            <div className="flex flex-col sm:flex-row justify-between gap-4">
              <button 
                type="button" 
                onClick={closeModal}
                className="px-6 py-3 border border-gray-300 rounded-lg font-medium hover:bg-gray-50 transition-colors flex-1"
              >
                Cancel
              </button>
              <button 
                type="submit" 
                onClick={handlePayment}
                className="px-8 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-lg hover:shadow-lg transition-all flex items-center justify-center gap-2 flex-1"
              >
                <FaMoneyCheckAlt />
                <span>Proceed to Payment</span>
              </button>
            </div>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};

export default BookingModal;