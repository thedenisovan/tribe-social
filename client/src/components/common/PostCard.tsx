import { isToday, differenceInDays, differenceInYears } from 'date-fns';

export default function PostCard({
  firstName,
  lastName,
  email,
  date,
  content,
  profileUrl,
}: {
  firstName: string;
  lastName: string;
  email: string;
  date: string;
  content: string;
  profileUrl?: string;
}) {
  return (
    <div className='border dark:bg-neutral-600/20 dark:border-neutral-600 p-3 my-4! mx-2! rounded-xl'>
      <main>
        <header className='flex gap-1 items-center'>
          <aside>
            {profileUrl ? (
              profileUrl
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
            <div className='flex gap-1 items-center'>
              <p className='text-[13px] dark:text-neutral-300'>@{email}</p>
              {'•'}
              <p className='text-[13px] dark:text-neutral-300'>
                {formatPostDate(date)}
              </p>
            </div>
          </div>
        </header>

        <p className='mt-5!'>{content}</p>
      </main>
    </div>
  );
}

function formatPostDate(date: string | Date) {
  const d = new Date(date);

  if (isToday(d)) return 'today';

  const days = differenceInDays(new Date(), d);

  if (days < 365) return `${days}d`;

  const years = differenceInYears(new Date(), d);
  return `${years}y`;
}
