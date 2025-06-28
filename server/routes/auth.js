const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const auth = require('../middleware/auth');
const upload = require('../middleware/upload');
const fs = require('fs');
const path = require('path');

const router = express.Router();

// Register user
router.post('/register', async (req, res) => {
  try {
    const { username, email, password, profilePic } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ 
      $or: [{ email }, { username }] 
    });

    if (existingUser) {
      return res.status(400).json({ 
        message: 'User with this email or username already exists' 
      });
    }

    // Create new user
    const user = new User({
      username,
      email,
      password,
      profilePic: profilePic || ''
    });

    await user.save();

    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET || 'fallback_secret',
      { expiresIn: '7d' }
    );

    res.status(201).json({
      message: 'User created successfully',
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        profilePic: user.profilePic
      }
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Login user
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Check password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET || 'fallback_secret',
      { expiresIn: '7d' }
    );

    res.json({
      message: 'Login successful',
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        profilePic: user.profilePic
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get current user
router.get('/me', auth, async (req, res) => {
  try {
    res.json({
      user: {
        id: req.user._id,
        username: req.user.username,
        email: req.user.email,
        profilePic: req.user.profilePic,
        fullName: req.user.fullName,
        age: req.user.age,
        gender: req.user.gender,
        phone: req.user.phone
      }
    });
  } catch (error) {
    console.error('Get user error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get user profile (alias for /me)
router.get('/profile', auth, async (req, res) => {
  try {
    res.json({
      user: {
        id: req.user._id,
        username: req.user.username,
        email: req.user.email,
        profilePic: req.user.profilePic,
        fullName: req.user.fullName,
        age: req.user.age,
        gender: req.user.gender,
        phone: req.user.phone
      }
    });
  } catch (error) {
    console.error('Get profile error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Upload profile picture (no auth required for registration)
router.post('/upload-profile-pic', upload.single('profilePic'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    // Return the full URL path for the uploaded file
    const profilePicUrl = `/uploads/${req.file.filename}`;
    
    console.log('Profile picture uploaded:', req.file.filename);
    
    res.json({
      message: 'Profile picture uploaded successfully',
      profilePicUrl
    });
  } catch (error) {
    console.error('Upload profile picture error:', error);
    res.status(500).json({ message: 'Server error during file upload' });
  }
});

// Update user profile
router.put('/profile', auth, upload.single('profilePic'), async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Update fields
    user.fullName = req.body.fullName || user.fullName;
    user.age = req.body.age || user.age;
    user.gender = req.body.gender || user.gender;
    user.phone = req.body.phone || user.phone;
    
    // Handle profile picture update
    if (req.file) {
      // Delete old profile picture if it exists and is a local file
      if (user.profilePic && user.profilePic.startsWith('/uploads/')) {
        const oldFilePath = path.join(__dirname, '..', user.profilePic);
        if (fs.existsSync(oldFilePath)) {
          fs.unlinkSync(oldFilePath);
          console.log('Old profile picture deleted:', user.profilePic);
        }
      }
      // File upload - use uploaded file path
      user.profilePic = `/uploads/${req.file.filename}`;
      console.log('New profile picture uploaded:', req.file.filename);
    } else if (req.body.profilePic !== undefined) {
      // Delete old profile picture if it exists and is a local file
      if (user.profilePic && user.profilePic.startsWith('/uploads/')) {
        const oldFilePath = path.join(__dirname, '..', user.profilePic);
        if (fs.existsSync(oldFilePath)) {
          fs.unlinkSync(oldFilePath);
          console.log('Old profile picture deleted:', user.profilePic);
        }
      }
      // URL update - use provided URL (can be empty string to remove)
      user.profilePic = req.body.profilePic;
    }

    await user.save();

    res.json({
      message: 'Profile updated successfully',
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        profilePic: user.profilePic,
        fullName: user.fullName,
        age: user.age,
        gender: user.gender,
        phone: user.phone
      }
    });
  } catch (error) {
    console.error('Update profile error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete profile picture
router.delete('/profile-pic', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // If user has a profile picture, delete it from server
    if (user.profilePic && user.profilePic.startsWith('/uploads/')) {
      const filePath = path.join(__dirname, '..', user.profilePic);
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
        console.log('Profile picture deleted:', user.profilePic);
      }
    }

    // Clear profile picture from user record
    user.profilePic = '';
    await user.save();

    res.json({
      message: 'Profile picture deleted successfully',
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        profilePic: user.profilePic,
        fullName: user.fullName,
        age: user.age,
        gender: user.gender,
        phone: user.phone
      }
    });
  } catch (error) {
    console.error('Delete profile picture error:', error);
    res.status(500).json({ message: 'Server error during file deletion' });
  }
});

module.exports = router; 