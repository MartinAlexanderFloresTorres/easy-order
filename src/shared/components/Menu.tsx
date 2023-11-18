import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { twMerge } from 'tailwind-merge';
import { X } from 'lucide-react';
import User from '@/shared/components/User';
import Modal from '@/shared/components/Modal';

interface MenuProps {
  onClose: () => void;
  onOpenLogin: () => void;
  onOpenRegister: () => void;
}

let timer: NodeJS.Timeout | null = null;

const Menu = ({ onClose, onOpenLogin, onOpenRegister }: MenuProps) => {
  const [hoverText, setHoverText] = useState<string | null>(null);
  const [isClose, setIsClose] = useState(false);

  // Location
  const { pathname } = useLocation();

  // Active
  const isActive = (path: string) => path === pathname;
  const getTitle = () => {
    if (isActive('/')) return 'Inicio';
    if (isActive('/restaurants')) return 'Restaurantes';
    if (isActive('/search')) return 'Buscar';
    if (isActive('/offer-day')) return 'Ofertas';
    if (isActive('/subscription-plans')) return 'Suscripciones';
    return '';
  };

  useEffect(() => {
    setHoverText(getTitle());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  const onCloseMenu = () => {
    if (timer) clearTimeout(timer);

    if (isClose) {
      onClose();
      setIsClose(false);
      return;
    }

    setIsClose(true);
    timer = setTimeout(() => {
      onClose();
      setIsClose(false);
    }, 200);
  };

  return (
    <Modal onClose={onCloseMenu} isClose={isClose}>
      <div className="select-none flex min-h-full flex-1 flex-col">
        <div className="sticky top-0 z-50 bg-zinc-900 flex flex-col sm:flex-row items-center justify-between gap-6 p-6">
          <User />
          <div className="w-full sm:w-fit flex gap-1">
            <button
              className="flex-1 sm:flex-none py-4 px-10 uppercase text-center bg-pink-600 hover:bg-pink-700 transition-all duration-500 font-semibold text-white"
              onClick={onCloseMenu}
            >
              Has tu pedido
            </button>
            <button
              type="button"
              className="bg-zinc-800 hover:bg-zinc-900 border border-zinc-800 px-4 py-2 text-zinc-300 hover:text-white transition-all"
              onClick={onCloseMenu}
            >
              <X size={34} />
            </button>
          </div>
        </div>

        <div className="p-6 z-10 flex items-center justify-center flex-col flex-1">
          <nav className="grid grid-cols-1 h-fit gap-2">
            <Link
              to="/"
              className={twMerge(
                'block uppercase w-fit p-2 hover:text-pink-600 text-white transition-all duration-500 text-2xl sm:text-3xl lg:text-4xl font-extrabold',
                isActive('/') && 'text-pink-600',
              )}
              onMouseEnter={() => setHoverText('Inicio')}
              onMouseLeave={() => setHoverText('')}
              onClick={onCloseMenu}
            >
              Inicio
            </Link>
            <Link
              to="/restaurants"
              className={twMerge(
                'block uppercase w-fit p-2 hover:text-pink-600 text-white transition-all duration-500 text-2xl sm:text-3xl lg:text-4xl font-extrabold',
                isActive('/restaurants') && 'text-pink-600',
              )}
              onMouseEnter={() => setHoverText('Restaurantes')}
              onMouseLeave={() => setHoverText('')}
              onClick={onCloseMenu}
            >
              Restaurantes
            </Link>
            <Link
              to="/search"
              className={twMerge(
                'block uppercase w-fit p-2 hover:text-pink-600 text-white transition-all duration-500 text-2xl sm:text-3xl lg:text-4xl font-extrabold',
                isActive('/restaurants') && 'text-pink-600',
              )}
              onMouseEnter={() => setHoverText('Buscar')}
              onMouseLeave={() => setHoverText('')}
              onClick={onCloseMenu}
            >
              Buscar
            </Link>
            <Link
              to="/offer-day"
              className={twMerge(
                'block uppercase w-fit p-2 hover:text-pink-600 text-white transition-all duration-500 text-2xl sm:text-3xl lg:text-4xl font-extrabold',
                isActive('/offer-day') && 'text-pink-600',
              )}
              onMouseEnter={() => setHoverText('Ofertas')}
              onMouseLeave={() => setHoverText('')}
              onClick={onCloseMenu}
            >
              Ofertas
            </Link>
            <Link
              to="/subscription-plans"
              className={twMerge(
                'block uppercase w-fit p-2 hover:text-pink-600 text-white transition-all duration-500 text-2xl sm:text-3xl lg:text-4xl font-extrabold',
                isActive('/subscription-plans') && 'text-pink-600',
              )}
              onMouseEnter={() => setHoverText('Ofertas')}
              onMouseLeave={() => setHoverText('')}
              onClick={onCloseMenu}
            >
              Suscripciones
            </Link>
          </nav>
        </div>

        {hoverText && (
          <div className="absolute top-0 left-0 bottom-0 right-0 -z-10 overflow-hidden flex flex-col items-center justify-center">
            <p className="text-zinc-800 text-center leading-none text-opacity-40 text-[100px] sm:text-[200px] lg:text-[300px] uppercase font-extrabold">
              {hoverText}
            </p>
          </div>
        )}

        <nav className="flex w-full items-center flex-col sm:flex-row justify-center sm:justify-end gap-2 p-6">
          <button
            type="button"
            className="w-full text-center sm:w-fit bg-gradient-to-l from-pink-700 to-pink-400 transition-all duration-100 p-[1px] uppercase text-sm font-semibold"
            onClick={() => {
              onOpenLogin();
              onCloseMenu();
            }}
          >
            <div className="px-4 py-2 text-center bg-zinc-900 text-pink-600 hover:text-pink-500 transition-all duration-300">Inicio de sesión</div>
          </button>
          <button
            type="button"
            className="w-full text-center sm:w-fit bg-gradient-to-l from-purple-700 to-purple-400 transition-all duration-100 p-[1px] uppercase text-sm font-semibold"
            onClick={() => {
              onOpenRegister();
              onCloseMenu();
            }}
          >
            <div className="px-4 py-2 text-center bg-zinc-900 text-purple-600 hover:text-purple-500 transition-all duration-300">Registro</div>
          </button>
        </nav>
      </div>
    </Modal>
  );
};

export default Menu;
