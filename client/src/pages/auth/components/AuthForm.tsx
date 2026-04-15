export default function AuthForm({ isSignupPage }: { isSignupPage: boolean }) {
  return (
    <form className='mt-5! flex flex-col gap-3'>
      {isSignupPage && (
        <>
          <div className=' flex flex-col'>
            <label htmlFor='firstName'>First Name</label>
            <input
              className='border p-1.5 rounded-xl border-neutral-300 text-neutral-900'
              type='text'
              name='firstName'
              id='firstName'
              placeholder='John'
            />
          </div>
          <div className=' flex flex-col'>
            <label htmlFor='lastName'>Last Name</label>
            <input
              className='border p-1.5 rounded-xl border-neutral-300 text-neutral-900'
              type='text'
              name='lastName'
              id='lastName'
              placeholder='Doe'
            />
          </div>
        </>
      )}
      <div className=' flex flex-col'>
        <label htmlFor='email'>Email</label>
        <input
          className='border p-1.5 rounded-xl border-neutral-300 text-neutral-900'
          type='email'
          name='email'
          id='email'
          placeholder='johnDoe@example.com'
        />
      </div>
      <div className=' flex flex-col'>
        <label htmlFor='password'>Password</label>
        <input
          className='border p-1.5 rounded-xl border-neutral-300 text-neutral-900'
          type='password'
          name='password'
          id='password'
          placeholder='******'
        />
      </div>
      {isSignupPage && (
        <div className=' flex flex-col'>
          <label htmlFor='passConfirm'>Repeat password</label>
          <input
            className='border p-1.5 rounded-xl border-neutral-300 text-neutral-900'
            type='password'
            name='passConfirm'
            id='passConfirm'
            placeholder='******'
          />
        </div>
      )}
    </form>
  );
}
