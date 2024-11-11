const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const cors = require('cors')
dotenv.config();

// Initialize Express app
const app = express();

// Connect to MongoDB
connectDB();
// Enable CORS for all routes
app.use(cors());
// Middleware to parse JSON
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello, World!');
  });

// Routes
app.use('/api', require('./routes/userRoutes'));
app.use('/api/addmedicine', require('./routes/medicine'));

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
