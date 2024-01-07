import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Ban, Download } from 'lucide-react';
import useChangeStatusOrder from '@/restaurant/hooks/useChangeStatusOrder';
import { OrderByRestaurant } from '@/restaurant/interfaces';
import { downloadFile, formatDate, formatTime, showImage } from '@/shared/helpers';
import OrderItem from '@/restaurant/components/order/OrderItem';
import { OrderStatus } from '@/restaurant/types';
import { QRCodeGenerator } from '@/helpers';

interface OrderProps {
  order: OrderByRestaurant;
  updateOrder: (order: OrderByRestaurant) => void;
}

const Order = ({ order, updateOrder }: OrderProps) => {
  const [statusSelected, setStatusSelected] = useState<OrderStatus | null>(order.status);
  const { loadingStatus, changeStatus } = useChangeStatusOrder();

  const handleStatus = async (e: React.FormEvent<HTMLSelectElement>) => {
    const statusSelected = e.currentTarget.value as OrderStatus;
    if (!statusSelected) return;

    setStatusSelected(statusSelected);

    const newStatus = await changeStatus(order._id, statusSelected);
    if (newStatus) {
      setStatusSelected(newStatus);
      updateOrder({ ...order, status: newStatus });
    } else {
      setStatusSelected(order.status);
    }
  };

  // Handle rechazar pedido
  const handleRejectedOrder = async () => {
    const newStatus = await changeStatus(order._id, 'REJECTED');
    if (newStatus) {
      setStatusSelected(newStatus);
      updateOrder({ ...order, status: newStatus });
    } else {
      setStatusSelected(order.status);
    }
  };

  const isCancelledOrRejected = order.status === 'CANCELLED' || order.status === 'REJECTED';

  return (
    <div className="animate-fade-in">
      <div className="bg-zinc-800 bg-opacity-80 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="relative">
            <img
              src={order.user.photo ? order.user.photo.secure_url : '/img/default-user.png'}
              alt={order.user.name}
              className="w-10 h-10 rounded-full object-cover"
            />
            {order.coupon && (
              <div className="absolute -top-3 -right-3 flex items-center justify-center w-[33px] h-[33px] bg-pink-600 rounded-full">
                <span className="text-white text-xs">-{order.coupon.discount}%</span>
              </div>
            )}
          </div>
          <div className="flex flex-col">
            <h4 className="text-lg font-semibold text-gray-200">{order.user.name}</h4>
            <p className="text-sm text-gray-300">
              {order.user.city} - {order.user.country}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4 whitespace-nowrap">
          <div className="flex items-center gap-2 text-center">
            <b className="text-gray-300">Total:</b>
            <p className="bg-pink-600 text-xs font-extrabold text-white rounded-full px-4 py-2 text-center">S/. {order.total}</p>
          </div>

          <div className="w-fit flex items-center gap-4">
            <div className="w-fit">
              <button
                className="block w-16 h-16 disabled:cursor-not-allowed cursor-pointer mb-1 disabled:opacity-80 relative"
                disabled={isCancelledOrRejected}
                onClick={() =>
                  showImage({
                    src: QRCodeGenerator(`${window.location.origin}/online-orders/${order.restaurant._id}/by/${order._id}`),
                    alt: `Código QR del restaurante ${order.restaurant.name}`,
                    imageHeight: 220,
                    imageWidth: 220,
                  })
                }
              >
                <img
                  src={QRCodeGenerator(`${window.location.origin}/online-orders/${order.restaurant._id}/by/${order._id}`)}
                  alt={`Código QR del restaurante ${order.restaurant.name}`}
                  className="w-full h-full object-contain"
                />
                {isCancelledOrRejected && (
                  <div className="absolute inset-0 bg-black backdrop-blur-[1.2px] bg-opacity-50 flex items-center justify-center">
                    <Ban strokeWidth={2} size={30} className="text-red-500" />
                  </div>
                )}
              </button>
              <button
                className=" flex items-center justify-center w-full text-center text-sm px-3 py-1 disabled:cursor-not-allowed disabled:border-gray-600 disabled:text-gray-600 disabled:bg-gray-600 disabled:bg-opacity-10 disabled:hover:bg-opacity-10 bg-pink-600 text-pink-600 border border-pink-600 bg-opacity-10 border-opacity-40 hover:bg-opacity-20 transition-all duration-300"
                onClick={() =>
                  downloadFile(
                    QRCodeGenerator(`${window.location.origin}/online-orders/${order.restaurant._id}/by/${order._id}`),
                    `qr orden ${order.restaurant.name}`,
                  )
                }
                disabled={isCancelledOrRejected}
              >
                <Download size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-zinc-800 bg-opacity-80 px-4 py-3 flex items-center justify-between border-t border-zinc-700 border-opacity-50">
        <div className="flex flex-col gap-1">
          <p className="text-sm">
            <b className="text-gray-300 font-semibold">FECHA: </b>
            <span className="text-gray-400">{formatDate(order.createdAt)}</span>
          </p>
          <p className="text-sm">
            <b className="text-gray-300 font-semibold">HORA: </b>
            <span className="text-gray-400">{formatTime(order.createdAt)}</span>
          </p>
        </div>
        <div className="flex items-stretch justify-end gap-2 animate-fade-in">
          {order.paymentStatus === 'PENDING' && (order.status === 'READY' || order.status === 'SENDING') && (
            <div className="flex items-center flex-col justify-center text-center min-w-[100px] text-sm transition-colors duration-300 rounded-md px-4 py-1 font-semibold bg-yellow-500 text-yellow-500 border border-yellow-500 bg-opacity-10 border-opacity-40">
              Pago Pendiente
            </div>
          )}

          {order.paymentStatus === 'PAID' && (
            <div className="flex items-center flex-col justify-center text-center min-w-[100px] text-sm transition-colors duration-300 rounded-md px-4 py-1 font-semibold bg-green-500 text-green-500 border border-green-500 bg-opacity-10 border-opacity-40">
              Pagado
            </div>
          )}

          {order.paymentStatus === 'CANCELLED' && (
            <div className="flex items-center flex-col justify-center text-center min-w-[100px] text-sm transition-colors duration-300 rounded-md px-4 py-1 font-semibold bg-red-500 text-red-500 border border-red-500 bg-opacity-10 border-opacity-40">
              Pago Cancelado
            </div>
          )}

          {order.status === 'PREPARING' && (
            <div className="flex items-center flex-col justify-center text-center min-w-[100px] text-sm transition-colors duration-300 rounded-md px-4 py-1 font-semibold bg-blue-500 text-blue-500 border border-blue-500 bg-opacity-10 border-opacity-40 hover:bg-opacity-20">
              Preparando
              <div className="text-xs text-gray-400">Tiempo estimado: 20 min</div>
            </div>
          )}

          {order.status === 'READY' && (
            <div className="flex items-center flex-col justify-center text-center min-w-[100px] text-sm transition-colors duration-300 rounded-md px-4 py-1 font-semibold bg-blue-500 text-blue-500 border border-blue-500 bg-opacity-10 border-opacity-40 hover:bg-opacity-20">
              Orden lista
            </div>
          )}

          {order.status === 'DELIVERED' && (
            <div className="flex items-center flex-col justify-center text-center min-w-[100px] text-sm transition-colors duration-300 rounded-md px-4 py-1 font-semibold bg-blue-500 text-blue-500 border border-blue-500 bg-opacity-10 border-opacity-40 hover:bg-opacity-20">
              Entregado
            </div>
          )}

          {order.status === 'CANCELLED' && (
            <div className="flex items-center flex-col justify-center text-center min-w-[100px] text-sm transition-colors duration-300 rounded-md px-4 py-1 font-semibold bg-red-500 text-red-500 borde bg-opacity-10">
              Cancelado
            </div>
          )}

          {order.status === 'REJECTED' && (
            <div className="flex items-center flex-col justify-center text-center min-w-[100px] text-sm transition-colors duration-300 rounded-md px-4 py-1 font-semibold bg-red-500 text-red-500 border border-red-500 bg-opacity-10 border-opacity-40 hover:bg-opacity-20">
              Rechazado
            </div>
          )}

          {order.status === 'CONFIRMED' && (
            <div className="flex items-center flex-col justify-center text-center min-w-[100px] text-sm transition-colors duration-300 rounded-md px-3 py-2 font-semibold bg-green-600 text-green-600 border border-green-600 bg-opacity-10 border-opacity-40 hover:bg-opacity-20">
              Orden tomada
            </div>
          )}

          {order.status === 'COMPLETED' && (
            <div className="flex items-center flex-col justify-center text-center min-w-[100px] text-sm transition-colors duration-300 rounded-md px-3 py-1 font-semibold bg-pink-600 text-pink-600 border border-pink-600 bg-opacity-10 border-opacity-40 hover:bg-opacity-20">
              Completado
            </div>
          )}

          {order.status === 'SENDING' && (
            <div className="flex items-center flex-col justify-center text-center min-w-[100px] text-sm transition-colors duration-300 rounded-md px-4 py-1 font-semibold bg-blue-500 text-blue-500 border border-blue-500 bg-opacity-10 border-opacity-40 hover:bg-opacity-20">
              En camino
              <div className="text-xs text-gray-400">Tiempo estimado: 10 min</div>
            </div>
          )}

          {order.status === 'EMITTED' && (
            <button
              type="button"
              className="text-center min-w-[100px] text-sm transition-colors duration-300 rounded-md px-4 py-1 font-semibold bg-gray-300 text-gray-400 border border-gray-400 bg-opacity-10 border-opacity-40 hover:bg-opacity-20"
              onClick={handleRejectedOrder}
              disabled={loadingStatus}
            >
              {loadingStatus ? 'Rechazando...' : 'Rechazar Pedido'}
            </button>
          )}

          {order.status !== 'CANCELLED' && order.status !== 'REJECTED' && order.status !== 'COMPLETED' && order.status !== 'SENDING' && (
            <select
              className="text-center min-w-[100px] text-sm transition-colors duration-300 rounded-md px-4 py-1 font-semibold bg-blue-500 text-blue-500 border border-blue-500 bg-opacity-10 border-opacity-40 hover:bg-opacity-20"
              onChange={handleStatus}
              value={statusSelected || ''}
              disabled={loadingStatus}
            >
              <option className="bg-zinc-800 text-white" value="EMITTED" disabled>
                Emitido
              </option>
              <option className="bg-zinc-800 text-white" value="CONFIRMED" disabled={order.status !== 'EMITTED'}>
                Confirmado
              </option>
              <option className="bg-zinc-800 text-white" value="PREPARING" disabled={order.status !== 'CONFIRMED'}>
                Preparando
              </option>
              <option className="bg-zinc-800 text-white" value="READY" disabled={order.status !== 'PREPARING'}>
                Orden lista
              </option>
              <option className="bg-zinc-800 text-white" value="SENDING" disabled={order.status !== 'READY' && order.status !== 'PREPARING'}>
                En camino
              </option>
            </select>
          )}

          <Link
            to={`/online-orders/${order.restaurant._id}/by/${order._id}`}
            className="flex items-center justify-center text-center min-w-[100px] text-sm transition-colors duration-300 rounded-md px-2 py-1 font-semibold bg-pink-300 text-pink-400 border border-pink-400 bg-opacity-10 border-opacity-40 hover:bg-opacity-20"
          >
            Visualizar
          </Link>
        </div>
      </div>

      {order.items.map((order) => (
        <OrderItem key={order._id} order={order} />
      ))}
    </div>
  );
};

export default Order;
