export default function InfoBubble({
  path,
  width,
  isLightTheme,
  text,
}: {
  path: string;
  width: string;
  isLightTheme: boolean | null;
  text: string;
}) {
  return (
    <div className='flex transition-all hover:scale-102 cursor-alias items-center gap-1 border dark:border-neutral-800 border-neutral-200 rounded-full px-3 py-1 w-fit'>
      <svg
        xmlns='http://www.w3.org/2000/svg'
        height={width}
        viewBox='0 -960 960 960'
        width={width}
        fill={isLightTheme ? '#5B21B6' : '#A855F7'}
      >
        <path d={path} />
      </svg>
      <p className='dark:text-neutral-300 text-xs text-neutral-800'>{text}</p>
    </div>
  );
}
