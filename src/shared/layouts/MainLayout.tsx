import { Outlet } from 'react-router-dom';
import useStories from '@/stories/hooks/useStories';
import usePublic from '@/shared/hooks/usePublic';
import Header from '@/shared/components/Header';
import ModalStorie from '@/stories/components/ModalStorie';
import ModalSearch from '@/shared/components/ModalSearch';

const MainLayout = () => {
  const { showStorie, closeStorie } = useStories();
  const { isShowModalSearch } = usePublic();

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
    </div>
  );
};

export default MainLayout;
