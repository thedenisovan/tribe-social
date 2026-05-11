import { useEffect, useState } from 'react';
import useSetCurrentPage from '../../../hooks/useSetCurrentPage';
import newPost from '../../../services/newPost.client';

export default function Home() {
  const [postData, setPostData] = useState<string>('');

  useEffect(() => {
    document.title = 'Tribe Social | Home';
  });

  useSetCurrentPage('Home');

  return (
    <>
      <section>
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
      </section>
    </>
  );
}
