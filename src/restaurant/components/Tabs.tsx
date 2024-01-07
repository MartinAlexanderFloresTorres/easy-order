import { ChevronDown } from 'lucide-react';
import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import useRestaurant from '../hooks/useRestaurant';
import { LINKS_MORE, LINKS_PREVIEW_RESTAURANT } from '../constants';
import useAccount from '@/account/hooks/useAccount';
import { twMerge } from 'tailwind-merge';

const Tabs = () => {
  const [isShowMore, setIsShowMore] = useState(false);

  const { logout } = useAccount();
  const { restaurant } = useRestaurant();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const handleShowMore = () => setIsShowMore(!isShowMore);
  const closeShowMore = () => setIsShowMore(false);

  if (!restaurant) return null;
  return (
    <>
      <nav className="h-[56px] sticky bottom-0 left-0 right-0 lg:hidden flex gap-1 items-center justify-between z-20 border-y border-zinc-800 border-opacity-80 p-3 backdrop-blur-xl bg-zinc-900 bg-opacity-80">
        {LINKS_PREVIEW_RESTAURANT.map((link) => (
          <Link
            key={link.link}
            to={`/panel/${restaurant.slug}/${link.link}`}
            className={twMerge(
              'flex-1 text-center px-5 py-2 text-sm font-semibold rounded-md text-zinc-300 hover:bg-zinc-800 hover:bg-opacity-70 transition-colors duration-300',
              pathname.includes(link.link) && 'bg-zinc-800 bg-opacity-70',
            )}
            onClick={closeShowMore}
          >
            {link.name}
          </Link>
        ))}

        <div className="relative z-50">
          <button
            className="flex items-center gap-2 px-5 py-2 text-sm font-semibold rounded-md text-zinc-300 hover:bg-zinc-800 hover:bg-opacity-70 transition-colors duration-300"
            onClick={handleShowMore}
          >
            <span>Más</span>
            <ChevronDown size={20} className={`transition-transform transform ${isShowMore ? 'rotate-180' : 'rotate-0'}`} />
          </button>

          {isShowMore && (
            <div className="absolute bottom-14 right-0 min-w-[220px] rounded-md z-50 bg-zinc-800 border border-zinc-700 border-opacity-80 shadow-md animate-fade-in">
              <div className="block px-5 py-2 text-xs uppercase text-zinc-400">
                <p>Más</p>
              </div>
              <div className="w-full h-[1px] bg-zinc-700"></div>
              <div className="flex flex-col gap-1 mt-1">
                {LINKS_MORE.map((link) => (
                  <Link
                    key={link.link}
                    to={`/panel/${restaurant.slug}/${link.link}`}
                    className={twMerge(
                      'block px-5 py-2 text-sm font-medium text-zinc-300 hover:bg-zinc-700 hover:bg-opacity-40 transition-colors duration-300',
                      pathname.includes(link.link) && 'bg-zinc-700 bg-opacity-40',
                    )}
                    onClick={handleShowMore}
                  >
                    {link.name}
                  </Link>
                ))}

                <div className="w-full h-[1px] bg-zinc-700"></div>
                <button
                  onClick={() => {
                    logout(() => {
                      handleShowMore();
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

      {isShowMore && (
        <div className="fixed inset-0 z-10 bg-black bg-opacity-20" onClick={handleShowMore} onKeyDown={handleShowMore} tabIndex={0}></div>
      )}
    </>
  );
};

export default Tabs;
