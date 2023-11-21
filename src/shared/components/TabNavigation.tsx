import { BadgePercent, Newspaper, Store, Utensils } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { twMerge } from 'tailwind-merge';

interface TabNavigationProps {
  className?: string;
  style?: React.CSSProperties;
}

const TabNavigation = ({ className, style }: TabNavigationProps) => {
  const { pathname } = useLocation();
  const activeTab = (path: string) => (pathname === path ? 'text-pink-500 border-b-4 border-b-pink-500' : 'border-b-4 border-b-transparent');
  return (
    <>
      <div className={twMerge('px-4 py-2', className)} {...(style && { style })}>
        <section className="mt-4 w-fit max-w-2xl mx-auto p-2 bg-zinc-800 bg-opacity-50 backdrop-blur-md rounded-lg shadow-lg">
          <div className="flex gap-2 items-center justify-center">
            <Link to={'/tabs/publications'} className={twMerge('pb-1', activeTab('/tabs/publications'))}>
              <div className="relative group flex-1 flex gap-2 items-center justify-center px-3 py-2 text-center text-zinc-200 hover:bg-pink-700 hover:bg-opacity-10 hover:backdrop-blur-md  transition-colors duration-300 text-xs font-semibold rounded-lg">
                <Newspaper size={18} className="w-[18px] h-[18px] min-w-[18px] min-h-[18px] inline-block" />
                <span className="text-xs leading-none border sm:border-none border-zinc-700 border-opacity-30 opacity-0 sm:opacity-100 group-hover:opacity-100 group-hover:-top-9 -top-7 min-w-fit whitespace-nowrap absolute sm:static left-1/2 -translate-x-1/2 sm:transform-none sm:transition-none bg-zinc-800 sm:bg-transparent px-3 py-1 sm:p-0 rounded-md sm:rounded-none transition-all duration-200">
                  Publicaciones
                </span>
              </div>
            </Link>

            <Link to={'/tabs/restaurants'} className={twMerge('pb-1', activeTab('/tabs/restaurants'))}>
              <div className="relative group flex-1 flex gap-2 items-center justify-center  px-3 py-2 text-center text-zinc-200 hover:bg-pink-700 hover:bg-opacity-10 hover:backdrop-blur-md  transition-colors duration-300 text-xs font-semibold rounded-lg">
                <Store size={18} className="w-[18px] h-[18px] min-w-[18px] min-h-[18px] inline-block" />
                <span className="text-xs leading-none border sm:border-none border-zinc-700 border-opacity-30 opacity-0 sm:opacity-100 group-hover:opacity-100 group-hover:-top-9 -top-7 min-w-fit whitespace-nowrap absolute sm:static left-1/2 -translate-x-1/2 sm:transform-none sm:transition-none bg-zinc-800 sm:bg-transparent px-3 py-1 sm:p-0 rounded-md sm:rounded-none transition-all duration-200">
                  Restaurantes
                </span>
              </div>
            </Link>

            <Link to={'/tabs/categories'} className={twMerge('pb-1', activeTab('/tabs/categories'))}>
              <div className="relative group flex-1 flex gap-2 items-center justify-center px-3 py-2 text-center text-zinc-200 hover:bg-pink-700 hover:bg-opacity-10 hover:backdrop-blur-md  transition-colors duration-300 text-xs font-semibold rounded-lg">
                <Utensils size={18} className="w-[18px] h-[18px] min-w-[18px] min-h-[18px] inline-block" />
                <span className="text-xs leading-none border sm:border-none border-zinc-700 border-opacity-30 opacity-0 sm:opacity-100 group-hover:opacity-100 group-hover:-top-9 -top-7 min-w-fit whitespace-nowrap absolute sm:static left-1/2 -translate-x-1/2 sm:transform-none sm:transition-none bg-zinc-800 sm:bg-transparent px-3 py-1 sm:p-0 rounded-md sm:rounded-none transition-all duration-200">
                  Categorias
                </span>
              </div>
            </Link>

            <Link to={'/tabs/offers'} className={twMerge('pb-1', activeTab('/tabs/offers'))}>
              <div className="relative group flex-1 flex gap-2 items-center justify-center px-3 py-2 text-center text-zinc-200 hover:bg-pink-700 hover:bg-opacity-10 hover:backdrop-blur-md  transition-colors duration-300 text-xs font-semibold rounded-lg">
                <BadgePercent size={18} className="w-[18px] h-[18px] min-w-[18px] min-h-[18px] inline-block" />
                <span className="text-xs leading-none border sm:border-none border-zinc-700 border-opacity-30 opacity-0 sm:opacity-100 group-hover:opacity-100 group-hover:-top-9 -top-7 min-w-fit whitespace-nowrap absolute sm:static left-1/2 -translate-x-1/2 sm:transform-none sm:transition-none bg-zinc-800 sm:bg-transparent px-3 py-1 sm:p-0 rounded-md sm:rounded-none transition-all duration-200">
                  Ofertas
                </span>
              </div>
            </Link>
          </div>
        </section>
      </div>
    </>
  );
};

export default TabNavigation;
