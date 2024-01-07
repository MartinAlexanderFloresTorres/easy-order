import { useEffect, useState } from 'react';
import axios from 'axios';
import { X } from 'lucide-react';
import { twMerge } from 'tailwind-merge';
import ConfirmationForm from '@/auth/components/ConfirmationForm';
import { COUNTRIES } from '@/shared/constants';
import { City, Country, State } from '@/auth/interfaces';
import useRegister from '@/auth/hooks/useRegister';
import toast from 'react-hot-toast';

interface RegisterFormProps {
  showClose?: boolean;
  className?: string;
  onFinished?: () => void;
  changeToLogin: () => void;
}

const DEFAULT_FIELDS = {
  name: '',
  lastname: '',
  email: '',
  country: '',
  city: '',
  password: '',
  repeatPassword: '',
};

const RegisterForm = ({ showClose, className = 'max-w-[450px]', onFinished = () => {}, changeToLogin }: RegisterFormProps) => {
  const [countries, setCountries] = useState<Country[]>([]);
  const [cities, setCities] = useState<State[]>([]);
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);
  const [selectedCity, setSelectedCity] = useState<State | null>(null);
  const [fields, setFields] = useState(DEFAULT_FIELDS);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [tokenConfirm, setTokenConfirm] = useState<string>('');

  // Hooks
  const { loadingRegister, register } = useRegister();

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get<Country[]>('https://api.mercadolibre.com/countries');
        setCountries(data);
      } catch (error) {
        console.log(error);
        setCountries(COUNTRIES);
      }
    })();
  }, []);

  useEffect(() => {
    if (selectedCountry === null) return;

    (async () => {
      try {
        const { data } = await axios.get<City>(`https://api.mercadolibre.com/countries/${selectedCountry.id}`);
        setCities(data.states);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [selectedCountry]);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    toast.dismiss();

    // Validate fields
    if (!fields.name) return toast.error('El nombre es requerido');

    // min 3 characters
    if (fields.name.length < 3) return toast.error('El nombre debe tener al menos 3 caracteres');

    // max 20 characters
    if (fields.name.length > 20) return toast.error('El nombre debe tener como máximo 20 caracteres');

    if (!fields.lastname) return toast.error('El apellido es requerido');

    // min 3 characters
    if (fields.lastname.length < 3) return toast.error('El apellido debe tener al menos 3 caracteres');

    // max 20 characters
    if (fields.lastname.length > 20) return toast.error('El apellido debe tener como máximo 20 caracteres');

    if (!fields.email) return toast.error('El email es requerido');

    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(fields.email)) return toast.error('El email no es válido');

    if (!fields.country) return toast.error('El país es requerido');

    if (!fields.city) return toast.error('La ciudad es requerida');

    if (!fields.password) return toast.error('La contraseña es requerida');

    // min 6 characters
    if (fields.password.length < 6) return toast.error('La contraseña debe tener al menos 6 caracteres');

    // max 20 characters
    if (fields.password.length > 20) return toast.error('La contraseña debe tener como máximo 20 caracteres');

    if (!fields.repeatPassword) return toast.error('La confirmación de la contraseña es requerida');

    // min 6 characters
    if (fields.repeatPassword.length < 6) return toast.error('La confirmación de la contraseña debe tener al menos 6 caracteres');

    // max 20 characters
    if (fields.repeatPassword.length > 20) return toast.error('La confirmación de la contraseña debe tener como máximo 20 caracteres');

    if (fields.password !== fields.repeatPassword) return toast.error('Las contraseñas no coinciden');

    const { success, tokenConfirm } = await register(fields);
    if (success && tokenConfirm) {
      setShowConfirmation(true);
      setTokenConfirm(tokenConfirm);
      window.history.pushState({}, '', `/auth/confirmation/${tokenConfirm}`);
      setFields(DEFAULT_FIELDS);
      setSelectedCountry(null);
      setSelectedCity(null);
      setCities([]);
    }
  };

  const handleCountryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;
    setSelectedCity(null);
    setCities([]);
    const country = countries.find((country) => country.id === value);
    if (country) {
      setSelectedCountry(country);
      setFields((prev) => ({ ...prev, country: country.name, city: '' }));
    }
  };

  const handleCityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;
    const city = cities.find((city) => city.id === value);
    if (city) {
      setSelectedCity(city);
      setFields((prev) => ({ ...prev, city: city.name }));
    }
  };

  const handleValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setFields((prev) => ({ ...prev, [e.target.name]: value.trimStart() }));
  };

  if (showConfirmation) return <ConfirmationForm token={tokenConfirm} onFinished={onFinished} />;

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
            value={fields.name}
            onChange={handleValueChange}
            disabled={loadingRegister}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-xs text-white font-bold" htmlFor="lastname">
            Apellidos
          </label>
          <input
            className="p-2 text-sm focus-visible:outline  focus-visible:outline-zinc-700 rounded-md bg-zinc-800"
            type="text"
            name="lastname"
            id="lastname"
            value={fields.lastname}
            onChange={handleValueChange}
            disabled={loadingRegister}
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
          value={fields.email.trim()}
          onChange={handleValueChange}
          disabled={loadingRegister}
        />
      </div>

      <div className="grid grid-cols-2 gap-2">
        <div className="flex flex-col gap-2">
          <label className="text-xs text-white font-bold" htmlFor="country">
            Pais
          </label>
          <select
            className="p-2 text-sm focus-visible:outline  focus-visible:outline-zinc-700 rounded-md bg-zinc-800"
            name="country"
            id="country"
            onChange={handleCountryChange}
            value={selectedCountry ? selectedCountry.id : ''}
            disabled={countries.length === 0 || loadingRegister}
          >
            <option value="">Selecciona una ciudad</option>
            {countries.map((country) => (
              <option key={country.id} value={country.id}>
                {country.name}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-xs text-white font-bold" htmlFor="city">
            Ciudad
          </label>

          <select
            className="p-2 text-sm focus-visible:outline  focus-visible:outline-zinc-700 rounded-md bg-zinc-800"
            name="city"
            id="city"
            onChange={handleCityChange}
            value={selectedCity ? selectedCity.id : ''}
            disabled={selectedCountry === null || cities.length === 0 || loadingRegister}
          >
            <option value="">Selecciona una ciudad</option>
            {cities.map((city) => (
              <option key={city.id} value={city.id}>
                {city.name}
              </option>
            ))}
          </select>
        </div>
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
          value={fields.password.trim()}
          onChange={handleValueChange}
          disabled={loadingRegister}
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
          value={fields.repeatPassword.trim()}
          onChange={handleValueChange}
          disabled={loadingRegister}
        />
      </div>

      <div className="flex justify-center items-center gap-2">
        <button
          type="submit"
          className="px-5 py-2 text-[14px] w-full rounded-md text-center bg-orange-700 hover:bg-orange-600 transition-all duration-300 uppercase font-extrabold"
          disabled={loadingRegister}
        >
          {loadingRegister ? 'Cargando...' : 'Crear cuenta'}
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
};

export default RegisterForm;
