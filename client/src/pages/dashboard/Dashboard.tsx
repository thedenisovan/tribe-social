import { Outlet } from 'react-router';
import Header from '../../components/layout/Header';
import { useNavigate } from 'react-router';
import type { FullUser, Post } from '../../types/auth';
import DashContext, { CurrentPageContext } from '../../context/DashContext';
import { useEffect, useState } from 'react';
import Sidebar from '../../components/layout/NavSidebar';
import useDecodedData from '../../hooks/useDecodeData';

export default function Dashboard() {
  const { isLoading, error, data } = useDecodedData();
  const [currentPage, setCurrentPage] = useState<string>('Home');
  const [userPosts, setUserPosts] = useState<Post[] | []>([]);
  const [fullUser, setFullUser] = useState<null | FullUser>(null);
  const nav = useNavigate();

  // If error happens durning fetch navigate user to error page and sign him out
  useEffect(() => {
    if (error) {
      clearLocalStorage();
      nav('/error');
    }

    const updateAfterFetch = () => {
      if (!isLoading) {
        setFullUser(data);
        if (fullUser) {
          setUserPosts(fullUser?.posts);
        }
      }
    };

    updateAfterFetch();
  }, [error, data, nav, isLoading, fullUser]);

  if (isLoading) {
    return <div>Loading</div>;
  }

  if (!fullUser) {
    return null; // prevent rendering before redirect
  }

  autoSignOut();
  return (
    <main
      className={`flex flex-col bg-theme min-h-screen ${isLoading ? 'items-center justify-center' : ''}`}
    >
      <DashContext
        value={{
          fullUser,
          userPosts,
          setUserPosts,
          setFullUser,
        }}
      >
        <CurrentPageContext value={{ currentPage, setCurrentPage }}>
          {!isLoading ? (
            <>
              <Header />
              <div className='flex justify-between min-h-[calc(100vh-65px)] md:min-h-[calc(100vh-73px)]'>
                <Sidebar />
                <div className='ml-16.5! md:ml-40! lg:ml-70!'>
                  <Outlet />
                </div>
                <div className='fixed h-[50%] right-0  hidden md:block border min-w-50 dark:border-neutral-500 mr-5!'></div>
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
  localStorage.removeItem('uid');
}
