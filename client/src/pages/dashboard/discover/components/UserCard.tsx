import type { DefaultUser } from '../../../../types/auth';
import { Link } from 'react-router';

export default function UserCard({ user }: { user: DefaultUser }) {
  return (
    <Link to={`/dashboard/profile/${user.id}`}>
      <div className='flex hover:-translate-y-1 transition-transform border rounded-2xl border-neutral-300 dark:border-neutral-700 gap-1 px-3 py-5 overflow-auto'>
        <div>
          {' '}
          {user.avatarUrl ? (
            user.avatarUrl
          ) : (
            <div className='flex h-10 w-10 items-center justify-center bg-linear-to-br from-purple-500 to-pink-500 p-1 rounded-full '>
              <p className='text-sm text-white'>
                {user.firstName[0].toUpperCase()}
              </p>
              <p className='text-sm text-white'>
                {user.lastName[0].toUpperCase()}
              </p>
            </div>
          )}
        </div>
        <div>
          <header className='flex gap-1 font-bold'>
            <p>{user.id}</p>
            <p>{user.firstName}</p>
            <p>{user.lastName}</p>
          </header>
          <p className='dark:text-neutral-200 text-neutral-700 text-xs'>
            {user.email}
          </p>
          <p className='text-sm'>{user.bio}</p>
        </div>
      </div>
    </Link>
  );
}
