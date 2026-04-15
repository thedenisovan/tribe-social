export default function AuthForm({ isSignupPage }: { isSignupPage: boolean }) {
  return (
    <form
      onSubmit={(e) => e.preventDefault()}
      className='mt-5! flex flex-col gap-2'
    >
      {isSignupPage && (
        <>
          <div className='flex flex-col'>
            <label className='form-label' htmlFor='firstName'>
              First Name
            </label>
            <input
              className='form-input'
              type='text'
              name='firstName'
              id='firstName'
              placeholder='e.g John'
            />
          </div>
          <div className='flex flex-col'>
            <label className='form-label' htmlFor='lastName'>
              Last Name
            </label>
            <input
              className='form-input'
              type='text'
              name='lastName'
              id='lastName'
              placeholder='e.g Doe'
            />
          </div>
        </>
      )}
      <div className='flex flex-col'>
        <label className='form-label' htmlFor='email'>
          Email
        </label>
        <input
          className='form-input'
          type='email'
          name='email'
          id='email'
          placeholder='johnDoe@example.com'
        />
      </div>
      <div className='flex flex-col'>
        <label className='form-label' htmlFor='password'>
          Password
        </label>
        <input
          className='form-input'
          type='password'
          name='password'
          id='password'
          placeholder='******'
        />
      </div>
      {isSignupPage && (
        <div className='flex flex-col'>
          <label className='form-label' htmlFor='passConfirm'>
            Repeat password
          </label>
          <input
            className='form-input'
            type='password'
            name='passConfirm'
            id='passConfirm'
            placeholder='******'
          />
        </div>
      )}
      <button className='group form-button'>
        {isSignupPage ? 'Create Account' : 'Sign In'}{' '}
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
      </button>
    </form>
  );
}
