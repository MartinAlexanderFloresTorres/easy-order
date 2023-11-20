import useStories from '@/stories/hooks/useStories';
import { twMerge } from 'tailwind-merge';

interface AvatarProps {
  className?: string;
  style?: React.CSSProperties;
}

const Avatar = ({ className, style }: AvatarProps) => {
  const { openStorie } = useStories();

  return (
    <button
      onClick={() => {
        openStorie('1');
      }}
      {...(style && { style })}
      className={twMerge(
        'w-9 h-9 min-w-[50px] min-h-[50px] p-[2px] select-none flex items-center border-2 border-pink-600 border-opacity-80 hover:border-opacity-100 bg-zinc-800 justify-center rounded-full cursor-pointer transition-all',
        className,
      )}
    >
      <img className="block w-full h-full rounded-full hover:" src="/user.webp" alt="usuario" />
    </button>
  );
};

export default Avatar;
