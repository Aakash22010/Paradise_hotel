import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth } from '../../firebase';

const SignUp = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess(false);

    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, form.email, form.password);

      await updateProfile(userCredential.user, {
        displayName: form.name,
      });

      setSuccess(true);
      setTimeout(() => navigate('/signin'), 2000);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-400 via-blue-200 to-indigo-200">
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-10 left-10 w-40 h-40 bg-blue-300 opacity-30 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-56 h-56 bg-indigo-300 opacity-30 rounded-full filter blur-3xl"></div>
      </div>
      <form
        onSubmit={handleSubmit}
        className="relative z-10 bg-white/90 backdrop-blur-lg p-10 rounded-3xl shadow-2xl w-full max-w-md animate-fade-in border border-blue-100"
        autoComplete="off"
      >
        <div className="flex flex-col items-center mb-6">
          <div className="bg-blue-100 rounded-full p-4 mb-2 shadow">
            <svg width="36" height="36" fill="none" viewBox="0 0 24 24">
              <path d="M12 12a5 5 0 100-10 5 5 0 000 10zM21 21v-1a7 7 0 00-14 0v1" stroke="#2563eb" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <h2 className="text-center text-gray-800 font-extrabold text-3xl tracking-tight mb-1">Create Account</h2>
          <p className="text-gray-500 text-sm">Sign up for your hotel account</p>
        </div>
        {error && (
          <div className="bg-red-100 text-red-700 text-center py-2 rounded mb-4 text-sm font-medium border border-red-200">
            {error}
          </div>
        )}
        {success && (
          <div className="bg-green-100 text-green-700 text-center py-2 rounded mb-4 text-sm font-medium border border-green-200">
            Registered successfully! Redirecting...
          </div>
        )}
        <div className="mb-5">
          <label htmlFor="name" className="block font-semibold text-gray-700 mb-1">Name</label>
          <input type="text" name="name" value={form.name} onChange={handleChange} required placeholder="Enter your name"
            className="w-full px-4 py-2 border border-gray-200 rounded-lg bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-400" />
        </div>
        <div className="mb-5">
          <label htmlFor="email" className="block font-semibold text-gray-700 mb-1">Email</label>
          <input type="email" name="email" value={form.email} onChange={handleChange} required placeholder="Enter your email"
            className="w-full px-4 py-2 border border-gray-200 rounded-lg bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-400" />
        </div>
        <div className="mb-4 relative">
          <label htmlFor="password" className="block font-semibold text-gray-700 mb-1">Password</label>
          <input type={showPassword ? 'text' : 'password'} name="password" value={form.password} onChange={handleChange} required placeholder="Create a password"
            className="w-full px-4 py-2 border border-gray-200 rounded-lg pr-12 bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-400" />
          <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute top-1/2 right-3 -translate-y-1/2 text-xl text-gray-500">
            {showPassword ? '🙈' : '👁️'}
          </button>
        </div>
        <div className="mb-4 relative">
          <label htmlFor="confirmPassword" className="block font-semibold text-gray-700 mb-1">Confirm Password</label>
          <input type={showConfirmPassword ? 'text' : 'password'} name="confirmPassword" value={form.confirmPassword} onChange={handleChange} required placeholder="Confirm your password"
            className="w-full px-4 py-2 border border-gray-200 rounded-lg pr-12 bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-400" />
          <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute top-1/2 right-3 -translate-y-1/2 text-xl text-gray-500">
            {showConfirmPassword ? '🙈' : '👁️'}
          </button>
        </div>
        <button type="submit" disabled={loading}
          className="w-full bg-gradient-to-r from-blue-600 to-indigo-500 hover:from-blue-700 hover:to-indigo-600 text-white font-bold py-2.5 rounded-lg shadow-lg transition-all duration-200 flex justify-center items-center text-lg">
          {loading ? (
            <span className="flex items-center">
              <svg className="animate-spin h-5 w-5 mr-2 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
              </svg>
              Signing Up...
            </span>
          ) : 'Sign Up'}
        </button>
        <div className="mt-8 text-center text-gray-500 text-sm">
          Already have an account? <a href="/signin" className="text-blue-600 hover:underline font-medium">Sign In</a>
        </div>
      </form>
    </div>
  );
};

export default SignUp;
