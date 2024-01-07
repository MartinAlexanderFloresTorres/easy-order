import { useState } from 'react';
import { ChevronLeft } from 'lucide-react';
import { twMerge } from 'tailwind-merge';
import useRecoverPassword from '../hooks/useRecoverPassword';
import toast from 'react-hot-toast';

interface RecoverPasswordFormProps {
  showClose?: boolean;
  onFinished?: () => void;
  className?: string;
}

const DEFAULT_EMAIL = '';

const RecoverPasswordForm = ({ showClose, className = 'max-w-[450px]', onFinished = () => {} }: RecoverPasswordFormProps) => {
  const [email, setEmail] = useState(DEFAULT_EMAIL);

  const { loadingRecoverPassword, recoverPassword } = useRecoverPassword();

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Validate email
    if (!email) return toast.error('Ingresa un email válido');

    // Validate email format
    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(email)) return toast.error('Ingresa un email válido');

    // Recover password
    const { success } = await recoverPassword(email);
    if (success) onFinished();
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setEmail(value.trim());
  };

  return (
    <form
      onSubmit={onSubmit}
      className={twMerge(
        'relative border border-zinc-800 w-full mx-auto bg-zinc-900 px-6 pb-10 rounded-md flex flex-col gap-6 animate-fade-in',
        className,
      )}
      noValidate
    >
      <div className={twMerge('w-full pt-5', showClose && 'pl-4')}>
        {showClose && (
          <div className="flex items-start justify-start w-fit absolute top-5 left-2">
            <button className="text-zinc-600 hover:text-white transition-all duration-300" type="button" onClick={onFinished}>
              <ChevronLeft size={30} />
            </button>
          </div>
        )}
        <legend className="text-center text-lg md:text-2xl font-extrabold text-white uppercase">¿Se te olvidó tu contraseña?</legend>
      </div>

      <p className="text-center text-xs text-zinc-400">
        ¿No puedes entrar? Ingresa tu email a continuación y te enviaremos un enlace para solucionar este problema.
      </p>

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
          value={email.trim()}
          onChange={onChange}
          disabled={loadingRecoverPassword}
        />
      </div>

      <div className="flex justify-center items-center gap-2">
        <button
          type="submit"
          className="px-5 py-2 text-[14px] w-full rounded-md text-center bg-orange-700 hover:bg-orange-600 transition-all duration-300 uppercase font-extrabold"
          disabled={loadingRecoverPassword}
        >
          {loadingRecoverPassword ? 'Enviando...' : 'Envíar Email'}
        </button>
      </div>
    </form>
  );
};

RecoverPasswordForm.defaultProps = {
  onFinished: () => {},
};

export default RecoverPasswordForm;
