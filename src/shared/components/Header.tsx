import { useState } from 'react';

import { Menu as MenuIcon } from 'lucide-react';
import Menu from '@/shared/components/Menu';
import User from '@/shared/components/User';
import ModalLogin from '@/auth/components/ModalLogin';
import ModalRegister from '@/auth/components/ModalRegister';
import MenuCategories from '@/shared/components/MenuCategories';
import Search from '@/shared/components/Search';

const Header = () => {
  const [isOpenMenu, setIsOpenMenu] = useState(false);
  const [isOpenLogin, setIsOpenLogin] = useState(false);
  const [isOpenRegister, setIsOpenRegister] = useState(false);
  const [isShowCategories, setIsShowCategories] = useState(false);

  const onCloseMenu = () => setIsOpenMenu(false);
  const onOpenMenu = () => setIsOpenMenu(true);

  const onOpenLogin = () => {
    window.history.pushState({}, '', '/auth/login');
    setIsOpenLogin(true);
  };
  const onCloseLogin = () => {
    window.history.pushState({}, '', '/');
    setIsOpenLogin(false);
  };

  const onCloseRegister = () => {
    window.history.pushState({}, '', '/');
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
          <div className="container mx-auto flex items-center justify-between gap-1">
            <User mediaHiddenNameAndLocation={true} />

            <div className="ml-4 flex-1">
              <Search />
            </div>

            <div className="hidden xl:flex gap-4 items-center w-fit">
              <button
                type="button"
                className="w-fit text-center whitespace-nowrap bg-gradient-to-l from-pink-700 to-pink-400 transition-all duration-100 p-[1px] uppercase text-xs font-semibold"
                onClick={onOpenLogin}
                onMouseEnter={() => setIsShowCategories(false)}
              >
                <div className="px-4 py-[10px] text-center bg-zinc-900 text-pink-600 hover:text-pink-500 transition-all duration-300">
                  Inicio de sesión
                </div>
              </button>
              <button
                type="button"
                className="w-fit text-center whitespace-nowrap bg-gradient-to-l from-purple-700 to-purple-400 transition-all duration-100 p-[1px] uppercase text-xs font-semibold"
                onClick={onOpenRegister}
                onMouseEnter={() => setIsShowCategories(false)}
              >
                <div className="px-4 py-[10px] text-center bg-zinc-900 text-purple-600 hover:text-purple-500 transition-all duration-300">
                  Registro
                </div>
              </button>
            </div>

            <button
              type="button"
              className="flex items-center gap-2 w-12 h-12 justify-center rounded-full hover:bg-zinc-800 hover:bg-opacity-20 transition-all text-zinc-100 text-sm font-semibold"
              onClick={onOpenMenu}
              onMouseEnter={() => setIsShowCategories(false)}
            >
              <MenuIcon size={28} />
            </button>
          </div>
        </header>
        <MenuCategories isOpen={isShowCategories} onClose={() => setIsShowCategories(false)} />
      </div>

      {isOpenMenu && <Menu onClose={onCloseMenu} onOpenLogin={onOpenLogin} onOpenRegister={onOpenRegister} />}

      {isOpenLogin && <ModalLogin onClose={onCloseLogin} />}
      {isOpenRegister && <ModalRegister onClose={onCloseRegister} />}
    </>
  );
};

export default Header;
