import useStories from '@/stories/hooks/useStories';
import { twMerge } from 'tailwind-merge';

interface AvatarProps {
  className?: string;
  style?: React.CSSProperties;
  url: string;
  alt: string;
  storieId: string;
}

const Avatar = ({ className, style, url, alt, storieId = '123' }: AvatarProps) => {
  const { openStorie } = useStories();

  return (
    <button
      onClick={() => {
        openStorie(storieId);
      }}
      {...(style && { style })}
      className={twMerge(
        'w-9 h-9 min-w-[50px] min-h-[50px] p-[2px] select-none flex items-center border-2 border-pink-600 border-opacity-80 hover:border-opacity-100 bg-zinc-800 justify-center rounded-full cursor-pointer   transition-all',
        className,
      )}
    >
      <img
        onLoad={(e) => {
          const currentTarget = e.currentTarget as HTMLImageElement;
          currentTarget.classList.remove('animate-pulse');
        }}
        onError={(e) => {
          const currentTarget = e.currentTarget as HTMLImageElement;
          currentTarget.classList.remove('animate-pulse');
          currentTarget.src = '/img/default-image.jpg';
        }}
        className="animate-pulse bg-zinc-700 block w-full h-full rounded-full"
        src={url || '/img/default-image.jpg'}
        alt={alt}
      />
    </button>
  );
};

export default Avatar;
