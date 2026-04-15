export default function AuthFooter() {
  return (
    <footer className='mt-8! flex flex-col gap-5'>
      <div className='flex items-center'>
        <div className='flex-1 h-px border-t border-gray-400 dark:border-gray-700'></div>
        <p className='mx-4! text-xs dark:text-neutral-400 text-neutral-600'>
          OR CONTINUE WITH
        </p>
        <div className='flex-1 h-px border-t border-gray-400 dark:border-gray-700'></div>
      </div>
      <div className='grid grid-cols-2'>
        <button>Google</button>
        <button>GitHub</button>
      </div>
      <p className='text-center text-xs dark:text-neutral-400'>
        By continuing, you agree to Tribe's{' '}
        <a
          className='underline'
          href='https://www.youtube.com/watch?v=iE39q-IKOzA'
          target='_blank'
        >
          Terms of Service
        </a>{' '}
        and{' '}
        <a
          className='underline'
          target='_blank'
          href='https://www.youtube.com/watch?v=4TV_128Fz2g&list=RDwugY6HNLOCo&index=3'
        >
          privacy policy
        </a>
        .
      </p>
    </footer>
  );
}
