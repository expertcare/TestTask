const express = require('express');
require('dotenv').config();
const connectDB = require('./src/db/connect');
const cors = require('cors');
const authRouter = require('./src/routes/index');

const app = express();

// Allow only specific origins
const allowedOrigins = ['http://localhost:3000','http://localhost:3001','http://localhost:3002','https://localhost:3000','https://localhost:3001','https://localhost:3002','*'];

const corsOptions = {
    origin: function (origin, callback) {
        if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    optionsSuccessStatus: 200 
};


app.use(cors(corsOptions));


app.use(express.json());


app.use('/', authRouter);


app.options('*', cors());


const port = process.env.PORT || 5000;

const start = async () => {
    try {
        await connectDB("mongodb://localhost:27017");
        app.listen(port, () => {
            console.log(`Server is running on port ${port}`);
        });
    } catch (error) {
        console.log('ERROR:', error);
    }
};

start();
