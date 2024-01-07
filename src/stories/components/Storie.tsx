import { Link } from 'react-router-dom';
import useStories from '@/stories/hooks/useStories';

const Storie = () => {
  const { openStorie } = useStories();

  return (
    <>
      <div className="select-none">
        <div className="bg-zinc-800 bg-opacity-50 backdrop-blur-sm w-[170px] h-[280px] relative rounded-md overflow-hidden storie">
          <Link
            to={`/user/by/1`}
            className="absolute top-2 left-2 z-10 w-9 h-9 select-none flex items-center border-[3px] border-red-600 border-opacity-80 hover:border-opacity-100 bg-zinc-800 justify-center rounded-full cursor-pointer transition-all"
          >
            <img className="block w-full h-full rounded-full" src="/user.webp" alt="usuario" />
          </Link>

          <button onClick={() => openStorie('1')} draggable={false}>
            <img
              className="storie__imagen absolute inset-0 w-full h-full object-cover transition-all duration-300"
              src="/img/historia-preview.avif"
              alt="historia"
            />
            <div className="storie__overlay absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-60 transition-all duration-300"></div>
            <h2 className="absolute bottom-2 left-2 z-10 text-white font-semibold text-[16px] webkit-line-clamp-1">Restaurante x</h2>
          </button>
        </div>
      </div>
    </>
  );
};

export default Storie;
