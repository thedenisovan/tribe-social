import express from 'express';
import cors from 'cors';
import errorHandler from './middleware/errorMiddleware.js';
import authRoute from './routes/auth.route.js';
import dashRoute from './routes/dash.route.js';
import discoverRoute from './routes/discover.route.js';
import profileRoute from './routes/profile.route.js';
import homeRoute from './routes/home.route.js';
import passport from 'passport';
import './configs/passport.js';

const app = express();

app.use(cors());
// Allows to work with json request bodies
app.use(express.json());
// Allows to work with form request bodies
app.use(express.urlencoded());
app.use(passport.initialize());

app.use('/auth', authRoute);
app.use('/dashboard/home', homeRoute);
app.use('/dashboard/profile', profileRoute);
app.use('/dashboard/discover', discoverRoute);
app.use('/dashboard', dashRoute);

//* Register error handler middleware
app.use(errorHandler);

export default app;
