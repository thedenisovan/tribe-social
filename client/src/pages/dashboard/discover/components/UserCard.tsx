import { Link } from 'react-router';
import { useContext } from 'react';
import sendFollowRequest from '../../../../services/sendFollowRequest.client';
import acceptFollowRequest from '../../../../services/acceptFollowRequest.client';

import DashContext from '../../../../context/DashContext';
import type { FullUser } from '../../../../types/auth';
import unfollow from '../../../../services/unfollow.client';

export default function UserCard({
  user,
  setUsers,
}: {
  user: FullUser;
  setUsers: React.Dispatch<React.SetStateAction<FullUser[]>>;
}) {
  return (
    <div className='flex flex-col  hover:-translate-y-1 transition-transform border rounded-2xl border-neutral-300 dark:border-neutral-700 gap-4 px-3 py-5 overflow-auto'>
      <div className='flex gap-1'>
        <Link to={`/dashboard/profile/${user.id}`}>
          <div>
            {' '}
            {user.avatarUrl ? (
              user.avatarUrl
            ) : (
              <div className='flex h-10 w-10 items-center justify-center bg-linear-to-br from-purple-500 to-pink-500 p-1 rounded-full '>
                <p className='text-sm text-white'>
                  {user.firstName[0].toUpperCase()}
                </p>
                <p className='text-sm text-white'>
                  {user.lastName[0].toUpperCase()}
                </p>
              </div>
            )}
          </div>
        </Link>
        <div>
          <Link to={`/dashboard/profile/${user.id}`}>
            <header className='flex gap-1 font-bold'>
              <p>{user.firstName}</p>
              <p>{user.lastName}</p>
            </header>
          </Link>
          <p className='dark:text-neutral-200 text-neutral-700 text-xs'>
            {user.email}
          </p>
          <p className='text-sm'>{user.bio}</p>
        </div>
      </div>

      <FollowButton setUsers={setUsers} user={user} />
    </div>
  );
}

function FollowButton({
  user,
  setUsers,
}: {
  user: FullUser;
  setUsers: React.Dispatch<React.SetStateAction<FullUser[]>>;
}) {
  const currUser = useContext(DashContext);
  const authUserId = currUser?.fullUser?.id;

  // If current auth user is following specific user
  const isCurrentUserFollowing = user.following.find(
    (f) => f.followerId === authUserId,
  );
  // Have current auth user sent follow request
  const haveCurrUserSentFollowRequest = user.receiver.find(
    (f) => f.requesterId === authUserId,
  );
  // Have current user received follow request
  const haveReceivedFollowRequest = user.requester.find(
    (f) => f.receiverId === authUserId,
  );

  if (authUserId)
    return (
      <div className={` grid grid-cols-2 gap-2`}>
        {/* Button to send follow request */}
        <button
          onClick={async () => {
            if (currUser?.fullUser) {
              const res = await sendFollowRequest(user.id);

              setUsers(res.users);
            }
          }}
          className={`border px-2 rounded-2xl ${isCurrentUserFollowing || haveReceivedFollowRequest ? 'hidden' : ''}`}
        >
          {haveCurrUserSentFollowRequest && 'Cancel request'}
          {!haveCurrUserSentFollowRequest && 'Follow'}
        </button>

        {/* Decline follow */}
        <button
          onClick={async () => {
            if (currUser?.fullUser) {
              const res = await acceptFollowRequest(user.id, false);

              setUsers(res.users);
            }
          }}
          className={`border px-2 rounded-2xl ${haveReceivedFollowRequest ? '' : 'hidden'}`}
        >
          Decline
        </button>

        {/* Accept follow */}
        <button
          onClick={async () => {
            if (currUser?.fullUser) {
              const res = await acceptFollowRequest(user.id, true);

              setUsers(res.users);
            }
          }}
          className={`border px-2 rounded-2xl ${haveReceivedFollowRequest ? '' : 'hidden'}`}
        >
          Accept
        </button>

        {/* Button to unfollow */}
        <button
          onClick={async () => {
            if (currUser?.fullUser) {
              const res = await unfollow(user.id);

              setUsers(res.users);
            }
          }}
          className={`border px-2 rounded-2xl ${!isCurrentUserFollowing || haveReceivedFollowRequest ? 'hidden' : ''}`}
        >
          {haveCurrUserSentFollowRequest && 'Cancel request'}
          {!haveCurrUserSentFollowRequest && 'Unfollow'}
        </button>
      </div>
    );
}
