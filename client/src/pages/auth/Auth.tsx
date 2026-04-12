import Hero from './sections/Hero';
import AuthForm from './sections/AuthForm';

export default function Auth() {
  return (
    <main className='flex min-w-screen min-h-screen'>
      <Hero />
      <AuthForm />
    </main>
  );
}
