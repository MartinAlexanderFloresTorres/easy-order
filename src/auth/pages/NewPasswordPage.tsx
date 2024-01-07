import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import useNewPassword from '@/auth/hooks/useNewPassword';
import toast from 'react-hot-toast';

const DEFAULT_FIELDS = { password: '', repeatPassword: '' };

const NewPasswordPage = () => {
  const [fields, setFields] = useState(DEFAULT_FIELDS);

  const { isVerifyToken, loadingNewPassword, loadingVerifyToken, newPassword } = useNewPassword();

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    toast.dismiss();

    // Validate fields
    if (!fields.password) {
      toast.error('La contraseña es obligatoria');
      return;
    }

    // min 6 characters
    if (fields.password.length < 6) {
      toast.error('La contraseña debe tener al menos 6 caracteres');
      return;
    }

    // max 20 characters
    if (fields.password.length > 20) {
      toast.error('La contraseña debe tener como máximo 20 caracteres');
      return;
    }

    if (!fields.repeatPassword) {
      toast.error('La confirmación de la contraseña es obligatoria');
      return;
    }

    // min 6 characters
    if (fields.repeatPassword.length < 6) {
      toast.error('La confirmación de la contraseña debe tener al menos 6 caracteres');
      return;
    }

    // max 20 characters
    if (fields.repeatPassword.length > 20) {
      toast.error('La confirmación de la contraseña debe tener como máximo 20 caracteres');
      return;
    }

    if (fields.password !== fields.repeatPassword) {
      toast.error('Las contraseñas no coinciden');
      return;
    }

    const { success } = await newPassword({ password: fields.password });
    if (success) setFields(DEFAULT_FIELDS);
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFields((prev) => ({ ...prev, [name]: value.trim() }));
  };

  if (loadingVerifyToken) return null;
  if (!isVerifyToken) return <Navigate to="/auth/recover-password" />;

  return (
    <form
      onSubmit={onSubmit}
      className="max-w-[450px] border border-zinc-800 w-full mx-auto bg-zinc-900 px-6 pb-10 rounded-md flex flex-col gap-6 animate-fade-in"
    >
      <div className="w-full pt-5">
        <legend className="text-center text-lg md:text-2xl font-extrabold text-white uppercase">Nueva Contraseña</legend>
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
          value={fields.password}
          onChange={onChange}
          disabled={loadingNewPassword}
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
          value={fields.repeatPassword}
          onChange={onChange}
          disabled={loadingNewPassword}
        />
      </div>

      <div className="flex justify-center items-center gap-2">
        <button
          type="submit"
          className="px-5 py-2 text-[14px] w-full rounded-md text-center bg-orange-700 hover:bg-orange-600 transition-all duration-300 uppercase font-extrabold"
          disabled={loadingNewPassword}
        >
          {loadingNewPassword ? 'Cambiando...' : 'Cambiar contraseña'}
        </button>
      </div>
    </form>
  );
};

export default NewPasswordPage;
