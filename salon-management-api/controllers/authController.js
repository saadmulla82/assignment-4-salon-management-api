const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const userModel = require('../models/userModel');

const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password) return res.status(400).json({ error: 'Username, email, and password are required.' });

    const existingUser = await userModel.findByEmail(email);
    if (existingUser) return res.status(400).json({ error: 'User already exists.' });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = await userModel.create({ username, email, password: hashedPassword });

    return res.status(201).json({ message: 'User registered successfully', user: newUser });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ error: 'Email and password are required.' });

    const user = await userModel.findByEmail(email);
    if (!user) return res.status(400).json({ error: 'Invalid credentials.' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ error: 'Invalid credentials.' });

    const token = jwt.sign({ id: user.id, email: user.email, username: user.username }, process.env.JWT_SECRET || 'fallback_secret', { expiresIn: '24h' });

    return res.status(200).json({ message: 'Login successful', token, user: { id: user.id, username: user.username, email: user.email } });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
module.exports = { register, login };