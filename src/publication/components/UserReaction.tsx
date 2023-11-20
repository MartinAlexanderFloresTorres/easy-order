import Avatar from '@/shared/components/Avatar';
import { REACTIONS } from '@/publication/constants/reactions';
import { BellPlus } from 'lucide-react';
import { Link } from 'react-router-dom';

interface UserReactionProps {
  onClose: () => void;
}

const UserReaction = ({ onClose }: UserReactionProps) => {
  return (
    <div className="flex items-center justify-between gap-4 px-4 py-2">
      <div className="flex items-center gap-2">
        <div className="relative">
          <Avatar />
          <img width={20} height={20} src={REACTIONS.like.url} alt={REACTIONS.like.name} className="absolute bottom-0 right-0" />
        </div>
        <Link
          to={'/user/by/martin-dev'}
          className="hover:underline hover:text-zinc-200 text-zinc-300 transition-all duration-300 text-sm"
          onClick={onClose}
        >
          Martin dev
        </Link>
      </div>
      <button className="flex items-center justify-center gap-2 px-4 py-2 bg-zinc-700 bg-opacity-50 hover:bg-opacity-100 transition-all duration-300 rounded-full text-xs font-semibold active:scale-90">
        <BellPlus size={20} />
        Seguir
      </button>
    </div>
  );
};

export default UserReaction;
