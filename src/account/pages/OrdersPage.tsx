import { useEffect, useState } from 'react';
import { SmilePlus } from 'lucide-react';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import useAccount from '@/account/hooks/useAccount';
import { Order } from '@/account/interfaces';
import Spinner from '@/shared/components/Spinner';
import { ErrorMessage } from '@/shared/interfaces';
import OrderRestaurant from '@/account/components/orders/OrderRestaurant';
import ClientAxios from '@/config/ClientAxios';

const OrdersPage = () => {
  const [loadingOrder, setLoadingOrder] = useState(true);
  const [orders, setOrders] = useState<Order[]>([]);

  const { user } = useAccount();

  useEffect(() => {
    if (user) {
      (async () => {
        try {
          const { data } = await ClientAxios.get<Order[]>(`/order`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('jwt')}`,
            },
          });
          console.log(data);
          setOrders(data);
        } catch (error) {
          console.log(error);
          const { response } = error as ErrorMessage;
          toast.error(response.data.message);
        } finally {
          setLoadingOrder(false);
        }
      })();
    }
  }, [user]);

  const updateOrder = (order: Order) => {
    const newOrders = orders.map((o) => (o._id === order._id ? order : o));
    setOrders(newOrders);
  };

  if (!user) return null;

  return (
    <div className="container mx-auto p-4">
      <div className="animate-fade-in select-none border border-zinc-700 border-opacity-50 backdrop-blur-sm w-full">
        <div className="backdrop-blur-sm border-b border-b-zinc-700 border-opacity-50 bg-zinc-800 bg-opacity-80 flex items-stretch justify-between text-center">
          <div className="px-4 py-3 flex items-center text-center gap-4 border-r border-r-zinc-700 border-opacity-50">
            <img
              draggable={false}
              className="min-w-[50px] min-h-[50px] w-[50px] h-[50px] object-cover"
              src="/img/carrito-de-compras.png"
              alt="Carrito de Compras"
            />
          </div>
          <div className="px-4 py-3 flex items-center justify-center text-center flex-1">
            <h3 className="text-2xl font-semibold text-gray-200 uppercase text-center">
              Historial de pedidos <span className="text-pink-600">({orders.length})</span>
            </h3>
          </div>
        </div>

        <div className="bg-zinc-900 bg-opacity-90">
          {loadingOrder ? (
            <div className="px-4 py-20 bg-zinc-800 bg-opacity-50 text-center animate-fade-in">
              <h2 className="font-extrabold text-center uppercase text-gray-300 mb-4">
                Buscando tus pedidos <span className="text-pink-600">🔎</span>
              </h2>
              <p className="text-gray-400 text-center mb-6 max-w-lg mx-auto">Estamos buscando tu pedidos, por favor espera un momento.</p>
              <Spinner className="mx-auto text-gray-400" />
            </div>
          ) : (
            <>
              {orders.length ? (
                orders.map((order) => <OrderRestaurant key={order._id} order={order} updateOrder={updateOrder} />)
              ) : (
                <div className="px-4 py-20 bg-zinc-800 bg-opacity-50 text-center animate-fade-in">
                  <h2 className="font-extrabold text-center uppercase text-gray-300 mb-4">
                    No has realizado ningún pedido <span className="text-pink-600">😢</span>
                  </h2>
                  <p className="text-gray-400 text-center mb-4 max-w-lg mx-auto">
                    Empieza a agregar menus a tu carrito y disfruta de la mejor comida de <span className="font-extrabold">ORDEN FACIL</span> 🍔
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
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrdersPage;
