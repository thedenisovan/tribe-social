import express from 'express';
import cors from 'cors';
import errorHandler from './middleware/errorMiddleware.js';
import signupRoute from './routes/signup.route.js';

const app = express();

app.use(cors());
// Allows to work with json request bodies
app.use(express.json());
// Allows to work with form request bodies
app.use(express.urlencoded());

app.use('/', signupRoute);

//* Register error handler middleware
app.use(errorHandler);

export default app;
