import { Link, useLocation, useNavigate } from 'react-router-dom';
import RecoverPasswordForm from '@/auth/components/RecoverPasswordForm';

const RecoverPasswordPage = () => {
  const navigate = useNavigate();
  const { state } = useLocation();

  return (
    <div
      className="flex gap-4 flex-col items-center justify-center min-h-full p-4"
      style={{
        minHeight: 'calc(100vh - 74px)',
      }}
    >
      <RecoverPasswordForm
        onSuccess={() => {
          const { from } = state || { from: { pathname: '/' } };
          navigate(from);
        }}
      />

      <div className="max-w-[450px] border border-zinc-800 w-full mx-auto bg-zinc-900 p-5 rounded-md flex flex-wrap items-center gap-6">
        <Link
          to="/auth/login"
          className="w-full text-center sm:w-fit items-center gap-2 hover:bg-zinc-800 border border-zinc-800 transition-all duration-100 text-zinc-100 px-5 py-3 uppercase text-sm font-semibold"
        >
          Iniciar sesión
        </Link>
        <Link
          to="/auth/register"
          className="w-full text-center sm:w-fit items-center gap-2 bg-zinc-800 border border-zinc-800 transition-all duration-100 text-zinc-100 px-5 py-3 uppercase text-sm font-semibold"
        >
          Registrarse
        </Link>
      </div>
    </div>
  );
};

export default RecoverPasswordPage;
