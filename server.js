const express = require('express');
const bodyParser = require('body-parser');
const mongodb = require('./models/db'); // We will create this file next
const passport = require('passport');
const session = require('express-session');
const GitHubStrategy = require('passport-github2').Strategy;
const cors = require('cors');
const errorHandler = require('./middleware/errorHandler');
const AppError = require('./errors/AppErrors');

const app = express();
const port = process.env.PORT || 3000;

app
    .use(bodyParser.json())
    .use(session({
        secret: "secret", // Use a .env variable in production
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

// Passport Setup (Reuse your logic from the last project here)
passport.use(new GitHubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: process.env.CALLBACK_URL
},
    function (accessToken, refreshToken, profile, done) {
        return done(null, profile);
    }
));

passport.serializeUser((user, done) => { done(null, user); });
passport.deserializeUser((user, done) => { done(null, user); });

// Database Connection & Server Start
mongodb.initDb((err) => {
    if (err) {
        console.log(err);
    } else {
        app.listen(port);
        console.log(`Connected to DB and listening on ${port}`);
    }
});