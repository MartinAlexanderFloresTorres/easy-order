import { Link } from 'react-router-dom';
import { Plus } from 'lucide-react';

const NewStorie = () => {
  return (
    <div className="select-none">
      <Link
        draggable={false}
        to={'stories/new'}
        className="bg-zinc-800 bg-opacity-50 backdrop-blur-sm w-[170px] h-[280px] relative rounded-md overflow-hidden flex flex-col"
      >
        <div className="flex w-full flex-1 flex-col" draggable={false}>
          <div className="w-full relative flex-1">
            <img className="absolute inset-0 w-full h-full object-cover" src="/user.webp" alt="historia" />
            <div className="storie__overlay absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-60 transition-all duration-300"></div>
          </div>
        </div>

        <div className="flex flex-col items-center justify-center gap-2 text-center p-3 -mt-7 z-10">
          <div className="min-w-[40px] min-h-[40px] bg-sky-600 flex items-center justify-center rounded-full cursor-pointer transition-all">
            <Plus size={24} />
          </div>
          <h2 className="text-white font-semibold text-[16px] webkit-line-clamp-1">Crear Historia</h2>
        </div>
      </Link>
    </div>
  );
};

export default NewStorie;
