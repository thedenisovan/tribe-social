export default function LetterBubble({ letter }: { letter: string }) {
  return (
    <div className='bg-gray-50  rounded-full -mr-1.5! border w-8 h-8 flex items-center justify-center'>
      {letter}
    </div>
  );
}
