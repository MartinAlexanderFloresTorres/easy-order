import { Link } from 'react-router-dom';
const HeaderAuth = () => {
  return (
    <header className="h-[70px] py-4 px-5">
      <div className="container mx-auto">
        <Link to={'/'} className="flex items-center gap-2 uppercase">
          <div className="w-9 h-9 select-none flex items-center bg-zinc-800 justify-center rounded-full cursor-pointer">
            <img className="block w-full h-full rounded-full" src="/user.webp" alt="usuario" />
          </div>

          <h1 className="text-[16px] font-extrabold">Orden Facil</h1>
        </Link>
      </div>
    </header>
  );
};

export default HeaderAuth;
