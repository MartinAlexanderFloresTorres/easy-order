import { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import { Ban, Download, QrCode, Ticket, X } from 'lucide-react';
import { twMerge } from 'tailwind-merge';
import ClientAxios from '@/config/ClientAxios';
import useAccount from '@/account/hooks/useAccount';
import { ErrorMessage } from '@/shared/interfaces';
import { OrderPayment } from '@/restaurant/interfaces';
import { downloadFile, formatDate, formatTime, isOpenOrClosed, showImage } from '@/shared/helpers';
import Spinner from '@/shared/components/Spinner';
import usePayOrder from '@/restaurant/hooks/usePayOrder';
import Modal from '@/shared/components/Modal';
import { QRCodeGenerator } from '@/helpers';
import TraceMap from '../components/TraceMap';

let timer: NodeJS.Timeout | null = null;

const OrderPaymentPage = () => {
  const [loading, setLoading] = useState(true);
  const [order, setOrder] = useState<OrderPayment | null>(null);
  const [showDetails, setShowDetails] = useState(false);
  const [isClose, setIsClose] = useState(false);

  const { authenticated, loadingAuthenticate, user } = useAccount();
  const { restaurantId, orderId } = useParams();
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const { loadingPayOrder, payOrder } = usePayOrder();

  useEffect(() => {
    if (!authenticated) return setLoading(false);

    (async () => {
      try {
        const { data } = await ClientAxios.get<OrderPayment>(`/order/${restaurantId}/by/${orderId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('jwt')}`,
          },
        });
        console.log(data);

        setOrder(data);
        setLoading(false);
      } catch (error) {
        console.log(error);
        const { response } = error as ErrorMessage;
        toast.error(response.data.message);
        navigate('/');
      }
    })();
  }, [restaurantId, orderId, navigate, authenticated]);

  const onCloseModal = () => {
    if (timer) clearTimeout(timer);

    if (isClose) {
      handleShowDetails();
      setIsClose(false);
      return;
    }

    setIsClose(true);
    timer = setTimeout(() => {
      handleShowDetails();
      setIsClose(false);
    }, 200);
  };

  const handlePayOrder = async () => {
    if (!order) return;

    const data = await payOrder(order.restaurant._id, order._id);
    if (!data) return;

    setOrder((prev) => {
      if (!prev) return prev;

      return {
        ...prev,
        status: data.status,
        paymentStatus: data.paymentStatus,
      };
    });
  };

  const handleShowDetails = () => setShowDetails((prev) => !prev);

  if (loading || loadingAuthenticate) {
    return (
      <div className="p-6">
        <Spinner className="mx-auto" />
      </div>
    );
  }

  if (!authenticated) {
    setTimeout(() => {
      navigate('/auth/login', { state: { from: pathname } });
    }, 0);
    return null;
  }

  if (!order) return;

  const isCancelledOrRejected = order.status === 'CANCELLED' || order.status === 'REJECTED';

  return (
    <>
      <div className="container mx-auto p-6 animate-fade-in">
        <div className="relative flex flex-col gap-4 w-full mb-10">
          <img
            src={order.restaurant.logo.secure_url}
            className="cursor-pointer border-4 mx-auto border-zinc-800 w-[180px] min-w-[180px] h-[180px] min-h-[180px] rounded-full"
            alt={order.restaurant.name}
            onClick={() =>
              showImage({
                src: order.restaurant.logo.secure_url,
                alt: order.restaurant.name,
                imageHeight: 220,
                imageWidth: 220,
              })
            }
          />

          {isOpenOrClosed(order.restaurant.openingHours, order.restaurant.closingTime) ? (
            <div className=" w-fit mx-auto -mt-8 bg-green-500 text-xs font-extrabold text-white rounded-full px-4 py-2 flex items-center justify-center">
              <span>Abierto</span>
            </div>
          ) : (
            <div className=" w-fit mx-auto -mt-8 bg-red-500 text-xs font-extrabold text-white rounded-full px-4 py-2 flex items-center justify-center">
              <span>Cerrado</span>
            </div>
          )}

          <div className="text-center">
            <h1 className="text-2xl font-bold">{order.restaurant.name}</h1>
            <p className="text-zinc-400">{order.restaurant.address}</p>
          </div>
        </div>

        {order.coupon && (
          <div className="w-fit -mb-4 z-10 relative flex items-center gap-2 whitespace-nowrap px-3 py-2  bg-pink-900 bg-opacity-60 backdrop-blur-3xl rounded-md font-semibold">
            <Ticket size={20} />

            <span className="text-pink-400 text-sm">{order.coupon.code}</span>
          </div>
        )}

        <div className="rounded-md bg-zinc-800 bg-opacity-80 border border-zinc-700 border-opacity-50">
          <div className="relative bg-zinc-800 bg-opacity-80 px-4 py-3 flex items-center justify-between border-b border-zinc-700 border-opacity-50">
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

            <div className="w-fit flex items-center gap-4">
              <div className="w-fit">
                <button
                  className="block w-16 h-16 disabled:cursor-not-allowed cursor-pointer mb-1 disabled:opacity-80 relative"
                  disabled={isCancelledOrRejected}
                  onClick={() =>
                    showImage({
                      src: QRCodeGenerator(`${window.location.origin}/order/${order.restaurant._id}/by/${order._id}`),
                      alt: `Código QR del restaurante ${order.restaurant.name}`,
                      imageHeight: 220,
                      imageWidth: 220,
                    })
                  }
                >
                  <img src={QRCodeGenerator(`${window.location.origin}/order/${order.restaurant._id}/by/${order._id}`)} alt={`Código QR del restaurante ${order.restaurant.name}`} className="w-full h-full object-contain" />
                  {isCancelledOrRejected && (
                    <div className="absolute inset-0 bg-black backdrop-blur-[1.2px] bg-opacity-50 flex items-center justify-center">
                      <Ban strokeWidth={2} size={30} className="text-red-500" />
                    </div>
                  )}
                </button>
                <button className=" flex items-center justify-center w-full text-center text-sm px-3 py-1 disabled:cursor-not-allowed disabled:border-gray-600 disabled:text-gray-600 disabled:bg-gray-600 disabled:bg-opacity-10 disabled:hover:bg-opacity-10 bg-pink-600 text-pink-600 border border-pink-600 bg-opacity-10 border-opacity-40 hover:bg-opacity-20 transition-all duration-300" onClick={() => downloadFile(QRCodeGenerator(`${window.location.origin}/order/${order.restaurant._id}/by/${order._id}`), `qr orden ${order.restaurant.name}`)} disabled={isCancelledOrRejected}>
                  <Download size={16} />
                </button>
              </div>
            </div>

            {order.coupon && (
              <div className="absolute -top-3 -right-3 flex items-center justify-center w-[35px] h-[35px] bg-pink-600 rounded-full">
                <span className="text-white text-xs">-{order.coupon.discount}%</span>
              </div>
            )}
          </div>
          <div className="border-b border-zinc-700 border-opacity-50">
            {order.items.map((item) => (
              <div key={item._id} className="px-4 py-3 flex items-center justify-between whitespace-nowrap">
                <div className="flex items-center gap-4">
                  <div className="relative w-16 h-16">
                    <img src={item.menu.images[0].secure_url} alt={item.menu.name} className="w-full h-full rounded-full object-cover" />
                    <span className="absolute -top-[5px] -right-[5px] bg-pink-600 text-xs font-extrabold text-white rounded-full w-[30px] h-[30px] flex items-center justify-center">{item.quantity}</span>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-gray-300 line-clamp-1">{item.menu.name}</h4>
                    <div className="grid grid-cols-3 gap-8 items-center">
                      <div className="flex items-center gap-2">
                        <p className="text-xl text-gray-200">S/. {item.price}</p>
                        {item.discount > 0 && <p className="-translate-y-1 text-xs px-3 py-[2px] bg-pink-600 text-white rounded-md">-{item.discount}</p>}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="rounded-md whitespace-nowrap overflow-auto bg-zinc-800 bg-opacity-80 border-b border-zinc-700 border-opacity-50">
            <div className="w-full px-4 py-3 flex flex-col md:flex-row gap-4 items-center justify-center md:justify-between">
              <div className="flex items-stretch justify-end gap-2">
                {order.paymentStatus === 'PENDING' && (order.status === 'READY' || order.status === 'SENDING') && <div className="flex flex-col items-center justify-center text-center min-w-[100px] text-sm transition-colors duration-300 rounded-md px-4 py-1 font-semibold bg-yellow-500 text-yellow-500 border border-yellow-500 bg-opacity-10 border-opacity-40">Pago Pendiente</div>}

                {order.paymentStatus === 'PAID' && <div className="flex flex-col items-center justify-center text-center min-w-[100px] text-sm transition-colors duration-300 rounded-md px-4 py-1 font-semibold bg-green-500 text-green-500 border border-green-500 bg-opacity-10 border-opacity-40">Pagado</div>}

                {order.paymentStatus === 'CANCELLED' && <div className="flex flex-col items-center justify-center text-center min-w-[100px] text-sm transition-colors duration-300 rounded-md px-4 py-1 font-semibold bg-red-500 text-red-500 border border-red-500 bg-opacity-10 border-opacity-40">Pago Cancelado</div>}

                {order.status === 'PREPARING' && (
                  <div className="flex flex-col items-center justify-center text-center min-w-[100px] text-sm transition-colors duration-300 rounded-md px-4 py-1 font-semibold bg-blue-500 text-blue-500 border border-blue-500 bg-opacity-10 border-opacity-40 hover:bg-opacity-20">
                    Preparando
                    <div className="text-xs text-gray-400">Tiempo estimado: 20 min</div>
                  </div>
                )}

                {order.status === 'EMITTED' && <div className="flex flex-col items-center justify-center text-center min-w-[100px] text-sm transition-colors duration-300 rounded-md px-4 py-1 font-semibold bg-blue-500 text-blue-500 border border-blue-500 bg-opacity-10 border-opacity-40 hover:bg-opacity-20">Emitido</div>}
                {order.status === 'READY' && <div className="flex flex-col items-center justify-center text-center min-w-[100px] text-sm transition-colors duration-300 rounded-md px-4 py-1 font-semibold bg-blue-500 text-blue-500 border border-blue-500 bg-opacity-10 border-opacity-40 hover:bg-opacity-20">Orden lista</div>}

                {order.status === 'DELIVERED' && <div className="flex flex-col items-center justify-center text-center min-w-[100px] text-sm transition-colors duration-300 rounded-md px-4 py-1 font-semibold bg-blue-500 text-blue-500 border border-blue-500 bg-opacity-10 border-opacity-40 hover:bg-opacity-20">Entregado</div>}

                {order.status === 'CANCELLED' && <div className="flex flex-col items-center justify-center text-center min-w-[100px] text-sm transition-colors duration-300 rounded-md px-4 py-1 font-semibold bg-red-500 text-red-500 borde bg-opacity-10">Cancelado</div>}

                {order.status === 'REJECTED' && <div className="flex flex-col items-center justify-center text-center min-w-[100px] text-sm transition-colors duration-300 rounded-md px-4 py-1 font-semibold bg-red-500 text-red-500 border border-red-500 bg-opacity-10 border-opacity-40 hover:bg-opacity-20">Rechazado</div>}

                {order.status === 'CONFIRMED' && <div className="flex flex-col items-center justify-center text-center min-w-[100px] text-sm transition-colors duration-300 rounded-md px-3 py-1 font-semibold bg-green-600 text-green-600 border border-green-600 bg-opacity-10 border-opacity-40 hover:bg-opacity-20">Orden tomada</div>}

                {order.status === 'COMPLETED' && <div className="flex flex-col items-center justify-center text-center min-w-[100px] text-sm transition-colors duration-300 rounded-md px-3 py-1 font-semibold bg-pink-600 text-pink-600 border border-pink-600 bg-opacity-10 border-opacity-40 hover:bg-opacity-20">Completado</div>}

                {order.status === 'SENDING' && (
                  <div className="flex flex-col items-center justify-center text-center min-w-[100px] text-sm transition-colors duration-300 rounded-md px-4 py-1 font-semibold bg-blue-500 text-blue-500 border border-blue-500 bg-opacity-10 border-opacity-40 hover:bg-opacity-20">
                    En camino
                    <div className="text-xs text-gray-400">Tiempo estimado: 10 min</div>
                  </div>
                )}
              </div>

              <div className="flex items-center gap-4 flex-col md:flex-row">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2 text-center">
                    <b className="text-gray-400">Sub Total:</b>
                    <p className={twMerge('bg-zinc-700 text-sm font-extrabold text-zinc-300 rounded-full px-4 py-2 text-center', order.coupon && 'line-through')}>S/. {order.subTotal}</p>
                  </div>
                  <div className="flex items-center gap-2 text-center">
                    <b className="text-gray-100">Total:</b>
                    <p className="bg-pink-600 text-sm font-extrabold text-white rounded-full px-4 py-2 text-center">S/. {order.total}</p>
                  </div>
                </div>
                {user && user.restaurant && user.restaurant._id === order.restaurant._id && (
                  <>
                    {order.paymentStatus === 'PENDING' && (order.status === 'READY' || order.status === 'SENDING') && (
                      <button type="button" className="sm:w-fit w-full text-center min-w-[100px] text-sm transition-colors duration-300 rounded-md px-3 py-2 font-semibold bg-pink-600 text-pink-600 border border-pink-600 bg-opacity-10 border-opacity-40 hover:bg-opacity-20" onClick={handlePayOrder} disabled={loadingPayOrder}>
                        {loadingPayOrder ? 'Pagando...' : 'Pagar'}
                      </button>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>

          <div className="w-full rounded-md whitespace-nowrap flex gap-4 justify-end items-center p-4 bg-zinc-800 bg-opacity-80">
            <button type="button" className="text-center min-w-[70px] text-sm transition-colors duration-300 rounded-md px-3 py-2 font-semibold bg-gray-400 text-gray-400 border border-gray-400 bg-opacity-10 border-opacity-40 hover:bg-opacity-20" onClick={() => navigate(-1)}>
              Volver
            </button>
            <button type="button" className="text-center min-w-[70px] text-sm transition-colors duration-300 rounded-md px-3 py-2 font-semibold bg-pink-600 text-pink-600 border border-pink-600 bg-opacity-10 border-opacity-40 hover:bg-opacity-20" onClick={handleShowDetails}>
              Mostrar detalles
            </button>
          </div>
        </div>

        {/* MAPA */}
        <TraceMap deliveryAddress={order.shippingAddress} lat={order.latitude} lng={order.longitude} restaurant={order.restaurant} />
      </div>

      {showDetails && (
        <Modal isClose={isClose} onClose={onCloseModal} className="bg-black bg-opacity-50 backdrop-blur-sm">
          <Modal.Overlay onClose={onCloseModal} className="p-4">
            <div className="max-w-2xl mx-auto bg-zinc-800 px-10 py-2 border border-b-0 border-zinc-700 border-opacity-50 w-full flex items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <img src={order.restaurant.logo.secure_url} alt={order.restaurant.name} className="w-16 h-16 rounded-full object-cover" />
                <div className="flex text-left flex-col">
                  <h4 className="text-lg font-semibold text-gray-200">{order.restaurant.name}</h4>
                  <p className="text-sm text-gray-300">{order.restaurant.address}</p>
                </div>
              </div>

              <button type="button" className="text-gray-300 hover:text-gray-100 transition-colors duration-300" onClick={onCloseModal}>
                <X />
              </button>
            </div>
            <div className="max-w-2xl w-full mx-auto overflow-auto bg-zinc-800 px-10 py-8 border border-zinc-700 border-opacity-50">
              <div className="flex flex-col gap-4 whitespace-nowrap">
                <div className="text-left">
                  <p className="text-lg font-semibold text-gray-100">Datos</p>
                </div>
                <div className="overflow-auto w-full text-gray-300 border border-zinc-700 border-opacity-50">
                  <table className="table-auto w-full">
                    <tbody>
                      <tr>
                        <td className="px-3 py-2 text-sm text-left font-bold border-b border-r border-zinc-700 border-opacity-50 text-gray-300">FECHA</td>
                        <td className="px-3 py-2 text-left border-b border-zinc-700 border-opacity-50 text-gray-300 text-base">{formatDate(order.createdAt)}</td>
                      </tr>
                      <tr>
                        <td className="px-3 py-2 text-sm text-left font-bold border-b border-r border-zinc-700 border-opacity-50 text-gray-300">HORA</td>
                        <td className="px-3 py-2 text-left border-b border-zinc-700 border-opacity-50 text-gray-300 text-base">{formatTime(order.createdAt)}</td>
                      </tr>
                      <tr>
                        <td className="px-3 py-2 text-sm text-left font-bold border-b border-r border-zinc-700 border-opacity-50 text-gray-300">Nombre</td>
                        <td className="px-3 py-2 text-left border-b border-zinc-700 border-opacity-50 text-gray-300 text-base">
                          {order.user.name} {order.user.lastname}
                        </td>
                      </tr>
                      <tr>
                        <td className="px-3 py-2 text-sm text-left font-bold border-b border-r border-zinc-700 border-opacity-50 text-gray-300">Telefono</td>
                        <td className="px-3 py-2 text-left border-b border-zinc-700 border-opacity-50 text-gray-300 text-base">{order.user.phone || 'No tiene'}</td>
                      </tr>
                      <tr>
                        <td className="px-3 py-2 text-sm text-left font-bold border-b border-r border-zinc-700 border-opacity-50 text-gray-300">Pais</td>
                        <td className="px-3 py-2 text-left border-b border-zinc-700 border-opacity-50 text-gray-300 text-base">{order.user.country}</td>
                      </tr>
                      <tr>
                        <td className="px-3 py-2 text-sm text-left font-bold border-b border-r border-zinc-700 border-opacity-50 text-gray-300">Ciudad</td>
                        <td className="px-3 py-2 text-left border-b border-zinc-700 border-opacity-50 text-gray-300 text-base">{order.user.city}</td>
                      </tr>
                      <tr>
                        <td className="px-3 py-2 text-sm text-left font-bold border-b border-r border-zinc-700 border-opacity-50 text-gray-300">Direccion</td>
                        <td className="px-3 py-2 text-left border-b border-zinc-700 border-opacity-50 text-gray-300 text-base">{order.shippingAddress}</td>
                      </tr>
                      <tr>
                        <td className="px-3 py-2 text-sm text-left font-bold border-r border-zinc-700 border-opacity-50 text-gray-300">Restaurante</td>
                        <td className="px-3 py-2 text-left text-gray-300 text-base">{order.restaurant.name}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div className="text-left">
                  <p className="text-lg font-semibold text-gray-100">Menus</p>
                </div>

                <div className="overflow-auto w-full text-gray-300 border border-zinc-700 border-opacity-50">
                  <table className="table-auto w-full">
                    <thead>
                      <tr>
                        <th className="px-3 py-2 text-sm text-center border-b border-r border-zinc-700 border-opacity-50 text-gray-300">Descripción</th>
                        <th className="px-3 py-2 text-sm text-center border-b border-r border-zinc-700 border-opacity-50 text-gray-300">Cantidad</th>
                        <th className="px-3 py-2 text-sm text-center border-b border-zinc-700 border-opacity-50 text-gray-300">Precio</th>
                      </tr>
                    </thead>
                    <tbody>
                      {order.items.map((item) => (
                        <tr key={item._id}>
                          <td className="px-3 py-2 text-left text-gray-300 text-base">{item.menu.name}</td>
                          <td className="px-3 py-2 text-center text-gray-300 text-base">{item.quantity}</td>
                          <td className="px-3 py-2 text-center text-gray-300 text-base">{item.price}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="text-left">
                  <p className="text-lg font-semibold text-gray-100">Importe</p>
                </div>

                <div className="overflow-auto w-full text-gray-300 border border-zinc-700 border-opacity-50">
                  <table className="table-auto w-full">
                    <tbody>
                      <tr>
                        <td className="px-3 py-2 text-sm text-left font-bold border-b border-r border-zinc-700 border-opacity-50 text-gray-300">Descuento</td>
                        <td className="px-3 py-2 text-left border-b border-zinc-700 border-opacity-50 text-gray-300 text-base">{order.discount}</td>
                      </tr>
                      <tr>
                        <td className="px-3 py-2 text-sm text-left font-bold border-b border-r border-zinc-700 border-opacity-50 text-gray-300">Costo envio</td>
                        <td className="px-3 py-2 text-left border-b border-zinc-700 border-opacity-50 text-gray-300 text-base">{order.shippingCost}</td>
                      </tr>
                      <tr>
                        <td className="px-3 py-2 text-sm text-left font-bold border-b border-r border-zinc-700 border-opacity-50 text-gray-300">SubTotal</td>
                        <td className="px-3 py-2 text-left border-b border-zinc-700 border-opacity-50 text-gray-300 text-base">{order.subTotal}</td>
                      </tr>
                      <tr>
                        <td className="px-3 py-2 text-sm text-left font-bold border-r border-zinc-700 border-opacity-50 text-gray-300">Total</td>
                        <td className="px-3 py-2 text-left text-gray-300 text-base">{order.total}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            <div className="max-w-2xl w-full mx-auto bg-zinc-800 px-10 py-2 border border-t-0 border-zinc-700 border-opacity-50 flex items-center justify-end gap-4">
              <button type="button" className="text-center min-w-[70px] text-sm transition-colors duration-300 rounded-md px-3 py-2 font-semibold bg-sky-600 text-sky-600 border border-sky-600 bg-opacity-10 border-opacity-40 hover:bg-opacity-20">
                Imprimir
              </button>
              <button type="button" className="text-center min-w-[70px] text-sm transition-colors duration-300 rounded-md px-3 py-2 font-semibold bg-pink-600 text-pink-600 border border-pink-600 bg-opacity-10 border-opacity-40 hover:bg-opacity-20" onClick={onCloseModal}>
                Cerrar
              </button>
            </div>
          </Modal.Overlay>
        </Modal>
      )}

      <button
        className="fixed bottom-2 right-2 z-10 animate-fade-in flex items-center gap-2 whitespace-nowrap py-2 px-4 text-xs uppercase text-center bg-[#732085] transition-colors duration-500 font-semibold text-white rounded-full"
        type="button"
        onClick={() =>
          showImage({
            src: '/img/QR.png',
            alt: 'Yape QR',
            imageWidth: 220,
          })
        }
      >
        <span>Yape</span>
        <QrCode size={20} />
      </button>
    </>
  );
};

export default OrderPaymentPage;
