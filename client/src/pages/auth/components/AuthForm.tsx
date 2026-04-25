import { useContext, useState } from 'react';
import AuthContext from '../../../context/AuthContext';
import { useNavigate } from 'react-router';
import formValidator from '../../../utils/formValidator.client';
import userAuth from '../../../services/userAuth.client';
import initialFormData from '../../../const/initialData';

export default function AuthForm({ isSignupPage }: { isSignupPage: boolean }) {
  const authContext = useContext(AuthContext);
  const [isAuthLoading, setIsAuthLoading] = useState(false);
  const navigate = useNavigate();

  if (!authContext) {
    navigate('/error');
    return <></>;
  }

  const signupUser = async () => {
    setIsAuthLoading(true);

    const signupResult = await userAuth(
      authContext.formData.email,
      authContext.formData.password,
      isSignupPage,
      authContext.formData.firstName,
      authContext.formData.lastName,
      authContext.formData.passwordConfirmation,
    );

    // If isUserCreated return false
    if (!signupResult.isUserCreated) {
      // Set error message extracted from express validator
      authContext.setFormErrors({
        ...initialFormData,
        [signupResult.errors[0].path]: signupResult.errors[0].msg,
      });
    }

    setIsAuthLoading(false);
  };

  const signinUser = async () => {
    setIsAuthLoading(true);

    const signinResult = await userAuth(
      authContext.formData.email,
      authContext.formData.password,
      isSignupPage,
    );

    // If errors set them to error state
    if (typeof signinResult.isUserCreated !== 'undefined') {
      authContext.setFormErrors({
        ...initialFormData,
        [signinResult.errors[0].path]: signinResult.errors[0].msg,
      });
    } else {
      localStorage.setItem('token', signinResult.token);
      navigate('/dashboard/home');
    }

    setIsAuthLoading(false);
  };

  return (
    <form
      onSubmit={(e) => e.preventDefault()}
      className='mt-5! flex flex-col gap-2'
    >
      {isSignupPage && (
        <div className='grid lg:grid-cols-2 gap-2'>
          <div className='flex flex-col'>
            <label className='form-label' htmlFor='firstName'>
              First Name{' '}
            </label>
            <input
              onChange={(e) =>
                authContext.setFormData({
                  ...authContext.formData,
                  firstName: e.target.value,
                })
              }
              className='form-input'
              type='text'
              name='firstName'
              minLength={3}
              maxLength={16}
              id='firstName'
              value={authContext.formData.firstName}
              required
              placeholder='e.g John'
              pattern='[A-Za-z]+'
            />
            <span className='error-span'>
              {authContext.formErrors.firstName}
            </span>
          </div>
          <div className='flex flex-col'>
            <label className='form-label' htmlFor='lastName'>
              Last Name
            </label>
            <input
              onChange={(e) =>
                authContext.setFormData({
                  ...authContext.formData,
                  lastName: e.target.value,
                })
              }
              className='form-input'
              minLength={3}
              maxLength={16}
              type='text'
              name='lastName'
              id='lastName'
              value={authContext.formData.lastName}
              required
              placeholder='e.g Doe'
              pattern='[A-Za-z]+'
            />
            <span className='error-span'>
              {authContext.formErrors.lastName}
            </span>
          </div>
        </div>
      )}
      <div className='flex flex-col'>
        <label className='form-label' htmlFor='email'>
          Email{' '}
        </label>
        <input
          onChange={(e) =>
            authContext.setFormData({
              ...authContext.formData,
              email: e.target.value,
            })
          }
          className='form-input'
          type='email'
          name='email'
          id='email'
          value={authContext.formData.email}
          required
          placeholder='johnDoe@example.com'
        />
        <span className='error-span'>{authContext.formErrors.email}</span>
      </div>
      <div className={`${isSignupPage && 'grid lg:grid-cols-2 gap-2'}`}>
        <div className='flex flex-col'>
          <label className='form-label' htmlFor='password'>
            Password
          </label>
          <input
            onChange={(e) =>
              authContext.setFormData({
                ...authContext.formData,
                password: e.target.value,
              })
            }
            className='form-input'
            type='password'
            name='password'
            id='password'
            value={authContext.formData.password}
            required
            placeholder='******'
            pattern='^(?=.*[A-Z]).{6,}$'
          />
          <span className='error-span'>{authContext.formErrors.password}</span>
        </div>
        {isSignupPage && (
          <div className='flex flex-col'>
            <label className='form-label' htmlFor='passConfirm'>
              Password confirmation
            </label>
            <input
              onChange={(e) =>
                authContext.setFormData({
                  ...authContext.formData,
                  passwordConfirmation: e.target.value,
                })
              }
              className='form-input'
              type='password'
              name='passConfirm'
              id='passConfirm'
              value={authContext.formData.passwordConfirmation}
              required
              placeholder='******'
              pattern='^(?=.*[A-Z]).{6,}$'
            />
            <span className='error-span'>
              {authContext.formErrors.passwordConfirmation}
            </span>
          </div>
        )}
      </div>
      <button
        type='button'
        onClick={async () => {
          // Validate user input on client side
          const { isValid, errors } = formValidator(
            authContext.formData.email,
            authContext.formData.firstName,
            authContext.formData.lastName,
            authContext.formData.password,
            authContext.formData.passwordConfirmation,
            isSignupPage,
          );

          // If inputs is valid continue with user signup
          if (isValid) {
            authContext.resetForm();
            authContext.resetFormErrors();

            // If this is signup try to send api request to signup user
            if (isSignupPage) {
              signupUser();
              // Sign in user
            } else if (!isSignupPage) {
              signinUser();
            }
          } else {
            authContext.setFormErrors(errors);
          }
        }}
        className='group form-button'
      >
        {/* If user data if validating display loading icon */}
        {isAuthLoading ? (
          <LoadingSvg />
        ) : isSignupPage ? (
          'Create Account'
        ) : (
          'Sign In'
        )}{' '}
        {!isAuthLoading && (
          <svg
            xmlns='http://www.w3.org/2000/svg'
            height='20px'
            viewBox='0 -960 960 960'
            width='20px'
            fill='#e3e3e3'
            className='group-hover:translate-x-1 transition-transform'
          >
            <path d='M647-440H160v-80h487L423-744l57-56 320 320-320 320-57-56 224-224Z' />
          </svg>
        )}
      </button>
    </form>
  );
}

function LoadingSvg() {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      height='24px'
      viewBox='0 -960 960 960'
      width='24px'
      fill='#e3e3e3'
      className='animate-spin'
    >
      <path d='M325-111.5q-73-31.5-127.5-86t-86-127.5Q80-398 80-480.5t31.5-155q31.5-72.5 86-127t127.5-86Q398-880 480-880q17 0 28.5 11.5T520-840q0 17-11.5 28.5T480-800q-133 0-226.5 93.5T160-480q0 133 93.5 226.5T480-160q133 0 226.5-93.5T800-480q0-17 11.5-28.5T840-520q17 0 28.5 11.5T880-480q0 82-31.5 155t-86 127.5q-54.5 54.5-127 86T480.5-80Q398-80 325-111.5Z' />
    </svg>
  );
}
