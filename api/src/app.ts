import express from 'express';
import cors from 'cors';
import errorHandler from './middleware/errorMiddleware.js';
import authRoute from './routes/auth.route.js';
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

//* Register error handler middleware
app.use(errorHandler);

export default app;
