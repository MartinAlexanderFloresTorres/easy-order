import { OrderByRestaurantItem } from '@/restaurant/interfaces';

interface OrderItemProps {
  order: OrderByRestaurantItem;
}

const OrderItem = ({ order }: OrderItemProps) => {
  return (
    <div className="px-4 py-3 flex items-center justify-between animate-fade-in">
      <div className="flex items-center gap-4">
        <div className="relative w-16 h-16">
          <img src={order.menu.images[0].secure_url} alt={order.menu.name} className="w-full h-full rounded-full object-cover" />
          <span className="absolute top-0 right-0 bg-pink-600 text-xs font-extrabold text-white rounded-full w-[30px] h-[30px] flex items-center justify-center">
            {order.quantity}
          </span>
        </div>
        <div>
          <h4 className="text-lg font-semibold text-gray-300 line-clamp-1">{order.menu.name}</h4>
          <div className="grid grid-cols-3 gap-8 items-center">
            <div className="flex items-center gap-2">
              <p className="text-xl text-gray-200">S/. {order.price}</p>
              <p className="text-sm line-through text-gray-500">S/. {order.price}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderItem;
