import { useEffect, useState } from 'react';
import { Settings as SettingsIcon } from 'lucide-react';
import useSetCurrentPage from '../../../hooks/useSetCurrentPage';
import { useContext } from 'react';
import DashContext from '../../../context/DashContext';

export default function Settings() {
  const currentUser = useContext(DashContext)?.fullUser;
  // Form state
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [bio, setBio] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  useEffect(() => {
    document.title = 'Tribe Social | Settings';

    const updateFormInputs = () => {
      if (currentUser) {
        setFirstName(currentUser?.firstName);
        setLastName(currentUser.lastName);
        setBio(currentUser.bio || '');
      }
    };

    updateFormInputs();
  }, [currentUser]);

  useSetCurrentPage('Settings');

  return (
    <div className='main-w h-full'>
      <main className='lg:max-w-250 p-5 mx-auto! *:border *:p-2 *:rounded-xl h-full gap-5 flex flex-col *:dark:bg-neutral-700/15 *:dark:border-neutral-700 *:border-neutral-300 *:bg-neutral-100/40'>
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
          <form
            onSubmit={(e) => e.preventDefault()}
            className=' flex flex-col gap-4 text-gray-900 dark:text-gray-100'
          >
            {/* Profile Section */}
            <div className='p-2 rounded-xl space-y-5'>
              <div>
                <h2 className='text-lg font-semibold'>Profile</h2>
                <p className='text-sm text-gray-500 dark:text-gray-400'>
                  Edit your personal information directly
                </p>
              </div>
              <div className='grid gap-4'>
                <div className='mt-5!'>
                  <label className='text-sm' htmlFor='email'>
                    Email
                  </label>
                  <input
                    type='email'
                    name='email'
                    id='email'
                    value={currentUser?.email || ''}
                    disabled
                    className='w-full px-3 py-2 mt-1! rounded-lg border bg-gray-100 dark:bg-gray-800 border-gray-300 dark:border-gray-700 cursor-not-allowed'
                  />
                </div>
                <div>
                  <label className='text-sm' htmlFor='firstName'>
                    First name
                  </label>
                  <input
                    type='text'
                    name='firstName'
                    id='firstName'
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder='First name'
                    className='w-full px-3 py-2 mt-1! rounded-lg border bg-white dark:bg-gray-950 border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-purple-500 outline-none'
                  />
                </div>
                <div>
                  <label className='text-sm' htmlFor='lastName'>
                    Last name
                  </label>
                  <input
                    type='text'
                    id='lastName'
                    name='lastName'
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    placeholder='Last name'
                    className='w-full px-3 py-2 mt-1! rounded-lg border bg-white dark:bg-gray-950 border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-purple-500 outline-none'
                  />
                </div>
                <div>
                  <label className='text-sm' htmlFor='bio'>
                    Bio
                  </label>
                  <textarea
                    name='bio'
                    id='bio'
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    rows={3}
                    maxLength={200}
                    placeholder='Bio'
                    className='w-full mt-1! px-3 py-2 rounded-lg border bg-white dark:bg-gray-950 border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-purple-500 outline-none resize-none'
                  />
                  <p className='text-xs text-gray-500 dark:text-gray-400 text-right'>
                    {bio.length}/200
                  </p>
                </div>
                {/* Password Section */}
                <div>
                  <label className='text-sm' htmlFor='password'>
                    Password
                  </label>
                  <input
                    type='password'
                    name='password'
                    id='password'
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder='New password'
                    pattern='(?=.*[A-Z]).{6,}'
                    title='At least 6 characters and 1 uppercase letter'
                    className='w-full px-3 py-2 rounded-lg border bg-white dark:bg-gray-950 border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-purple-500 outline-none'
                  />
                </div>
                <div>
                  <label className='text-sm' htmlFor='passwordConfirmation'>
                    Confirm password
                  </label>
                  <input
                    type='password'
                    name='passwordConfirmation'
                    id='passwordConfirmation'
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder='Confirm password'
                    className='w-full px-3 py-2 rounded-lg border bg-white dark:bg-gray-950 border-gray-300 dark:border-gray-700 disabled:opacity-50 focus:ring-2 focus:ring-purple-500 outline-none'
                  />
                </div>
                {newPassword &&
                  confirmPassword &&
                  newPassword !== confirmPassword && (
                    <p className='text-xs text-red-500'>
                      Passwords do not match
                    </p>
                  )}
              </div>
            </div>
            {/* Save */}
            <button
              type='submit'
              disabled={newPassword !== confirmPassword}
              className='w-full py-3 rounded-lg bg-purple-600 hover:bg-purple-700 text-white font-medium transition disabled:opacity-50 disabled:cursor-not-allowed'
            >
              Save Changes
            </button>
          </form>
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
