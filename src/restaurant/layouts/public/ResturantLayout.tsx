import { Link, Outlet, useLocation } from 'react-router-dom';
import { twMerge } from 'tailwind-merge';
import { QrCode } from 'lucide-react';
import useRestaurantPublic from '@/restaurant/hooks/useRestaurantPublic';
import Spinner from '@/shared/components/Spinner';
import { showImage } from '@/shared/helpers';

const ResturantLayout = () => {
  const { restaurant, loading } = useRestaurantPublic();

  const { pathname } = useLocation();

  const isActived = (path: string) => pathname === path;

  if (loading)
    return (
      <div className="p-4">
        <Spinner className="mx-auto" />
      </div>
    );

  if (!restaurant) return null;

  return (
    <>
      <div className="relative flex flex-col w-full">
        <div
          className="w-full h-fit bg-zinc-800"
          style={{
            backgroundImage: `url(${restaurant.banner.secure_url})`,
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
          }}
        >
          <div className="w-full h-full backdrop-blur-[100px]">
            <div className="container mx-auto relative bg-zinc-900 h-[500px] rounded-br-xl rounded-bl-xl overflow-hidden">
              <img
                className="block w-full h-full object-cover backdrop-blur-lg rounded-br-xl rounded-bl-xl"
                src={restaurant.banner.secure_url}
                alt={restaurant.name}
              />
            </div>
          </div>
          <div className="bg-zinc-800">
            <div className="container relative mx-auto">
              <div className="-mt-[80px] px-6 flex flex-col md:flex-row justify-center items-center text-center md:text-left md:items-end gap-4 w-full">
                <img
                  src={restaurant.logo.secure_url}
                  className="cursor-pointer border-4 border-zinc-800 w-[180px] min-w-[180px] h-[180px] min-h-[180px] rounded-full"
                  alt={restaurant.name}
                  onClick={() =>
                    showImage({
                      src: restaurant.logo.secure_url,
                      alt: restaurant.name,
                      imageHeight: 220,
                      imageWidth: 220,
                    })
                  }
                />
                <div className="mb-4 w-full flex gap-4 flex-col md:flex-row items-center justify-center md:justify-between md:items-end">
                  <div>
                    <h2 className="text-3xl font-extrabold text-white mb-1">{restaurant.name}</h2>
                    <p className="text-sm font-bold text-zinc-300">{restaurant.address}</p>
                  </div>

                  <div className="flex gap-3 items-center">
                    <button
                      className="animate-fade-in flex items-center gap-2 whitespace-nowrap py-2 px-4 text-xs uppercase text-center border border-zinc-700 bg-zinc-700 bg-opacity-90 hover:bg-opacity-60 hover:border-opacity-20 transition-colors duration-500 font-semibold text-white rounded-full"
                      type="button"
                    >
                      Seguir
                    </button>

                    <button
                      className="animate-fade-in flex items-center gap-2 whitespace-nowrap py-2 px-4 text-xs uppercase text-center bg-pink-600 hover:bg-pink-700 transition-colors duration-500 font-semibold text-white rounded-full"
                      type="button"
                    >
                      Mensaje
                    </button>

                    <button
                      className="animate-fade-in flex items-center gap-2 whitespace-nowrap py-2 px-4 text-xs uppercase text-center border border-zinc-700 bg-zinc-700 bg-opacity-90 hover:bg-opacity-60 hover:border-opacity-20 transition-colors duration-500 font-semibold text-white rounded-full"
                      type="button"
                    >
                      Buscar
                    </button>
                  </div>
                </div>
              </div>

              <div className="flex gap-3 items-center p-4 border-t border-zinc-700 mt-6 overflow-auto">
                <div
                  className={twMerge(
                    'border-b-4',
                    isActived(`/r/${restaurant.slug}`) ? 'border-pink-600 text-pink-500' : 'group border-b-transparent text-zinc-300',
                  )}
                >
                  <Link
                    to={`/r/${restaurant.slug}`}
                    className="rounded-md px-4 py-2 text-base  group-hover:bg-zinc-700  transition-all duration-300 capitalize text-center font-bold"
                  >
                    Publicaciones
                  </Link>
                </div>
                <div
                  className={twMerge(
                    'border-b-4',
                    isActived(`/r/${restaurant.slug}/about`) ? 'border-pink-600 text-pink-500' : 'group border-b-transparent text-zinc-300',
                  )}
                >
                  <Link
                    to={`/r/${restaurant.slug}/about`}
                    className="rounded-md px-4 py-2 text-base  group-hover:bg-zinc-700  transition-all duration-300 capitalize text-center font-bold"
                  >
                    Información
                  </Link>
                </div>

                <div
                  className={twMerge(
                    'border-b-4',
                    isActived(`/r/${restaurant.slug}/photos`) ? 'border-pink-600 text-pink-500' : 'group border-b-transparent text-zinc-300',
                  )}
                >
                  <Link
                    to={`/r/${restaurant.slug}/photos`}
                    className="rounded-md px-4 py-2 text-base  group-hover:bg-zinc-700  transition-all duration-300 capitalize text-center font-bold"
                  >
                    Fotos
                  </Link>
                </div>

                <div
                  className={twMerge(
                    'border-b-4',
                    isActived(`/r/${restaurant.slug}/menus`) ? 'border-pink-600 text-pink-500' : 'group border-b-transparent text-zinc-300',
                  )}
                >
                  <Link
                    to={`/r/${restaurant.slug}/menus`}
                    className="rounded-md px-4 py-2 text-base  group-hover:bg-zinc-700  transition-all duration-300 capitalize text-center font-bold"
                  >
                    Menús
                  </Link>
                </div>

                <div
                  className={twMerge(
                    'border-b-4',
                    isActived(`/r/${restaurant.slug}/reviews`) ? 'border-pink-600 text-pink-500' : 'group border-b-transparent text-zinc-300',
                  )}
                >
                  <Link
                    to={`/r/${restaurant.slug}/reviews`}
                    className="rounded-md px-4 py-2 text-base  group-hover:bg-zinc-700  transition-all duration-300 capitalize text-center font-bold"
                  >
                    Reseñas
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Outlet />

      <button
        className="fixed bottom-4 right-4 z-10 animate-fade-in flex items-center gap-2 whitespace-nowrap py-2 px-4 text-xs uppercase text-center bg-[#732085] transition-colors duration-500 font-semibold text-white rounded-full"
        type="button"
        onClick={() =>
          showImage({
            src: '/img/QR.png',
            alt: 'Yape QR',
            imageWidth: 220,
          })
        }
      >
        <span>Yape</span>
        <QrCode size={20} />
      </button>
    </>
  );
};

export default ResturantLayout;
