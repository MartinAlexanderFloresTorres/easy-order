import { useNavigate } from 'react-router-dom';
import ModalStorie from '@/stories/components/ModalStorie';

const StoriesPage = () => {
  const navigate = useNavigate();
  return (
    <ModalStorie
      showClose={false}
      onClose={() => {
        navigate('/');
      }}
      stories={[]}
    />
  );
};

export default StoriesPage;
