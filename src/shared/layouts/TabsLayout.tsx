import StorieList from '@/stories/components/StorieList';
import { Outlet } from 'react-router-dom';
import TabNavigation from '../components/TabNavigation';
import { useEffect, useState } from 'react';
import { twMerge } from 'tailwind-merge';

const TabsLayout = () => {
  const [showTabsBottom, setShowTabsBottom] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      if (window.scrollY > 390) {
        setShowTabsBottom(true);
      } else {
        setShowTabsBottom(false);
      }
    };

    window.addEventListener('scroll', onScroll);
    window.addEventListener('resize', onScroll);
    window.addEventListener('load', onScroll);

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      window.removeEventListener('load', onScroll);
    };
  }, []);

  return (
    <>
      <StorieList />
      <TabNavigation className={twMerge('transition-opacity duration-300', showTabsBottom ? 'opacity-0' : 'opacity-100')} />
      <Outlet />
      <TabNavigation
        className={twMerge(
          'sticky z-20 transition-all duration300 p-0 sm:px-4 sm:py-2 sm:rounded-lg rounded-none',
          showTabsBottom ? 'opacity-100 bottom-0 ' : 'opacity-0 -bottom-20',
        )}
        classNameContainer="sm:rounded-lg rounded-none sm:shadow-lg bg-opacity-70 shadow-none sm:px-4 px-2 py-1"
      />
    </>
  );
};

export default TabsLayout;
