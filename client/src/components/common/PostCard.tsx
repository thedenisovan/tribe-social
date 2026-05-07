import { isToday, differenceInDays, differenceInYears } from 'date-fns';
import ICONS from '../../constants/icons';
import deletePost from '../../services/deletePost.client';
import type { Post } from '../../types/auth';

export default function PostCard({
  firstName,
  lastName,
  email,
  date,
  content,
  avatarUrl,
  authorId,
  currUserId,
  postId,
  setUserPosts,
}: {
  firstName: string;
  lastName: string;
  email: string;
  date: string;
  content: string;
  avatarUrl?: string;
  authorId: number;
  currUserId: number;
  postId: number;
  setUserPosts: React.Dispatch<React.SetStateAction<Post[] | []>>;
}) {
  return (
    <div className='border dark:bg-neutral-600/20 dark:border-neutral-600 border-neutral-300 p-3 my-4!  rounded-xl'>
      <main>
        <header className='flex justify-between'>
          <div className='flex gap-1 items-center'>
            <aside>
              {avatarUrl ? (
                avatarUrl
              ) : (
                <div className='flex md:h-10 md:w-10 items-center justify-center bg-linear-to-br from-purple-500 to-pink-500 p-1 rounded-full '>
                  <p className='text-sm text-white'>
                    {firstName[0].toUpperCase()}
                  </p>
                  <p className='text-sm text-white'>
                    {lastName[0].toUpperCase()}
                  </p>
                </div>
              )}
            </aside>
            <div>
              <h2 className='flex gap-1'>
                <span className='font-medium'>{firstName}</span>
                <span className='font-medium'>{lastName}</span>
              </h2>
              <div className='flex gap-1 items-center flex-wrap'>
                <p className='text-[13px] dark:text-neutral-300'>@{email}</p>
                {'•'}
                <p className='text-[13px] dark:text-neutral-300'>
                  {formatPostDate(date)}
                </p>
              </div>
            </div>
          </div>
          <button
            onClick={async () => {
              const posts = await deletePost(postId, authorId);

              setUserPosts(posts);
            }}
            className={`${authorId === currUserId ? '' : 'hidden'} transition-colors cursor-pointer hover:bg-red-500/50 rounded-full h-7 w-7 flex items-center justify-center`}
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

        <p className='mt-5!'>{content}</p>
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
