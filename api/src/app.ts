import express from 'express';
import cors from 'cors';
import errorHandler from './middleware/errorMiddleware.js';

const app = express();

app.use(cors());
// Allows to work with json request bodies
app.use(express.json());
// Allows to work with form request bodies
app.use(express.urlencoded());

app.get('/', (req, res, next) => {
  try {
    res.status(200).json({ msg: 'hello, world' });
  } catch (e) {
    next(e);
  }
});

//* Register error handler middleware
app.use(errorHandler);

export default app;
