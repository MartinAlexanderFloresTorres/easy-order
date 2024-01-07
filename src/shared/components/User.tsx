import { Link } from 'react-router-dom';
import { twMerge } from 'tailwind-merge';
import Avatar from '@/shared/components/Avatar';
import { User as UserInterface } from '@/auth/interfaces';

interface UserProps {
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
  mediaHiddenNameAndLocation?: boolean;
  user: UserInterface;
}

const User = ({ className, user, style = {}, mediaHiddenNameAndLocation = false, children }: UserProps) => {
  return (
    <div
      className={twMerge('leading-none select-none flex items-center gap-2 text-zinc-300 hover:text-zinc-200 transition-all duration-300', className)}
      style={style}
    >
      <Avatar url={user.photo?.secure_url || '/img/default-user.png'} alt={user.name} storieId={'123'} />
      <div className={twMerge('w-full h-fit flex flex-col justify-center gap-[3px]', mediaHiddenNameAndLocation ? 'hidden md:flex' : '')}>
        <Link to={`/user/by/${user.slug}`} draggable={false} className="w-fit text-[16px] font-bold line-clamp-1">
          {user.name}
        </Link>
        <p className="w-fit text-[14px] font-medium text-zinc-400 line-clamp-1">
          {user.city} - {user.country}
        </p>
        {children && <div className="mt-2">{children}</div>}
      </div>
    </div>
  );
};

export default User;
