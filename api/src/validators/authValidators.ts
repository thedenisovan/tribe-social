import { body } from 'express-validator';
import prismaNeon from '../db/prisma.js';

enum Name {
  FirstName,
  LastName,
}

const alphaErr = 'must only contain letters.';
const isLengthErr = 'must be between 3 and 16 characters.';
const notEmptyErr = 'is required.';

// Validator chain
const signupValidator = [
  nameValidator(Name.FirstName),
  nameValidator(Name.LastName),
  emailValidator(),
  passwordValidator(),
];

// Based on function input return validator for firstName or lastName from form body
function nameValidator(name: Name) {
  const currentName = name === Name.FirstName ? 'First name' : 'Last name';

  return body(name === Name.FirstName ? 'firstName' : 'lastName')
    .trim()
    .notEmpty()
    .withMessage(`${currentName} ${notEmptyErr}`)
    .bail()
    .isAlpha()
    .withMessage(`${currentName} ${alphaErr}`)
    .bail()
    .isLength({ min: 3, max: 16 })
    .withMessage(`${currentName} ${isLengthErr}`);
}

function emailValidator() {
  return body('email')
    .trim()
    .notEmpty()
    .withMessage(`Email ${notEmptyErr}`)
    .bail()
    .isEmail()
    .withMessage('Invalid email format.')
    .custom(async (value) => {
      const user = await prismaNeon.user.findUnique({
        where: { email: value },
      });

      if (user) throw new Error(`E-mail already in use.`);
    });
}

function passwordValidator() {
  return (
    body('password')
      .trim()
      .notEmpty()
      .withMessage(`Password ${notEmptyErr}`)
      .bail()
      .matches(/^(?=.*[A-Z]).{6,}$/)
      .withMessage(
        'Password must be 6+ chars with at least one uppercase letter.',
      ),
    body('passwordConfirmation')
      .trim()
      .notEmpty()
      .withMessage(`Password confirmation ${notEmptyErr}`)
      .bail()
      .custom(async (value, { req }) => {
        if (value !== req.body.password)
          throw new Error('Passwords did not match.');
      })
  );
}

export { signupValidator };
