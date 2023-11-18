import { Link } from 'react-router-dom';
import { twMerge } from 'tailwind-merge';

interface UserProps {
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
  mediaHiddenNameAndLocation?: boolean;
}

const User = ({ className, style = {}, mediaHiddenNameAndLocation = false, children }: UserProps) => {
  return (
    <div
      className={twMerge('select-none flex items-center gap-2 text-zinc-300 hover:text-zinc-200 transition-all duration-300', className)}
      style={style}
    >
      <button className="w-9 h-9 min-w-[50px] min-h-[50px] select-none flex items-center border-[3px] border-pink-600 border-opacity-80 hover:border-opacity-100 bg-zinc-800 justify-center rounded-full cursor-pointer transition-all">
        <img className="block w-full h-full rounded-full" src="/user.webp" alt="usuario" />
      </button>
      <div className={twMerge('w-full h-fit flex flex-col justify-center gap-[3px]', mediaHiddenNameAndLocation ? 'hidden md:flex' : '')}>
        <Link to={'/'} draggable={false} className="text-[16px] font-bold webkit-line-clamp-1">
          White dev
        </Link>
        <p className="text-[14px] font-medium text-zinc-400 webkit-line-clamp-1">Lima - Peru</p>
        {children && <div className="mt-2">{children}</div>}
      </div>
    </div>
  );
};

export default User;
