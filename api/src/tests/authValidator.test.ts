import { afterAll, afterEach, describe, test } from '@jest/globals';
import signupRoute from '../routes/signup.route.js';
import request from 'supertest';
import express from 'express';
import prismaNeon from '../db/prisma.js';

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use('/signup', signupRoute);

afterEach(async () => {
  await prismaNeon.user.deleteMany({ where: { email: 'johnDoe@odin.net' } });
});

afterAll(async () => {
  await prismaNeon.$disconnect();
});

describe('POST /signup validator tests', () => {
  test('All input fields are required', (done) => {
    request(app)
      .post('/signup')
      .send({
        ...validUser,
        firstName: '',
      })
      .expect('Content-Type', /json/)
      .expect({
        errors: [
          {
            type: 'field',
            value: '',
            msg: 'First name is required.',
            path: 'firstName',
            location: 'body',
          },
        ],
      })
      .expect(200, done);
  });

  // test('wrong format password should fail registration', (done) => {
  //   request(app)
  //     .post('/signup')
  //     .send({
  //       username: 'johnDoe',
  //       email: 'johnDoe@odin.net',
  //       password: 'wrongPass',
  //       passwordConfirmation: 'wrongPass',
  //     })
  //     .expect('Content-Type', /json/)
  //     .expect({
  //       errors: [
  //         {
  //           type: 'field',
  //           value: 'wrongPass',
  //           msg: 'Password must be 6+ chars, with at least one uppercase, lowercase, number and symbol.',
  //           path: 'password',
  //           location: 'body',
  //         },
  //       ],
  //     })
  //     .expect(200, done);
  // });

  // test('wrong pass confirmation should fail registration', (done) => {
  //   request(app)
  //     .post('/signup')
  //     .send({
  //       username: 'johnDoe',
  //       email: 'johnDoe@odin.net',
  //       password: 'Admin123@',
  //       passwordConfirmation: 'Admin123',
  //     })
  //     .expect('Content-Type', /json/)
  //     .expect({
  //       errors: [
  //         {
  //           type: 'field',
  //           value: 'Admin123',
  //           msg: 'Passwords did not match.',
  //           path: 'passwordConfirmation',
  //           location: 'body',
  //         },
  //       ],
  //     })
  //     .expect(200, done);
  // });

  // test('user cant register if user with given email exists', (done) => {
  //   request(app)
  //     .post('/signup')
  //     .send({
  //       username: 'johnDoe',
  //       email: 'johnDoe@odin.com',
  //       password: 'Admin123@',
  //       passwordConfirmation: 'Admin123@',
  //     })
  //     .expect('Content-Type', /json/)
  //     .expect({
  //       errors: [
  //         {
  //           type: 'field',
  //           value: 'johnDoe@odin.com',
  //           msg: 'E-mail already in use.',
  //           path: 'email',
  //           location: 'body',
  //         },
  //       ],
  //     })
  //     .expect(200, done);
  // });
});

const validUser = {
  firstName: 'John',
  lastName: 'Doe',
  email: 'johnDoe@odin.net',
  password: 'Admin1',
  passwordConfirmation: 'Admin1',
};
