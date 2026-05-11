import { useEffect, useContext } from 'react';
import useSetCurrentPage from '../../../hooks/useSetCurrentPage';
import DashContext from '../../../context/DashContext';
import useFetch from '../../../hooks/useFetch';
import type { DefaultUser } from '../../../types/auth';

export default function Notifications() {
  const user = useContext(DashContext);
  const { isLoading, error, data } = useFetch<DefaultUser[]>(
    `dashboard/discover/getFollowRequesters/${user?.fullUser?.id}`,
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
        {data.map((d) => (
          <div key={d.id}>{d.email}</div>
        ))}
      </main>
    );
}
