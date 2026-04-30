import { useEffect } from 'react';
import useSetCurrentPage from '../../../hooks/useSetCurrentPage';

export default function Home() {
  useEffect(() => {
    document.title = 'Tribe Social | Home';
  });

  useSetCurrentPage('Home');

  return (
    <>
      <section>
        <h1>home page</h1>
      </section>
    </>
  );
}
