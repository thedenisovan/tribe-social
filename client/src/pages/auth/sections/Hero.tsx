import LetterBubble from '../components/LetterBubble';

export default function Hero() {
  return (
    <aside className='hidden md:flex md:flex-col  md:flex-1 bg-red-200 dark:bg-gray-200'>
      <header className='flex items-center'>
        <div>Logo</div>
        <div>
          <h1>TRIBE</h1>
          <p>SOCIAL MEDIA PROJECT</p>
        </div>
      </header>
      <h2>Where your people are waiting.</h2>
      <p>
        Share moments, build communities and connect with people who actually
        get you.
      </p>
      <footer>
        <div className='flex'>
          {['S', 'D', 'V', 'G', 'P'].map((letter) => {
            return <LetterBubble key={letter} letter={letter} />;
          })}
        </div>
      </footer>
    </aside>
  );
}
