import { useEffect } from 'react';
import useSetCurrentPage from '../../../hooks/useSetCurrentPage';

export default function Discover() {
  useEffect(() => {
    document.title = 'Tribe Social | Discover';
  });

  useSetCurrentPage('Discover');

  return (
    <main>
      <h2>this is discover</h2>
    </main>
  );
}
