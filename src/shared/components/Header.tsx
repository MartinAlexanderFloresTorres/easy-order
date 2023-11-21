import { useEffect, useState } from 'react';

import { Menu as MenuIcon, Truck } from 'lucide-react';
import Menu from '@/shared/components/Menu';
import User from '@/shared/components/User';
import ModalLogin from '@/auth/components/ModalLogin';
import ModalRegister from '@/auth/components/ModalRegister';
import Search from '@/shared/components/Search';
import { Link, useLocation } from 'react-router-dom';

const Header = () => {
  const [isOpenMenu, setIsOpenMenu] = useState(false);
  const [isOpenLogin, setIsOpenLogin] = useState(false);
  const [isOpenRegister, setIsOpenRegister] = useState(false);
  const [isScrollTop, setIsScrollTop] = useState(true);
  const [isScrollBottom, setIsScrollBottom] = useState(false);

  const { pathname } = useLocation();

  useEffect(() => {
    const onScroll = () => {
      if (window.scrollY > 100) {
        setIsScrollTop(false);
      } else {
        setIsScrollTop(true);
      }

      // Scroll bottom
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
        setIsScrollBottom(true);
      } else {
        setIsScrollBottom(false);
      }
    };

    window.addEventListener('scroll', onScroll);
    window.addEventListener('resize', onScroll);
    window.addEventListener('load', onScroll);

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      window.removeEventListener('load', onScroll);
    };
  }, []);

  const onCloseMenu = () => setIsOpenMenu(false);
  const onOpenMenu = () => setIsOpenMenu(true);

  const onOpenLogin = () => {
    window.history.pushState({}, '', '/auth/login');
    setIsOpenLogin(true);
  };

  const onCloseLogin = () => {
    window.history.pushState({}, '', pathname);
    setIsOpenLogin(false);
  };

  const onCloseRegister = () => {
    window.history.pushState({}, '', pathname);
    setIsOpenRegister(false);
  };

  const onOpenRegister = () => {
    window.history.pushState({}, '', '/auth/register');
    setIsOpenRegister(true);
  };

  return (
    <>
      <div className="sticky top-0 z-50">
        <header className="border-b border-zinc-800 border-opacity-80 p-3 backdrop-blur-xl bg-zinc-900 bg-opacity-80">
          <div className="container mx-auto flex items-center justify-between gap-4">
            {isScrollTop ? (
              <User className="w-fit animate-fade-in" mediaHiddenNameAndLocation={true} />
            ) : (
              <Link to="/" className="block w-[50px] h-[50px] min-w-[50px] min-h-[50px] animate-fade-in">
                <img width={50} height={50} src="/img/logo.png" alt="Logo" className="w-full h-full object-contain" />
              </Link>
            )}

            <div className="flex-1">
              <Search />
            </div>

            <div className="w-fit flex items-center justify-end gap-2">
              <button className="animate-fade-in flex items-center gap-2 whitespace-nowrap py-2 px-4 text-xs uppercase text-center bg-pink-600 hover:bg-pink-700 transition-colors duration-500 font-semibold text-white rounded-full">
                <span>{isScrollBottom ? 'Quiero ordenar' : 'Ordena Ahora'}</span>
                <Truck size={28} className="min-h-[28px] min-w-[28px] w-[28px] h-[28px]" />
              </button>

              <button
                type="button"
                className="flex items-center gap-2 w-12 h-12 justify-center rounded-full hover:bg-zinc-800 hover:bg-opacity-20 transition-colors text-zinc-100 text-sm font-semibold duration-300"
                onClick={onOpenMenu}
              >
                <MenuIcon size={28} />
              </button>
            </div>
          </div>
        </header>
      </div>

      <div className="flex gap-2 items-center justify-center mt-3 animate-fade-in">
        <button
          type="button"
          className="w-fit text-center whitespace-nowrap bg-gradient-to-l from-pink-700 to-pink-400 transition-colors duration-100 p-[1px] uppercase text-xs font-semibold"
          onClick={onOpenLogin}
        >
          <div className="px-4 py-[10px] text-center bg-zinc-900 text-pink-600 hover:text-pink-500 transition-colors duration-300">
            Inicio de sesión
          </div>
        </button>
        <button
          type="button"
          className="w-fit text-center whitespace-nowrap bg-gradient-to-l from-purple-700 to-purple-400 transition-colors duration-100 p-[1px] uppercase text-xs font-semibold"
          onClick={onOpenRegister}
        >
          <div className="px-4 py-[10px] text-center bg-zinc-900 text-purple-600 hover:text-purple-500 transition-colors duration-300">Registro</div>
        </button>
      </div>

      {isOpenMenu && <Menu onClose={onCloseMenu} onOpenLogin={onOpenLogin} onOpenRegister={onOpenRegister} />}

      {isOpenLogin && <ModalLogin onClose={onCloseLogin} />}
      {isOpenRegister && <ModalRegister onClose={onCloseRegister} />}
    </>
  );
};

export default Header;
