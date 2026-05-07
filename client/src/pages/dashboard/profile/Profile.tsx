import { useEffect, useState } from 'react';
import { useContext } from 'react';
import DashContext from '../../../context/DashContext';
import { LightIcon, DarkIcon } from '../../../components/common/ThemeIcons';
import useSetCurrentPage from '../../../hooks/useSetCurrentPage';
import type { FullUser, Post } from '../../../types/auth';
import PostCard from '../../../components/common/PostCard';
import useFetch from '../../../hooks/useFetch';
import { useParams } from 'react-router';

export default function Profile() {
  // Id of current profile open in profile page
  const { id } = useParams();
  // Fetch user data based on users id
  const { isLoading, error, data } = useFetch<FullUser>(
    `dashboard/profile/getUserProfile/${id}`,
  );
  // Fetch user posts based on users id
  const {
    isLoading: postLoad,
    error: postErr,
    data: postData,
  } = useFetch<Post[]>(`dashboard/profile/getUserPosts/${id}`);
  // State of all posts made by user
  const [userPosts, setUserPosts] = useState<Post[] | []>([]);
  // State to toggle between posts created by user and saved posts
  const [isUserPosts, setIsUserPosts] = useState<boolean>(true);

  // Context of signed in user/client
  const currentUser = useContext(DashContext);

  useEffect(() => {
    document.title = 'Tribe Social | Profile';

    // after posts made by user are fetched set them to post state
    const updateActiveUserPosts = () => {
      if (postData) {
        setUserPosts(postData);
      }
    };

    updateActiveUserPosts();
  }, [postData]);

  useSetCurrentPage('Profile');

  if (isLoading || postLoad) {
    return <h1>Loading</h1>;
  } else if (error || postErr) {
    return <h1>error</h1>;
  }

  if (data && currentUser)
    return (
      <main className='main-w '>
        <div className='lg:max-w-250 lg:mx-auto!'>
          <div className='m-5! rounded-xl border border-neutral-300 dark:border-neutral-600'>
            <ProfileHeader user={data} />
          </div>
          <div className='grid grid-cols-2 border m-5! border-neutral-300 dark:border-neutral-600 rounded-2xl'>
            <button
              onClick={() => setIsUserPosts(true)}
              className={`cursor-pointer ${isUserPosts ? 'posts-button rounded-tl-2xl rounded-bl-2xl' : ''}`}
            >
              <h3 className='my-3! font-medium text-md'>Posts</h3>
            </button>{' '}
            <button
              onClick={() => setIsUserPosts(false)}
              className={`cursor-pointer ${!isUserPosts ? 'posts-button rounded-tr-2xl rounded-br-2xl' : ''}`}
            >
              <h3 className='my-3! font-medium text-md'>Saved posts</h3>
            </button>
          </div>
          {/* If user posts state is true then display posts made by user- */}
          {/* -else user posts state is false display user saved posts */}
          {isUserPosts ? (
            userPosts.length ? (
              <ul className='m-5!'>
                {userPosts.map((post) => (
                  <li key={post.id}>
                    <PostCard
                      firstName={data.firstName}
                      lastName={data.lastName}
                      email={data.email}
                      date={post.createdAt}
                      content={post.postData}
                      authorId={post.authorId}
                      currUserId={currentUser!.fullUser!.id}
                      postId={post.id}
                      setUserPosts={setUserPosts}
                    />
                  </li>
                ))}
              </ul>
            ) : (
              <p className='mx-5! my-1! dark:text-neutral-300'>No posts yet</p>
            )
          ) : data.savedPosts.length ? (
            <ul className='m-5!'>
              {data.savedPosts.map((post) => (
                <li key={post.id}>
                  <PostCard
                    firstName={data?.firstName || 'John'}
                    lastName={data?.lastName || 'Doe'}
                    email={data?.email || 'johnDOe@gmail.com'}
                    date={post.createdAt}
                    content={post.postData}
                    authorId={post.authorId}
                    currUserId={data?.id || 0}
                    postId={post.id}
                    setUserPosts={setUserPosts}
                  />
                </li>
              ))}
            </ul>
          ) : (
            <p className='mx-5! my-1! dark:text-neutral-300'>
              No saved posts yet
            </p>
          )}
        </div>
      </main>
    );
}

function ProfileHeader({ user }: { user: FullUser }) {
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

function ProfileSubHeader({ user }: { user: FullUser }) {
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
          <p className='font-bold'>{user.posts?.length}</p>
          <p className='text-sm'>Posts</p>
        </li>
        <li className='flex gap-1 items-center'>
          <p className='font-bold'>{user.follower.length}</p>
          <p className='text-sm'>Followers</p>
        </li>
        <li className='flex gap-1 items-center'>
          <p className='font-bold'>{user.following.length}</p>
          <p className='text-sm'>Following</p>
        </li>
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
