import { body } from 'express-validator';
import prismaNeon from '../db/prisma.js';
import bcrypt from 'bcryptjs';

const alphaErr = 'must only contain letters.';
const generalErr = 'Invalid username or password.';
const isLengthErr = 'must be between 3 and 16 characters.';
const notEmptyErr = 'is required.';

// Signup validator chain
const signupValidator = [
  nameValidator(true),
  nameValidator(false),
  emailValidator(true),
  passwordValidator(),
  passwordConfirmationValidator(),
];

// Signin validator chain
const signinValidator = [emailValidator(false), ...signinPasswordValidator()];

// Validation chain for when user wants to update his details
const updatePersonalDataValidator = [
  nameValidator(true, true),
  nameValidator(false, true),
  passwordValidator(true),
];

// Validation for firstName / lastName
function nameValidator(isFirstName: boolean, canBeEmpty: boolean = false) {
  const field = isFirstName ? 'firstName' : 'lastName';
  const label = isFirstName ? 'First name' : 'Last name';

  let validator = body(field).trim();

  if (canBeEmpty) {
    // If field is missing, null, or empty string -> skip ALL validation below
    validator = validator.optional({ checkFalsy: true });
  } else {
    // Field is required -> must not be empty
    validator = validator
      .notEmpty()
      .withMessage(`${label} ${notEmptyErr}`)
      .bail();
  }

  return (
    validator
      // Only runs if value exists (not skipped by optional)
      .isAlpha()
      .withMessage(`${label} ${alphaErr}`)
      .bail()

      // Only runs if previous checks passed
      .isLength({ min: 3, max: 16 })
      .withMessage(`${label} ${isLengthErr}`)
  );
}

function emailValidator(isSignupValidator: boolean) {
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

      // If user exists and this is signupValidator
      if (isSignupValidator && user) {
        throw new Error(`E-mail already in use.`);
        // Else if this is signinValidator and no user found throw this error
      } else if (!isSignupValidator && !user) {
        throw new Error(generalErr);
      }

      return true;
    });
}

function passwordValidator(canBeEmpty: boolean = false) {
  let validator = body('password').trim();

  if (canBeEmpty) {
    // If password is missing or empty -> skip entire validation
    validator = validator.optional({ checkFalsy: true });
  } else {
    // Password is required
    validator = validator
      .notEmpty()
      .withMessage(`Password ${notEmptyErr}`)
      .bail();
  }

  // Only runs when value exists (not skipped by optional)
  return validator
    .matches(/^(?=.*[A-Z]).{6,}$/)
    .withMessage(
      'Password must be 6+ chars with at least one uppercase letter.',
    );
}

function passwordConfirmationValidator() {
  return body('passwordConfirmation')
    .trim()
    .notEmpty()
    .withMessage(`Password confirmation ${notEmptyErr}`)
    .bail()
    .custom(async (value, { req }) => {
      if (value !== req.body.password) {
        throw new Error('Passwords did not match.');
      }

      return true;
    });
}

// Validator to make sure that user enters correct password to given email
function signinPasswordValidator() {
  // Return array of two validators, later will flatten it, inside main signin validator array
  return [
    passwordValidator(),
    body('password').custom(async (value, { req }) => {
      const user = await prismaNeon.user.findUnique({
        where: { email: req.body.email },
      });

      // If in case user is not found throw general error
      if (!user) {
        throw new Error(generalErr);
      }

      const passComparisonResult = await bcrypt.compare(
        value,
        user?.hashedPassword,
      );

      // If password does not match
      if (!passComparisonResult) {
        throw new Error(generalErr);
      }

      return true;
    }),
  ];
}

export { signupValidator, signinValidator, updatePersonalDataValidator };
