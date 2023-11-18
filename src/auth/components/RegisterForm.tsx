import { useState } from 'react';
import { X } from 'lucide-react';
import { twMerge } from 'tailwind-merge';
import ConfirmationForm from '@/auth/components/ConfirmationForm';

interface RegisterFormProps {
  showClose?: boolean;
  className?: string;
  onFinished?: () => void;
  onSuccess?: () => void;
  onError?: () => void;
  changeToLogin: () => void;
}

const RegisterForm = ({
  showClose,
  className = 'max-w-[450px]',
  onFinished = () => {},
  onError = () => {},
  onSuccess = () => {},
  changeToLogin,
}: RegisterFormProps) => {
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [token, setToken] = useState<string | null>(null);

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setShowConfirmation(true);
    setToken('123456789');
    window.history.pushState({}, '', '/auth/confirmation/123456789');
  };

  if (showConfirmation)
    return (
      <ConfirmationForm
        token={token}
        onSuccess={() => {
          console.log('success');
          onFinished();
          onSuccess();
        }}
        onError={() => {
          console.log('error');
          onError();
        }}
      />
    );

  return (
    <form
      onSubmit={onSubmit}
      className={twMerge('border border-zinc-800 w-full mx-auto bg-zinc-900 px-6 pb-10 rounded-md flex flex-col gap-6', className)}
    >
      <div className="w-full pt-5">
        {showClose && (
          <div className="flex items-start justify-end">
            <button className="text-zinc-600 hover:text-white transition-all duration-300" type="button" onClick={onFinished}>
              <X size={24} />
            </button>
          </div>
        )}
        <legend className="text-center text-lg md:text-2xl font-extrabold text-white uppercase">Registrarse</legend>
      </div>

      <div className="grid grid-cols-2 gap-2">
        <div className="flex flex-col gap-2">
          <label className="text-xs text-white font-bold" htmlFor="name">
            Nombre
          </label>
          <input
            className="p-2 text-sm focus-visible:outline  focus-visible:outline-zinc-700 rounded-md bg-zinc-800"
            type="text"
            name="name"
            id="name"
            autoFocus
            autoComplete="off"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-xs text-white font-bold" htmlFor="surnames">
            Apellidos
          </label>
          <input
            className="p-2 text-sm focus-visible:outline  focus-visible:outline-zinc-700 rounded-md bg-zinc-800"
            type="text"
            name="surnames"
            id="surnames"
            autoComplete="off"
          />
        </div>
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
          autoComplete="off"
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
          autoComplete="off"
        />
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-xs text-white font-bold" htmlFor="repeatPassword">
          Repetir contraseña
        </label>
        <input
          className="p-2 text-sm focus-visible:outline  focus-visible:outline-zinc-700 rounded-md bg-zinc-800"
          type="password"
          name="repeatPassword"
          id="repeatPassword"
          autoComplete="off"
        />
      </div>

      <div className="flex justify-center items-center gap-2">
        <button
          type="submit"
          className="px-5 py-2 text-[14px] w-full rounded-md text-center bg-orange-700 hover:bg-orange-600 transition-all duration-300 uppercase font-extrabold"
        >
          Crear cuenta
        </button>
      </div>

      <div className="text-center text-xs text-white font-bold">
        <button type="button" onClick={changeToLogin} className="text-orange-700 hover:text-orange-600 transition-all">
          ¿Ya tienes una cuenta? Inicia sesión
        </button>
      </div>
    </form>
  );
};

RegisterForm.defaultProps = {
  onFinished: () => {},
  onError: () => {},
  onSuccess: () => {},
};

export default RegisterForm;
