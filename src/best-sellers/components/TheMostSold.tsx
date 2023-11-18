import { useState } from 'react';
import { twMerge } from 'tailwind-merge';
import { ChevronDown } from 'lucide-react';
import Item from '@/best-sellers/components/Item';

interface Item {
  id: string;
  name: string;
  price: number;
  description: string;
  image: string;
}

interface TheMostSoldProps {
  title: string;
  subtitle: string;
  to: string;
  products: Item[];
}

const TheMostSold = ({ title, subtitle, to, products = [] }: TheMostSoldProps) => {
  const [isSeeMore, setIsSeeMore] = useState(false);

  const toggleSeeMore = () => setIsSeeMore((prev) => !prev);

  console.log(products);

  return (
    <section className="p-4">
      <h2 className="text-center text-4xl font-extrabold text-gray-300 mb-4">{title}</h2>
      <p className={'text-center text-sm font-medium text-gray-400 mb-14'}>{subtitle}</p>
      <div className="container mx-auto grid medium-grid-cols-1 grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        <Item to={to} />
        <Item to={to} />
        <Item to={to} />
        <Item to={to} />
        <Item to={to} />
        {isSeeMore && (
          <>
            <Item to={to} />
            <Item to={to} />
            <Item to={to} />
            <Item to={to} />
            <Item to={to} />
          </>
        )}
      </div>

      <div className="flex justify-center mt-8">
        <button
          onClick={toggleSeeMore}
          className="leading-none flex items-center gap-2 text-xs font-medium text-zinc-400 hover:text-white px-4 py-2 rounded-md transition-all duration-300"
        >
          <span className="leading-none">{isSeeMore ? 'Ver menos' : 'Ver más'}</span>
          <ChevronDown size={24} className={twMerge('transform transition-transform duration-500', isSeeMore && 'rotate-180')} />
        </button>
      </div>
    </section>
  );
};

export default TheMostSold;
