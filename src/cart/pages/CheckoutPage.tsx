import { Link, useLocation, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import toast from 'react-hot-toast';
import { CircleDollarSign, SmilePlus, Trash, X } from 'lucide-react';
import useCart from '@/cart/hooks/useCart';
import Counter from '@/shared/components/Counter';
import useAccount from '@/account/hooks/useAccount';

const CheckoutPage = () => {
  const { authenticated, loadingAuthenticate } = useAccount();
  const { carts, removeCart, updateCart, removeItemsCart } = useCart();

  const navigate = useNavigate();
  const { pathname } = useLocation();

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

  if (loadingAuthenticate) {
    return null;
  }

  if (!authenticated) {
    setTimeout(() => {
      navigate('/auth/login', {
        state: {
          from: pathname,
        },
      });
    }, 0);
    return null;
  }

  return (
    <div className="p-4">
      <div className="animate-fade-in select-none border border-zinc-700 border-opacity-50 backdrop-blur-sm container w-full mx-auto overflow-auto">
        <div className="sticky top-0 z-10 backdrop-blur-sm border-b border-b-zinc-700 border-opacity-50 bg-zinc-800 bg-opacity-80 flex items-stretch justify-between text-center">
          <div className="px-4 py-3 flex items-center text-center gap-4 border-r border-r-zinc-700 border-opacity-50">
            <img
              draggable={false}
              className="min-w-[50px] min-h-[50px] w-[50px] h-[50px] object-cover"
              src="/img/yape.png"
              alt="Carrito de Compras"
            />
          </div>
          <div className="px-4 py-3 flex items-center justify-center text-center flex-1">
            <h3 className="text-2xl font-semibold text-gray-200 uppercase text-center">Confirmar Pedido</h3>
          </div>
          <div className="px-4 py-3 flex items-center justify-end text-center gap-4 border-l border-l-zinc-700 border-opacity-50">
            <button
              type="button"
              className="min-w-[40px] min-h-[40px] w-[40px] h-[40px] flex items-center justify-center px2-4 py- rounded-full bg-zinc-700 bg-opacity-50 hover:bg-opacity-100 transition-all duration-300 text-gray-300"
              onClick={() => navigate(-1)}
            >
              <X size={24} />
            </button>
          </div>
        </div>

        <div className="bg-zinc-900 bg-opacity-90">
          {carts.length ? (
            carts.map((cart) => (
              <div key={cart.cartId} className="animate-fade-in">
                <div className="bg-zinc-800 bg-opacity-80 px-4 py-3 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <img src={cart.restaurant.logo.secure_url} alt={cart.restaurant.name} className="w-16 h-16 rounded-full object-cover" />
                    <div className="flex flex-col">
                      <h4 className="text-lg font-semibold text-gray-200">{cart.restaurant.name}</h4>
                      <p className="text-sm text-gray-300">{cart.restaurant.address}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <button
                      type="button"
                      className="min-w-[40px] min-h-[40px] w-[40px] h-[40px] flex items-center justify-center px2-4 py- rounded-full bg-zinc-700 bg-opacity-50 hover:bg-opacity-100 transition-all duration-300 text-gray-300"
                      onClick={() => removeCart(cart)}
                    >
                      <X size={20} />
                    </button>
                  </div>
                </div>

                {cart.items.map((item) => (
                  <div key={item.id} className="px-4 py-3 flex items-center justify-between animate-fade-in">
                    <div className="flex items-center gap-4">
                      <img src={item.image.secure_url} alt={item.name} className="w-16 h-16 rounded-full object-cover" />
                      <div>
                        <h4 className="text-lg font-semibold text-gray-200 line-clamp-1">{item.name}</h4>
                        <p className="text-sm text-gray-400 line-clamp-1 mb-1">{item.description}</p>
                        <div className="grid grid-cols-2 gap-8 items-center">
                          <p className="text-sm text-gray-400">
                            S/. <span className="text-lg text-gray-200">{item.price}</span>
                          </p>

                          <Counter
                            min={0}
                            max={item.stock}
                            maxDisabled={item.quantity === item.stock}
                            countState={item.quantity}
                            onChange={(value) => {
                              if (value === 0) {
                                return removeItemsCart(item);
                              }

                              const newCart = {
                                ...cart,
                                items: cart.items.map((i) => {
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
                              updateCart(newCart);
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
                      onClick={() => removeItemsCart(item)}
                    >
                      <Trash size={20} />
                    </button>
                  </div>
                ))}
              </div>
            ))
          ) : (
            <div className="px-4 py-20 bg-zinc-800 bg-opacity-50 text-center animate-fade-in">
              <h2 className="font-extrabold text-center uppercase text-gray-300 mb-4">No hay productos en el carrito</h2>
              <p className="text-gray-400 text-center mb-4 max-w-lg mx-auto">
                Empieza a agregar productos a tu carrito y disfruta de la mejor comida de <span className="font-extrabold">ORDEN FACIL</span>
              </p>
              <SmilePlus size={40} className="mx-auto text-gray-400 mb-4" />
              <Link
                to="/menus"
                className="block mx-auto w-full md:w-fit whitespace-nowrap px-6 py-3 bg-pink-600 hover:bg-pink-700 transition-all duration-300 rounded-md font-semibold"
              >
                Buscar Menús
              </Link>
            </div>
          )}

          {carts.length > 0 && (
            <div className="flex gap-4 items-center justify-end p-2 border-t border-t-zinc-700 border-opacity-50 animate-fade-in">
              <button type="button" onClick={showInfoPayment}>
                <CircleDollarSign size={24} className="text-gray-300" />
              </button>

              <button
                type="button"
                className="w-full md:w-fit whitespace-nowrap px-6 py-3 bg-zinc-800 hover:bg-zinc-700 transition-all duration-300 rounded-md font-semibold"
                onClick={() => navigate(-1)}
              >
                Cancelar
              </button>

              <button
                type="button"
                className="w-full md:w-fit whitespace-nowrap px-6 py-3 bg-pink-600 hover:bg-pink-700 transition-all duration-300 rounded-md font-semibold"
              >
                Confirmar Pedido
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
