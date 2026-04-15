export function DarkIcon({
  path,
  width = '24px',
  fill = '#1e2939',
}: {
  path: string;
  width?: string;
  fill?: string;
}) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      height={width}
      viewBox='0 -960 960 960'
      width={width}
      fill={fill}
      className='block! dark:hidden!'
    >
      <path d={path} />
    </svg>
  );
}

export function LightIcon({
  path = '',
  width = '24px',
  fill = '#e5e7eb',
}: {
  path: string;
  width?: string;
  fill?: string;
}) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      height={width}
      viewBox='0 -960 960 960'
      width={width}
      fill={fill}
      className='hidden! dark:block!'
    >
      <path d={path} />
    </svg>
  );
}
