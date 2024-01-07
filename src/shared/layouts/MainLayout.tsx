import { Outlet } from 'react-router-dom';
import useStories from '@/stories/hooks/useStories';
import usePublic from '@/shared/hooks/usePublic';
import Header from '@/shared/components/Header';
import ModalStorie from '@/stories/components/ModalStorie';
import ModalSearch from '@/shared/components/ModalSearch';
import useCart from '@/cart/hooks/useCart';
import ModalTableOrder from '@/cart/components/ModalTableOrder';

const MainLayout = () => {
  const { showStorie, closeStorie } = useStories();
  const { isShowModalSearch } = usePublic();
  const { showModalTableOrder } = useCart();

  return (
    <div
      style={{
        animation: 'fadeIn 0.2s ease-in-out',
      }}
    >
      <Header />
      <Outlet />
      {showStorie && <ModalStorie showClose={true} stories={[]} onClose={closeStorie} />}
      {isShowModalSearch && <ModalSearch />}
      {showModalTableOrder && <ModalTableOrder />}
    </div>
  );
};

export default MainLayout;
