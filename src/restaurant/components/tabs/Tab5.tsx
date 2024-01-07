import toast from 'react-hot-toast';
import { Info, Plus, X } from 'lucide-react';
import { DEFAULT_FIELDS } from '@/restaurant/constants';
import { PaymentMethod } from '@/restaurant/interfaces';

interface Tab5Props {
  fields: typeof DEFAULT_FIELDS;
  setFields: React.Dispatch<React.SetStateAction<typeof DEFAULT_FIELDS>>;
  paymentMethods: PaymentMethod[];
}

const Tab5 = ({ fields, paymentMethods, setFields }: Tab5Props) => {
  const paymentMethodsSelecteds = paymentMethods.filter(
    (method) => !fields.paymentMethods.some((paymentMethod) => paymentMethod.name === method.name),
  );

  const addPaymentMethod = (paymentMethod: PaymentMethod) => {
    if (fields.paymentMethods.findIndex((method) => method.name === paymentMethod.name) !== -1) {
      return toast.error('Este método de pago ya está agregado');
    }

    setFields({
      ...fields,
      paymentMethods: [...fields.paymentMethods, paymentMethod],
    });
  };

  const removePaymentMethod = (paymentMethod: PaymentMethod) => {
    setFields({
      ...fields,
      paymentMethods: fields.paymentMethods.filter((method) => method.name !== paymentMethod.name),
    });
  };

  return (
    <div className="flex-1 border border-zinc-700 border-opacity-50 bg-zinc-700 bg-opacity-20 shadow-md rounded-md animate-fade-in">
      {fields.paymentMethods.length === 0 && (
        <p className="text-pink-400 p-4 flex items-center gap-2 border-b border-zinc-700 border-opacity-50">
          <span>Agrega al menos un método de pago</span>
          <Info size={24} />
        </p>
      )}

      {paymentMethodsSelecteds.length > 0 && (
        <div className="border-b border-zinc-700 border-opacity-50 animate-fade-in">
          <h2 className="text-xl font-bold text-zinc-300 p-4 border-b border-zinc-700 border-opacity-50">Agregar método de pago</h2>
          <div className="flex flex-wrap items-center gap-5 p-4">
            {paymentMethodsSelecteds.map((payMethod) => (
              <div
                className="flex-1 flex items-center gap-4 px-3 py-2 rounded-xl hover:bg-zinc-700 hover:bg-opacity-30 transition-all duration-300 animate-fade-in"
                key={payMethod.name}
              >
                <img src={payMethod.image} alt={payMethod.name} width={50} height={50} className="min-w-[50px] min-h-[50px] w-[50px] h-[50px]" />

                <strong className="w-full min-w-[100px] p-2 input-focus border border-zinc-700  text-zinc-300 border-opacity-70 outline-none bg-zinc-700 bg-opacity-10 rounded-md transition-colors duration-300">
                  {payMethod.name}
                </strong>

                <button
                  type="button"
                  className="min-w-[36px] min-h-[36px] w-[36px] h-[36px] rounded-full bg-zinc-700 hover:bg-zinc-600 transition-all duration-300"
                  onClick={() => addPaymentMethod(payMethod)}
                >
                  <Plus size={24} className=" text-zinc-400 mx-auto" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      <section className="w-full">
        <h2 className="text-xl font-bold text-zinc-300 px-4 py-4">
          Metodo de pagos <span className="text-pink-500">({fields.paymentMethods.length})</span>
        </h2>
        <div className="border-b border-zinc-700 border-opacity-50" />
        <div className="flex justify-center flex-wrap gap-5 px-4 py-4">
          {fields.paymentMethods.length ? (
            fields.paymentMethods.map((paymentMethod) => (
              <div
                className="flex items-center gap-4 px-4 py-2 rounded-xl hover:bg-zinc-700 hover:bg-opacity-30 transition-all duration-300 animate-fade-in"
                key={paymentMethod.name}
              >
                <img
                  src={paymentMethod.image}
                  alt={paymentMethod.name}
                  width={70}
                  height={70}
                  className="min-w-[70px] min-h-[70px] w-[70px] h-[70px]"
                />

                <button
                  type="button"
                  className="min-w-[36px] min-h-[36px] w-[36px] h-[36px] rounded-full bg-red-800 bg-opacity-50 hover:bg-red-600 hover:bg-opacity-60 transition-all duration-300"
                  onClick={() => removePaymentMethod(paymentMethod)}
                >
                  <X size={24} className=" text-zinc-200 mx-auto" />
                </button>
              </div>
            ))
          ) : (
            <p className="text-zinc-400 flex-1 animate-fade-in">No hay métodos de pago agregados</p>
          )}
        </div>
      </section>
    </div>
  );
};

export default Tab5;
