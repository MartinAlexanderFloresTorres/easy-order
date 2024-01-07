import { useEffect, useState } from 'react';
import { Menu as MenuIcon, ShoppingBag, Star, Truck } from 'lucide-react';
import ModalLogin from '@/auth/components/ModalLogin';
import ModalRegister from '@/auth/components/ModalRegister';
import Search from '@/shared/components/Search';
import { Link, useLocation } from 'react-router-dom';
import useAccount from '@/account/hooks/useAccount';
import Avatar from '@/shared/components/Avatar';
import ModalCart from '@/cart/components/ModalCart';
import useCart from '@/cart/hooks/useCart';
import usePublic from '../hooks/usePublic';
import ModalRestaurantFavorites from './ModalRestaurantFavorites';

const Header = () => {
  const [isOpenMenu, setIsOpenMenu] = useState(false);
  const [isOpenLogin, setIsOpenLogin] = useState(false);
  const [isOpenRegister, setIsOpenRegister] = useState(false);
  const [isScrollTop, setIsScrollTop] = useState(true);
  const [isOpenCart, setIsOpenCart] = useState(false);
  const [isOpenFavorites, setIsOpenFavorites] = useState(false);

  // Hooks
  const { pathname } = useLocation();
  const { user, loadingAuthenticate, authenticated, logout } = useAccount();
  const { carts } = useCart();
  const { restaurantsFavorites } = usePublic();

  const totalItems = carts.reduce((acc, cart) => acc + cart.items.length, 0);

  useEffect(() => {
    const onScroll = () => {
      if (window.scrollY > 100) {
        setIsScrollTop(false);
      } else {
        setIsScrollTop(true);
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
  const onToggleMenu = () => setIsOpenMenu(!isOpenMenu);

  const onCloseCart = () => setIsOpenCart(false);
  const onOpenCart = () => {
    onCloseMenu();
    setIsOpenCart(true);
  };

  const onCloseFavorites = () => setIsOpenFavorites(false);
  const onOpenFavorites = () => {
    onCloseMenu();
    setIsOpenFavorites(true);
  };

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
            <Link onClick={onCloseMenu} to="/" className="block w-[50px] h-[50px] min-w-[50px] min-h-[50px] animate-fade-in">
              <img width={50} height={50} src="/img/logo.png" alt="Logo" className="w-full h-full object-contain" />
            </Link>

            <div className="flex-1">
              <Search />
            </div>

            <div className="w-fit flex items-center justify-end gap-2">
              <button onClick={onCloseMenu} className="animate-fade-in flex items-center gap-2 whitespace-nowrap py-2 px-4 text-xs uppercase text-center bg-pink-600 hover:bg-pink-700 transition-colors duration-500 font-semibold text-white rounded-full">
                <span>Ordena Ahora</span>
                <Truck size={28} className="min-h-[28px] min-w-[28px] w-[28px] h-[28px]" />
              </button>

              <button type="button" className="relative flex items-center gap-2 w-12 h-12 justify-center rounded-full hover:bg-zinc-800 hover:bg-opacity-20 transition-colors text-zinc-100 text-sm font-semibold duration-300" onClick={onOpenCart}>
                <ShoppingBag size={28} />
                {totalItems > 0 && <div className="absolute top-0 right-0 w-6 h-6 bg-pink-600 rounded-full flex items-center justify-center text-xs text-white">{totalItems > 99 ? '99+' : totalItems}</div>}
              </button>

              <button type="button" className="relative flex items-center gap-2 w-12 h-12 justify-center rounded-full hover:bg-zinc-800 hover:bg-opacity-20 transition-colors text-zinc-100 text-sm font-semibold duration-300" onClick={onOpenFavorites}>
                <Star size={28} />
                {restaurantsFavorites.length > 0 && <div className="absolute top-0 right-0 w-6 h-6 bg-pink-600 rounded-full flex items-center justify-center text-xs text-white">{restaurantsFavorites.length > 99 ? '99+' : restaurantsFavorites.length}</div>}
              </button>

              <div className="relative z-50">
                <button type="button" className="flex items-center gap-2 w-12 h-12 justify-center rounded-full hover:bg-zinc-800 hover:bg-opacity-20 transition-colors text-zinc-100 text-sm font-semibold duration-300" onClick={onToggleMenu}>
                  <MenuIcon size={28} />
                </button>

                {isOpenMenu && (
                  <div className="absolute top-14 right-0 min-w-[220px] rounded-md z-50 bg-zinc-800 border border-zinc-700 border-opacity-80 shadow-md animate-fade-in">
                    <div className="block text-xs uppercase text-zinc-400">
                      {user ? (
                        <Link to={`/user/by/${user.slug}`} className="px-5 py-2 flex items-center gap-2 text-sm font-semibold text-zinc-300 hover:bg-zinc-700 hover:bg-opacity-40 transition-colors duration-300" onClick={onCloseMenu}>
                          <Avatar className="w-[36px] h-[36px] min-w-[36px] min-h-[36px]" url={user.photo?.secure_url || '/img/default-user.png'} alt={user.name} storieId="2123" />
                          <span>{user.name}</span>
                        </Link>
                      ) : (
                        <p className="text-sm font-semibold text-zinc-300 px-4 py-2">Menú</p>
                      )}
                    </div>
                    <div className="w-full h-[1px] bg-zinc-700"></div>
                    <div className="flex flex-col">
                      {!authenticated && (
                        <>
                          <button onClick={onOpenLogin} className="text-left block px-5 py-2 text-sm font-medium text-zinc-300 hover:bg-zinc-700 hover:bg-opacity-40 transition-colors duration-300">
                            Inicio de sesión
                          </button>
                          <button onClick={onOpenRegister} className="text-left block px-5 py-2 text-sm font-medium text-zinc-300 hover:bg-zinc-700 hover:bg-opacity-40 transition-colors duration-300">
                            Registro
                          </button>
                          <div className="w-full h-[1px] bg-zinc-700"></div>
                        </>
                      )}
                      <Link to={'/'} className="block px-5 py-2 text-sm font-medium text-zinc-300 hover:bg-zinc-700 hover:bg-opacity-40 transition-colors duration-300" onClick={onCloseMenu}>
                        Inicio
                      </Link>
                      <Link to={'/restaurants'} className="block px-5 py-2 text-sm font-medium text-zinc-300 hover:bg-zinc-700 hover:bg-opacity-40 transition-colors duration-300" onClick={onCloseMenu}>
                        Restaurantes
                      </Link>
                      <Link to={'/menus'} className="block px-5 py-2 text-sm font-medium text-zinc-300 hover:bg-zinc-700 hover:bg-opacity-40 transition-colors duration-300" onClick={onCloseMenu}>
                        Menús
                      </Link>
                      <Link to={'/offers'} className="block px-5 py-2 text-sm font-medium text-zinc-300 hover:bg-zinc-700 hover:bg-opacity-40 transition-colors duration-300" onClick={onCloseMenu}>
                        Ofertas
                      </Link>
                      <Link to={'/subscription-plans'} className="block px-5 py-2 text-sm font-medium text-zinc-300 hover:bg-zinc-700 hover:bg-opacity-40 transition-colors duration-300" onClick={onCloseMenu}>
                        Planes de suscripción
                      </Link>

                      {authenticated && user ? (
                        <>
                          {user.restaurant && (
                            <a href={`/panel/${user.restaurant.slug}`} target="_blank" onClick={onCloseMenu} className="block px-5 py-2 text-sm font-medium text-zinc-300 hover:bg-zinc-700 hover:bg-opacity-40 transition-colors duration-300">
                              <span>
                                Panel <span className="hidden md:inline">de</span> {user.restaurant.name}
                              </span>
                            </a>
                          )}

                          <Link to={'/account/online-orders'} className="block px-5 py-2 text-sm font-medium text-zinc-300 hover:bg-zinc-700 hover:bg-opacity-40 transition-colors duration-300" onClick={onCloseMenu}>
                            Mis deliverys
                          </Link>

                          <Link to={'/account/table-orders'} className="block px-5 py-2 text-sm font-medium text-zinc-300 hover:bg-zinc-700 hover:bg-opacity-40 transition-colors duration-300" onClick={onCloseMenu}>
                            Mis ordenes
                          </Link>

                          <Link to={'/account/subscription-plan'} className="block px-5 py-2 text-sm font-medium text-zinc-300 hover:bg-zinc-700 hover:bg-opacity-40 transition-colors duration-300" onClick={onCloseMenu}>
                            Mi plan de suscripción
                          </Link>
                          <Link to={'/account/settings'} className="block px-5 py-2 text-sm font-medium text-zinc-300 hover:bg-zinc-700 hover:bg-opacity-40 transition-colors duration-300" onClick={onCloseMenu}>
                            Configuración
                          </Link>
                          <div className="w-full h-[1px] bg-zinc-700"></div>
                          <button
                            onClick={() => {
                              logout();
                              onCloseMenu();
                            }}
                            className="block text-left px-5 py-2 text-sm font-medium text-red-400   hover:bg-zinc-700 hover:bg-opacity-40 transition-colors duration-300"
                          >
                            Cerrar sesión
                          </button>
                        </>
                      ) : (
                        <Link to={'/subscription-plans'} className="block px-5 py-2 text-sm font-medium text-zinc-300 hover:bg-zinc-700 hover:bg-opacity-40 transition-colors duration-300" onClick={onCloseMenu}>
                          Planes de suscripción
                        </Link>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </header>
      </div>

      {!authenticated && pathname === '/' && (
        <div className="flex gap-2 items-center justify-center mt-3 animate-fade-in">
          <button type="button" className="w-fit text-center whitespace-nowrap bg-gradient-to-l from-pink-700 to-pink-400 transition-colors duration-100 p-[1px] uppercase text-base font-semibold" onClick={onOpenLogin}>
            <div className="px-4 py-[10px] text-center bg-zinc-900 text-pink-600 hover:text-pink-500 transition-colors duration-300">Inicio de sesión</div>
          </button>
          <button type="button" className="w-fit text-center whitespace-nowrap bg-gradient-to-l from-purple-700 to-purple-400 transition-colors duration-100 p-[1px] uppercase text-base font-semibold" onClick={onOpenRegister}>
            <div className="px-4 py-[10px] text-center bg-zinc-900 text-purple-600 hover:text-purple-500 transition-colors duration-300">Registro</div>
          </button>
        </div>
      )}

      {isOpenMenu && <div className="fixed inset-0 z-40 bg-black bg-opacity-20" onClick={onCloseMenu} onKeyDown={onCloseMenu} tabIndex={0}></div>}

      {isOpenLogin && <ModalLogin onClose={onCloseLogin} />}
      {isOpenRegister && <ModalRegister onClose={onCloseRegister} />}

      {isOpenCart && <ModalCart onClose={onCloseCart} />}
      {isOpenFavorites && <ModalRestaurantFavorites onClose={onCloseFavorites} />}
    </>
  );
};

export default Header;
