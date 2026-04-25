import useTokenVerify from '../../hooks/useTokenVerify';

export default function Header() {
  useTokenVerify();

  return (
    <header className='sticky top-0'>
      <div>this is header</div>
    </header>
  );
}
