import { useEffect, useContext } from 'react';
import useSetCurrentPage from '../../../hooks/useSetCurrentPage';
import DashContext from '../../../context/DashContext';
import useFetch from '../../../hooks/useFetch';
import type { DefaultUser } from '../../../types/auth';

export default function Notifications() {
  const user = useContext(DashContext);
  const { isLoading, error, data } = useFetch<DefaultUser[]>(
    `dashboard/discover/getFollowRequesters`,
  );

  useEffect(() => {
    document.title = 'Tribe Social | Notifications';
  });

  useSetCurrentPage('Notifications');

  if (!isLoading || !error) console.log(data);

  if (data)
    return (
      <main>
        {!user?.fullUser?.receiver.length && (
          <h2>No incoming follow requests</h2>
        )}
        <ul>
          {data.map((d) => (
            <li key={d.id}>
              <p>
                {d.firstName} {d.lastName} has sent you follow request
              </p>
            </li>
          ))}
        </ul>
      </main>
    );
}
