const express = require('express');
const bodyParser = require('body-parser');
const db = require('./utils/db');
const cors = require('cors');
const router=require('./router.js');

const app = express();

app.use(router);
app.use(cors());

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  
    // Handle preflight requests
    if ('OPTIONS' === req.method) {
      res.sendStatus(200);
    } else {
      next();
    }
  });

app.use(bodyParser.json());


// Import route files
const UserRoute = require('./routes/users');
const TeamRoute = require('./routes/teams');


// Use route files
app.use('/api/users', UserRoute);
app.use('/api/team', TeamRoute);



// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});