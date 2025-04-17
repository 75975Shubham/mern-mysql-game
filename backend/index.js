const express = require('express');
const cors = require('cors');
const db = require('./db'); // MySQL connection
const gameRoutes = require('./routes/gameRoutes'); // Import routes
const app = express();

app.use(cors());
app.use(express.json());


// Use game routes
app.use('/', gameRoutes);
app.listen(5000, ()=>{
    console.log('Sever running on port 5000');
});