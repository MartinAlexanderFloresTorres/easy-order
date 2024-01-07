import { Link } from 'react-router-dom';
import { Ban, Download } from 'lucide-react';
import { TableOrder } from '@/account/interfaces';
import { downloadFile, formatDate, formatTime, showImage } from '@/shared/helpers';
import OrderRestaurantItem from '@/account/components/orders/OrderRestaurantItem';
import useCancelTableOrder from '@/account/hooks/orders/useCancelTableOrder';
import { QRCodeGenerator } from '@/helpers';

interface TableOrderRestaurantProps {
  order: TableOrder;
  updateOrder: (order: TableOrder) => void;
}

const TableOrderRestaurant = ({ order, updateOrder }: TableOrderRestaurantProps) => {
  const { cancelOrder, loadingCancel } = useCancelTableOrder();

  const handleCancelOrder = async () => {
    const status = await cancelOrder(order._id);
    if (status) {
      updateOrder({ ...order, status });
    }
  };

  const isCancelledOrRejected = order.status === 'CANCELLED' || order.status === 'REJECTED';

  return (
    <div key={order._id} className="animate-fade-in">
      <div className="bg-zinc-800 bg-opacity-80 px-4 py-3 flex items-center justify-between border-b border-zinc-700 border-opacity-50">
        <div className="flex items-center gap-4">
          <img src={order.restaurant.logo.secure_url} alt={order.restaurant.name} className="w-16 h-16 rounded-full object-cover" />
          <div className="flex flex-col">
            <Link className="text-lg font-semibold text-gray-200" to={`/r/${order.restaurant.slug}`}>
              {order.restaurant.name}
            </Link>
            <p className="text-sm text-gray-300">{order.restaurant.address}</p>
          </div>
        </div>
        <div className="flex items-center gap-4 whitespace-nowrap">
          <div className="flex items-center gap-2 text-center">
            <b className="text-gray-300">Total:</b>
            <p className="bg-pink-600 text-xs font-extrabold text-white rounded-full px-4 py-2 text-center">{order.total}</p>
          </div>

          <div className="w-fit">
            <button
              className="block w-16 h-16 disabled:cursor-not-allowed cursor-pointer mb-1 disabled:opacity-80 relative"
              disabled={isCancelledOrRejected}
              onClick={() =>
                showImage({
                  src: QRCodeGenerator(`${window.location.origin}/table-orders/${order.restaurant._id}/by/${order._id}`),
                  alt: `Código QR del restaurante ${order.restaurant.name}`,
                  imageHeight: 220,
                  imageWidth: 220,
                })
              }
            >
              <img
                src={QRCodeGenerator(`${window.location.origin}/table-orders/${order.restaurant._id}/by/${order._id}`)}
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
              className="flex items-center justify-center w-full text-center text-sm px-3 py-1 disabled:cursor-not-allowed disabled:border-gray-600 disabled:text-gray-600 disabled:bg-gray-600 disabled:bg-opacity-10 disabled:hover:bg-opacity-10 bg-pink-600 text-pink-600 border border-pink-600 bg-opacity-10 border-opacity-40 hover:bg-opacity-20 transition-all duration-300"
              onClick={() =>
                downloadFile(
                  QRCodeGenerator(`${window.location.origin}/table-orders/${order.restaurant._id}/by/${order._id}`),
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

      <div className="bg-zinc-800 bg-opacity-80 px-4 py-3 flex items-center gap-4 justify-between border-b border-zinc-700 border-opacity-50 overflow-auto whitespace-nowrap">
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
          {order.paymentStatus === 'PENDING' && order.status === 'READY' && (
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

          {order.status === 'EMITTED' && (
            <button
              type="button"
              className="text-center min-w-[100px] text-sm transition-colors duration-300 rounded-md px-2 py-1 font-semibold bg-gray-300 text-gray-400 border border-gray-400 bg-opacity-10 border-opacity-40 hover:bg-opacity-20"
              onClick={handleCancelOrder}
              disabled={loadingCancel}
            >
              {loadingCancel ? 'Cancelando...' : 'Cancelar Pedido'}
            </button>
          )}

          <Link
            to={`/table-orders/${order.restaurant._id}/by/${order._id}`}
            className="text-center min-w-[100px] text-sm transition-colors duration-300 rounded-md px-2 py-1 font-semibold bg-pink-300 text-pink-400 border border-pink-400 bg-opacity-10 border-opacity-40 hover:bg-opacity-20"
          >
            Visualizar
          </Link>
        </div>
      </div>

      {order.items.map((item) => (
        <OrderRestaurantItem key={item._id} order={item} />
      ))}
    </div>
  );
};

export default TableOrderRestaurant;
