import { useEffect } from 'react';
import useConfirmCode from '../hooks/useConfirmCode';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import useConfirmCodeValid from '../hooks/useConfirmCodeValid';

const AutocConfirmationPage = () => {
  // Hooks
  const { token, code } = useParams();
  const { loadingConfirmationValid, isTokenConfirmValid } = useConfirmCodeValid(token);
  const { loadingConfirmation, confirm } = useConfirmCode();
  const navigate = useNavigate();

  // Effects
  useEffect(() => {
    if (!token || !code || !isTokenConfirmValid) return;

    (async () => {
      const { success } = await confirm(token, code);
      if (success) return navigate('/');
    })();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token, code, isTokenConfirmValid]);

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

  if (loadingConfirmation)
    return (
      <div
        className="flex gap-4 flex-col items-center justify-center min-h-full p-4 animate-fade-in"
        style={{
          minHeight: 'calc(100vh - 74px)',
        }}
      >
        <div className="bg-green-500 bg-opacity-10 rounded-md shadow-md p-4 border border-green-900 border-opacity-50">
          <p className="text-center text-white text-lg font-semibold uppercase">Estamos confirmando tu cuenta, por favor espera...</p>
        </div>
      </div>
    );

  return null;
};

export default AutocConfirmationPage;
