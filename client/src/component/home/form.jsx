import React, { useState } from 'react';
import '../style/form.css';
import { Mirage } from 'ldrs/react'
import 'ldrs/react/Mirage.css'

const Form = () => {
  const [formData, setFormData] = useState({
    email: '',
    textarea: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validateForm = () => {
    let valid = true;
    const newErrors = {};

    if (!formData.email) {
      newErrors.email = 'Email is required';
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
      valid = false;
    }

    if (!formData.textarea) {
      newErrors.textarea = 'Message is required';
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const API_URL = 'http://localhost:5000/api/contact';

      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          textarea: formData.textarea
        }),
      });

      let data;
      try {
        data = await response.json();
      } catch (jsonError) {
        console.error('JSON parsing error:', jsonError);
        throw new Error('Invalid server response');
      }

      if (!response.ok) {
        throw new Error(data.error || 'Form submission failed');
      }

      setSubmitStatus({
        success: true,
        message: data.message || 'Form submitted successfully'
      });
      setFormData({ email: '', textarea: '' });

    } catch (error) {
      console.error('Submission error:', error);
      setSubmitStatus({
        success: false,
        message: error.message || 'An error occurred while submitting'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="form-container">
      {submitStatus?.success ? (
        <div className="success-message">
          <h3>Thank you for your message!</h3>
          <p>{submitStatus.message}</p>
        </div>
      ) : (
        <form className="form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Company Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              disabled={isSubmitting}
            />
            {errors.email && <div className="error-message">{errors.email}</div>}
          </div>
          <div className="form-group">
            <label htmlFor="textarea">How Can We Help You?</label>
            <textarea
              name="textarea"
              id="textarea"
              rows={10}
              value={formData.textarea}
              onChange={handleChange}
              disabled={isSubmitting}
            />
            {errors.textarea && <div className="error-message">{errors.textarea}</div>}
          </div>
          {submitStatus?.success === false && (
            <div className="error-message">{submitStatus.message}</div>
          )}
          <button
  className="btn btn-primary btn-lg px-4 d-flex align-items-center justify-content-center"
  type="submit"
  disabled={isSubmitting}
>
  {isSubmitting ? (
    <Mirage
      size={64} 
      speed={2.5}
      color="white"
    />
  ) : (
    'Submit'
  )}
</button>

        </form>
      )}
    </div>
  );
};

export default Form;