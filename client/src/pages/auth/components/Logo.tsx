import logoDark from '../../../assets/logo-dark.png';
import logoLight from '../../../assets/logo-light.png';

function DarkLogo() {
  return (
    <img
      className='transition-none rounded-full hidden! dark:block!'
      src={logoDark}
      width={75}
      alt='logo'
    />
  );
}

function LightLogo() {
  return (
    <img
      className='rounded-full transition-none block dark:hidden!'
      src={logoLight}
      width={75}
      alt='logo'
    />
  );
}

export { DarkLogo, LightLogo };
