import { afterAll, describe, test } from '@jest/globals';
import authRoute from '../routes/auth.route.js';
import request from 'supertest';
import express from 'express';
import prismaNeon from '../db/prisma.js';

const app = express();

app.use(express.urlencoded());
app.use(express.json());

app.use('/', authRoute);

afterAll(async () => {
  await prismaNeon.user.deleteMany({
    where: { email: 'randomLongEmailAddressXQCPRT123@odin.net' },
  });

  await prismaNeon.$disconnect();
});

describe('POST /signup validator tests', () => {
  test('All input fields are required', (done) => {
    request(app)
      .post('/signup')
      .send({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        passwordConfirmation: '',
      })
      // .expect('Content-Type', /json/)
      .expect({
        errors: [
          {
            type: 'field',
            value: '',
            msg: 'First name is required.',
            path: 'firstName',
            location: 'body',
          },
          {
            type: 'field',
            value: '',
            msg: 'Last name is required.',
            path: 'lastName',
            location: 'body',
          },
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
            msg: 'Password confirmation is required.',
            path: 'passwordConfirmation',
            location: 'body',
          },
        ],
        isUserCreated: false,
      })
      .expect(409, done);
  });

  test('Name should contain only alphabetic characters', (done) => {
    request(app)
      .post('/signup')
      .send({ ...validUser, firstName: 'Harold1' })
      .expect('Content-Type', /json/)
      .expect({
        errors: [
          {
            type: 'field',
            value: 'Harold1',
            msg: 'First name must only contain letters.',
            path: 'firstName',
            location: 'body',
          },
        ],
        isUserCreated: false,
      })
      .expect(409, done);
  });

  test('Wrong format password should fail registration', (done) => {
    request(app)
      .post('/signup')
      .send({ ...validUser, password: 'incorrect' })
      .expect('Content-Type', /json/)
      .expect({
        errors: [
          {
            type: 'field',
            value: 'incorrect',
            msg: 'Password must be 6+ chars with at least one uppercase letter.',
            path: 'password',
            location: 'body',
          },
          {
            type: 'field',
            value: 'Admin1',
            msg: 'Passwords did not match.',
            path: 'passwordConfirmation',
            location: 'body',
          },
        ],
        isUserCreated: false,
      })
      .expect(409, done);
  });

  test('Wrong pass confirmation should fail registration', (done) => {
    request(app)
      .post('/signup')
      .send({ ...validUser, passwordConfirmation: 'wrongPass' })
      .expect('Content-Type', /json/)
      .expect({
        errors: [
          {
            type: 'field',
            value: 'wrongPass',
            msg: 'Passwords did not match.',
            path: 'passwordConfirmation',
            location: 'body',
          },
        ],
        isUserCreated: false,
      })
      .expect(409, done);
  });

  test('User can register if email not in use.', (done) => {
    request(app)
      .post('/signup')
      .send(validUser)
      .expect('Content-Type', /json/)
      .expect(
        {
          isUserCreated: true,
          errors: [],
        },
        done,
      );
  });

  test('User cant register if email in use', (done) => {
    request(app)
      .post('/signup')
      .send(validUser)
      .expect('Content-Type', /json/)
      .expect(
        {
          errors: [
            {
              type: 'field',
              value: 'randomLongEmailAddressXQCPRT123@odin.net',
              msg: 'E-mail already in use.',
              path: 'email',
              location: 'body',
            },
          ],
          isUserCreated: false,
        },
        done,
      );
  });
});

const validUser = {
  firstName: 'John',
  lastName: 'Doe',
  email: 'randomLongEmailAddressXQCPRT123@odin.net',
  password: 'Admin1',
  passwordConfirmation: 'Admin1',
};
