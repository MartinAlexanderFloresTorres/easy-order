import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { twMerge } from 'tailwind-merge';
import OfferOfTheDay from '@/best-sellers/components/OfferOfTheDay';

const OffersOfTheDay = () => {
  const [isSeeMore, setIsSeeMore] = useState(false);

  const toggleSeeMore = () => setIsSeeMore((prev) => !prev);

  return (
    <section className="p-4">
      <h2 className="text-center text-4xl font-extrabold text-gray-300 mb-14">Ofertas del día</h2>
      <div className="container mx-auto grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
        <OfferOfTheDay />
        <OfferOfTheDay />
        <OfferOfTheDay />
        {isSeeMore && (
          <>
            <OfferOfTheDay />
            <OfferOfTheDay />
          </>
        )}
      </div>

      <div className="flex justify-center mt-8">
        <button
          onClick={toggleSeeMore}
          className="leading-none flex items-center gap-2 text-xs font-medium text-zinc-400 hover:text-white hover:bg-zinc-800 hover:bg-opacity-50 backdrop-blur-sm px-4 py-2 rounded-md transition-all duration-300"
        >
          <span className="leading-none">{isSeeMore ? 'Ver menos' : 'Ver más'}</span>
          <ChevronDown size={24} className={twMerge('transform transition-transform duration-500', isSeeMore && 'rotate-180')} />
        </button>
      </div>
    </section>
  );
};

export default OffersOfTheDay;
