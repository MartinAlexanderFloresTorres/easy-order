import { useRef, useState } from 'react';
import useConfirmCode from '@/auth/hooks/useConfirmCode';
import toast from 'react-hot-toast';

interface ConfirmationFormProps {
  onFinished?: () => void;
  token: string;
}

const ConfirmationForm = ({ token, onFinished = () => {} }: ConfirmationFormProps) => {
  const [digit1, setDigit1] = useState('');
  const [digit2, setDigit2] = useState('');
  const [digit3, setDigit3] = useState('');
  const [digit4, setDigit4] = useState('');
  const [digit5, setDigit5] = useState('');

  // Hooks
  const { loadingConfirmation, confirm } = useConfirmCode();

  const inputs = useRef<HTMLInputElement[]>([]);

  const focusNextInput = (index: number) => {
    switch (index) {
      case 1:
        inputs.current[1].focus();
        break;
      case 2:
        inputs.current[2].focus();
        break;
      case 3:
        inputs.current[3].focus();
        break;
      case 4:
        inputs.current[4].focus();
        break;
      case 5:
        inputs.current[0].focus();
        break;
    }
  };

  const handleDigitChange = (digit: string, index: number) => {
    switch (index) {
      case 1:
        setDigit1(digit.trim().slice(0, 1).toLocaleUpperCase());
        focusNextInput(index);
        break;
      case 2:
        setDigit2(digit.trim().slice(0, 1).toLocaleUpperCase());
        focusNextInput(index);
        break;
      case 3:
        setDigit3(digit.trim().slice(0, 1).toLocaleUpperCase());
        focusNextInput(index);
        break;
      case 4:
        setDigit4(digit.trim().slice(0, 1).toLocaleUpperCase());
        focusNextInput(index);
        break;
      case 5:
        setDigit5(digit.trim().slice(0, 1).toLocaleUpperCase());
        focusNextInput(index);
        break;
    }
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    toast.dismiss();

    const isEmtpy = [digit1, digit2, digit3, digit4, digit5].some((digit) => digit.trim() === '');
    if (isEmtpy) return toast.error('Por favor, ingresa el codigo de verificación');

    const { success } = await confirm(token, `${digit1}${digit2}${digit3}${digit4}${digit5}`);
    if (success) onFinished();
  };

  return (
    <form
      onSubmit={onSubmit}
      className="max-w-[450px] border border-zinc-800 w-full mx-auto bg-zinc-900 p-6 rounded-md flex flex-col gap-6 animate-fade-in"
    >
      <legend className="text-center text-lg md:text-2xl font-extrabold text-white uppercase">Verificar cuenta</legend>

      <p className="text-center text-xs text-zinc-400">
        <b>Se ha enviado un codigo de verificación a tu email. </b>
        Por favor, introducelo en el siguiente campo para verificar tu cuenta.
      </p>

      <div className="flex gap-2 w-full">
        <input
          className="p-2 text-center w-full text-sm focus-visible:outline  focus-visible:outline-zinc-700 rounded-md bg-zinc-800"
          type="text"
          disabled={loadingConfirmation}
          name="digit1"
          autoFocus
          autoComplete="off"
          value={digit1}
          onChange={(e) => handleDigitChange(e.target.value, 1)}
          ref={(input) => {
            if (input) inputs.current[0] = input;
          }}
        />
        <input
          className="p-2 text-center w-full text-sm focus-visible:outline  focus-visible:outline-zinc-700 rounded-md bg-zinc-800"
          type="text"
          disabled={loadingConfirmation}
          name="digit2"
          autoComplete="off"
          value={digit2}
          onChange={(e) => handleDigitChange(e.target.value, 2)}
          ref={(input) => {
            if (input) inputs.current[1] = input;
          }}
        />
        <input
          className="p-2 text-center w-full text-sm focus-visible:outline  focus-visible:outline-zinc-700 rounded-md bg-zinc-800"
          type="text"
          disabled={loadingConfirmation}
          name="digit3"
          autoComplete="off"
          value={digit3}
          onChange={(e) => handleDigitChange(e.target.value, 3)}
          ref={(input) => {
            if (input) inputs.current[2] = input;
          }}
        />
        <input
          className="p-2 text-center w-full text-sm focus-visible:outline  focus-visible:outline-zinc-700 rounded-md bg-zinc-800"
          type="text"
          disabled={loadingConfirmation}
          name="digit4"
          autoComplete="off"
          value={digit4}
          onChange={(e) => handleDigitChange(e.target.value, 4)}
          ref={(input) => {
            if (input) inputs.current[3] = input;
          }}
        />
        <input
          className="p-2 text-center w-full text-sm focus-visible:outline  focus-visible:outline-zinc-700 rounded-md bg-zinc-800"
          type="text"
          disabled={loadingConfirmation}
          name="digit5"
          autoComplete="off"
          value={digit5}
          onChange={(e) => handleDigitChange(e.target.value, 5)}
          ref={(input) => {
            if (input) inputs.current[4] = input;
          }}
        />
      </div>

      <div className="flex justify-center items-center gap-2">
        <button
          type="submit"
          className="px-5 py-2 text-[14px] w-full rounded-md text-center bg-orange-700 hover:bg-orange-600 transition-all duration-300 uppercase font-extrabold"
          disabled={loadingConfirmation}
        >
          {loadingConfirmation ? 'Verificando...' : 'Verificar codigo'}
        </button>
      </div>
    </form>
  );
};

export default ConfirmationForm;
