import { useEffect } from 'react';
import useSetCurrentPage from '../../../hooks/useSetCurrentPage';

export default function Notifications() {
  useEffect(() => {
    document.title = 'Tribe Social | Notifications';
  });

  useSetCurrentPage('Notifications');

  return (
    <main>
      <h2>this is Notifications</h2>
    </main>
  );
}
