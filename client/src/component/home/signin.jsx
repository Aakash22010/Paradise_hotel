import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  GoogleAuthProvider,
  signInWithPopup,
} from 'firebase/auth';
import { auth } from '../../firebase';

const SignIn = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess(false);
    setLoading(true);

    try {
      await signInWithEmailAndPassword(auth, form.email, form.password);
      setSuccess(true);
      setTimeout(() => navigate('/profile'), 2000);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async () => {
    if (!form.email) {
      setError('Please enter your email to reset password.');
      return;
    }

    try {
      await sendPasswordResetEmail(auth, form.email);
      setSuccess(true);
      setError('');
    } catch (err) {
      setError(err.message);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      navigate('/profile');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-400 via-blue-200 to-indigo-200">
      <form
        onSubmit={handleSubmit}
        className="relative z-10 bg-white/90 backdrop-blur-lg p-10 rounded-3xl shadow-2xl w-full max-w-md animate-fade-in border border-blue-100"
        autoComplete="off"
      >
        <div className="flex flex-col items-center mb-6">
          <h2 className="text-center text-gray-800 font-extrabold text-3xl tracking-tight mb-1">Welcome Back</h2>
          <p className="text-gray-500 text-sm">Sign in to your hotel account</p>
        </div>

        {error && <div className="bg-red-100 text-red-700 py-2 px-3 mb-4 rounded">{error}</div>}
        {success && <div className="bg-green-100 text-green-700 py-2 px-3 mb-4 rounded">Success! Redirecting...</div>}

        <div className="mb-5">
          <label className="block mb-1 text-gray-700 font-semibold">Email</label>
          <input type="email" name="email" value={form.email} onChange={handleChange} required
            className="w-full px-4 py-2 bg-blue-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" />
        </div>

        <div className="mb-4 relative">
          <label className="block mb-1 text-gray-700 font-semibold">Password</label>
          <input type={showPassword ? 'text' : 'password'} name="password" value={form.password} onChange={handleChange} required
            className="w-full px-4 py-2 bg-blue-50 border border-gray-200 rounded-lg pr-12 focus:outline-none focus:ring-2 focus:ring-blue-400" />
          <button type="button" onClick={() => setShowPassword(!showPassword)}
            className="absolute top-1/2 right-3 -translate-y-1/2 text-xl text-gray-500">
            {showPassword ? '🙈' : '👁️'}
          </button>
        </div>

        <div className="flex justify-between items-center mb-6 text-sm">
          <div className="flex items-center">
            <input type="checkbox" className="h-4 w-4 text-blue-600" />
            <label className="ml-2 text-gray-600">Remember me</label>
          </div>
          <button type="button" onClick={handleForgotPassword} className="text-blue-600 hover:underline font-medium">
            Forgot password?
          </button>
        </div>

        <button type="submit" disabled={loading}
          className="w-full bg-gradient-to-r from-blue-600 to-indigo-500 text-white py-2.5 rounded-lg font-bold flex justify-center items-center text-lg shadow hover:from-blue-700 hover:to-indigo-600 transition">
          {loading ? 'Signing In...' : 'Sign In'}
        </button>

        <button type="button" onClick={handleGoogleSignIn}
          className="w-full mt-4 bg-white border border-gray-300 text-gray-700 py-2.5 rounded-lg font-semibold hover:bg-gray-100 transition">
            
          Sign in with Google
        </button>

        <div className="mt-8 text-center text-sm text-gray-500">
          Don’t have an account? <a href="/signup" className="text-blue-600 hover:underline font-medium">Register</a>
        </div>
      </form>
    </div>
  );
};

export default SignIn;
