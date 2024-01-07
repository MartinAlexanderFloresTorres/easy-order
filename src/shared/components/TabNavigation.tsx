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
    <section className={twMerge('container mx-auto select-none p-4', className)} {...(style && { style })}>
      <div className={twMerge('p-2 bg-zinc-800 bg-opacity-50 backdrop-blur-md shadow-lg', classNameContainer)}>
        <div className="flex gap-2 items-center justify-center">
          <Tab
            tab={{
              title: 'Publicaciones',
              url: '/',
              icon: <Newspaper size={20} className="w-[20px] h-[20px] min-w-[20px] min-h-[20px] inline-block" />,
            }}
          />

          <Tab
            tab={{
              title: 'Restaurantes',
              url: '/restaurants',
              icon: <Store size={20} className="w-[20px] h-[20px] min-w-[20px] min-h-[20px] inline-block" />,
            }}
          />

          <Tab
            tab={{
              title: 'Menús',
              url: '/menus',
              icon: <Utensils size={20} className="w-[20px] h-[20px] min-w-[20px] min-h-[20px] inline-block" />,
            }}
          />

          <Tab
            tab={{
              title: 'Ofertas',
              url: '/offers',
              icon: <BadgePercent size={20} className="w-[20px] h-[20px] min-w-[20px] min-h-[20px] inline-block" />,
            }}
          />
        </div>
      </div>
    </section>
  );
};

export default TabNavigation;
