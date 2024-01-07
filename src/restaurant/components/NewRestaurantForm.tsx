import { useState } from 'react';
import { twMerge } from 'tailwind-merge';
import toast from 'react-hot-toast';
import { DEFAULT_FIELDS, SOCIAL_MEDIAS, PAYMENT_METHODS } from '@/restaurant/constants';
import useNewRestaurant from '@/restaurant/hooks/useNewRestaurant';
import { isAm, isPm } from '@/shared/helpers';
import Tab1 from '@/restaurant/components/tabs/Tab1';
import Tab2 from '@/restaurant/components/tabs/Tab2';
import Tab3 from '@/restaurant/components/tabs/Tab3';
import Tab4 from '@/restaurant/components/tabs/Tab4';
import Tab5 from '@/restaurant/components/tabs/Tab5';
import { SocialMedia } from '@/restaurant/interfaces';
import { MAX_GALLERY } from '@/restaurant/constants';
import Loading from '@/shared/components/Loading';

interface NewRestaurantFormProps {
  token: string | undefined;
}

const NewRestaurantForm = ({ token }: NewRestaurantFormProps) => {
  const [fields, setFields] = useState(DEFAULT_FIELDS);
  const [platforms, setPlatforms] = useState<SocialMedia[]>(SOCIAL_MEDIAS);
  const [tabActive, setTabActive] = useState(1);

  // Hooks
  const { newRestaurant, loadingNewRestaurant, loadingUploads } = useNewRestaurant();

  const invalidFieldsTab1 = (): boolean => {
    const { name, description, address, phone, email, openingHours, closingTime } = fields;
    if (
      !name ||
      !description ||
      !address ||
      !phone ||
      !email ||
      !openingHours ||
      !closingTime ||
      closingTime === '00:00' ||
      openingHours === '00:00'
    ) {
      return true;
    }

    return false;
  };

  const invalidFieldsTab2 = (): boolean => {
    const { banner, logo } = fields;
    if (!banner || !logo) {
      return true;
    }

    return false;
  };

  const invalidFieldsTab3 = (): boolean => {
    return invalidFieldsTab2();
  };

  const invalidFieldsTab4 = (): boolean => {
    const { socialMedia } = fields;
    if (!socialMedia.length) {
      return true;
    }

    return false;
  };

  const invalidFieldsTab5 = (): boolean => {
    const { paymentMethods } = fields;
    if (!paymentMethods.length) {
      return true;
    }

    return false;
  };

  const createRestaurant = () => {
    // Validar que el token exista
    if (!token) return toast.error('Token inválido');

    // Validar que todos los campos esten llenos
    const { name, description, address, phone, email, openingHours, closingTime, banner, logo, socialMedia, paymentMethods } = fields;

    if (!name.length) {
      return toast.error('El nombre del restaurante es obligatorio');
    }

    if (!email.length) {
      return toast.error('El correo electrónico del restaurante es obligatorio');
    }

    if (!description.length) {
      return toast.error('La descripción del restaurante es obligatoria');
    }

    if (!address.length) {
      return toast.error('La dirección del restaurante es obligatoria');
    }

    if (!phone.length) {
      return toast.error('El teléfono del restaurante es obligatorio');
    }

    if (!openingHours.length) {
      return toast.error('El horario de apertura del restaurante es obligatorio');
    }

    if (!closingTime.length) {
      return toast.error('El horario de cierre del restaurante es obligatorio');
    }

    // Validar que el horario de apertura sea AM
    if (!isAm(openingHours)) {
      return toast.error('El horario de apertura debe ser AM');
    }

    // Validar que el horario de cierre sea PM
    if (!isPm(closingTime)) {
      return toast.error('El horario de cierre debe ser PM');
    }

    // Validar el banner
    if (!banner) {
      return toast.error('El banner del restaurante es obligatorio');
    }

    // Validar ellogo
    if (!logo) {
      return toast.error('El logo del restaurante es obligatoria');
    }

    // Validar que agrege al menos una red social
    if (!socialMedia.length) {
      return toast.error('Debe agregar al menos una red social');
    }

    // Validar que agrege al menos un método de pago
    if (!paymentMethods.length) {
      return toast.error('Debe agregar al menos un método de pago');
    }

    newRestaurant(token, fields, () => {
      setFields(DEFAULT_FIELDS);
      setTabActive(1);
    });
  };

  const onChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;

    const isOpeningHours = name === 'openingHours';
    const isClosingTime = name === 'closingTime';

    if (isOpeningHours && !isAm(value)) {
      return toast.error('El horario de apertura debe ser AM');
    }

    if (isClosingTime && !isPm(value)) {
      return toast.error('El horario de cierre debe ser PM');
    }

    setFields({ ...fields, [name]: value });
  };

  const onChangeFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = event.target;

    if (name === 'gallery' && files) {
      const isValid = files.length + fields.gallery.length <= MAX_GALLERY;
      if (!isValid) return toast.error(`Solo puedes agregar ${MAX_GALLERY} imagenes a la galeria`);
      const gallery = [...fields.gallery, ...files];
      setFields({ ...fields, gallery });
      return;
    }

    if (name === 'logo' && files) {
      setFields({ ...fields, logo: files[0] });
      return;
    }

    if (name === 'banner' && files) {
      setFields({ ...fields, banner: files[0] });
      return;
    }

    setFields({ ...fields, [name]: files });
  };

  const previewImage = (file: File) => {
    return URL.createObjectURL(file);
  };

  const activeFocus = (field: keyof typeof fields) => {
    if (fields[field]) return 'active';
    return '';
  };

  if (loadingNewRestaurant) {
    return (
      <Loading
        className="h-screen"
        title={loadingUploads ? 'Subiendo imagenes' : 'Creando restaurante'}
        description="Espere un momento por favor ..."
      />
    );
  }

  return (
    <div className="max-w-3xl mx-auto min-h-screen p-4 flex flex-col justify-center items-center">
      <section className="select-none bg-zinc-800 border border-zinc-700 border-opacity-50 w-full">
        <div className="border-b border-b-zinc-700 border-opacity-50 bg-zinc-800 flex items-center justify-between text-center gap-1 px-4 py-3">
          <div className="text-center flex-1">
            <legend className="line-clamp-1 text-center font-bold text-2xl uppercase">Crear Restaurate</legend>
          </div>
        </div>

        <div className="flex items-center justify-center gap-2 p-4">
          <button
            className={twMerge(
              'w-[40px] h-[40px] min-w-[40px] min-h-[40px] font-bold text-center border-2 border-pink-700 flex items-center justify-center text-zinc-300 hover:text-zinc-200 disabled:cursor-not-allowed disabled:hover:bg-transparent hover:bg-pink-600 transition-all duration-300 rounded-full',
              tabActive === 1 && 'bg-pink-600',
            )}
            onClick={() => setTabActive(1)}
          >
            1
          </button>
          <div className="w-1/2 h-1 bg-zinc-700"></div>
          <button
            className={twMerge(
              'w-[40px] h-[40px] min-w-[40px] min-h-[40px] font-bold text-center border-2 border-pink-700 flex items-center justify-center text-zinc-300 hover:text-zinc-200 disabled:cursor-not-allowed disabled:hover:bg-transparent hover:bg-pink-600 transition-all duration-300 rounded-full',
              tabActive === 2 && 'bg-pink-600',
            )}
            onClick={() => setTabActive(2)}
            disabled={invalidFieldsTab1()}
          >
            2
          </button>
          <div className="w-1/2 h-1 bg-zinc-700"></div>
          <button
            className={twMerge(
              'w-[40px] h-[40px] min-w-[40px] min-h-[40px] font-bold text-center border-2 border-pink-700 flex items-center justify-center text-zinc-300 hover:text-zinc-200 disabled:cursor-not-allowed disabled:hover:bg-transparent hover:bg-pink-600 transition-all duration-300 rounded-full',
              tabActive === 3 && 'bg-pink-600',
            )}
            onClick={() => setTabActive(3)}
            disabled={invalidFieldsTab2()}
          >
            3
          </button>
          <div className="w-1/2 h-1 bg-zinc-700"></div>
          <button
            className={twMerge(
              'w-[40px] h-[40px] min-w-[40px] min-h-[40px] font-bold text-center border-2 border-pink-700 flex items-center justify-center text-zinc-300 hover:text-zinc-200 disabled:cursor-not-allowed disabled:hover:bg-transparent hover:bg-pink-600 transition-all duration-300 rounded-full',
              tabActive === 4 && 'bg-pink-600',
            )}
            onClick={() => setTabActive(4)}
            disabled={invalidFieldsTab3()}
          >
            4
          </button>

          <div className="w-1/2 h-1 bg-zinc-700"></div>
          <button
            className={twMerge(
              'w-[40px] h-[40px] min-w-[40px] min-h-[40px] font-bold text-center border-2 border-pink-700 flex items-center justify-center text-zinc-300 hover:text-zinc-200 disabled:cursor-not-allowed disabled:hover:bg-transparent hover:bg-pink-600 transition-all duration-300 rounded-full',
              tabActive === 5 && 'bg-pink-600',
            )}
            onClick={() => setTabActive(5)}
            disabled={invalidFieldsTab4()}
          >
            5
          </button>
        </div>

        <div className="flex p-4 gap-3 w-full">
          {tabActive === 1 && <Tab1 fields={fields} setFields={setFields} onChange={onChange} activeFocus={activeFocus} />}
          {tabActive === 2 && <Tab2 fields={fields} setFields={setFields} onChangeFile={onChangeFile} previewImage={previewImage} />}
          {tabActive === 3 && <Tab3 fields={fields} setFields={setFields} onChangeFile={onChangeFile} previewImage={previewImage} />}
          {tabActive === 4 && (
            <Tab4 fields={fields} setFields={setFields} activeFocus={activeFocus} platforms={platforms} setPlatforms={setPlatforms} />
          )}
          {tabActive === 5 && <Tab5 fields={fields} paymentMethods={PAYMENT_METHODS} setFields={setFields} />}
        </div>

        <div className="flex p-4 justify-end gap-3 w-full">
          {tabActive === 3 && (
            <button
              type="button"
              className="w-full md:w-fit whitespace-nowrap px-6 py-3 border border-zinc-600 hover:border-zinc-700 text-zinc-400 hover:text-zinc-200 transition-all duration-300 rounded-md font-semibold"
              onClick={() => {
                setTabActive(4);
                setFields({ ...fields, gallery: [] });
              }}
            >
              Omitir
            </button>
          )}

          {tabActive === 4 && (
            <button
              type="button"
              className="w-full md:w-fit whitespace-nowrap px-6 py-3 border border-zinc-600 hover:border-zinc-700 text-zinc-400 hover:text-zinc-200 transition-all duration-300 rounded-md font-semibold"
              onClick={() => {
                setTabActive(5);
                setFields({ ...fields, socialMedia: [] });
              }}
            >
              Omitir
            </button>
          )}
          {tabActive === 5 ? (
            <>
              <button
                type="button"
                className="w-full md:w-fit whitespace-nowrap px-6 py-3 bg-zinc-600 hover:bg-zinc-700 transition-all duration-300 rounded-md font-semibold"
                onClick={() => {
                  setTabActive(tabActive - 1);
                }}
              >
                Anterior
              </button>

              <button
                type="submit"
                className="w-full md:w-fit whitespace-nowrap px-6 py-3 bg-pink-600 disabled:cursor-not-allowed disabled:hover:bg-pink-600 disabled:opacity-50 hover:bg-pink-700 transition-all duration-300 rounded-md font-semibold"
                onClick={createRestaurant}
                disabled={invalidFieldsTab5()}
              >
                Crear
              </button>
            </>
          ) : (
            <>
              {tabActive !== 1 && (
                <button
                  type="button"
                  className="w-full md:w-fit whitespace-nowrap px-6 py-3 bg-zinc-600 hover:bg-zinc-700 transition-all duration-300 rounded-md font-semibold"
                  onClick={() => {
                    if (tabActive === 1) return;
                    setTabActive(tabActive - 1);
                  }}
                >
                  Anterior
                </button>
              )}
              <button
                type="button"
                className="w-full md:w-fit whitespace-nowrap px-6 py-3 bg-pink-600 disabled:cursor-not-allowed disabled:hover:bg-pink-600 disabled:opacity-50 hover:bg-pink-700 transition-all duration-300 rounded-md font-semibold"
                onClick={() => {
                  if (tabActive === 5) return;
                  setTabActive(tabActive + 1);
                }}
                disabled={
                  tabActive === 1
                    ? invalidFieldsTab1()
                    : tabActive === 2
                    ? invalidFieldsTab2()
                    : tabActive === 3
                    ? invalidFieldsTab3()
                    : invalidFieldsTab4()
                }
              >
                Siguiente
              </button>
            </>
          )}
        </div>
      </section>
    </div>
  );
};

export default NewRestaurantForm;
