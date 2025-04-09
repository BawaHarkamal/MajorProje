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
app.use(cors({
  origin: "http://localhost:5173", // allow your frontend
  credentials: true                // allow cookies if needed
}));

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello, World!');
  });

// Routes

app.use('/api/medicine', require('./routes/medicine'));
app.use('/api', require('./routes/userRoutes'));
app.use('/api/orders', require('./routes/orderRoutes'));
app.use('/api/requests', require('./routes/requestRoutes'));


// app.use('/api/signin', require('./routes/userRoutes'));
app.use('/api/stock', require('./routes/lowStockRoutes'));


// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


/*
 '/' -> get route " localhost:9000/"
 '/api' -> '/api/signup'  post 
        -> '/api/signin'  post

  '/api/medicine' -> '/add' post , '/api/medicine/add'
                      '/' get => '/api/medicine' 
                       put (/__) => '/api/medicine/_____'
                       delete (/__)    => '/api/medicine/_____'

*/


