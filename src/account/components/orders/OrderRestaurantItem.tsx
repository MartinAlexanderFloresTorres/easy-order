import { OrderItem } from '@/account/interfaces';

interface OrderRestaurantItemProps {
  order: OrderItem;
}
const OrderRestaurantItem = ({ order }: OrderRestaurantItemProps) => {
  return (
    <div key={order._id} className="px-4 py-3 flex items-center justify-between animate-fade-in">
      <div className="flex items-center gap-4">
        <div className="relative w-16 h-16">
          <img src={order.menu.images[0].secure_url} alt={order.menu.name} className="w-full h-full rounded-full object-cover" />
          <span className="absolute -top-[5px] -right-[5px] bg-pink-600 text-xs font-extrabold text-white rounded-full w-[30px] h-[30px] flex items-center justify-center">
            {order.quantity}
          </span>
        </div>
        <div>
          <h4 className="text-base font-semibold text-gray-300 line-clamp-1">{order.menu.name}</h4>
          <div className="grid grid-cols-3 gap-8 items-center">
            <div className="flex items-center gap-2">
              <p className="text-lg text-gray-200">S/. {order.price}</p>
              {order.discount > 0 && <p className="-translate-y-1 text-xs px-3 py-[2px] bg-pink-600 text-white rounded-md">-{order.discount}</p>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderRestaurantItem;
