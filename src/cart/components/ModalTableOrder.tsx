import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import toast from 'react-hot-toast';
import { twMerge } from 'tailwind-merge';
import { CircleDollarSign, Info, SmilePlus, Trash, X } from 'lucide-react';
import Modal from '@/shared/components/Modal';
import useCart from '@/cart/hooks/useCart';
import useAccount from '@/account/hooks/useAccount';
import useGenerateOrder from '@/cart/hooks/useGenerateOrder';
import Spinner from '@/shared/components/Spinner';
import Counter from '@/shared/components/Counter';
import AddCoupon from '@/cart/components/AddCoupon';

let timer: NodeJS.Timeout | null = null;

const ModalTableOrder = () => {
  const [isClose, setIsClose] = useState(false);

  const { authenticated } = useAccount();
  const { closeModalTableOrder, generatedOrder, tableOrder, updateTableOrder, clearTableOrder } = useCart();
  const { generateTableOrder, loadingOrder } = useGenerateOrder();
  const navigate = useNavigate();

  const newTableOrder = async () => {
    if (loadingOrder) return toast.error('Ya se está realizando la orden, por favor espere');
    if (!authenticated) return showInfoAuthentication();

    const { isConfirmed } = await Swal.fire({
      title: 'Orden en mesa',
      html: `Estás a punto de realizar la orden, Realiza el pago cuando el mesero llegue a tu mesa.`,
      showConfirmButton: true,
      showCancelButton: true,
      showCloseButton: true,
      focusConfirm: false,
      focusCancel: false,
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Ordenar ahora',
      cancelButtonAriaLabel: 'Cancelar',
      confirmButtonAriaLabel: 'Ordenar ahora',
      customClass: {
        container: 'bg-zinc-900 bg-opacity-90',
        closeButton: 'text-gray-300 hover:text-gray-400',
      },
    });

    if (!isConfirmed) return;

    if (!tableOrder) return toast.error('No hay productos seleccionados');

    await generateTableOrder(tableOrder);
    closeModalTableOrder();
    generatedOrder();
    navigate('/account/table-orders');
  };

  const onCloseModal = () => {
    if (timer) clearTimeout(timer);

    if (isClose) {
      closeModalTableOrder();
      setIsClose(false);
      return;
    }

    setIsClose(true);
    timer = setTimeout(() => {
      closeModalTableOrder();
      setIsClose(false);
    }, 200);
  };

  const showInfoAuthentication = () => {
    Swal.fire({
      title: 'Autenticación',
      html: `
        <p class="text-gray-400 text-center mb-4 max-w-lg mx-auto">
          Para poder realizar una orden, debes iniciar sesión o registrarte en nuestra plataforma.
        </p>
        <div class="flex gap-4 w-fit mx-auto">
          <a href="/auth/login" class="block flex-1 whitespace-nowrap px-6 py-3 text-pink-500 border border-pink-500 hover:bg-pink-800 hover:bg-opacity-20 transition-all duration-300 rounded-md font-semibold">
            Iniciar sesión
          </a>
          <a href="/auth/register" class="block flex-1 whitespace-nowrap px-6 py-3 bg-pink-600 text-white hover:bg-pink-700 transition-all duration-300 rounded-md font-semibold">
            Registrarse
          </a>
        </div>
      `,
      showConfirmButton: false,
      showCancelButton: false,
      showCloseButton: true,
      focusConfirm: false,
      focusCancel: false,
      cancelButtonText: 'Cancelar',
      cancelButtonColor: 'var(--color-pink-500)',
      confirmButtonText: 'Confirmar',
      confirmButtonColor: 'var(--color-pink-500)',
      cancelButtonAriaLabel: 'Cancelar',
      confirmButtonAriaLabel: 'Confirmar',
      customClass: {
        container: 'bg-zinc-900 bg-opacity-90',
        closeButton: 'text-gray-300 hover:text-gray-400',
      },
    });
  };

  const showInfoPayment = () => {
    Swal.fire({
      title: 'Pago',
      html: `
        <p class="text-gray-400 text-center mb-4 max-w-lg mx-auto">
          Para poder realizar una orden, debes realizar el pago mediante Yape o Efectivo.
        </p>
        <p class="text-gray-400 text-center mb-4 max-w-lg mx-auto">
          <b class="text-gray-300">Recuerda que el pago es contra entrega.</b> Cuando el mesero llegue a tu mesa, debes realizar el pago.
          <b class="text-gray-300">
            Aplica para pedidos en linea o ordenar en el restaurante.
          </b>
        </p>

        <div class="flex gap-4 w-fit mx-auto select-none">
          <img draggable="false" class="min-w-[50px] min-h-[50px] w-[50px] h-[50px] object-cover" src="/img/yape.png" alt="Yape" />
          <img draggable="false" class="min-w-[50px] min-h-[50px] w-[50px] h-[50px] object-cover" src="/img/efectivo.png" alt="Efectivo" />
        </div>
      `,
      showConfirmButton: false,
      showCancelButton: false,
      showCloseButton: true,
      focusConfirm: false,
      focusCancel: false,
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Confirmar',
      cancelButtonAriaLabel: 'Cancelar',
      confirmButtonAriaLabel: 'Confirmar',
      customClass: {
        container: 'bg-zinc-900 bg-opacity-90',
        closeButton: 'text-gray-300 hover:text-gray-400',
      },
    });
  };

  return (
    <Modal onClose={onCloseModal} isClose={isClose} className="bg-black bg-opacity-50 backdrop-blur-sm">
      <Modal.Overlay onClose={onCloseModal}>
        <div className="animate-fade-in select-none border border-zinc-700 border-opacity-50 backdrop-blur-sm max-w-3xl w-full mx-auto overflow-auto">
          <div className="sticky top-0 z-10 backdrop-blur-sm border-b border-b-zinc-700 border-opacity-50 bg-zinc-800 bg-opacity-80 flex items-stretch justify-between text-center">
            <div className="px-4 py-3 flex items-center text-center gap-4 border-r border-r-zinc-700 border-opacity-50">
              {tableOrder ? (
                <img
                  src={tableOrder.restaurant.logo.secure_url}
                  alt={tableOrder.restaurant.name}
                  className="min-w-[50px] min-h-[50px] w-[50px] h-[50px] object-cover rounded-full"
                />
              ) : (
                <img
                  draggable={false}
                  className="min-w-[50px] min-h-[50px] w-[50px] h-[50px] object-cover"
                  src="/img/carrito-de-compras.png"
                  alt="Carrito de Compras"
                />
              )}
            </div>
            <div className="px-4 py-3 flex items-center justify-center text-center flex-1">
              <h3 className="text-2xl font-semibold text-gray-200 uppercase text-center">Orden en mesa ahora</h3>
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

          <div className="bg-zinc-900 bg-opacity-90">
            {loadingOrder ? (
              <div className="px-4 py-20 bg-zinc-800 bg-opacity-50 text-center animate-fade-in">
                <h2 className="font-extrabold text-center uppercase text-gray-300 mb-4">Realizando orden</h2>
                <p className="text-gray-400 text-center mb-6 max-w-lg mx-auto">Estamos realizando tu orden, por favor espera un momento.</p>
                <Spinner className="mx-auto text-gray-400" />
              </div>
            ) : (
              <>
                {tableOrder ? (
                  <>
                    <div key={tableOrder.cartId} className="animate-fade-in">
                      <div className="bg-zinc-800 bg-opacity-80 px-4 py-3 flex items-center justify-between">
                        <div className="flex flex-col items-center w-full text-center justify-center">
                          <h4 className="text-lg font-semibold text-gray-200">{tableOrder.restaurant.name}</h4>
                          <p className="text-sm text-gray-300">{tableOrder.restaurant.address}</p>
                        </div>
                      </div>

                      {tableOrder.items.map((item) => (
                        <div key={item.id} className="px-4 py-3 flex items-center justify-between animate-fade-in">
                          <div className="flex-1 flex items-center gap-4">
                            <img src={item.image.secure_url} alt={item.name} className="w-16 h-16 rounded-full object-cover" />
                            <div className="flex-1">
                              <h4 className="text-lg font-semibold text-gray-200 line-clamp-1">{item.name}</h4>
                              <p className="text-sm text-gray-400 line-clamp-1 mb-1">{item.description}</p>
                              <div className="max-w-[260px] w-full flex gap-8 items-center">
                                <p className="flex-1 text-sm text-gray-400">
                                  S/. <span className="text-lg text-gray-200">{item.price}</span>
                                </p>

                                <Counter
                                  min={0}
                                  max={item.stock}
                                  minDisabled={item.quantity === 0}
                                  maxDisabled={item.quantity === item.stock}
                                  countState={item.quantity}
                                  className="w-fit"
                                  onChange={(value) => {
                                    if (value === 0) {
                                      return clearTableOrder();
                                    }

                                    const newCart = {
                                      ...tableOrder,
                                      items: tableOrder.items.map((i) => {
                                        if (i.id === item.id) {
                                          if (value > i.stock) {
                                            toast.dismiss();
                                            toast.error('No hay más stock disponible por el dia de hoy');
                                            return i;
                                          }
                                          return {
                                            ...item,
                                            quantity: value,
                                          };
                                        }
                                        return i;
                                      }),
                                    };
                                    updateTableOrder(newCart);
                                  }}
                                >
                                  <div className="min-w-[50px] w-[50px] text-center text-gray-300">{item.quantity}</div>
                                </Counter>
                              </div>
                            </div>
                          </div>

                          <button
                            type="button"
                            className="min-w-[40px] min-h-[40px] w-[40px] h-[40px] flex items-center justify-center px2-4 py- rounded-full bg-zinc-700 bg-opacity-50 hover:bg-opacity-100 transition-all duration-300 text-gray-300"
                            onClick={clearTableOrder}
                          >
                            <Trash size={20} />
                          </button>
                        </div>
                      ))}

                      <div className="px-4 py-3 flex gap-4 items-center justify-end">
                        <div className="flex items-center gap-4">
                          <div className="flex items-center gap-2 text-center">
                            <b className="text-gray-400">Sub Total:</b>
                            <p
                              className={twMerge(
                                'bg-zinc-700 text-sm font-extrabold text-zinc-300 rounded-full px-4 py-2 text-center',
                                tableOrder.coupon && 'line-through',
                              )}
                            >
                              S/. {tableOrder.subtotal}
                            </p>
                          </div>

                          <div className="flex items-center gap-2 text-center">
                            <b className="text-gray-100">Total:</b>
                            <p className="bg-pink-600 text-sm font-extrabold text-white rounded-full px-4 py-2 text-center">S/. {tableOrder.total}</p>
                          </div>
                        </div>

                        <AddCoupon
                          cart={tableOrder}
                          onCouponChange={(coupon) => {
                            updateTableOrder({
                              ...tableOrder,
                              coupon,
                            });
                          }}
                        />
                      </div>
                    </div>

                    <div className="flex gap-4 items-center justify-end p-2 border-t border-t-zinc-700 border-opacity-50 animate-fade-in">
                      {authenticated ? (
                        <button type="button" onClick={showInfoPayment}>
                          <CircleDollarSign size={24} className="text-gray-300" />
                        </button>
                      ) : (
                        <button type="button" onClick={showInfoAuthentication}>
                          <Info size={24} className="text-gray-300" />
                        </button>
                      )}

                      <button
                        className="w-full md:w-fit whitespace-nowrap px-6 py-3 bg-zinc-800 hover:bg-zinc-700 transition-all duration-300 rounded-md font-semibold"
                        onClick={onCloseModal}
                      >
                        Cerrar
                      </button>

                      {authenticated && (
                        <button
                          className="w-full md:w-fit whitespace-nowrap px-6 py-3 bg-pink-600 hover:bg-pink-700 transition-all duration-300 rounded-md font-semibold"
                          onClick={newTableOrder}
                        >
                          Ordenar en mesa
                        </button>
                      )}

                      {!authenticated && (
                        <>
                          <Link
                            to="/auth/login"
                            className="w-full md:w-fit whitespace-nowrap px-6 py-3 text-pink-500 border border-pink-500 hover:bg-pink-800 hover:bg-opacity-20 transition-all duration-300 rounded-md font-semibold"
                          >
                            Iniciar sesión
                          </Link>
                          <Link
                            to="/auth/register"
                            className="w-full md:w-fit whitespace-nowrap px-6 py-3 bg-pink-600 hover:bg-pink-700 transition-all duration-300 rounded-md font-semibold"
                          >
                            Registrarse
                          </Link>
                        </>
                      )}
                    </div>
                  </>
                ) : (
                  <div className="px-4 py-20 bg-zinc-800 bg-opacity-50 text-center animate-fade-in">
                    <h2 className="font-extrabold text-center uppercase text-gray-300 mb-4">No hay menus para ordenar</h2>
                    <p className="text-gray-400 text-center mb-4 max-w-lg mx-auto">
                      Empieza a agregar menus a tu carrito y disfruta de la mejor comida de <span className="font-extrabold">ORDEN FACIL</span>
                    </p>
                    <SmilePlus size={40} className="mx-auto text-gray-400 mb-4" />
                    <Link
                      to="/menus"
                      className="block mx-auto w-full md:w-fit whitespace-nowrap px-6 py-3 bg-pink-600 hover:bg-pink-700 transition-all duration-300 rounded-md font-semibold"
                      onClick={onCloseModal}
                    >
                      Buscar Menús
                    </Link>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </Modal.Overlay>
    </Modal>
  );
};

export default ModalTableOrder;
