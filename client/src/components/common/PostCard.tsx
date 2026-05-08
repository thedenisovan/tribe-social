import { isToday, differenceInDays, differenceInYears } from 'date-fns';
import ICONS from '../../constants/icons';
import deletePost from '../../services/deletePost.client';
import type { FullUser, Post } from '../../types/auth';
import likePost from '../../services/likePost.client';
import { useState } from 'react';

export default function PostCard({
  userData,
  currUserId,
  setUserPosts,
  postData,
}: {
  userData: FullUser;
  currUserId: number;
  setUserPosts: React.Dispatch<React.SetStateAction<Post[] | []>>;
  postData: Post;
}) {
  const [post, setPost] = useState<Post>(postData);

  // Based on if users id in like array update style of like button
  const isPostLiked = post?.likes.find((obj) => obj.userId === currUserId);
  return (
    <div className='border dark:bg-neutral-600/20 dark:border-neutral-600 border-neutral-300 p-3 my-4!  rounded-xl'>
      <main>
        <header className='flex justify-between'>
          <div className='flex gap-1 items-center'>
            <aside>
              {userData.avatarUrl ? (
                userData.avatarUrl
              ) : (
                <div className='flex md:h-10 md:w-10 items-center justify-center bg-linear-to-br from-purple-500 to-pink-500 p-1 rounded-full '>
                  <p className='text-sm text-white'>
                    {userData.firstName[0].toUpperCase()}
                  </p>
                  <p className='text-sm text-white'>
                    {userData.lastName[0].toUpperCase()}
                  </p>
                </div>
              )}
            </aside>
            <div>
              <h2 className='flex gap-1'>
                <span className='font-medium'>{userData.firstName}</span>
                <span className='font-medium'>{userData.lastName}</span>
              </h2>
              <div className='flex gap-1 items-center flex-wrap'>
                <p className='text-[13px] dark:text-neutral-300'>
                  @{userData.email}
                </p>
                {'•'}
                <p className='text-[13px] dark:text-neutral-300'>
                  {formatPostDate(postData.createdAt)}
                </p>
              </div>
            </div>
          </div>
          <button
            onClick={async () => {
              const posts = await deletePost(postData.id, postData.authorId);

              setUserPosts(posts);
            }}
            className={`${postData.authorId === currUserId ? '' : 'hidden'} transition-colors cursor-pointer hover:bg-red-500/50 rounded-full h-7 w-7 flex items-center justify-center`}
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              height='24px'
              viewBox='0 -960 960 960'
              width='24px'
              fill='#999999'
            >
              <path d={ICONS.delete} />
            </svg>
          </button>
        </header>

        <p className='mt-5!'>{postData.postData}</p>

        <footer className='flex gap-2'>
          <button
            id={`b-${postData.id}`}
            onClick={async () => {
              // Update button's style on click
              document
                .querySelector(`#b-${postData.id}`)
                ?.classList.toggle('bg-red-500');

              // Send like request to server and return updated post
              const res = await likePost(postData.id, currUserId);
              setPost(res.updatedPost);
            }}
            className={`border rounded-2xl p-2 ${isPostLiked ? 'bg-red-500' : ''}`}
          >
            like
            {post?.likes.length}
          </button>
          <button className='border rounded-2xl p-2'>comment</button>
          <button className='border rounded-2xl p-2'>save</button>
        </footer>
      </main>
    </div>
  );
}

// Display how old is post
function formatPostDate(date: string | Date) {
  const d = new Date(date);

  if (isToday(d)) return 'today';

  const days = differenceInDays(new Date(), d);

  if (days < 365) return `${days + 1}d`;

  const years = differenceInYears(new Date(), d);
  return `${years + 1}y`;
}
