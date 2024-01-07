import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { SmilePlus } from 'lucide-react';
import useRestaurant from '@/restaurant/hooks/useRestaurant';
import ClientAxios from '@/config/ClientAxios';
import Spinner from '@/shared/components/Spinner';
import { ErrorMessage } from '@/shared/interfaces';
import { OrderByRestaurant } from '@/restaurant/interfaces';
import Order from '@/restaurant/components/order/Order';

const RestaurantOrdersPage = () => {
  const [orders, setOrders] = useState<OrderByRestaurant[]>([]);
  const [loadingOrder, setLoadingOrder] = useState(true);

  const { restaurant } = useRestaurant();

  useEffect(() => {
    if (restaurant) {
      (async () => {
        try {
          const { data } = await ClientAxios.get<OrderByRestaurant[]>(`/order/${restaurant._id}`, {
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
  }, [restaurant]);

  const updateOrder = (order: OrderByRestaurant) => {
    const newOrders = orders.map((o) => (o._id === order._id ? order : o));
    setOrders(newOrders);
  };

  if (!restaurant) return null;

  return (
    <div className="animate-fade-in select-none border border-zinc-700 border-opacity-50 backdrop-blur-sm w-full">
      <div className="backdrop-blur-sm border-b border-b-zinc-700 border-opacity-50 bg-zinc-800 bg-opacity-80 flex items-stretch justify-between text-center">
        <div className="px-4 py-3 flex items-center text-center gap-4 border-r border-r-zinc-700 border-opacity-50">
          <img
            draggable={false}
            className="min-w-[50px] min-h-[50px] w-[50px] h-[50px] object-cover rounded-full"
            src={restaurant.logo.secure_url}
            alt={restaurant.name}
          />
        </div>
        <div className="px-4 py-3 flex items-center justify-center text-center flex-1">
          <h3 className="text-2xl font-semibold text-gray-200 uppercase text-center">
            Pedidos <span className="text-pink-600">({orders.length})</span>
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
              orders.map((order) => <Order key={order._id} order={order} updateOrder={updateOrder} />)
            ) : (
              <div className="px-4 py-20 bg-zinc-800 bg-opacity-50 text-center animate-fade-in">
                <h2 className="font-extrabold text-center uppercase text-gray-300 mb-4">
                  No han realizado ningúna orden de pedido <span className="text-pink-600">😢</span>
                </h2>
                <p className="text-gray-400 text-center mb-4 max-w-lg mx-auto">
                  Espera a que un cliente realice un pedido para que puedas verlo aquí.🍔
                </p>
                <SmilePlus size={40} className="mx-auto text-gray-400" />
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default RestaurantOrdersPage;
