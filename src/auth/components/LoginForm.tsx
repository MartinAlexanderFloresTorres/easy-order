import { X } from 'lucide-react';
import { useState } from 'react';
import { twMerge } from 'tailwind-merge';
import useLogin from '../hooks/useLogin';
import toast from 'react-hot-toast';

interface LoginFormProps {
  showClose?: boolean;
  onFinished?: () => void;
  className?: string;
  changeToRecoverPassword: () => void;
}

const DEFAULT_FIELDS = {
  email: '',
  password: '',
};

const LoginForm = ({ showClose, className = 'max-w-[450px]', onFinished = () => {}, changeToRecoverPassword }: LoginFormProps) => {
  const [fields, setFields] = useState(DEFAULT_FIELDS);

  // Hooks
  const { loadingLogin, login } = useLogin();

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    toast.dismiss();

    // Validate fields
    if (!fields.email) {
      return toast.error('El email es obligatorio');
    }

    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(fields.email)) return toast.error('El email no es válido');

    if (!fields.password) {
      return toast.error('La contraseña es obligatoria');
    }

    const { success } = await login(fields);
    if (success) {
      setFields(DEFAULT_FIELDS);
      onFinished();
    }
  };

  const handleValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setFields((prev) => ({ ...prev, [e.target.name]: value.trim() }));
  };

  return (
    <form
      onSubmit={onSubmit}
      className={twMerge('border border-zinc-800 w-full mx-auto bg-zinc-900 px-6 pb-10 rounded-md flex flex-col gap-6 animate-fade-in', className)}
      noValidate
    >
      <div className="w-full pt-5">
        {showClose && (
          <div className="flex items-start justify-end">
            <button className="text-zinc-600 hover:text-white transition-all duration-300" type="button" onClick={onFinished}>
              <X size={24} />
            </button>
          </div>
        )}
        <legend className="text-center text-lg md:text-2xl font-extrabold text-white uppercase">Iniciar sesión</legend>
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-xs text-white font-bold" htmlFor="email">
          Email
        </label>
        <input
          className="p-2 text-sm focus-visible:outline  focus-visible:outline-zinc-700 rounded-md bg-zinc-800"
          type="email"
          name="email"
          id="email"
          autoFocus
          value={fields.email}
          onChange={handleValueChange}
          disabled={loadingLogin}
        />
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-xs text-white font-bold" htmlFor="password">
          Contraseña
        </label>
        <input
          className="p-2 text-sm focus-visible:outline  focus-visible:outline-zinc-700 rounded-md bg-zinc-800"
          type="password"
          name="password"
          id="password"
          value={fields.password}
          onChange={handleValueChange}
          disabled={loadingLogin}
        />
      </div>

      <div className="flex justify-center items-center gap-2">
        <button
          type="submit"
          className="px-5 py-2 text-[14px] w-full rounded-md text-center bg-orange-700 hover:bg-orange-600 transition-all duration-300 uppercase font-extrabold"
          disabled={loadingLogin}
        >
          {loadingLogin ? 'Iniciando...' : 'Iniciar sesión'}
        </button>
      </div>

      <div className="text-center text-xs text-white font-bold">
        <button type="button" onClick={changeToRecoverPassword} className="text-orange-700 hover:text-orange-600 transition-all">
          ¿Olvidaste tu contraseña?
        </button>
      </div>
    </form>
  );
};

LoginForm.defaultProps = {
  onFinished: () => {},
};

export default LoginForm;
