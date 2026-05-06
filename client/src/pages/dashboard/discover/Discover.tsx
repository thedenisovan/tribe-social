import { useEffect } from 'react';
import useSetCurrentPage from '../../../hooks/useSetCurrentPage';
import getUsers from '../../../services/getUsers.client';

export default function Discover() {
  useEffect(() => {
    document.title = 'Tribe Social | Discover';
  });

  useSetCurrentPage('Discover');

  getUsers(0);

  return (
    <main className='m-5! main-w '>
      <header className='border'>
        <h2>this is discover</h2>
        <form onSubmit={(e) => e.preventDefault()}>
          <input
            type='search'
            name='userSearch'
            placeholder='Search users...'
          />
        </form>
      </header>
    </main>
  );
}
