// Header for auth section
export default function GreetingHeader({
  header,
  paragraph,
}: {
  header: string;
  paragraph: string;
}) {
  return (
    <>
      <h3 className='text-3xl tracking-tight font-bold mt-7! mb-2!'>
        {header}
      </h3>
      <p className='text-neutral-600 mb-6! dark:text-neutral-300 '>
        {paragraph}
      </p>
    </>
  );
}
