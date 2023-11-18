import { useLocation, useNavigate } from 'react-router-dom';
import ConfirmationForm from '@/auth/components/ConfirmationForm';

const ConfirmationPage = () => {
  const navigate = useNavigate();
  const { state } = useLocation();

  return (
    <div
      className="flex gap-4 flex-col items-center justify-center min-h-full p-4"
      style={{
        minHeight: 'calc(100vh - 74px)',
      }}
    >
      <ConfirmationForm
        onSuccess={() => {
          const { from } = state || { from: { pathname: '/' } };
          navigate(from);
        }}
        token={'123'}
      />
    </div>
  );
};

export default ConfirmationPage;
