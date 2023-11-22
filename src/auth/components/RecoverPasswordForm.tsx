import { ChevronLeft } from 'lucide-react';
import { twMerge } from 'tailwind-merge';

interface RecoverPasswordFormProps {
  showClose?: boolean;
  onFinished?: () => void;
  onSuccess?: () => void;
  onError?: () => void;
  className?: string;
}

const RecoverPasswordForm = ({
  showClose,
  className = 'max-w-[450px]',
  onFinished = () => {},
  onError = () => {},
  onSuccess = () => {},
}: RecoverPasswordFormProps) => {
  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onFinished();
  };

  return (
    <form
      onSubmit={onSubmit}
      className={twMerge('relative border border-zinc-800 w-full mx-auto bg-zinc-900 px-6 pb-10 rounded-md flex flex-col gap-6', className)}
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
          autoComplete="off"
        />
      </div>

      <div className="flex justify-center items-center gap-2">
        <button
          type="submit"
          className="px-5 py-2 text-[14px] w-full rounded-md text-center bg-orange-700 hover:bg-orange-600 transition-all duration-300 uppercase font-extrabold"
        >
          Envíar Email
        </button>
      </div>
    </form>
  );
};

RecoverPasswordForm.defaultProps = {
  onFinished: () => {},
  onError: () => {},
  onSuccess: () => {},
};

export default RecoverPasswordForm;
