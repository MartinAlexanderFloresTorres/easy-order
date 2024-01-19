import { useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import toast from 'react-hot-toast';
import { twMerge } from 'tailwind-merge';
import { CircleDollarSign, Info, SmilePlus, X } from 'lucide-react';
import Modal from '@/shared/components/Modal';
import useCart from '@/cart/hooks/useCart';
import useAccount from '@/account/hooks/useAccount';
import useGenerateOrder from '@/cart/hooks/useGenerateOrder';
import Spinner from '@/shared/components/Spinner';
import SearchMap from '@/cart/components/SearchMap';
import CartList from '@/cart/components/CartList';

interface ModalCartProps {
  onClose: () => void;
}

const DEFAULT_CENTER_MAP: [number, number] = [-80.61678159965182, -5.2014830268134205];

let timer: NodeJS.Timeout | null = null;

const ModalCart = ({ onClose }: ModalCartProps) => {
  const [search, setSearch] = useState('');
  const mapRef = useRef<HTMLDivElement>(null);
  const mapBoxRef = useRef<mapboxgl.Map | null>(null);
  const marketRef = useRef<mapboxgl.Marker | null>(null);
  const lngLatRef = useRef<[number, number]>(DEFAULT_CENTER_MAP);
  const [showTableOrder, setShowTableOrder] = useState(false);
  const [address, setAddress] = useState('');

  const [isClose, setIsClose] = useState(false);
  const [tabActive, setTabActive] = useState(1);

  const navigate = useNavigate();
  const { authenticated } = useAccount();
  const { carts, clearCart, generatedOrder } = useCart();
  const { generateOrder, generateTableOrder, loadingOrder } = useGenerateOrder();

  const openOrderTable = () => setShowTableOrder(true);
  const closeOrderTable = () => setShowTableOrder(false);

  const newOrderOnline = async () => {
    if (loadingOrder) return toast.error('Ya se está realizando un pedido, por favor espere');
    if (!authenticated) return showInfoAuthentication();
    if (carts.length === 0) return toast.error('No hay productos en el carrito');
    if (carts.some((cart) => cart.items.some((item) => item.quantity === 0))) return toast.error('Hay un menu sin cantidad, por favor elimine el menu');
    if (carts.some((cart) => cart.items.some((item) => item.quantity > item.stock))) return toast.error('Algunos productos no tienen stock disponible');

    if (!address || !lngLatRef.current) return toast.error('No se ha seleccionado una dirección de entrega');

    const { isConfirmed } = await Swal.fire({
      title: 'Pedido en linea',
      html: `Estás a punto de realizar un pedido, recuerda que el pago es contra entrega. Cuando el repartidor llegue a tu domicilio, debes realizar el pago y luego recibirás tu pedido.`,
      showConfirmButton: true,
      showCancelButton: true,
      showCloseButton: true,
      focusConfirm: false,
      focusCancel: false,
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Ordenar Delivery',
      cancelButtonAriaLabel: 'Cancelar',
      confirmButtonAriaLabel: 'Ordenar Delivery',
      customClass: {
        container: 'bg-zinc-900 bg-opacity-90',
        closeButton: 'text-gray-300 hover:text-gray-400',
      },
    });

    if (!isConfirmed) return;

    for (const cart of carts) {
      await generateOrder(cart, {
        address,
        longitude: lngLatRef.current[0],
        latitude: lngLatRef.current[1],
      });
    }

    generatedOrder();
    clearCart(false);
    onClose();
    setAddress('');
    setSearch('');
    navigate('/account/online-orders');
    lngLatRef.current = DEFAULT_CENTER_MAP;
    // Centrar mapa
    if (!mapBoxRef.current) return;
    mapBoxRef.current.setCenter(DEFAULT_CENTER_MAP);
    // Eliminar marcador
    if (marketRef.current) {
      marketRef.current.remove();
      marketRef.current = null;
    }

    toast.success('Pedido realizado correctamente');
  };

  const newTableOrder = async () => {
    if (loadingOrder) return toast.error('Ya se está realizando una orden, por favor espere');
    if (!authenticated) return showInfoAuthentication();
    if (carts.length === 0) return toast.error('No hay productos en el carrito');
    if (carts.some((cart) => cart.items.some((item) => item.quantity === 0))) return toast.error('Hay un menu sin cantidad, por favor elimine el menu');
    if (carts.some((cart) => cart.items.some((item) => item.quantity > item.stock))) return toast.error('Algunos productos no tienen stock disponible');

    const { isConfirmed } = await Swal.fire({
      title: '¿Deseas confirmar la orden?',
      html: `Estás a punto de realizar una orden, Realiza el pago cuando el mesero llegue a tu mesa.`,
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

    for (const cart of carts) {
      await generateTableOrder(cart);
    }

    generatedOrder();
    clearCart(false);
    onClose();
    navigate('/account/table-orders');
    toast.success('Orden realizado correctamente');
  };

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

  const showInfoAuthentication = () => {
    Swal.fire({
      title: 'Autenticación',
      html: `
        <p class="text-gray-400 text-center mb-4 max-w-lg mx-auto">
          Para poder realizar un pedido, debes iniciar sesión o registrarte en nuestra plataforma.
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
          Para poder realizar un pedido, debes realizar el pago mediante Yape o Efectivo.
        </p>
        <p class="text-gray-400 text-center mb-4 max-w-lg mx-auto">
          <b class="text-gray-300">Recuerda que el pago es contra entrega.</b> Cuando el repartidor llegue a tu domicilio, debes realizar el pago y luego recibirás tu pedido.
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

  const invalidFieldsTab1 = () => {
    return carts.some((cart) => cart.items.some((item) => item.quantity === 0));
  };

  const invalidFieldsTab2 = () => {
    return !address || !lngLatRef.current;
  };

  return (
    <Modal onClose={onCloseModal} isClose={isClose} className="bg-black bg-opacity-50 backdrop-blur-sm">
      <Modal.Overlay onClose={onCloseModal}>
        {showTableOrder ? (
          <div className="animate-fade-in select-none border border-zinc-700 border-opacity-50 backdrop-blur-sm max-w-3xl w-full mx-auto overflow-auto">
            <div className="sticky top-0 z-10 backdrop-blur-sm border-b border-b-zinc-700 border-opacity-50 bg-zinc-800 bg-opacity-80 flex items-stretch justify-between text-center">
              <div className="px-4 py-3 flex items-center text-center gap-4 border-r border-r-zinc-700 border-opacity-50">
                <img draggable={false} className="min-w-[50px] min-h-[50px] w-[50px] h-[50px] object-cover" src="/img/carrito-de-compras.png" alt="Carrito de Compras" />
              </div>
              <div className="px-4 py-3 flex items-center justify-center text-center flex-1">
                <h3 className="text-2xl font-semibold text-gray-200 uppercase text-center">Orden en mesa</h3>
              </div>
              <div className="px-4 py-3 flex items-center justify-end text-center gap-4 border-l border-l-zinc-700 border-opacity-50">
                <button type="button" className="min-w-[40px] min-h-[40px] w-[40px] h-[40px] flex items-center justify-center px2-4 py- rounded-full bg-zinc-700 bg-opacity-50 hover:bg-opacity-100 transition-all duration-300 text-gray-300" onClick={onCloseModal}>
                  <X size={24} />
                </button>
              </div>
            </div>

            <div className="bg-zinc-900 bg-opacity-90">
              {loadingOrder ? (
                <div className="px-4 py-20 bg-zinc-800 bg-opacity-50 text-center animate-fade-in">
                  <h2 className="font-extrabold text-center uppercase text-gray-300 mb-4">Realizando pedido</h2>
                  <p className="text-gray-400 text-center mb-6 max-w-lg mx-auto">Estamos realizando tu pedido, por favor espera un momento.</p>
                  <Spinner className="mx-auto text-gray-400" />
                </div>
              ) : (
                <>
                  {carts.length ? (
                    <>
                      <CartList showCoupon={true} />

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

                        <button type="button" className="w-full md:w-fit whitespace-nowrap px-6 py-3 bg-zinc-800 hover:bg-zinc-700 transition-all duration-300 rounded-md font-semibold" onClick={() => clearCart()}>
                          Vaciar carrito
                        </button>

                        <button className="w-full md:w-fit whitespace-nowrap px-6 py-3 bg-zinc-800 hover:bg-zinc-700 transition-all duration-300 rounded-md font-semibold" onClick={closeOrderTable}>
                          Volver
                        </button>

                        {authenticated && (
                          <button className="w-full md:w-fit whitespace-nowrap px-6 py-3 bg-pink-600 hover:bg-pink-700 transition-all duration-300 rounded-md font-semibold" onClick={newTableOrder}>
                            Ordenar en mesa
                          </button>
                        )}

                        {!authenticated && (
                          <>
                            <Link to="/auth/login" className="w-full md:w-fit whitespace-nowrap px-6 py-3 text-pink-500 border border-pink-500 hover:bg-pink-800 hover:bg-opacity-20 transition-all duration-300 rounded-md font-semibold">
                              Iniciar sesión
                            </Link>
                            <Link to="/auth/register" className="w-full md:w-fit whitespace-nowrap px-6 py-3 bg-pink-600 hover:bg-pink-700 transition-all duration-300 rounded-md font-semibold">
                              Registrarse
                            </Link>
                          </>
                        )}
                      </div>
                    </>
                  ) : (
                    <div className="px-4 py-20 bg-zinc-800 bg-opacity-50 text-center animate-fade-in">
                      <h2 className="font-extrabold text-center uppercase text-gray-300 mb-4">No hay productos en el carrito</h2>
                      <p className="text-gray-400 text-center mb-4 max-w-lg mx-auto">
                        Empieza a agregar productos a tu carrito y disfruta de la mejor comida de <span className="font-extrabold">ORDEN FACIL</span>
                      </p>
                      <SmilePlus size={40} className="mx-auto text-gray-400 mb-4" />
                      <Link to="/menus" className="block mx-auto w-full md:w-fit whitespace-nowrap px-6 py-3 bg-pink-600 hover:bg-pink-700 transition-all duration-300 rounded-md font-semibold" onClick={onCloseModal}>
                        Buscar Menús
                      </Link>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        ) : (
          <div className="animate-fade-in select-none border border-zinc-700 border-opacity-50 backdrop-blur-sm max-w-3xl w-full mx-auto overflow-auto">
            <div className="sticky top-0 z-10 backdrop-blur-sm border-b border-b-zinc-700 border-opacity-50 bg-zinc-800 bg-opacity-80 flex items-stretch justify-between text-center">
              <div className="px-4 py-3 flex items-center text-center gap-4 border-r border-r-zinc-700 border-opacity-50">
                <img draggable={false} className="min-w-[50px] min-h-[50px] w-[50px] h-[50px] object-cover" src="/img/carrito-de-compras.png" alt="Carrito de Compras" />
              </div>
              <div className="px-4 py-3 flex items-center justify-center text-center flex-1">
                <h3 className="text-2xl font-semibold text-gray-200 uppercase text-center">Carrito</h3>
              </div>
              <div className="px-4 py-3 flex items-center justify-end text-center gap-4 border-l border-l-zinc-700 border-opacity-50">
                <button type="button" className="min-w-[40px] min-h-[40px] w-[40px] h-[40px] flex items-center justify-center px2-4 py- rounded-full bg-zinc-700 bg-opacity-50 hover:bg-opacity-100 transition-all duration-300 text-gray-300" onClick={onCloseModal}>
                  <X size={24} />
                </button>
              </div>
            </div>

            <div className="bg-zinc-900 bg-opacity-90">
              {loadingOrder ? (
                <div className="px-4 py-20 bg-zinc-800 bg-opacity-50 text-center animate-fade-in">
                  <h2 className="font-extrabold text-center uppercase text-gray-300 mb-4">Realizando pedido</h2>
                  <p className="text-gray-400 text-center mb-6 max-w-lg mx-auto">Estamos realizando tu pedido, por favor espera un momento.</p>
                  <Spinner className="mx-auto text-gray-400" />
                </div>
              ) : (
                <>
                  {carts.length ? (
                    <>
                      <div className="flex items-center justify-center gap-2 p-4">
                        <button className={twMerge('w-[40px] h-[40px] min-w-[40px] min-h-[40px] font-bold text-center border-2 border-pink-700 flex items-center justify-center text-zinc-300 hover:text-zinc-200 disabled:cursor-not-allowed disabled:hover:bg-transparent hover:bg-pink-600 transition-all duration-300 rounded-full', tabActive === 1 && 'bg-pink-600')} onClick={() => setTabActive(1)} disabled={carts.length === 0}>
                          1
                        </button>
                        <div className="w-1/2 h-1 bg-zinc-700"></div>
                        <button className={twMerge('w-[40px] h-[40px] min-w-[40px] min-h-[40px] font-bold text-center border-2 border-pink-700 flex items-center justify-center text-zinc-300 hover:text-zinc-200 disabled:cursor-not-allowed disabled:hover:bg-transparent hover:bg-pink-600 transition-all duration-300 rounded-full', tabActive === 2 && 'bg-pink-600')} onClick={() => setTabActive(2)} disabled={invalidFieldsTab1()}>
                          2
                        </button>
                        <div className="w-1/2 h-1 bg-zinc-700"></div>
                        <button className={twMerge('w-[40px] h-[40px] min-w-[40px] min-h-[40px] font-bold text-center border-2 border-pink-700 flex items-center justify-center text-zinc-300 hover:text-zinc-200 disabled:cursor-not-allowed disabled:hover:bg-transparent hover:bg-pink-600 transition-all duration-300 rounded-full', tabActive === 3 && 'bg-pink-600')} onClick={() => setTabActive(3)} disabled={invalidFieldsTab2()}>
                          3
                        </button>
                      </div>

                      {tabActive === 1 && <CartList showCoupon={false} />}

                      {tabActive === 2 && <SearchMap DEFAULT_CENTER_MAP={DEFAULT_CENTER_MAP} search={search} setSearch={setSearch} address={address} setAddress={setAddress} mapRef={mapRef} mapBoxRef={mapBoxRef} marketRef={marketRef} lngLatRef={lngLatRef} onNext={() => setTabActive(3)} />}

                      {tabActive === 3 && (
                        <>
                          <CartList showCoupon={true} />

                          <div className="p-4 border-t border-t-zinc-700 border-opacity-50">
                            <div className="flex items-center justify-between mb-2">
                              <p className="text-gray-400">Dirección de entrega</p>
                              <button type="button" className="text-pink-500 hover:text-pink-600 transition-all duration-300" onClick={() => setTabActive(2)}>
                                Cambiar
                              </button>
                            </div>
                            <p className="text-gray-200">{address}</p>
                          </div>
                        </>
                      )}

                      <div className="flex gap-4 items-center justify-end p-2 border-t border-t-zinc-700 border-opacity-50 animate-fade-in">
                        {authenticated && tabActive === 1 && (
                          <button type="button" onClick={showInfoPayment}>
                            <CircleDollarSign size={24} className="text-gray-300" />
                          </button>
                        )}

                        {!authenticated && (
                          <button type="button" onClick={showInfoAuthentication}>
                            <Info size={24} className="text-gray-300" />
                          </button>
                        )}

                        {tabActive === 1 && (
                          <>
                            <button type="button" className="w-full md:w-fit whitespace-nowrap px-6 py-3 bg-zinc-800 hover:bg-zinc-700 transition-all duration-300 rounded-md font-semibold" onClick={() => clearCart()}>
                              Vaciar carrito
                            </button>
                            {authenticated && (
                              <>
                                <button className="w-full md:w-fit whitespace-nowrap px-6 py-3 bg-pink-600 hover:bg-pink-700 transition-all duration-300 rounded-md font-semibold" onClick={openOrderTable}>
                                  Order en mesa
                                </button>
                                <button className="w-full md:w-fit whitespace-nowrap px-6 py-3 bg-pink-600 hover:bg-pink-700 transition-all duration-300 rounded-md font-semibold" onClick={() => setTabActive(2)}>
                                  Continua Delivery
                                </button>
                              </>
                            )}
                          </>
                        )}
                        {tabActive === 2 && (
                          <button className="w-full md:w-fit whitespace-nowrap px-6 py-3 bg-zinc-800 hover:bg-zinc-700 transition-all duration-300 rounded-md font-semibold" onClick={() => setTabActive(1)}>
                            Volver
                          </button>
                        )}

                        {tabActive === 3 && (
                          <button className="w-full md:w-fit whitespace-nowrap px-6 py-3 bg-zinc-800 hover:bg-zinc-700 transition-all duration-300 rounded-md font-semibold" onClick={() => setTabActive(2)}>
                            Volver
                          </button>
                        )}

                        {authenticated && tabActive === 3 && (
                          <button className="w-full md:w-fit whitespace-nowrap px-6 py-3 bg-pink-600 hover:bg-pink-700 transition-all duration-300 rounded-md font-semibold" onClick={newOrderOnline}>
                            Ordenar delivery
                          </button>
                        )}

                        {!authenticated && (
                          <>
                            <Link to="/auth/login" className="w-full md:w-fit whitespace-nowrap px-6 py-3 text-pink-500 border border-pink-500 hover:bg-pink-800 hover:bg-opacity-20 transition-all duration-300 rounded-md font-semibold">
                              Iniciar sesión
                            </Link>
                            <Link to="/auth/register" className="w-full md:w-fit whitespace-nowrap px-6 py-3 bg-pink-600 hover:bg-pink-700 transition-all duration-300 rounded-md font-semibold">
                              Registrarse
                            </Link>
                          </>
                        )}
                      </div>
                    </>
                  ) : (
                    <div className="px-4 py-20 bg-zinc-800 bg-opacity-50 text-center animate-fade-in">
                      <h2 className="font-extrabold text-center uppercase text-gray-300 mb-4">No hay productos en el carrito</h2>
                      <p className="text-gray-400 text-center mb-4 max-w-lg mx-auto">
                        Empieza a agregar productos a tu carrito y disfruta de la mejor comida de <span className="font-extrabold">ORDEN FACIL</span>
                      </p>
                      <SmilePlus size={40} className="mx-auto text-gray-400 mb-4" />
                      <Link to="/menus" className="block mx-auto w-full md:w-fit whitespace-nowrap px-6 py-3 bg-pink-600 hover:bg-pink-700 transition-all duration-300 rounded-md font-semibold" onClick={onCloseModal}>
                        Buscar Menús
                      </Link>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        )}
      </Modal.Overlay>
    </Modal>
  );
};

export default ModalCart;
