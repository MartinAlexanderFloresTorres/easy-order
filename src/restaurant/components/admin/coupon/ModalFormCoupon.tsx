import { useEffect, useState } from 'react';
import { Info, X } from 'lucide-react';
import toast from 'react-hot-toast';

import useRestaurant from '@/restaurant/hooks/useRestaurant';
import { Coupon, NewCoupon } from '@/restaurant/interfaces';
import Loading from '@/shared/components/Loading';
import Modal from '@/shared/components/Modal';
import Swal from 'sweetalert2';
import Counter from '@/shared/components/Counter';
import useNewOrUpdateCoupon from '@/restaurant/hooks/useNewOrUpdateCoupon';

const DEFAULT_FIELDS: NewCoupon = {
  name: '',
  description: '',
  code: '',
  discount: 0,
  expiration: '',
  isActive: true,
  maximum: 0,
};

const MAX_STOCK_COUPON = 100;

interface ModalFormCouponProps {
  onClose: () => void;
  couponEdit: Coupon | null;
}

let timer: NodeJS.Timeout | null = null;

const ModalFormCoupon = ({ onClose, couponEdit }: ModalFormCouponProps) => {
  const [fields, setFields] = useState<NewCoupon>(DEFAULT_FIELDS);
  const [isClose, setIsClose] = useState(false);

  const { restaurant } = useRestaurant();
  const { loadingCoupon, createCoupon, updateCoupon } = useNewOrUpdateCoupon();

  useEffect(() => {
    if (couponEdit) {
      (async () => {
        setFields({
          name: couponEdit.name,
          description: couponEdit.description,
          code: couponEdit.code,
          discount: couponEdit.discount,
          expiration: couponEdit.expiration.toString().split('T')[0],
          isActive: couponEdit.isActive,
          maximum: couponEdit.maximum,
        });
      })();
    }
  }, [couponEdit]);

  const onCloseModal = () => {
    if (timer) clearTimeout(timer);

    if (isClose) {
      onClose();
      setIsClose(false);
      return;
    }

    setIsClose(true);
    timer = setTimeout(() => {
      onClose();
      setIsClose(false);
    }, 200);
  };
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    toast.dismiss();

    // Validations
    if (!fields.name) {
      toast.error('Debes proporcionar un nombre para el cupón');
      return;
    }

    if (fields.name.length < 3) {
      toast.error('El nombre no puede ser menor a 3 caracteres');
      return;
    }

    if (fields.name.length > 50) {
      toast.error('El nombre no puede ser mayor a 50 caracteres');
      return;
    }

    if (!fields.expiration) {
      toast.error('Debes proporcionar una fecha de expiración');
      return;
    }

    if (!fields.description) {
      toast.error('Debes proporcionar una descripción');
      return;
    }

    if (fields.description.length < 3) {
      toast.error('La descripción no puede ser menor a 3 caracteres');
      return;
    }

    if (fields.description.length > 200) {
      toast.error('La descripción no puede ser mayor a 200 caracteres');
      return;
    }

    if (!fields.code) {
      toast.error('Debes proporcionar un código');
      return;
    }

    if (fields.code.length < 3) {
      toast.error('El código no puede ser menor a 6 caracteres');
      return;
    }

    if (fields.code.length > 16) {
      toast.error('El código no puede ser mayor a 16 caracteres');
      return;
    }

    if (!fields.discount) {
      toast.error('Debes proporcionar un descuento');
      return;
    }

    if (fields.discount < 1) {
      toast.error('El descuento no puede ser menor a 1');
      return;
    }

    if (fields.discount > 100) {
      toast.error('El descuento no puede ser mayor a 100');
      return;
    }

    if (!fields.maximum) {
      toast.error('Debes proporcionar un máximo de stock aplicable');
      return;
    }

    if (fields.maximum > MAX_STOCK_COUPON) {
      toast.error(`El máximo no puede ser mayor a ${MAX_STOCK_COUPON}`);
      return;
    }

    if (!restaurant) return;

    if (couponEdit) {
      updateCoupon({
        couponId: couponEdit._id,
        restaurantId: restaurant._id,
        data: {
          ...fields,
          maximum: Number(fields.maximum),
        },
        callback: () => {
          setFields(DEFAULT_FIELDS);
          onClose();
        },
      });
      return;
    }

    createCoupon(
      {
        ...fields,
        maximum: Number(fields.maximum),
      },
      () => {
        setFields(DEFAULT_FIELDS);
        onClose();
      },
    );
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFields({ ...fields, [name]: value.trimStart() });
  };

  const showInfoVisibility = () => {
    Swal.fire({
      title: 'Aplique el cupon desde ahora',
      text: 'El cupon que tenga activada esta opcion en (SI) se aplicara desde ahora, si no se activa se aplicara cuando el cupon este activo',
      icon: 'info',
      confirmButtonText: 'Entendido',
    });
  };

  if (!restaurant) return null;

  return (
    <Modal onClose={onCloseModal} isClose={isClose} className="bg-black bg-opacity-50 backdrop-blur-sm">
      <Modal.Overlay onClose={onCloseModal} disabled={loadingCoupon}>
        {loadingCoupon ? (
          <Loading title={couponEdit ? 'Actualizando cupón' : 'Creando cupón'} description="Espere un momento por favor ..." />
        ) : (
          <div className="animate-fade-in select-none border border-zinc-700 border-opacity-50 backdrop-blur-sm max-w-xl w-full mx-auto overflow-auto">
            <div className="sticky top-0 z-10 backdrop-blur-sm border-b border-b-zinc-700 border-opacity-50 bg-zinc-800 bg-opacity-80 flex items-stretch justify-between text-center">
              <div className="px-4 py-3 flex items-center text-center gap-4 border-r border-r-zinc-700 border-opacity-50">
                <img
                  src={restaurant.logo ? restaurant.logo.secure_url : '/img/default-logo.png'}
                  alt={restaurant.name}
                  className="min-w-[50px] min-h-[50px] w-[50px] h-[50px] rounded-full object-cover"
                />
              </div>
              <div className="px-4 py-3 flex items-center justify-center text-center flex-1">
                <h3 className="text-2xl font-semibold text-gray-200 uppercase text-center">{couponEdit ? 'Actualizar cupón' : 'Crear cupón'}</h3>
              </div>
              <div className="px-4 py-3 flex items-center justify-end text-center gap-4 border-l border-l-zinc-700 border-opacity-50">
                <button
                  type="button"
                  className="min-w-[40px] min-h-[40px] w-[40px] h-[40px] flex items-center justify-center px2-4 py- rounded-full bg-zinc-700 bg-opacity-50 hover:bg-opacity-100 transition-all duration-300 text-gray-300"
                  onClick={onCloseModal}
                >
                  <X size={24} />
                </button>
              </div>
            </div>

            <div className=" bg-zinc-900 bg-opacity-80 md:flex-1">
              <div className="px-4 py-3 border-b border-b-zinc-700 border-opacity-50 flex items-center justify-center text-center">
                <p className="font-normal text-center text-gray-300">
                  {couponEdit ? 'Actualiza los datos de la cupón' : 'Comienza a crear tus coupónes para tus menús'}
                </p>
              </div>
              <form className="p-5 flex-col space-y-5" onSubmit={onSubmit}>
                <div className="flex flex-col sm:flex-row gap-4 w-full">
                  <div className="flex-1 flex flex-col gap-4">
                    <label htmlFor="name" className="text-sm font-semibold text-gray-400">
                      Nombre del cupón
                    </label>
                    <input
                      type="text"
                      name="name"
                      id="name"
                      autoComplete="off"
                      autoFocus
                      placeholder="Ej: Cupón de navidad"
                      value={fields.name}
                      onChange={onChange}
                      className="w-full px-4 py-2 border border-zinc-700 bg-zinc-900 bg-opacity-50 rounded-lg focus:outline-none focus:border-zinc-600 placeholder:text-zinc-500"
                    />
                  </div>

                  <div className="flex-1 flex flex-col gap-4">
                    <label htmlFor="expiration" className="text-sm font-semibold text-gray-400">
                      Expiración
                    </label>
                    <input
                      type="date"
                      name="expiration"
                      id="expiration"
                      autoComplete="off"
                      placeholder="Ej: 10"
                      value={fields.expiration}
                      onChange={onChange}
                      className="w-full px-4 py-2 border border-zinc-700 bg-zinc-900 bg-opacity-50 rounded-lg focus:outline-none focus:border-zinc-600 placeholder:text-zinc-500"
                    />
                  </div>
                </div>

                <div className="flex-1 flex flex-col gap-4">
                  <label htmlFor="description" className="text-sm font-semibold text-gray-400">
                    Descripcion
                  </label>
                  <textarea
                    name="description"
                    id="description"
                    placeholder="Ej: Cupón de navidad para todos los clientes o hasta agotar stock"
                    autoComplete="off"
                    value={fields.description}
                    onChange={onChange}
                    className="w-full px-4 py-2 relative max-h-[200px] min-h-[80px] border border-zinc-700 bg-zinc-900 bg-opacity-50 rounded-lg focus:outline-none focus:border-zinc-600 placeholder:text-zinc-500"
                  />
                </div>

                <div className="flex flex-col sm:flex-row gap-4 w-full">
                  <div className="flex-1 flex flex-col gap-4">
                    <label htmlFor="code" className="text-sm font-semibold text-gray-400">
                      Código
                    </label>
                    <input
                      type="text"
                      name="code"
                      id="code"
                      autoComplete="off"
                      placeholder="Ej: NAVIDAD2021"
                      value={fields.code.toUpperCase()}
                      onChange={onChange}
                      className="w-full px-4 py-2 border border-zinc-700 bg-zinc-900 bg-opacity-50 rounded-lg focus:outline-none focus:border-zinc-600 placeholder:text-zinc-500"
                    />
                  </div>

                  <div className="flex-1 flex flex-col gap-4">
                    <label htmlFor="discount" className="text-sm font-semibold text-gray-400">
                      Descuento
                    </label>
                    <input
                      type="number"
                      name="discount"
                      id="discount"
                      autoComplete="off"
                      placeholder="Ej: 10"
                      value={fields.discount}
                      onChange={onChange}
                      className="w-full px-4 py-2 border border-zinc-700 bg-zinc-900 bg-opacity-50 rounded-lg focus:outline-none focus:border-zinc-600 placeholder:text-zinc-500"
                    />
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 w-full">
                  <div className="flex-1 flex flex-col gap-4">
                    <div className="w-full flex flex-col gap-4">
                      <label htmlFor="maximum" className="text-sm font-semibold text-gray-400">
                        Máximo de stock aplicable
                      </label>
                      <div className="w-full flex items-center gap-4">
                        <Counter
                          className="w-full"
                          min={0}
                          max={MAX_STOCK_COUPON}
                          countState={fields.maximum}
                          updateCount={(count) => setFields((prev) => ({ ...prev, maximum: count }))}
                          onChange={(count) => setFields((prev) => ({ ...prev, maximum: count }))}
                        >
                          <input
                            type="number"
                            name="maximum"
                            id="maximum"
                            autoComplete="off"
                            placeholder="Ej: 10"
                            value={fields.maximum}
                            onChange={onChange}
                            className="w-full px-4 py-2 border text-center border-zinc-700 bg-zinc-900 bg-opacity-50 rounded-lg focus:outline-none focus:border-zinc-600 placeholder:text-zinc-500"
                          />
                        </Counter>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-4 w-full">
                  <div className="flex items-center gap-2">
                    <label htmlFor="nutritionalInformation" className="text-sm font-semibold text-gray-400">
                      Aplicar cupon desde ahora
                    </label>
                    <button className="text-zinc-400" type="button" onClick={showInfoVisibility}>
                      <Info size={20} />
                    </button>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="isActive"
                        id="isActive"
                        checked={fields.isActive}
                        onChange={() => setFields((prev) => ({ ...prev, isActive: true }))}
                        className="w-4 h-4 rounded-md bg-pink-600 focus:ring-0 focus:outline-none"
                      />
                      <label htmlFor="isActive" className="text-sm font-semibold text-gray-400">
                        Si
                      </label>
                    </div>
                    <div className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="isActive"
                        id="notActive"
                        checked={!fields.isActive}
                        onChange={() => setFields((prev) => ({ ...prev, isActive: false }))}
                        className="w-4 h-4 rounded-md bg-pink-600 focus:ring-0 focus:outline-none"
                      />
                      <label htmlFor="notActive" className="text-sm font-semibold text-gray-400">
                        No
                      </label>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-end">
                  <button
                    type="submit"
                    className="w-full md:w-fit whitespace-nowrap px-6 py-3 bg-pink-600 hover:bg-pink-700 transition-all duration-300 rounded-md font-semibold"
                  >
                    {couponEdit ? 'Actualizar cupón' : 'Crear cupón'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </Modal.Overlay>
    </Modal>
  );
};

export default ModalFormCoupon;
