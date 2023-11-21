import { Outlet } from 'react-router-dom';
import Header from '@/shared/components/Header';
import ModalStorie from '@/stories/components/ModalStorie';
import useStories from '@/stories/hooks/useStories';

const MainLayout = () => {
  const { showStorie, closeStorie } = useStories();

  return (
    <div
      style={{
        animation: 'fadeIn 0.2s ease-in-out',
      }}
    >
      <Header />
      <Outlet />
      {showStorie && <ModalStorie showClose={true} stories={[]} onClose={closeStorie} />}
    </div>
  );
};

export default MainLayout;
