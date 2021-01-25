// Import dependencies
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

// Create a new express application nammed 'app'
const app = express();

// Set our backend port to be either an environment variable or port 5000
const port = process.env.PORT || 5000;

// This application level middleware prints incoming requests
// to the servers console, useful to see incoming requests
app.use((req, res, next) => {
    console.log(`Request_Endpoint: ${req.method} ${req.url}`);
    next(); 
});

// Configure the bodyParser middleware
// bodyParser.json - Parses JSON objects
// bodyParser.urlencoded - Parses bodies from URL
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

// Configure CORS middleware
app.use(cors());

// Require Route
const api = require('./routes/routes'); 

// Configure app to use route
app.use('/api/v1/', api);

// This Middleware informs the express application
// to serve our Compiled React files.
// At Runtime NODE_ENV is checked to indicate whether 
// the server should run in 'development' mode vs. 'production' mode. 
if(process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'staging'){
    app.use(express.static(path.join(__dirname, 'client/build')));

    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
    });
};

// Catch any bad requests
app.get('*', (req, res) => {
    res.status(200).json({
        msg: 'Catch All'
    });
});

// Configure our server to listen on the port defined by our port variable
app.listen(port, () => console.log(`BACK_END_SERVICE_PORT: ${port}`));