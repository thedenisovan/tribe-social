import { useContext, useEffect, useState } from 'react';
import useSetCurrentPage from '../../../hooks/useSetCurrentPage';
import newPost from '../../../services/newPost.client';
import useFetch from '../../../hooks/useFetch';
import { LoadingSvg } from '../../auth/components/AuthForm';
import type { Post } from '../../../types/auth';
import PostCard from '../../../components/common/PostCard';
import DashContext from '../../../context/DashContext';

export default function Home() {
  const currUser = useContext(DashContext);
  const [postData, setPostData] = useState<string>('');
  const [posts, setPosts] = useState<Post[]>([]);
  const { isLoading, error, data } = useFetch<Post[]>(
    'dashboard/home/getPosts?paginationNum=0&isGlobalPosts=true',
  );

  useEffect(() => {
    document.title = 'Tribe Social | Home';
  });

  useEffect(() => {
    const updatePosts = () => {
      if (data) {
        setPosts(data);
      }
    };

    updatePosts();
  }, [data]);

  useEffect(() => {
    if (error) {
      console.log(error);
    }
  }, [error]);

  useSetCurrentPage('Home');

  if (isLoading) {
    return <LoadingSvg />;
  }

  console.log(posts);

  return (
    <section className='main-w'>
      <h1>home page</h1>
      <form onSubmit={(e) => e.preventDefault()}>
        <label htmlFor='postData'>post data</label>
        <textarea
          onChange={(e) => setPostData(e.target.value)}
          value={postData}
          name='postData'
          id='postData'
          className='bg-neutral-600'
        ></textarea>
        <button
          onClick={async () => {
            // Create new post
            await newPost(postData);
          }}
        >
          send
        </button>
      </form>

      <main>
        <ul>
          {posts.map((post) => (
            <li key={post.id}>
              <PostCard
                userData={post.author}
                currUserId={+currUser!.fullUser!.id}
                postData={post}
                isUserPosts={false}
              />
            </li>
          ))}
        </ul>
      </main>
    </section>
  );
}
