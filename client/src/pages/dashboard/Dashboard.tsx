import { Outlet } from 'react-router';
import Header from '../../components/layout/Header';
import useFetch from '../../hooks/useFetch';
import { useNavigate } from 'react-router';
import type { Decoded } from '../../types/auth';
import DashContext, { CurrentPageContext } from '../../context/DashContext';
import { useEffect, useState } from 'react';
import Sidebar from '../../components/layout/NavSidebar';

export default function Dashboard() {
  const { isLoading, error, data } = useFetch<Decoded>('dashboard/getUserData');
  const [currentPage, setCurrentPage] = useState<string>('Home');
  const nav = useNavigate();

  // If error happens durning fetch navigate user to error page and sign him out
  useEffect(() => {
    if (error) {
      clearLocalStorage();
      nav('/error');
    }
  }, [error, data, nav]);

  if (isLoading) {
    return <div>Loading</div>;
  }

  if (!data?.decoded) {
    return null; // prevent rendering before redirect
  }

  localStorage.setItem('exp', data.decoded.iat.toString());

  autoSignOut();
  return (
    <main
      className={`flex flex-col bg-theme min-h-screen ${isLoading ? 'items-center justify-center' : ''}`}
    >
      <DashContext value={data}>
        <CurrentPageContext value={{ currentPage, setCurrentPage }}>
          {!isLoading ? (
            <>
              <Header />
              <div className='flex justify-between h-screen'>
                <Sidebar />
                <div className='ml-15! md:ml-35! lg:ml-53!'>
                  <Outlet />
                </div>
              </div>
            </>
          ) : (
            <div>Loading</div>
          )}
        </CurrentPageContext>
      </DashContext>
    </main>
  );
}

function autoSignOut() {
  const exp = localStorage.getItem('exp');

  if (!exp) {
    localStorage.removeItem('token');
  }

  const now = Date.now();

  // If exp in local storage is smaller than now sign user out-
  // -by removing token from localstorage
  if (now < Number(exp)) {
    clearLocalStorage();
  }
}

function clearLocalStorage() {
  localStorage.removeItem('token');
  localStorage.removeItem('exp');
}
