import toast from 'react-hot-toast';
import { Trash, X } from 'lucide-react';
import useCart from '@/cart/hooks/useCart';
import Counter from '@/shared/components/Counter';
import AddCoupon from '@/cart/components/AddCoupon';
import { twMerge } from 'tailwind-merge';

interface CartListProps {
  showCoupon: boolean;
}

const CartList = ({ showCoupon }: CartListProps) => {
  const { carts, removeCart, removeItemsCart, updateCart } = useCart();

  return carts.map((cart) => (
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

      <div className="px-4 py-3 flex gap-4 items-center justify-end">
        <div className="flex items-center gap-4">
          {showCoupon && (
            <div className="flex items-center gap-2 text-center">
              <b className="text-gray-400">Sub Total:</b>
              <p
                className={twMerge(
                  'bg-zinc-700 text-sm font-extrabold text-zinc-300 rounded-full px-4 py-2 text-center',
                  cart.coupon && 'line-through',
                )}
              >
                S/. {cart.subtotal}
              </p>
            </div>
          )}
          <div className="flex items-center gap-2 text-center">
            <b className="text-gray-100">Total:</b>
            <p className="bg-pink-600 text-sm font-extrabold text-white rounded-full px-4 py-2 text-center">S/. {cart.total}</p>
          </div>
        </div>

        {showCoupon && (
          <AddCoupon
            cart={cart}
            onCouponChange={(coupon) => {
              updateCart({
                ...cart,
                coupon,
              });
            }}
          />
        )}
      </div>
    </div>
  ));
};

export default CartList;
