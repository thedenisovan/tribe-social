import { useContext, useEffect, useState } from 'react';
import useFetch from '../../../hooks/useFetch';
import useSetCurrentPage from '../../../hooks/useSetCurrentPage';

import DashContext from '../../../context/DashContext';
import UserCard from './components/UserCard';
import type { FullUser } from '../../../types/auth';

export default function Discover() {
  const userId = useContext(DashContext)?.fullUser?.id;
  const [users, setUsers] = useState<FullUser[] | []>([]);
  const [paginationPage, setPaginationPage] = useState<number>(0);
  const { isLoading, error, data } = useFetch<FullUser[]>(
    `dashboard/discover/getUsers/${userId}/${paginationPage}`,
  );

  useEffect(() => {
    document.title = 'Tribe Social | Discover';

    const updateUsers = async () => {
      if (data) {
        setUsers(data);
      }

      // If fetch did not return any more users disable pagination logic
      if (data?.length === 0) {
        setPaginationPage((page) => (page = page - 1));
      }
    };

    updateUsers();
  }, [userId, data]);

  useSetCurrentPage('Discover');

  if (isLoading) {
    return <h1>Loading</h1>;
  }

  if (error) {
    <h1>Error</h1>;
  }

  return (
    <main className='main-w'>
      <div className='p-5'>
        <header className='mb-5!'>
          <h2>this is discover</h2>
          <form onSubmit={(e) => e.preventDefault()}>
            <input
              type='search'
              name='userSearch'
              placeholder='Search users...'
            />
          </form>
        </header>
        <div className='grid lg:grid-cols-2 gap-4'>
          {users.map((user) => (
            <UserCard key={user.id} user={user} />
          ))}
        </div>
        <footer className='text-center'>{paginationPage + 1}</footer>
        <div className='flex justify-center gap-5'>
          <button
            onClick={() => setPaginationPage((page) => (page = page - 1))}
            disabled={paginationPage <= 0}
            className={`${paginationPage <= 0 ? 'hidden' : ''}`}
          >
            -
          </button>
          <button
            className={`${users.length < 10 ? 'hidden' : ''}`}
            disabled={users.length < 10}
            onClick={() => setPaginationPage((page) => (page = page + 1))}
          >
            +
          </button>
        </div>
      </div>
    </main>
  );
}
