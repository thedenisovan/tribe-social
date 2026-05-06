import { useEffect } from 'react';
import { Settings as SettingsIcon } from 'lucide-react';
import useSetCurrentPage from '../../../hooks/useSetCurrentPage';
import UpdateUserForm from './sections/UpdateUserForm';

export default function Settings() {
  useEffect(() => {
    document.title = 'Tribe Social | Settings';
  });

  useSetCurrentPage('Settings');

  return (
    <div className='main-w h-full'>
      <main className='lg:max-w-250 p-5 mx-auto! *:border *:p-2 *:rounded-xl h-full gap-5 flex flex-col *:dark:bg-neutral-700/10 *:dark:border-neutral-800 *:border-neutral-200 *:bg-neutral-100/40'>
        <header className='flex items-center gap-3'>
          <div className='w-12 h-12 bg-purple-600 rounded-xl flex items-center justify-center'>
            <SettingsIcon className='w-6 h-6 text-white' />
          </div>
          <div>
            <h1 className='text-2xl font-bold text-neutral-700 dark:text-neutral-200'>
              Settings
            </h1>
            <p className='text-neutral-700 dark:text-neutral-200'>
              Update your profile information
            </p>
          </div>
        </header>
        <section className='flex-1 '>
          <UpdateUserForm />
        </section>
        <footer className=''>
          <p className='text-sm text-neutral-500 dark:text-neutral-200'>
            <span className='font-bold'>How it works:</span> Fill in only the
            fields you want to update. Leave fields unchanged to keep your
            current settings.
          </p>
        </footer>
      </main>
    </div>
  );
}
