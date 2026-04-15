export default function AuthForm({ isSignupPage }: { isSignupPage: boolean }) {
  return (
    <form
      onSubmit={(e) => e.preventDefault()}
      className='mt-5! flex flex-col gap-2'
    >
      {isSignupPage && (
        <>
          <div className=' flex flex-col'>
            <label className='text-sm font-medium mt-2!' htmlFor='firstName'>
              First Name
            </label>
            <input
              className='border p-2.5 dark:border-neutral-700 mt-1! dark:text-neutral-200 rounded-xl border-neutral-300 text-neutral-900'
              type='text'
              name='firstName'
              id='firstName'
              placeholder='e.g John'
            />
          </div>
          <div className=' flex flex-col'>
            <label className='text-sm font-medium mt-2!' htmlFor='lastName'>
              Last Name
            </label>
            <input
              className='border p-2.5 dark:border-neutral-700 mt-1! dark:text-neutral-200 rounded-xl border-neutral-300 text-neutral-900'
              type='text'
              name='lastName'
              id='lastName'
              placeholder='e.g Doe'
            />
          </div>
        </>
      )}
      <div className=' flex flex-col'>
        <label className='text-sm font-medium mt-2!' htmlFor='email'>
          Email
        </label>
        <input
          className='border p-2.5 dark:border-neutral-700 mt-1! dark:text-neutral-200 rounded-xl border-neutral-300 text-neutral-900'
          type='email'
          name='email'
          id='email'
          placeholder='johnDoe@example.com'
        />
      </div>
      <div className=' flex flex-col'>
        <label className='text-sm font-medium mt-2!' htmlFor='password'>
          Password
        </label>
        <input
          className='border p-2.5 dark:border-neutral-700 mt-1! dark:text-neutral-200 rounded-xl border-neutral-300 text-neutral-900'
          type='password'
          name='password'
          id='password'
          placeholder='******'
        />
      </div>
      {isSignupPage && (
        <div className=' flex flex-col'>
          <label className='text-sm font-medium mt-2!' htmlFor='passConfirm'>
            Repeat password
          </label>
          <input
            className='border p-2.5 dark:border-neutral-700 mt-1! dark:text-neutral-200 rounded-xl border-neutral-300 text-neutral-900'
            type='password'
            name='passConfirm'
            id='passConfirm'
            placeholder='******'
          />
        </div>
      )}
      <button className='bg-purple-700 mt-3! p-2  shadow-xl font-medium! rounded-xl text-white'>
        {isSignupPage ? 'Create Account' : 'Sign In'}
      </button>
    </form>
  );
}
