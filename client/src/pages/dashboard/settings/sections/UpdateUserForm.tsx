import { useContext, useState } from 'react';
import DashContext from '../../../../context/DashContext';
import { updateUserProfile } from '../../../../services/updateUserProfile.client';
import { LoadingSvg } from '../../../auth/components/AuthForm';

export default function UpdateUserForm() {
  const dashContext = useContext(DashContext);
  // Form state
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [bio, setBio] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const clearInputs = () => {
    setFirstName('');
    setLastName('');
    setBio('');
    setPassword('');
    setConfirmPassword('');
  };

  return (
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
              value={dashContext?.fullUser?.email || ''}
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
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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
          {password && confirmPassword && password !== confirmPassword && (
            <p className='text-xs text-red-500'>Passwords do not match</p>
          )}
        </div>
      </div>
      {/* Save */}
      <button
        onClick={async () => {
          setIsLoading(true);
          // Update user profile with state data
          const result = await updateUserProfile(dashContext!.fullUser!.id, {
            firstName,
            lastName,
            bio,
            password,
          });

          setIsLoading(false);
          clearInputs();

          // If no errors update dash context state for full user
          if (result.errors.length === 0 && result.user) {
            dashContext?.setFullUser(result.user);
          } else if (result.errors) {
            console.log(result.errors);
          }
        }}
        type='button'
        disabled={password !== confirmPassword}
        className='w-full flex justify-center py-3 rounded-lg bg-purple-600 hover:bg-purple-700 text-white font-medium transition disabled:opacity-50 disabled:cursor-not-allowed'
      >
        {isLoading ? <LoadingSvg /> : 'Save Changes'}
      </button>
    </form>
  );
}
