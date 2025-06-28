import React, { useState, useEffect, useRef } from 'react';
import { toast } from 'react-toastify';
import { authAPI } from '../utils/api';
import { getStoredUser, setStoredUser } from '../utils/storage';
import { DEFAULT_PROFILE_PIC } from '../utils/constants';
import { FiCamera, FiEdit3, FiUser, FiSave, FiX, FiCheck, FiAlertCircle } from 'react-icons/fi';

const genderOptions = [
  { value: '', label: 'Select Gender' },
  { value: 'male', label: 'Male' },
  { value: 'female', label: 'Female' },
  { value: 'other', label: 'Other' },
];

const Profile = () => {
  const [user, setUser] = useState(null);
  ////////////////////////////////////////////////////////////////////////////////////////
  const [isEditing, setIsEditing] = useState(true);
  const [formData, setFormData] = useState({
    fullName: '',
    age: '',
    gender: '',
    phone: '',
    profilePic: '',
  });
  const [profilePicFile, setProfilePicFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);
  const [errors, setErrors] = useState({});
  const fileInputRef = useRef();

  // Debug logging
  console.log('Profile component render - isEditing:', isEditing);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await authAPI.getCurrentUser();
        setUser(res.data.user);
        setFormData({
          fullName: res.data.user.fullName || '',
          age: res.data.user.age || '',
          gender: res.data.user.gender || '',
          phone: res.data.user.phone || '',
          profilePic: res.data.user.profilePic || '',
        });
      } catch (err) {
        toast.error('Failed to load profile.');
      }
    };
    fetchProfile();
  }, []);

  // Check for changes
  useEffect(() => {
    if (user) {
      const hasFormChanges = 
        formData.fullName !== (user.fullName || '') ||
        formData.age !== (user.age || '') ||
        formData.gender !== (user.gender || '') ||
        formData.phone !== (user.phone || '') ||
        formData.profilePic !== (user.profilePic || '') ||
        profilePicFile !== null;
      
      setHasChanges(hasFormChanges);
    }
  }, [formData, profilePicFile, user]);

  const validateField = (name, value) => {
    const newErrors = { ...errors };
    
    switch (name) {
      case 'fullName':
        if (value.length > 50) {
          newErrors.fullName = 'Full name must be less than 50 characters';
        } else {
          delete newErrors.fullName;
        }
        break;
      case 'age':
        if (value && (value < 1 || value > 120)) {
          newErrors.age = 'Age must be between 1 and 120';
        } else {
          delete newErrors.age;
        }
        break;
      case 'phone':
        if (value && !/^[\+]?[1-9][\d]{0,15}$/.test(value.replace(/\s/g, ''))) {
          newErrors.phone = 'Please enter a valid phone number';
        } else {
          delete newErrors.phone;
        }
        break;
      default:
        break;
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    validateField(name, value);
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      // Validate file type
      if (!file.type.startsWith('image/')) {
        toast.error('Please select an image file');
        return;
      }
      setProfilePicFile(file);
      setFormData({ ...formData, profilePic: URL.createObjectURL(file) });
      toast.success('Profile picture selected! Click Save Changes to upload.');
    }
  };

  const handleProfilePicUrlChange = (e) => {
    setFormData({
      ...formData,
      profilePic: e.target.value
    });
    setProfilePicFile(null); // Clear file if URL is provided
  };

  const removeProfilePic = () => {
    setProfilePicFile(null);
    setFormData({
      ...formData,
      profilePic: ''
    });
  };

  const handleEditClick = () => {
    console.log('Edit button clicked - setting isEditing to true');
    console.log('Current isEditing state:', isEditing);
    setIsEditing(true);
    console.log('setIsEditing(true) called');
  };

  const handleCancelClick = () => {
    console.log('Cancel button clicked - setting isEditing to false');
    setIsEditing(false);
    setFormData({
      fullName: user.fullName || '',
      age: user.age || '',
      gender: user.gender || '',
      phone: user.phone || '',
      profilePic: user.profilePic || '',
    });
    setProfilePicFile(null);
    setErrors({});
    setHasChanges(false);
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (formData.fullName.length > 50) {
      newErrors.fullName = 'Full name must be less than 50 characters';
    }
    
    if (formData.age && (formData.age < 1 || formData.age > 120)) {
      newErrors.age = 'Age must be between 1 and 120';
    }
    
    if (formData.phone && !/^[\+]?[1-9][\d]{0,15}$/.test(formData.phone.replace(/\s/g, ''))) {
      newErrors.phone = 'Please enter a valid phone number';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast.error('Please fix the errors before saving');
      return;
    }
    
    setSaving(true);
    try {
      const data = new FormData();
      data.append('fullName', formData.fullName);
      data.append('age', formData.age);
      data.append('gender', formData.gender);
      data.append('phone', formData.phone);
      if (profilePicFile) {
        data.append('profilePic', profilePicFile);
      }
      const res = await authAPI.updateProfile(data);
      setUser(res.data.user);
      setStoredUser(res.data.user);
      setIsEditing(false);
      setHasChanges(false);
      setErrors({});
      toast.success('Profile updated successfully!');
      setProfilePicFile(null);
    } catch (err) {
      toast.error('Failed to update profile.');
    } finally {
      setSaving(false);
    }
  };

  if (!user) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        <span className="ml-2 text-gray-600">Loading profile...</span>
      </div>
    );
  }

  return (
    <div className="p-4 lg:p-6 animate-fade-in">
      <div className="max-w-2xl mx-auto">
        <div className="mb-6">
          <h1 className="text-2xl lg:text-3xl font-bold text-gray-800 mb-2 gradient-text">
            Hello, {user.username}!
          </h1>
          <p className="text-gray-600">Manage your account information and preferences</p>
          
          {/* Changes Indicator */}
          {hasChanges && isEditing && (
            <div className="mt-3 p-3 bg-blue-50 border border-blue-200 rounded-lg flex items-center gap-2">
              <FiAlertCircle className="text-blue-600" />
              <span className="text-sm text-blue-700">You have unsaved changes</span>
            </div>
          )}
        </div>

        <div className="bg-white rounded-lg shadow-sm border p-4 lg:p-6 card-hover">
          {/* Enhanced Profile Picture Section */}
          <div className="text-center mb-6 lg:mb-8">
            <div className="relative inline-block group">
              <div className="relative">
                {user.profilePic || profilePicFile || formData.profilePic ? (
                  <img
                    src={profilePicFile ? formData.profilePic : (formData.profilePic || user.profilePic)}
                    alt="Profile"
                    className="w-24 h-24 lg:w-32 lg:h-32 rounded-full object-cover border-4 border-gray-200 profile-pic shadow-lg"
                  />
                ) : (
                  <img
                    src={DEFAULT_PROFILE_PIC}
                    alt="Default Profile"
                    className="w-24 h-24 lg:w-32 lg:h-32 rounded-full object-cover border-4 border-gray-200 profile-pic shadow-lg"
                  />
                )}
                
                {/* Upload Overlay - Always visible when editing */}
                {isEditing && (
                  <div className="absolute inset-0 bg-black bg-opacity-50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <button
                      type="button"
                      className="bg-white text-gray-800 p-2 rounded-full hover:bg-gray-100 transition-colors duration-200"
                      onClick={() => fileInputRef.current.click()}
                      title="Change profile picture"
                    >
                      <FiCamera className="w-5 h-5" />
                    </button>
                  </div>
                )}
              </div>
              
              {/* Upload Options - Always visible when editing */}
              {isEditing && (
                <div className="mt-3 space-y-2">
                  <button
                    type="button"
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center gap-2 mx-auto"
                    onClick={() => fileInputRef.current.click()}
                  >
                    <FiCamera className="w-4 h-4" />
                    <span>Upload Photo</span>
                  </button>
                  
                  {/* URL Input */}
                  <div className="max-w-xs mx-auto">
                    <input
                      type="url"
                      name="profilePic"
                      value={formData.profilePic}
                      onChange={handleProfilePicUrlChange}
                      placeholder="Or enter image URL"
                      className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  
                  {/* Remove Button */}
                  {(profilePicFile || formData.profilePic) && (
                    <button
                      type="button"
                      onClick={removeProfilePic}
                      className="text-red-600 hover:text-red-700 text-sm font-medium flex items-center gap-1 mx-auto"
                    >
                      <FiX className="w-3 h-3" />
                      Remove Profile Picture
                    </button>
                  )}
                </div>
              )}
              
              <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                style={{ display: 'none' }}
                onChange={handleFileChange}
              />
            </div>
            
            <h2 className="text-lg lg:text-xl font-semibold mt-4">{user.username}</h2>
            <p className="text-gray-600">{user.email}</p>
            
            {/* Profile Picture Status */}
            {profilePicFile && (
              <div className="mt-3 p-2 bg-green-50 border border-green-200 rounded-lg flex items-center gap-2">
                <FiCheck className="text-green-600" />
                <p className="text-sm text-green-700">
                  New profile picture selected. Click "Save Changes" to upload.
                </p>
              </div>
            )}
            
            {formData.profilePic && !profilePicFile && (
              <div className="mt-3 p-2 bg-blue-50 border border-blue-200 rounded-lg flex items-center gap-2">
                <FiCheck className="text-blue-600" />
                <p className="text-sm text-blue-700">
                  Profile picture URL set. Click "Save Changes" to update.
                </p>
              </div>
            )}
          </div>

          {/* Profile Form */}
          <form onSubmit={handleSubmit}>
            <div className="space-y-4 lg:space-y-6">
              <div className="form-group">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name
                  <span className="text-gray-400 text-xs ml-1">(max 50 characters)</span>
                </label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  disabled={!isEditing}
                  maxLength={50}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 input-focus ${
                    isEditing ? 'border-gray-300' : 'border-gray-200 bg-gray-50'
                  } ${errors.fullName ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : ''}`}
                />
                {errors.fullName && (
                  <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                    <FiAlertCircle className="w-3 h-3" />
                    {errors.fullName}
                  </p>
                )}
                <div className="mt-1 text-xs text-gray-500 text-right">
                  {formData.fullName.length}/50
                </div>
              </div>
              
              <div className="form-group">
                <label className="block text-sm font-medium text-gray-700 mb-2">Age</label>
                <input
                  type="number"
                  name="age"
                  value={formData.age}
                  onChange={handleChange}
                  disabled={!isEditing}
                  min="1"
                  max="120"
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 input-focus ${
                    isEditing ? 'border-gray-300' : 'border-gray-200 bg-gray-50'
                  } ${errors.age ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : ''}`}
                />
                {errors.age && (
                  <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                    <FiAlertCircle className="w-3 h-3" />
                    {errors.age}
                  </p>
                )}
              </div>
              
              <div className="form-group">
                <label className="block text-sm font-medium text-gray-700 mb-2">Gender</label>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 input-focus ${
                    isEditing ? 'border-gray-300' : 'border-gray-200 bg-gray-50'
                  }`}
                >
                  {genderOptions.map(opt => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                  ))}
                </select>
              </div>
              
              <div className="form-group">
                <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  disabled={!isEditing}
                  placeholder="+1 234 567 8900"
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 input-focus ${
                    isEditing ? 'border-gray-300' : 'border-gray-200 bg-gray-50'
                  } ${errors.phone ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : ''}`}
                />
                {errors.phone && (
                  <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                    <FiAlertCircle className="w-3 h-3" />
                    {errors.phone}
                  </p>
                )}
              </div>
              
              <div className="form-group">
                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                <input
                  type="email"
                  name="email"
                  value={user.email}
                  disabled
                  className="w-full px-3 py-2 border rounded-lg border-gray-200 bg-gray-50"
                />
                <p className="mt-1 text-xs text-gray-500">Email cannot be changed</p>
              </div>
              
              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 pt-4">
                {isEditing ? (
                  <>
                    <button
                      type="submit"
                      disabled={saving || Object.keys(errors).length > 0}
                      className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed btn-primary flex items-center justify-center gap-2"
                    >
                      {saving ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                          <span>Saving...</span>
                        </>
                      ) : (
                        <>
                          <FiSave className="w-4 h-4" />
                          <span>Save Changes</span>
                        </>
                      )}
                    </button>
                    <button
                      type="button"
                      onClick={handleCancelClick}
                      disabled={saving}
                      className="flex-1 bg-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-400 transition-colors duration-200 disabled:opacity-50"
                    >
                      Cancel
                    </button>
                  </>
                ) : (
                  <button
                    type="button"
                    onClick={handleEditClick}
                    className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors duration-200 btn-primary flex items-center justify-center gap-2"
                  >
                    <FiEdit3 className="w-4 h-4" />
                    <span>Edit Profile</span>
                  </button>
                )}
              </div>
            </div>
          </form>
        </div>

        {/* Account Statistics */}
        <div className="mt-8 bg-white rounded-lg shadow-sm border p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Account Statistics</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">0</div>
              <div className="text-sm text-gray-600">Total Expenses</div>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600">0</div>
              <div className="text-sm text-gray-600">Categories</div>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <div className="text-2xl font-bold text-purple-600">0</div>
              <div className="text-sm text-gray-600">Days Active</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile; 