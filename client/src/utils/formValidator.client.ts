import REGEX from '../constants/regex';
import type AuthData from '../types/auth';

function formValidator(
  email: string,
  firstName: string,
  lastName: string,
  password: string,
  passwordConfirmation: string,
  isSignupPage: boolean,
) {
  const errors: AuthData = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    passwordConfirmation: '',
  };

  // Email
  if (!email.trim()) {
    errors.email = '❗Please provide an email address.';
  } else if (!REGEX.emailRegex.test(email)) {
    errors.email = '❗Please provide a valid email address.';
  }

  // Password
  if (!password.trim()) {
    errors.password = '❗Please provide a password.';
  } else if (!REGEX.passwordRegex.test(password)) {
    errors.password = '❗6+ chars, with at least one uppercase.';
  }

  if (isSignupPage) {
    // First Name
    if (!firstName.trim()) {
      errors.firstName = '❗What is your first name?';
    } else if (firstName.length < 3 || firstName.length > 16) {
      errors.firstName = '❗Must be 3 to 16 characters long.';
    } else if (!REGEX.nameRegex.test(firstName)) {
      errors.firstName = '❗Must contain only alphabetical characters.';
    }

    // Last Name
    if (!lastName.trim()) {
      errors.lastName = '❗What is your last name?';
    } else if (lastName.length < 3 || lastName.length > 16) {
      errors.lastName = '❗Must be 3 to 16 characters long.';
    } else if (!REGEX.nameRegex.test(lastName)) {
      errors.lastName = '❗Must contain only alphabetical characters.';
    }

    // Password Confirmation
    if (!passwordConfirmation.trim()) {
      errors.passwordConfirmation = '❗Confirm your password.';
    } else if (passwordConfirmation !== password) {
      errors.passwordConfirmation = '❗Passwords do not match.';
    }
  }

  const isValid = !Object.values(errors).some(Boolean);

  return {
    isValid,
    errors,
  };
}

export default formValidator;
