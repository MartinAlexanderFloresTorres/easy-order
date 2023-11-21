import { twMerge } from 'tailwind-merge';
import { BadgePercent, Newspaper, Store, Utensils } from 'lucide-react';
import Tab from '@/shared/components/Tab';

interface TabNavigationProps {
  className?: string;
  classNameContainer?: string;
  style?: React.CSSProperties;
}
const TabNavigation = ({ className, classNameContainer, style }: TabNavigationProps) => {
  return (
    <section className={twMerge('px-4 py-2', className)} {...(style && { style })}>
      <div
        className={twMerge('mt-4 sm:w-fit max-w-2xl mx-auto p-2 bg-zinc-800 bg-opacity-50 backdrop-blur-md rounded-lg shadow-lg', classNameContainer)}
      >
        <div className="flex gap-2 items-center justify-center">
          <Tab
            tab={{
              title: 'Publicaciones',
              url: '/tabs/publications',
              icon: <Newspaper size={20} className="w-[20px] h-[20px] min-w-[20px] min-h-[20px] inline-block" />,
            }}
          />

          <Tab
            tab={{
              title: 'Restaurantes',
              url: '/tabs/restaurants',
              icon: <Store size={20} className="w-[20px] h-[20px] min-w-[20px] min-h-[20px] inline-block" />,
            }}
          />

          <Tab
            tab={{
              title: 'Categorias',
              url: '/tabs/categories',
              icon: <Utensils size={20} className="w-[20px] h-[20px] min-w-[20px] min-h-[20px] inline-block" />,
            }}
          />

          <Tab
            tab={{
              title: 'Ofertas',
              url: '/tabs/offers',
              icon: <BadgePercent size={20} className="w-[20px] h-[20px] min-w-[20px] min-h-[20px] inline-block" />,
            }}
          />
        </div>
      </div>
    </section>
  );
};

export default TabNavigation;
