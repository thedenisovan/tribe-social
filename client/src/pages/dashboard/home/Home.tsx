import { useContext, useEffect, useState } from 'react';
import useSetCurrentPage from '../../../hooks/useSetCurrentPage';
import newPost from '../../../services/newPost.client';
import DashContext from '../../../context/DashContext';

export default function Home() {
  const [postData, setPostData] = useState<string>('');
  const dashContext = useContext(DashContext);

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
              if (dashContext && dashContext.fullUser) {
                // Create new post
                await newPost(postData, dashContext.fullUser.id);
              }
            }}
          >
            send
          </button>
        </form>
      </section>
    </>
  );
}
