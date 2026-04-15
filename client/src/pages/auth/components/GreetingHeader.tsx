// Header for auth section
export default function GreetingHeader({
  isSignupPage,
}: {
  isSignupPage: boolean;
}) {
  return (
    <>
      <h3 className='text-3xl tracking-tight font-bold mt-7! mb-2!'>
        {isSignupPage ? 'Hello, new friend' : 'Welcome back'}
      </h3>
      <p className='text-neutral-600 mb-6! dark:text-neutral-400 '>
        {isSignupPage
          ? 'Create an account and join the Tribe'
          : 'Enter your details to access your account'}
      </p>
    </>
  );
}
