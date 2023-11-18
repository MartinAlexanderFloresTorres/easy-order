import { useNavigate } from 'react-router-dom';
import RegisterForm from '@/auth/components/RegisterForm';

const RegistePage = () => {
  const navigate = useNavigate();

  return (
    <div
      className="flex flex-col items-center gap-4 justify-center min-h-full p-4"
      style={{
        minHeight: 'calc(100vh - 74px)',
      }}
    >
      <RegisterForm
        changeToLogin={() => {
          navigate('/auth/login');
        }}
      />
    </div>
  );
};

export default RegistePage;
