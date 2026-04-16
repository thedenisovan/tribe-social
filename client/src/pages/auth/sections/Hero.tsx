import { useContext, useEffect, useState } from 'react';
import InfoBubble from '../components/InfoBubble';
import LetterBubble from '../components/LetterBubble';
import { DarkLogo } from '../components/Logo';
import { LightLogo } from '../components/Logo';
import ThemeContext from '../../../context/ThemeContext';

export default function Hero() {
  const themeContext = useContext(ThemeContext);
  // String which holds value of current paragraph string filling
  const [paragraphText, setParagraphText] = useState(['']);
  // * Index which works as cursor to follow index paragraph text location
  const [currentLetterInParagraph, setCurrentLetterInParagraph] = useState(0);

  const str = `Share moments, build communities and connect with people who actually
        get you - without the noise.`;
  const strArr = str.split('');

  useEffect(() => {
    const interval = setInterval(() => {
      if (currentLetterInParagraph >= strArr.length) {
        clearInterval(interval);
        return;
      }

      // * Set state of paragraphText to it's previous value plus
      // * to  letter of strArray at index of - currentLetterInParagraph
      setParagraphText((prev) => [...prev, strArr[currentLetterInParagraph]]);
      // Update index of curr letter in paragraph
      setCurrentLetterInParagraph(currentLetterInParagraph + 1);
    }, 35);

    return () => clearInterval(interval);
  });

  return (
    <aside className='pl-10 shadow-lg dark:shadow-neutral-900  pr-5 overflow-hidden border-r border-r-neutral-100 dark:border-r-neutral-800 hidden transition-colors relative md:flex md:flex-col justify-center dark:text-white md:flex-[1.5] bg-neutral-50 dark:bg-(--purple-1000)'>
      <TopBlurredBubble />
      <header className='flex items-center'>
        <DarkLogo />
        <LightLogo />
        <div>
          <h1 className='font-bubblegum font-bold text-4xl tracking-widest'>
            TRIBE
          </h1>
          <p className=' text-xs font-medium dark:text-neutral-400'>
            SOCIAL MEDIA PROJECT
          </p>
        </div>
      </header>
      <h2 className='text-5xl font-bold mt-5! mb-3!'>
        Where your{' '}
        <span className='bg-linear-to-r bg-clip-text text-transparent from-pink-600 to-purple-600 dark:from-pink-700 dark:to-purple-700'>
          people
        </span>{' '}
        are waiting.
      </h2>
      <p className='text-lg  dark:text-gray-300 text-gray-500 max-w-180'>
        {paragraphText}
      </p>
      <footer className='absolute flex flex-col bottom-20 text-black'>
        <div className='flex items-center'>
          <div className='flex'>
            {['S', 'D', 'V', 'G', 'P'].map((letter, i) => {
              return <LetterBubble key={letter} i={i} letter={letter} />;
            })}
          </div>
          <div className='dark:text-white ml-4!'>
            <p className='font-bold'>2.4M+ members</p>
            <p className='dark:text-neutral-300 text-neutral-700 text-sm'>
              joined in the last 30 days
            </p>
          </div>
        </div>
        <div className='mt-3! flex gap-2'>
          <InfoBubble
            width='20'
            text='Real connections'
            isLightTheme={themeContext && themeContext.isLightTheme}
            path='m480-120-58-52q-101-91-167-157T150-447.5Q111-500 95.5-544T80-634q0-94 63-157t157-63q52 0 99 22t81 62q34-40 81-62t99-22q94 0 157 63t63 157q0 46-15.5 90T810-447.5Q771-395 705-329T538-172l-58 52Zm0-108q96-86 158-147.5t98-107q36-45.5 50-81t14-70.5q0-60-40-100t-100-40q-47 0-87 26.5T518-680h-76q-15-41-55-67.5T300-774q-60 0-100 40t-40 100q0 35 14 70.5t50 81q36 45.5 98 107T480-228Zm0-273Z'
          />
          <InfoBubble
            width='20'
            text='50k+ communities'
            isLightTheme={themeContext && themeContext.isLightTheme}
            path='M40-160v-112q0-34 17.5-62.5T104-378q62-31 126-46.5T360-440q66 0 130 15.5T616-378q29 15 46.5 43.5T680-272v112H40Zm720 0v-120q0-44-24.5-84.5T666-434q51 6 96 20.5t84 35.5q36 20 55 44.5t19 53.5v120H760ZM247-527q-47-47-47-113t47-113q47-47 113-47t113 47q47 47 47 113t-47 113q-47 47-113 47t-113-47Zm466 0q-47 47-113 47-11 0-28-2.5t-28-5.5q27-32 41.5-71t14.5-81q0-42-14.5-81T544-792q14-5 28-6.5t28-1.5q66 0 113 47t47 113q0 66-47 113ZM120-240h480v-32q0-11-5.5-20T580-306q-54-27-109-40.5T360-360q-56 0-111 13.5T140-306q-9 5-14.5 14t-5.5 20v32Zm296.5-343.5Q440-607 440-640t-23.5-56.5Q393-720 360-720t-56.5 23.5Q280-673 280-640t23.5 56.5Q327-560 360-560t56.5-23.5ZM360-240Zm0-400Z'
          />
          <InfoBubble
            width='20'
            text='Zero ads'
            isLightTheme={themeContext && themeContext.isLightTheme}
            path='M320-279.5Q260-359 260-480t60-200.5Q380-760 480-760t160 79.5Q700-601 700-480t-60 200.5Q580-200 480-200t-160-79.5ZM579-342q33-60 33-138t-33-138q-33-60-99-60t-99 60q-33 60-33 138t33 138q33 60 99 60t99-60Z'
          />
        </div>
      </footer>
      <BottomBlurredBubble />
    </aside>
  );
}

function BottomBlurredBubble() {
  return (
    <div className='dark:bg-purple-900/20  bg-purple-100/70 md:h-120 md:w-60 lg:h-[50%] lg:w-[30vw] rounded-full absolute -bottom-70 -right-30 blur-3xl'></div>
  );
}

function TopBlurredBubble() {
  return (
    <div className=' dark:bg-purple-900/20  bg-purple-100/70 md:h-120 md:w-120 lg:h-[50%] lg:w-[50vw] rounded-full absolute -top-70 -left-30 blur-3xl'></div>
  );
}
