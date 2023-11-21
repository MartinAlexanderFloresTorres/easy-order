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
        className={twMerge('sticky z-20 transition-all duration300', showTabsBottom ? 'opacity-100 bottom-0 ' : 'opacity-0 -bottom-20')}
      />
    </>
  );
};

export default TabsLayout;
