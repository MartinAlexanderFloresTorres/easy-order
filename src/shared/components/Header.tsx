import { useEffect, useState } from 'react';

import { Menu as MenuIcon } from 'lucide-react';
import Menu from '@/shared/components/Menu';
import User from '@/shared/components/User';
import ModalLogin from '@/auth/components/ModalLogin';
import ModalRegister from '@/auth/components/ModalRegister';
import Search from '@/shared/components/Search';
import { Link } from 'react-router-dom';

const Header = () => {
  const [isOpenMenu, setIsOpenMenu] = useState(false);
  const [isOpenLogin, setIsOpenLogin] = useState(false);
  const [isOpenRegister, setIsOpenRegister] = useState(false);
  const [showSubHeader, setShowSubHeader] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      if (window.scrollY > 100) {
        setShowSubHeader(true);
      } else {
        setShowSubHeader(false);
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
    window.history.back();
    setIsOpenLogin(false);
  };

  const onCloseRegister = () => {
    window.history.back();
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
          <div className="container mx-auto flex items-center justify-between gap-2">
            {showSubHeader ? (
              <User
                className="flex-1"
                mediaHiddenNameAndLocation={true}
                style={{
                  animation: 'fadeInDown 0.5s ease-in-out',
                }}
              />
            ) : (
              <div
                className="flex-1"
                style={{
                  animation: 'fadeInDown 0.5s ease-in-out',
                }}
              >
                <h1 className="flex items-center gap-2 cursor-pointer">
                  <Link to="/" className="flex items-center gap-2">
                    <img
                      width={48}
                      height={48}
                      src="/img/logo.png"
                      alt="Logo"
                      className="min-w-[48px] min-h-[48px] w-[48px] h-[48px]object-contain"
                    />
                    <span className="hidden lg:block text-xl text-zinc-200 italic font-extrabold">EasyOrder</span>
                  </Link>
                </h1>
              </div>
            )}

            <div className="flex-auto">
              <Search />
            </div>

            <div className="flex-1 flex items-center justify-end gap-2">
              {showSubHeader ? (
                <div className="hidden xl:flex gap-4 items-center w-fit">
                  <button className="flex-1 sm:flex-none py-3 px-8 text-sm uppercase text-center bg-pink-600 hover:bg-pink-700 transition-colors duration-500 font-semibold text-white">
                    Has tu pedido
                  </button>
                </div>
              ) : (
                <div className="hidden xl:flex gap-4 items-center w-fit">
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
                    <div className="px-4 py-[10px] text-center bg-zinc-900 text-purple-600 hover:text-purple-500 transition-colors duration-300">
                      Registro
                    </div>
                  </button>
                </div>
              )}
              <button
                type="button"
                className="flex items-center gap-2 w-12 h-12 justify-center rounded-full hover:bg-zinc-800 hover:bg-opacity-20 transition-colors text-zinc-100 text-sm font-semibold"
                onClick={onOpenMenu}
              >
                <MenuIcon size={28} />
              </button>
            </div>
          </div>
        </header>
      </div>

      {isOpenMenu && <Menu onClose={onCloseMenu} onOpenLogin={onOpenLogin} onOpenRegister={onOpenRegister} />}

      {isOpenLogin && <ModalLogin onClose={onCloseLogin} />}
      {isOpenRegister && <ModalRegister onClose={onCloseRegister} />}
    </>
  );
};

export default Header;
