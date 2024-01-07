import { twMerge } from 'tailwind-merge';
import { DEFAULT_FIELDS } from '@/restaurant/constants';

interface Tab1Props {
  fields: typeof DEFAULT_FIELDS;
  onChange: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  activeFocus: (field: keyof typeof DEFAULT_FIELDS) => string;
  setFields: React.Dispatch<React.SetStateAction<typeof DEFAULT_FIELDS>>;
}

const Tab1 = ({ fields, onChange, activeFocus, setFields }: Tab1Props) => {
  return (
    <div className="flex-1 flex flex-col gap-5 p-8 border border-zinc-700 border-opacity-50 bg-zinc-700 bg-opacity-20 shadow-md rounded-md animate-fade-in">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div className="contenedor-input relative block">
          <input
            type="text"
            className="w-full p-2 input-focus border border-zinc-700 hover:border-zinc-600 text-zinc-400 border-opacity-70 outline-none bg-zinc-700 bg-opacity-10 rounded-md transition-colors duration-300"
            id="name"
            name="name"
            autoComplete="off"
            value={fields.name}
            onChange={onChange}
          />
          <label
            htmlFor="name"
            className={twMerge(
              'label-input leading-none text-[16px] absolute z-10 top-1/2 left-3 -translate-y-1/2 pointer-events-none select-none text-zinc-400 transition-all duration-300',
              activeFocus('name'),
            )}
          >
            Nombre del restaurante
          </label>
        </div>
        <div className="contenedor-input relative block">
          <input
            type="email"
            className="w-full p-2 input-focus border border-zinc-700 hover:border-zinc-600 text-zinc-400 border-opacity-70 outline-none bg-zinc-700 bg-opacity-10 rounded-md transition-colors duration-300"
            id="email"
            name="email"
            autoComplete="off"
            value={fields.email}
            onChange={onChange}
          />
          <label
            htmlFor="email"
            className={twMerge(
              'label-input leading-none text-[16px] absolute z-10 top-1/2 left-3 -translate-y-1/2 pointer-events-none select-none text-zinc-400 transition-all duration-300',
              activeFocus('email'),
            )}
          >
            Correo electrónico
          </label>
        </div>
      </div>
      <div className="contenedor-input relative">
        <textarea
          className="w-full block max-h-[200px] min-h-[60px] input-focus resize-y p-2 border border-zinc-700 hover:border-zinc-600 text-zinc-400 border-opacity-70 outline-none bg-zinc-700 bg-opacity-10 rounded-md transition-colors duration-300"
          id="description"
          name="description"
          autoComplete="off"
          value={fields.description}
          onChange={onChange}
        />
        <label
          htmlFor="description"
          className={twMerge(
            'label-input leading-none text-[16px] absolute z-10 top-6 left-3 -translate-y-1/2 pointer-events-none select-none text-zinc-400 transition-all duration-300',
            activeFocus('description'),
          )}
        >
          Descripción
        </label>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div className="contenedor-input relative block">
          <input
            type="text"
            className="w-full p-2 input-focus border border-zinc-700 hover:border-zinc-600 text-zinc-400 border-opacity-70 outline-none bg-zinc-700 bg-opacity-10 rounded-md transition-colors duration-300"
            id="address"
            name="address"
            autoComplete="off"
            value={fields.address}
            onChange={onChange}
          />
          <label
            htmlFor="address"
            className={twMerge(
              'label-input leading-none text-[16px] absolute z-10 top-1/2 left-3 -translate-y-1/2 pointer-events-none select-none text-zinc-400 transition-all duration-300',
              activeFocus('address'),
            )}
          >
            Dirección
          </label>
        </div>

        <div className="contenedor-input relative block">
          <input
            type="text"
            className="w-full p-2 input-focus border border-zinc-700 hover:border-zinc-600 text-zinc-400 border-opacity-70 outline-none bg-zinc-700 bg-opacity-10 rounded-md transition-colors duration-300"
            id="phone"
            name="phone"
            autoComplete="off"
            value={fields.phone}
            onChange={onChange}
          />
          <label
            htmlFor="phone"
            className={twMerge(
              'label-input leading-none text-[16px] absolute z-10 top-1/2 left-3 -translate-y-1/2 pointer-events-none select-none text-zinc-400 transition-all duration-300',
              activeFocus('phone'),
            )}
          >
            Teléfono
          </label>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div className="contenedor-input relative block">
          <input
            type="time"
            className="w-full p-2 input-focus border border-zinc-700 hover:border-zinc-600 text-zinc-400 border-opacity-70 outline-none bg-zinc-700 bg-opacity-10 rounded-md transition-colors duration-300"
            id="openingHours"
            name="openingHours"
            autoComplete="off"
            value={fields.openingHours}
            onChange={onChange}
          />
          <label
            htmlFor="openingHours"
            className="label-input leading-none text-[16px] absolute z-10 top-1/2 left-3 -translate-y-1/2 pointer-events-none select-none text-zinc-400 transition-all duration-300 active"
          >
            Horario de apertura (AM)
          </label>
        </div>

        <div className="contenedor-input relative block">
          <input
            type="time"
            className="w-full p-2 input-focus border border-zinc-700 hover:border-zinc-600 text-zinc-400 border-opacity-70 outline-none bg-zinc-700 bg-opacity-10 rounded-md transition-colors duration-300"
            id="closingTime"
            name="closingTime"
            autoComplete="off"
            value={fields.closingTime}
            onChange={onChange}
          />
          <label
            htmlFor="closingTime"
            className="label-input leading-none text-[16px] absolute z-10 top-1/2 left-3 -translate-y-1/2 pointer-events-none select-none text-zinc-400 transition-all duration-300 active"
          >
            Horario de cierre (PM)
          </label>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-5">
        <div className="flex flex-col">
          <p className="text-sm font-medium text-zinc-400 mb-2">Acepta reservas</p>
          <div className="flex flex-row items-center gap-4">
            <label htmlFor="acceptsReservationsYes" className="text-sm text-zinc-400 flex gap-2 items-center">
              <input
                type="radio"
                id="acceptsReservationsYes"
                name="acceptsReservations"
                className="w-4 h-4 rounded-sm border border-zinc-500 border-opacity-50 focus:ring-zinc-500"
                checked={fields.acceptsReservations}
                onChange={() => setFields({ ...fields, acceptsReservations: !fields.acceptsReservations })}
              />
              Si
            </label>

            <label htmlFor="acceptsReservationsNot" className="text-sm text-zinc-400 flex gap-2 items-center">
              <input
                type="radio"
                id="acceptsReservationsNot"
                name="acceptsReservations"
                className="w-4 h-4 rounded-sm border border-zinc-500 border-opacity-50 focus:ring-zinc-500"
                checked={!fields.acceptsReservations}
                onChange={() => setFields({ ...fields, acceptsReservations: !fields.acceptsReservations })}
              />
              No
            </label>
          </div>
        </div>
        <div className="flex flex-col">
          <p className="text-sm font-medium text-zinc-400 mb-2">Acepta delivery</p>
          <div className="flex flex-row items-center gap-4">
            <label htmlFor="acceptsDeliveryYes" className="text-sm text-zinc-400 flex gap-2 items-center">
              <input
                type="radio"
                id="acceptsDeliveryYes"
                name="acceptsDelivery"
                className="w-4 h-4 rounded-sm border border-zinc-500 border-opacity-50 focus:ring-zinc-500"
                checked={fields.acceptsDelivery}
                onChange={() => setFields({ ...fields, acceptsDelivery: !fields.acceptsDelivery })}
              />
              Si
            </label>

            <label htmlFor="acceptsDeliveryNot" className="text-sm text-zinc-400 flex gap-2 items-center">
              <input
                type="radio"
                id="acceptsDeliveryNot"
                name="acceptsDelivery"
                className="w-4 h-4 rounded-sm border border-zinc-500 border-opacity-50 focus:ring-zinc-500"
                checked={!fields.acceptsDelivery}
                onChange={() => setFields({ ...fields, acceptsDelivery: !fields.acceptsDelivery })}
              />
              No
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tab1;
