import { Link } from 'react-router-dom';
import { twMerge } from 'tailwind-merge';

interface RestaurantPreviewProps {
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
  onClick?: () => void;
}

const RestaurantPreview = ({ className, style = {}, onClick, children }: RestaurantPreviewProps) => {
  return (
    <div {...(onClick && { onClick })} className={twMerge('select-none flex items-center gap-2', className)} style={style}>
      <button className="w-9 h-9 min-w-[50px] min-h-[50px] select-none flex items-center border-[3px] border-pink-600 border-opacity-80 hover:border-opacity-100 bg-zinc-800 justify-center rounded-full cursor-pointer transition-all">
        <img className="block w-full h-full rounded-full" src="/user.webp" alt="usuario" />
      </button>
      <div className="w-full h-fit flex flex-col justify-center gap-[3px]">
        <Link
          to={'/'}
          draggable={false}
          className="text-zinc-400 hover:text-zinc-300 transition-all duration-300 text-[16px] font-bold webkit-line-clamp-1"
        >
          White dev
        </Link>
        <p className="text-[14px] font-medium text-zinc-400 webkit-line-clamp-1">Lima - Peru</p>
        {children && children}
      </div>
    </div>
  );
};

export default RestaurantPreview;
