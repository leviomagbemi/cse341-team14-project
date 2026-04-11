require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const mongodb = require('./models/db'); // We will create this file next
const { passport } = require('./middleware/passport');
const session = require('express-session');
const cors = require('cors');
const errorHandler = require('./middleware/errorHandler');
const AppError = require('./errors/AppErrors');

const app = express();
const port = process.env.PORT || 3000;

app
    .use(bodyParser.json())
    .use(session({
        secret: process.env.SESSION_SECRET || "secret",
        resave: false,
        saveUninitialized: true,
    }))
    .use(passport.initialize())
    .use(passport.session())
    .use(cors({
        origin: '*',
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
        allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept', 'Z-Key'],
        credentials: false
    }))
    .use('/', require('./routes')); // This points to your routes/index.js

// 404 Not Found Handler - Must come after all route definitions
app.use((req, res, next) => {
    const err = new AppError(`The requested resource was not found on the server`, 404);
    next(err);
});

// Global Error Handling Middleware - Must be LAST
app.use(errorHandler);

// Database Connection & Server Start
mongodb.initDb((err) => {
    if (err) {
        console.log(err);
    } else {
        app.listen(port);
        console.log(`Connected to DB and listening on ${port}`);
    }
});