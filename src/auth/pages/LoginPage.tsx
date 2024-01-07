import { Link, useLocation, useNavigate } from 'react-router-dom';
import LoginForm from '@/auth/components/LoginForm';

const LoginPage = () => {
  const navigate = useNavigate();
  const { state } = useLocation();

  return (
    <div
      className="flex flex-col items-center gap-4 justify-center min-h-full p-4"
      style={{
        minHeight: 'calc(100vh - 74px)',
      }}
    >
      <LoginForm
        onFinished={() => {
          const { from } = state || { from: { pathname: '/' } };
          navigate(from);
        }}
        changeToRecoverPassword={() => {
          navigate('/auth/recover-password');
        }}
      />
      <div className="max-w-[450px] border border-zinc-800 w-full mx-auto bg-zinc-900 p-5 rounded-md flex flex-wrap items-center gap-6 animate-fade-in">
        <Link
          to="/auth/register"
          className="flex-1 text-center items-center gap-2 hover:bg-zinc-800 border border-zinc-800 transition-all duration-100 text-zinc-100 px-5 py-3 uppercase text-sm font-semibold"
        >
          Registrarse
        </Link>
      </div>
    </div>
  );
};

export default LoginPage;
