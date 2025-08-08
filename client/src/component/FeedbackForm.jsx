import React, { useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { Mirage } from 'ldrs/react'
import 'ldrs/react/Mirage.css'

const Feedback = () => {
    const [formData, setFormData] = useState({
        name: '',
        location: '',
        feedback: '',
    });

    const [successMessage, setSuccessMessage] = useState('');
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault(); // ✅ Prevent default form submission
        try {
            await axios.post('https://paradise-backend-fkix.onrender.com/api/feedback', formData);
            setSuccessMessage('Feedback submitted successfully!');
            setFormData({ name: '', location: '', feedback: '' });
        } catch (error) {
            console.error('Error submitting feedback:', error);
            setSuccessMessage('Something went wrong. Please try again.');
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex items-center justify-center px-4 py-12">
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="w-full max-w-2xl bg-white rounded-2xl shadow-lg p-8 space-y-6"
            >
                <div className="text-center">
                    <h1 className="text-3xl font-bold text-gray-800 mb-2">We Value Your Feedback</h1>
                    <p className="text-gray-500">Let us know what you think. Your feedback helps us improve.</p>
                </div>

                {successMessage && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="bg-green-50 border border-green-300 text-green-800 p-4 rounded"
                    >
                        {successMessage}
                    </motion.div>
                )}

                <form
                    onSubmit={async (e) => {
                        e.preventDefault();
                        setLoading(true);
                        await handleSubmit(e); // ✅ Fix: Pass the event object
                        setLoading(false);
                    }}
                    className="space-y-6"
                >
                    <div>
                        <label className="block text-gray-700 font-medium mb-1" htmlFor="name">Name</label>
                        <input
                            type="text"
                            name="name"
                            id="name"
                            placeholder="Your Name"
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700 font-medium mb-1" htmlFor="location">Location</label>
                        <input
                            type="text"
                            name="location"
                            id="location"
                            placeholder="Your Location"
                            value={formData.location}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700 font-medium mb-1" htmlFor="feedback">Feedback</label>
                        <textarea
                            name="feedback"
                            id="feedback"
                            placeholder="Share your thoughts..."
                            value={formData.feedback}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm h-36 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>

                    <div className="text-center">
                        <button
                            type="submit"
                            disabled={loading}
                            className={`inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-md transition ${loading ? 'opacity-50 cursor-not-allowed' : ''
                                }`}
                        >
                            {loading ? (
                                <>
                                    <Mirage
                                        size={64}
                                        speed={2.5}
                                        color="white"
                                    />
                                </>
                            ) : (
                                'Submit Feedback'
                            )}
                        </button>
                    </div>
                </form>
            </motion.div>
        </div>
    );
};

export default Feedback;