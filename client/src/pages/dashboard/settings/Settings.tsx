import { useEffect } from 'react';
import useSetCurrentPage from '../../../hooks/useSetCurrentPage';

export default function Discover() {
  useEffect(() => {
    document.title = 'Tribe Social | Settings';
  });

  useSetCurrentPage('Settings');

  return (
    <main>
      <h2>this is settings</h2>
    </main>
  );
}
