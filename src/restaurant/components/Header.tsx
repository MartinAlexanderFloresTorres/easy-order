import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';
import useRestaurant from '@/restaurant/hooks/useRestaurant';
import { isOpenOrClosed } from '@/shared/helpers';
import useAccount from '@/account/hooks/useAccount';
import ModalShedule from './admin/ModalShedule';
import { LINKS_MORE, LINKS_PREVIEW_RESTAURANT } from '../constants';
import { twMerge } from 'tailwind-merge';

const Header = () => {
  const [isShowMore, setIsShowMore] = useState(false);
  const [isShowModalSchedule, setIsShowModalSchedule] = useState(false);

  const { user, logout } = useAccount();
  const { restaurant } = useRestaurant();

  const navigate = useNavigate();
  const { pathname } = useLocation();

  const handleShowMore = () => setIsShowMore(!isShowMore);
  const closeShowMore = () => setIsShowMore(false);

  const handleShowModalSchedule = () => setIsShowModalSchedule(!isShowModalSchedule);

  if (!restaurant || !user) return null;

  return (
    <>
      <header className="select-none h-[70px] sticky top-0 z-50 animate-fade-in border-b border-zinc-800 border-opacity-80 p-3 backdrop-blur-xl bg-zinc-900 bg-opacity-80">
        <div className="container-2 flex items-center justify-between gap-4">
          <Link to={`/panel/${restaurant.slug}`} className="flex items-center gap-3" onClick={closeShowMore}>
            <div className="relative w-[50px] h-[50px] animate-fade-in">
              <img
                className="bg-zinc-900 w-full h-full object-cover rounded-md block object-center"
                src={restaurant.logo ? restaurant.logo.secure_url : '/img/default-logo.png'}
                alt="logo"
              />
              <img
                className="bg-zinc-800 absolute bottom-0 rounded-full border-2 border-zinc-800  right-0 w-[30px] h-[30px] min-w-[30px] min-h-[30px]"
                src={user.photo ? user.photo.secure_url : '/img/default-user.png'}
                alt="usuario"
              />
            </div>
            <h1 className="block font-bold text-center whitespace-nowrap">{restaurant.name}</h1>
          </Link>

          <div className="flex items-center gap-1">
            <nav className="hidden lg:flex gap-1 items-center z-50">
              {LINKS_PREVIEW_RESTAURANT.map((link) => (
                <Link
                  key={link.link}
                  to={`/panel/${restaurant.slug}/${link.link}`}
                  className={twMerge(
                    'px-5 py-2 text-sm font-semibold rounded-md text-zinc-300 hover:bg-zinc-800 hover:bg-opacity-70 transition-colors duration-300',
                    pathname.includes(link.link) && 'bg-zinc-800 bg-opacity-70',
                  )}
                  onClick={closeShowMore}
                >
                  {link.name}
                </Link>
              ))}

              <div className="relative z-20">
                <button
                  className="flex items-center gap-2 px-5 py-2 text-sm font-semibold rounded-md text-zinc-300 hover:bg-zinc-800 hover:bg-opacity-70 transition-colors duration-300"
                  onClick={handleShowMore}
                >
                  <span>Más</span>
                  <ChevronDown size={20} className={`transition-transform transform ${isShowMore ? 'rotate-180' : 'rotate-0'}`} />
                </button>

                {isShowMore && (
                  <div className="absolute top-14 right-0 min-w-[220px] rounded-md z-20 bg-zinc-800 border border-zinc-700 border-opacity-80 shadow-md animate-fade-in">
                    <div className="block px-5 py-2 text-xs uppercase text-zinc-400">
                      <p>Más</p>
                    </div>
                    <div className="w-full h-[1px] bg-zinc-700"></div>
                    <div className="flex flex-col">
                      {LINKS_MORE.map((link) => (
                        <Link
                          key={link.link}
                          to={`/panel/${restaurant.slug}/${link.link}`}
                          className={twMerge(
                            'block px-5 py-2 text-sm font-medium text-zinc-300 hover:bg-zinc-700 hover:bg-opacity-40 transition-colors duration-300',
                            pathname.includes(link.link) && 'bg-zinc-700 bg-opacity-40',
                          )}
                          onClick={closeShowMore}
                        >
                          {link.name}
                        </Link>
                      ))}

                      <div className="w-full h-[1px] bg-zinc-700"></div>
                      <button
                        onClick={() => {
                          logout(() => {
                            closeShowMore();
                            navigate('/');
                          });
                        }}
                        className="block text-left px-5 py-2 text-sm font-medium text-red-400   hover:bg-zinc-700 hover:bg-opacity-40 transition-colors duration-300"
                      >
                        Cerrar sesión
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </nav>
            <button
              className="flex items-center gap-2 px-5 py-2 text-sm font-semibold rounded-md text-zinc-300 hover:bg-zinc-800 hover:bg-opacity-70 transition-colors duration-300"
              onClick={handleShowModalSchedule}
            >
              {isOpenOrClosed(restaurant.openingHours, restaurant.closingTime) ? (
                <>
                  <span className="w-3 h-3 bg-green-500 rounded-full"></span>
                  <span className="text-sm font-bold uppercase">Abierto</span>
                </>
              ) : (
                <>
                  <span className="w-3 h-3 bg-red-500 rounded-full"></span>
                  <span className="text-sm font-bold uppercase">Cerrado</span>
                </>
              )}
            </button>
          </div>
        </div>
      </header>

      {isShowMore && (
        <div className="fixed inset-0 z-10 bg-black bg-opacity-20" onClick={handleShowMore} onKeyDown={handleShowMore} tabIndex={0}></div>
      )}

      {isShowModalSchedule && <ModalShedule onClose={handleShowModalSchedule} />}
    </>
  );
};

export default Header;
