import { Navigate, useLocation, useNavigate, useParams } from 'react-router-dom';
import ConfirmationForm from '@/auth/components/ConfirmationForm';
import useConfirmCodeValid from '@/auth/hooks/useConfirmCodeValid';

const ConfirmationPage = () => {
  const navigate = useNavigate();
  const { token } = useParams();
  const { state } = useLocation();

  const { loadingConfirmationValid, isTokenConfirmValid } = useConfirmCodeValid(token);

  if (!token) return null;

  if (loadingConfirmationValid)
    return (
      <div
        className="flex gap-4 flex-col items-center justify-center min-h-full p-4 animate-fade-in"
        style={{
          minHeight: 'calc(100vh - 74px)',
        }}
      >
        <div className="bg-green-500 bg-opacity-10 rounded-md shadow-md p-4 border border-green-900 border-opacity-50">
          <p className="text-center text-white text-lg font-semibold uppercase">Verificando código de confirmación...</p>
        </div>
      </div>
    );

  if (!isTokenConfirmValid) return <Navigate to="/" />;

  return (
    <div
      className="flex gap-4 flex-col items-center justify-center min-h-full p-4 animate-fade-in"
      style={{
        minHeight: 'calc(100vh - 74px)',
      }}
    >
      <ConfirmationForm
        onFinished={() => {
          const { from } = state || { from: { pathname: '/' } };
          navigate(from);
        }}
        token={token}
      />
    </div>
  );
};

export default ConfirmationPage;
