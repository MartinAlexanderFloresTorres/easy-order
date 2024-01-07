import { Link } from 'react-router-dom';
import { Star } from 'lucide-react';
import { isOpenOrClosed, showImage } from '@/shared/helpers';
import usePublic from '@/shared/hooks/usePublic';
import { SearchedRestaurant } from '@/restaurant/interfaces';

interface RestaurantPreviewProps {
  restaurant: SearchedRestaurant;
  onClick?: () => void;
}

const RestaurantPreview = ({ restaurant, onClick = () => {} }: RestaurantPreviewProps) => {
  const { addRestaurantFavorite, hasRestaurantFavorite } = usePublic();

  return (
    <div
      className="w-full h-fit bg-zinc-800 rounded-xl overflow-hidden relative group"
      style={{
        backgroundImage: `url(${restaurant.banner.secure_url})`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
      }}
    >
      <button
        type="button"
        className="group-hover:opacity-100 opacity-0 absolute top-4 right-4 z-10 text-yellow-400 bg-zinc-700 bg-opacity-50 hover:scale-105 active:scale-75 backdrop-blur-[1px] transition-all duration-500 rounded-full p-2 disabled:cursor-not-allowed"
        onClick={() => addRestaurantFavorite(restaurant)}
        style={{
          boxShadow: '0 0 0 16px rgba(0, 0, 0, 0.1)',
        }}
      >
        <Star size={24} stroke="currentColor" fill={hasRestaurantFavorite(restaurant) ? 'currentColor' : 'none'} className="transition-all duration-500" />
      </button>
      <div className="w-full h-full backdrop-blur-[100px]">
        <Link to={`/r/${restaurant.slug}/menus`} onClick={onClick} className="block container mx-auto relative bg-zinc-900 h-[220px] overflow-hidden">
          <img className="block w-full h-full object-cover backdrop-blur-lg" src={restaurant.banner.secure_url} alt={restaurant.name} />
        </Link>
      </div>
      <div className="bg-zinc-800">
        <div className="container relative mx-auto">
          <div className="-mt-[80px] px-6 flex flex-col justify-center items-center text-center gap-4 w-full">
            <img
              src={restaurant.logo.secure_url}
              className="cursor-pointer border-4 border-zinc-800 w-[140px] min-w-[140px] h-[140px] min-h-[140px] rounded-full"
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
            {isOpenOrClosed(restaurant.openingHours, restaurant.closingTime) ? (
              <div className=" w-fit mx-auto -mt-10 bg-green-500 text-xs font-extrabold text-white rounded-full px-4 py-2 flex items-center justify-center">
                <span>Abierto</span>
              </div>
            ) : (
              <div className=" w-fit mx-auto -mt-10 bg-red-500 text-xs font-extrabold text-white rounded-full px-4 py-2 flex items-center justify-center">
                <span>Cerrado</span>
              </div>
            )}
            <div className="mb-4 w-full flex gap-4 flex-col items-center justify-center">
              <Link to={`/r/${restaurant.slug}/menus`} onClick={onClick}>
                <h2 className="text-3xl font-extrabold text-white mb-1 line-clamp-1">{restaurant.name}</h2>
                <p className="text-sm font-bold text-zinc-300 line-clamp-1">{restaurant.address}</p>
              </Link>

              <div className="flex gap-3 items-center">
                <button className="animate-fade-in flex items-center gap-2 whitespace-nowrap py-2 px-4 text-xs uppercase text-center border border-zinc-700 bg-zinc-700 bg-opacity-90 hover:bg-opacity-60 hover:border-opacity-20 transition-colors duration-500 font-semibold text-white rounded-full" type="button">
                  Seguir
                </button>

                <Link to={`/r/${restaurant.slug}/menus`} onClick={onClick} className="animate-fade-in flex items-center gap-2 whitespace-nowrap py-2 px-4 text-xs uppercase text-center bg-pink-600 hover:bg-pink-700 transition-colors duration-500 font-semibold text-white rounded-full">
                  Menús
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RestaurantPreview;
