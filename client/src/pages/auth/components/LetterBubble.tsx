export default function LetterBubble({
  letter,
  i,
}: {
  letter: string;
  i: number;
}) {
  const colors = [
    '#5B21B6',
    '#7C3AED',
    '#A855F7',
    '#7C3AED',
    '#5B21B6',
    '#7C3AED',
  ];

  return (
    <div
      style={{
        background: `linear-gradient(90deg, ${colors[i]}, ${colors[i + 1]})`,
      }}
      className='bg-gray-50 border-white font-bold text-white dark:border-black  rounded-full -mr-1.5! border w-8 h-8 flex items-center justify-center'
    >
      {letter}
    </div>
  );
}
