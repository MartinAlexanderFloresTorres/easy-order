import { useState } from 'react';
import { ChevronDown, X } from 'lucide-react';
import { twMerge } from 'tailwind-merge';
import CategoryItem from '@/shared/components/CategoryItem';

interface CategoryItemsProps {
  onClose: () => void;
}

const CategoryItems = ({ onClose }: CategoryItemsProps) => {
  const [isSeeMore, setIsSeeMore] = useState(false);

  const toggleSeeMore = () => setIsSeeMore((prev) => !prev);

  return (
    <div className="w-full h-full overflow-auto">
      <div className="w-full flex flex-col md:flex-row justify-between gap-4 items-center border-l-4 border-pink-400 border-opacity-80 px-6 py-[6px] bg-zinc-800 bg-opacity-50 text-zinc-400 hover:text-white transition-all text-sm font-medium mb-4">
        <h2 className="text-lg font-semibold text-zinc-100 line-clamp-1">Comida</h2>
        <div className="flex gap-1 w-full md:w-fit">
          <button
            type="button"
            className="w-full md:w-fit text-center whitespace-nowrap bg-gradient-to-l from-blue-700 to-blue-400 transition-all duration-100 p-[1px] uppercase text-xs font-semibold"
          >
            <div className="px-4 py-[10px] text-center bg-zinc-900 text-blue-600 hover:text-blue-500 transition-all duration-300">Ver Todo</div>
          </button>

          <button
            type="button"
            className="bg-zinc-900 bg-opacity-70 hover:bg-zinc-900 border border-zinc-800 px-4 py-2 text-zinc-300 hover:text-white transition-all"
            onClick={onClose}
          >
            <X size={16} />
          </button>
        </div>
      </div>

      <section className="overflow-auto pr-1">
        <div className="container mx-auto grid gap-4 grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
          <CategoryItem />
          <CategoryItem />
          <CategoryItem />
          <CategoryItem />
          <CategoryItem />
          <CategoryItem />
          {isSeeMore && (
            <>
              <CategoryItem />
              <CategoryItem />
            </>
          )}
        </div>

        <div className="flex justify-center mt-8 mb-8">
          <button
            onClick={toggleSeeMore}
            className="leading-none flex items-center gap-2 text-xs font-medium text-zinc-400 hover:text-white px-4 py-2 rounded-md transition-all duration-300"
          >
            <span className="leading-none">{isSeeMore ? 'Ver menos' : 'Ver más'}</span>
            <ChevronDown size={24} className={twMerge('transform transition-transform duration-500', isSeeMore && 'rotate-180')} />
          </button>
        </div>
      </section>
    </div>
  );
};

export default CategoryItems;
