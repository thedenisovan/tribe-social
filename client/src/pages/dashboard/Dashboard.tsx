import { Outlet } from 'react-router';
import Header from '../../components/layout/Header';
import useFetch from '../../hooks/useFetch';
import { useNavigate } from 'react-router';
import type { Decoded } from '../../types/auth';

export default function Dashboard() {
  const { isLoading, error, data } = useFetch<Decoded>('dashboard/getUserData');
  const nav = useNavigate();

  if (error) {
    nav('/error');
  }

  if (!isLoading) {
    console.log(data);
  }

  return (
    <main className='flex flex-col bg-theme min-h-screen'>
      <Header />
      {!isLoading && (
        <div className='flex justify-between h-screen'>
          <aside>left aside</aside>
          <Outlet />
          <aside>right aside</aside>
        </div>
      )}
    </main>
  );
}
