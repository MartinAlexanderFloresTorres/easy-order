import useStories from '../hooks/useStories';

const Storie = () => {
  const { openStorie } = useStories();

  return (
    <>
      <div className="select-none">
        <div className="bg-zinc-800 bg-opacity-50 backdrop-blur-sm w-[170px] h-[280px] relative rounded-md overflow-hidden storie">
          <div className="absolute top-2 left-2 z-10 w-9 h-9 select-none flex items-center border-[3px] border-red-600 border-opacity-80 hover:border-opacity-100 bg-zinc-800 justify-center rounded-full cursor-pointer transition-all">
            <img className="block w-full h-full rounded-full" src="/user.webp" alt="usuario" />
          </div>

          <button onClick={() => openStorie('1')} draggable={false}>
            <img
              className="storie__imagen absolute inset-0 w-full h-full object-cover transition-all duration-300"
              src="https://scontent.flim3-2.fna.fbcdn.net/v/t51.36329-10/401891693_573161371619877_8391696264865281664_n.jpg?stp=dst-jpg_s280x280&_nc_cat=102&ccb=1-7&_nc_sid=1a7029&_nc_ohc=EwY5s_Qx2ggAX9TYnLv&_nc_ht=scontent.flim3-2.fna&oh=00_AfCWxPspSWMVLr6bpj5_zSfMf9NhZwmet19Bw3IVgzJ5dg&oe=65594284"
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
