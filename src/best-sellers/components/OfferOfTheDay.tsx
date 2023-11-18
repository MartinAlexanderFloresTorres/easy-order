import RestaurantPreview from '@/restaurant/components/RestaurantPreview';
import { ChevronRight, Star } from 'lucide-react';
import { Link } from 'react-router-dom';

const OfferOfTheDay = () => {
  return (
    <div className="border border-zinc-800 bg-zinc-800 hover:bg-opacity-50 bg-opacity-30 backdrop-blur-sm transition-colors duration-300 shadow-lg overflow-hidden">
      <div className="grid grid-cols-6">
        <Link draggable={false} to="/food/by/1" className="select-none col-start-1 col-end-4 block w-full h-full overflow-hidden">
          <img
            className="block w-full h-full bg-zinc-900 object-cover object-center hover:scale-105 transition-all duration-300"
            src="https://uploads-ssl.webflow.com/632c4f68f7447c23e3b5d6cd/6434321debae1afd87163c56_Main-p-800.png"
            alt="food"
          />
        </Link>
        <div className="col-start-4 col-end-7 w-full p-4">
          <div className="flex items-center justify-between gap-3 mb-4">
            <div className="flex items-center gap-1 text-xs font-medium text-yellow-400">
              <Star size={16} fill="#FBBF24" />
              <Star size={16} fill="#FBBF24" />
              <Star size={16} fill="#FBBF24" />
              <Star size={16} fill="#FBBF24" />
              <Star size={16} />
            </div>
            <Link to="/food/by/1" className="p-1 text-zinc-600 hover:text-white transition-all duration-300">
              <ChevronRight size={24} />
            </Link>
          </div>

          <div>
            <Link to="/food/by/1" className="block mb-4">
              <h2 className="line-clamp-1 text-zinc-300 hover:text-white transition-colors text-sm font-bold mb-2">Nombre del producto</h2>
              <p className="line-clamp-1 text-xs font-medium mb-2 bg-green-800 bg-opacity-20 w-fit py-1 px-3 rounded-md border border-green-800 border-opacity-30">
                $ 100.00
              </p>
              <p className="line-clamp-2 text-xs text-zinc-400 mb-2">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eius provident, placeat eum perferendis nulla expedita ab incidunt voluptas
                voluptates tempore.
              </p>
            </Link>

            <RestaurantPreview />
          </div>
        </div>
      </div>
    </div>
  );
};

export default OfferOfTheDay;
