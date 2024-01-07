import { Outlet } from 'react-router-dom';
import Header from '@/restaurant/components/Header';
import Tabs from '@/restaurant/components/Tabs';
import VerifyUserAuthenticationGuard from '@/shared/guards/VerifyUserAuthenticationGuard';
import RestaurantProvider from '@/restaurant/providers/RestaurantProvider';

const RestaurantLayout = () => {
  return (
    <VerifyUserAuthenticationGuard>
      <RestaurantProvider>
        <Header />
        <div className="p-4 w-full">
          <div className="container-2 mx-auto" style={{ minHeight: 'calc(100vh - 70px - 56px)' }}>
            <Outlet />
          </div>
        </div>
        <Tabs />
      </RestaurantProvider>
    </VerifyUserAuthenticationGuard>
  );
};

export default RestaurantLayout;
