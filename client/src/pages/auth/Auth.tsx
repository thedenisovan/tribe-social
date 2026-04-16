import Hero from './sections/Hero';
import { useContext, useState } from 'react';
import ThemeContext from '../../context/ThemeContext';
import { DarkIcon, LightIcon } from '../../components/common/ThemeIcons';
import ICONS from '../../constants/icons';
import AuthSlider from './components/AuthSlider';
import AuthForm from './components/AuthForm';
import AuthFooter from './components/AuthFooter';
import GreetingHeader from './components/GreetingHeader';
import AuthContext from '../../context/AuthContext';

export default function Auth() {
  const themeContext = useContext(ThemeContext);
  const [isSignupPage, setIsSignupPage] = useState<boolean>(false);
  const [formData, setFormData] = useState(initialFormData);
  const [formErrors, setFormErrors] = useState(initialFormData);

  const resetForm = () => setFormData(initialFormData);
  const resetFormErrors = () => setFormErrors(initialFormData);

  return (
    <>
      <title>Tribe Social | Homepage</title>
      <section className='flex overflow-hidden min-w-screen min-h-screen'>
        <Hero />
        <AuthContext
          value={{
            formData,
            setFormData,
            resetForm,
            formErrors,
            setFormErrors,
            resetFormErrors,
          }}
        >
          <aside className='flex-1 max-w-185 min-w-85 py-6 px-6 lg:px-20 transition-colors bg-neutral-50 dark:text-white dark:bg-(--purple-1000)'>
            <header className='flex justify-end'>
              {/* THEME BUTTON */}
              <button
                className='border hover:bg-neutral-100 transition-colors dark:hover:bg-purple-900/70 border-neutral-200 dark:border-neutral-600 rounded-full p-3'
                onClick={() =>
                  themeContext?.setIsLightTheme(!themeContext.isLightTheme)
                }
              >
                <LightIcon width='18' path={ICONS.sun} />
                <DarkIcon width='18' path={ICONS.moon} />
              </button>
            </header>
            <main className='flex flex-col justify-center h-full'>
              <GreetingHeader isSignupPage={isSignupPage} />
              <AuthSlider
                setIsSignupPage={setIsSignupPage}
                isSignupPage={isSignupPage}
              />
              <AuthForm isSignupPage={isSignupPage} />
              <AuthFooter />
            </main>
          </aside>
        </AuthContext>
      </section>
    </>
  );
}

const initialFormData = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  passwordConfirmation: '',
};
