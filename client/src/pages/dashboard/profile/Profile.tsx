import { useEffect } from 'react';
import { useContext } from 'react';
import DashContext from '../../../context/DashContext';
import { LightIcon, DarkIcon } from '../../../components/common/ThemeIcons';
import useSetCurrentPage from '../../../hooks/useSetCurrentPage';
import type { PostData, User } from '../../../types/auth';
import PostCard from '../../../components/common/PostCard';
import useFetch from '../../../hooks/useFetch';
import { useNavigate } from 'react-router';

export default function Profile() {
  const user = useContext(DashContext)?.decoded.decoded.user;
  const userPostContext = useContext(DashContext);
  const nav = useNavigate();

  // User posts
  const { isLoading, error, data } = useFetch<PostData[] | []>(
    `dashboard/profile/getUserPosts/${user?.id || 0}`,
  );

  useEffect(() => {
    document.title = 'Tribe Social | Profile';

    if (error) {
      nav('/error');
    }

    const updateUserPosts = () => {
      userPostContext?.setUserPosts(data || []);
    };

    updateUserPosts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error, data, nav]);

  useSetCurrentPage('Profile');

  if (isLoading) {
    return <div>Loading</div>;
  }

  if (user && userPostContext)
    return (
      <main>
        <div className='m-5! profile-header-w rounded-xl border dark:border-neutral-600'>
          <ProfileHeader user={user} />
        </div>
        <h3 className='mx-5! mt-7! font-bold text-2xl'>Posts</h3>
        <ul className='m-5!'>
          {userPostContext.userPosts.map((post) => (
            <li key={post.id}>
              <PostCard
                firstName={user.firstName}
                lastName={user.lastName}
                email={user.email}
                date={post.createdAt}
                content={post.postData}
                authorId={post.authorId}
                currUserId={user.id}
                postId={post.id}
                setUserPosts={userPostContext.setUserPosts}
              />
            </li>
          ))}
        </ul>
      </main>
    );
}

function ProfileHeader({ user }: { user: User }) {
  return (
    <>
      <header className='rounded-t-xl bg-linear-to-br from-purple-900 to-purple-700 h-34 relative'>
        <div className='absolute flex justify-center h-25 w-25 -bottom-8 left-5 border-4 border-white dark:border-black rounded-full p-3 bg-linear-to-bl from-purple-600 to-purple-400 '>
          <p className='text-4xl flex items-center font-bold text-white'>
            {user.firstName[0].toUpperCase()}
          </p>
          <p className='text-4xl flex items-center font-bold text-white'>
            {user.lastName[0].toUpperCase()}
          </p>
        </div>
      </header>
      <ProfileSubHeader user={user} />
    </>
  );
}

function ProfileSubHeader({ user }: { user: User }) {
  const userPostContext = useContext(DashContext);

  return (
    <section className='mt-10! flex flex-col gap-2 pl-6 pb-4'>
      <div className='flex gap-2 font-medium'>
        <p className=' flex items-center'>{user.firstName}</p>
        <p className=' flex items-center'>{user.lastName}</p>
      </div>
      <p className='text-sm text-neutral-600 dark:text-neutral-400'>
        @{user.email}
      </p>
      <p className={`pt-2 text-sm ${user.bio ? '' : 'hidden'}`}>{user.bio}</p>
      <ul className='flex gap-3'>
        <li className='flex gap-1 items-center'>
          <p className='font-bold'>{userPostContext?.userPosts.length}</p>
          <p className='text-sm'>Posts</p>
        </li>
        {/* <li className='flex gap-1 items-center'>
          <p className='font-bold'>{user.follower.length}</p>
          <p className='text-sm'>Followers</p>
        </li>
        <li className='flex gap-1 items-center'>
          <p className='font-bold'>{user.following.length}</p>
          <p className='text-sm'>Following</p>
        </li> */}
      </ul>
      <div className='flex items-center gap-1'>
        <DarkIcon
          fill='#666666'
          width='18'
          path='M200-80q-33 0-56.5-23.5T120-160v-560q0-33 23.5-56.5T200-800h40v-80h80v80h320v-80h80v80h40q33 0 56.5 23.5T840-720v560q0 33-23.5 56.5T760-80H200Zm0-80h560v-400H200v400Zm0-480h560v-80H200v80Zm0 0v-80 80Zm280 240q-17 0-28.5-11.5T440-440q0-17 11.5-28.5T480-480q17 0 28.5 11.5T520-440q0 17-11.5 28.5T480-400Zm-188.5-11.5Q280-423 280-440t11.5-28.5Q303-480 320-480t28.5 11.5Q360-457 360-440t-11.5 28.5Q337-400 320-400t-28.5-11.5ZM640-400q-17 0-28.5-11.5T600-440q0-17 11.5-28.5T640-480q17 0 28.5 11.5T680-440q0 17-11.5 28.5T640-400ZM480-240q-17 0-28.5-11.5T440-280q0-17 11.5-28.5T480-320q17 0 28.5 11.5T520-280q0 17-11.5 28.5T480-240Zm-188.5-11.5Q280-263 280-280t11.5-28.5Q303-320 320-320t28.5 11.5Q360-297 360-280t-11.5 28.5Q337-240 320-240t-28.5-11.5ZM640-240q-17 0-28.5-11.5T600-280q0-17 11.5-28.5T640-320q17 0 28.5 11.5T680-280q0 17-11.5 28.5T640-240Z'
        />
        <LightIcon
          fill='#666666'
          width='18'
          path='M200-80q-33 0-56.5-23.5T120-160v-560q0-33 23.5-56.5T200-800h40v-80h80v80h320v-80h80v80h40q33 0 56.5 23.5T840-720v560q0 33-23.5 56.5T760-80H200Zm0-80h560v-400H200v400Zm0-480h560v-80H200v80Zm0 0v-80 80Zm280 240q-17 0-28.5-11.5T440-440q0-17 11.5-28.5T480-480q17 0 28.5 11.5T520-440q0 17-11.5 28.5T480-400Zm-188.5-11.5Q280-423 280-440t11.5-28.5Q303-480 320-480t28.5 11.5Q360-457 360-440t-11.5 28.5Q337-400 320-400t-28.5-11.5ZM640-400q-17 0-28.5-11.5T600-440q0-17 11.5-28.5T640-480q17 0 28.5 11.5T680-440q0 17-11.5 28.5T640-400ZM480-240q-17 0-28.5-11.5T440-280q0-17 11.5-28.5T480-320q17 0 28.5 11.5T520-280q0 17-11.5 28.5T480-240Zm-188.5-11.5Q280-263 280-280t11.5-28.5Q303-320 320-320t28.5 11.5Q360-297 360-280t-11.5 28.5Q337-240 320-240t-28.5-11.5ZM640-240q-17 0-28.5-11.5T600-280q0-17 11.5-28.5T640-320q17 0 28.5 11.5T680-280q0 17-11.5 28.5T640-240Z'
        />
        <p className='text-sm text-neutral-600 dark:text-neutral-400'>
          Joined {user.registeredAt?.split('T')[0].split('-')[0]}/
          {user.registeredAt?.split('T')[0].split('-')[1]}
        </p>
      </div>
    </section>
  );
}
