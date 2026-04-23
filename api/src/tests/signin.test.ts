import { afterAll, describe, test } from '@jest/globals';
import authRoute from '../routes/auth.route.js';
import request from 'supertest';
import express from 'express';
import prismaNeon from '../db/prisma.js';
import passport from 'passport';

const app = express();

app.use(express.urlencoded());
app.use(express.json());
app.use(passport.initialize());

app.use('/', authRoute);

afterAll(async () => {
  await prismaNeon.$disconnect();
});

describe('POST /signin validator tests', () => {
  test('All input fields are required', (done) => {
    request(app)
      .post('/signin')
      .send({
        email: '',
        password: '',
      })
      // .expect('Content-Type', /json/)
      .expect({
        errors: [
          {
            type: 'field',
            value: '',
            msg: 'Email is required.',
            path: 'email',
            location: 'body',
          },
          {
            type: 'field',
            value: '',
            msg: 'Password is required.',
            path: 'password',
            location: 'body',
          },
          {
            type: 'field',
            value: '',
            msg: 'Invalid username or password.',
            path: 'password',
            location: 'body',
          },
        ],
        isUserCreated: false,
      })
      .expect(409, done);
  });

  test('Incorrect password should fail', (done) => {
    request(app)
      .post('/signin')
      .send({
        email: 'thedenisovan@proton.me',
        password: 'Admin2',
      })
      .expect({
        errors: [
          {
            type: 'field',
            value: 'Admin2',
            msg: 'Invalid username or password.',
            path: 'password',
            location: 'body',
          },
        ],
        isUserCreated: false,
      })
      .expect(409, done);
  });

  test('Successful signin', (done) => {
    request(app)
      .post('/signin')
      .send({
        email: 'thedenisovan@proton.me',
        password: 'Admin1',
      })
      .expect({ msg: 'success' })
      .expect(200, done);
  });
});
