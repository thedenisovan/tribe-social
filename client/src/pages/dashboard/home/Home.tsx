import { useEffect } from 'react';

export default function Home() {
  useEffect(() => {
    document.title = 'Tribe Social | Home';
  });

  return (
    <>
      <section>
        <h1>home page</h1>
      </section>
    </>
  );
}
