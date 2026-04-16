import { Link } from 'react-router';

const ErrorPage = () => {
  return (
    <div className='flex gap-2 flex-col items-center justify-center h-screen bg-linear-to-br from-gray-100 via-gray-200 to-blue-100 text-center px-4'>
      <h1 className='text-5xl font-bold text-gray-800 mb-4'>
        Oops! Page not found.
      </h1>
      <p className='text-lg text-gray-600 mb-6'>
        The page you are looking for does not exist or was moved.
      </p>
      <Link
        to='/'
        className='px-6 py-3 bg-black text-white rounded-lg hover:bg-black/80 transition'
      >
        Go back home
      </Link>
    </div>
  );
};

export default ErrorPage;
