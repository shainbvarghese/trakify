import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { contactAPI } from '../utils/api';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      await contactAPI.sendMessage(formData);
      toast.success("Thank you for your message! We'll get back to you soon.");
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      toast.error('Failed to send message. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 lg:p-6 animate-fade-in">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6 lg:mb-8">
          <h1 className="text-2xl lg:text-3xl font-bold text-gray-800 mb-2 gradient-text">Contact Us</h1>
          <p className="text-gray-600">Get in touch with our support team. We're here to help!</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-6 lg:gap-8">
          {/* Contact Information */}
          <div className="bg-white rounded-lg shadow-sm border p-4 lg:p-6 card-hover">
            <h2 className="text-lg lg:text-xl font-semibold text-gray-800 mb-4 lg:mb-6">Get in Touch</h2>
            
            <div className="space-y-4">
              <div className="flex items-start space-x-3 card-hover">
                <div className="text-blue-600 text-xl">📍</div>
                <div>
                  <h3 className="font-medium text-gray-800">Address</h3>
                  <p className="text-gray-600">123 Finance Street<br />Money City, MC 12345</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3 card-hover">
                <div className="text-blue-600 text-xl">📧</div>
                <div>
                  <h3 className="font-medium text-gray-800">Email</h3>
                  <p className="text-gray-600">support@trackify.com</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3 card-hover">
                <div className="text-blue-600 text-xl">📞</div>
                <div>
                  <h3 className="font-medium text-gray-800">Phone</h3>
                  <p className="text-gray-600">+1 (555) 123-4567</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3 card-hover">
                <div className="text-blue-600 text-xl">🕒</div>
                <div>
                  <h3 className="font-medium text-gray-800">Business Hours</h3>
                  <p className="text-gray-600">Monday - Friday: 9:00 AM - 6:00 PM<br />Saturday: 10:00 AM - 4:00 PM</p>
                </div>
              </div>
            </div>

            {/* Social Media Links */}
            <div className="mt-6 lg:mt-8 pt-4 lg:pt-6 border-t">
              <h3 className="font-medium text-gray-800 mb-4">Follow Us</h3>
              <div className="flex space-x-4">
                <a href="#" className="text-blue-600 hover:text-blue-700 text-xl badge">📘</a>
                <a href="#" className="text-blue-400 hover:text-blue-500 text-xl badge">🐦</a>
                <a href="#" className="text-pink-600 hover:text-pink-700 text-xl badge">📷</a>
                <a href="#" className="text-blue-800 hover:text-blue-900 text-xl badge">💼</a>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white rounded-lg shadow-sm border p-4 lg:p-6 card-hover">
            <h2 className="text-lg lg:text-xl font-semibold text-gray-800 mb-4 lg:mb-6">Send us a Message</h2>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="form-group">
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 input-focus"
                  placeholder="Enter your full name"
                />
              </div>

              <div className="form-group">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 input-focus"
                  placeholder="Enter your email address"
                />
              </div>

              <div className="form-group">
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 input-focus"
                  placeholder="Tell us more about your inquiry..."
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed btn-primary"
              >
                {loading ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-8 lg:mt-12 bg-white rounded-lg shadow-sm border p-4 lg:p-6 card-hover">
          <h2 className="text-xl lg:text-2xl font-bold text-gray-800 mb-4 lg:mb-6">Frequently Asked Questions</h2>
          
          <div className="space-y-4">
            <div className="border-b border-gray-200 pb-4 card-hover">
              <h3 className="font-semibold text-gray-800 mb-2">How do I reset my password?</h3>
              <p className="text-gray-600">You can reset your password by clicking the "Forgot Password" link on the login page.</p>
            </div>
            
            <div className="border-b border-gray-200 pb-4 card-hover">
              <h3 className="font-semibold text-gray-800 mb-2">How do I add a new transaction?</h3>
              <p className="text-gray-600">Go to the Expenses page and click on "Add Transaction" to create a new income or expense entry.</p>
            </div>
            
            <div className="border-b border-gray-200 pb-4 card-hover">
              <h3 className="font-semibold text-gray-800 mb-2">Can I export my data?</h3>
              <p className="text-gray-600">Currently, data export functionality is in development. We'll notify you when it's available.</p>
            </div>
            
            <div className="pb-4 card-hover">
              <h3 className="font-semibold text-gray-800 mb-2">Is my data secure?</h3>
              <p className="text-gray-600">Yes, we use industry-standard encryption and security measures to protect your financial data.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact; 