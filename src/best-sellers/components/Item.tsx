import { Link } from 'react-router-dom';
import { ChevronRight, Star } from 'lucide-react';
import RestaurantPreview from '@/restaurant/components/RestaurantPreview';

interface ItemProps {
  to: string;
}

const Item = ({ to }: ItemProps) => {
  return (
    <div className="border border-zinc-800 bg-zinc-800 hover:bg-opacity-50 bg-opacity-30 backdrop-blur-sm transition-colors duration-300 shadow-lg overflow-hidden">
      <div>
        <Link draggable={false} to={`/${to}/by/1`} className="block select-none w-full h-48 overflow-hidden">
          <img
            className="block w-full h-48 bg-zinc-900 object-cover object-center hover:scale-105 transition-all duration-300"
            src="https://uploads-ssl.webflow.com/632c4f68f7447c23e3b5d6cd/6434321debae1afd87163c56_Main-p-800.png"
            alt="Item"
          />
        </Link>
        <div className="p-4">
          <div className="flex items-center justify-between gap-3 mb-4">
            <div className="flex items-center justify-center w-fit px-[10px] py-[2px] border border-sky-800 text-center bg-sky-800 bg-opacity-10 text-sky-500 rounded-md">
              <span className="text-xs line-clamp-1">10 personas</span>
            </div>

            <Link to={`/${to}/by/1`} className="p-1 text-zinc-600 hover:text-white transition-all duration-300">
              <ChevronRight size={24} />
            </Link>
          </div>

          <div>
            <Link to={`/${to}/by/1`} className="block mb-4">
              <h2 className="line-clamp-1 text-zinc-300 hover:text-white transition-colors text-sm font-bold mb-2">Nombre del producto</h2>
              <p className="line-clamp-1 text-xs font-medium mb-2 bg-green-800 bg-opacity-20 w-fit py-1 px-3 rounded-md border border-green-800 border-opacity-30">
                $ 100.00
              </p>

              <p className="line-clamp-2 text-xs text-zinc-400 mb-2">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eius provident, placeat eum perferendis nulla expedita ab incidunt voluptas
                voluptates tempore.
              </p>
            </Link>

            <div className="flex gap-2 justify-between items-center">
              <RestaurantPreview />
              <div className="flex items-center justify-end gap-1 text-xs font-medium text-yellow-400">
                <span>5</span>
                <Star size={16} fill="#FBBF24" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Item;
