const express = require('express');
const mysql = require('mysql2');
const gameRoutes = require('./routes/gameRoutes');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json()); // For handling req.json
app.use('/api/game', gameRoutes);


// MySQL connection setup
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
  });

  db.connect((err=>{
    if(err){
        console.error('Error connecting to Mysql:', err);
        return;
    }
    console.log('Connected to mysql database!');
  }));

  app.get('/',(req,res)=>{
    res.send('Game API server running!');
  });

  app.listen(port, ()=>{
    console.log(`Server running on http://localhost:${port}`);

  });