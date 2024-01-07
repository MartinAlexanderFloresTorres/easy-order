import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Ticket, Trash2, X } from 'lucide-react';
import useApplyCoupon from '@/cart/hooks/useApplyCoupon';
import { Cart, Coupon } from '@/cart/interfaces';
import useAccount from '@/account/hooks/useAccount';
import toast from 'react-hot-toast';

interface AddCouponProps {
  onCouponChange: (coupon: Coupon | null) => void;
  cart: Cart;
}
const AddCoupon = ({ cart, onCouponChange }: AddCouponProps) => {
  const [couponCode, setCouponCode] = useState(cart.coupon?.code || '');
  const [showCouponInput, setShowCouponInput] = useState(false);

  const { authenticated } = useAccount();
  const { loadingCoupon, handleApplyCoupon } = useApplyCoupon();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const handleCouponCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCouponCode(e.target.value.toUpperCase());
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (loadingCoupon) return;
    if (!authenticated) return toast.error('Debes iniciar sesión para aplicar un cupón');
    if (couponCode.length === 0) return toast.error('Debes ingresar un código de cupón');
    if (couponCode.length < 6) return toast.error('El código del cupón debe tener al menos 6 caracteres');
    if (cart.coupon) return toast.error('Ya tienes un cupón aplicado');

    handleApplyCoupon(couponCode, cart.restaurant.id, (coupon) => {
      onCouponChange(coupon);
      setShowCouponInput(false);
      setCouponCode('');
    });
  };

  if (cart.coupon) {
    return (
      <div className="animate-fade-in flex gap-2 items-center">
        <div className="relative flex items-center gap-2 whitespace-nowrap px-3 py-2  bg-pink-900 bg-opacity-50 rounded-md font-semibold">
          <Ticket size={20} />

          <span className="text-pink-400 text-sm">{cart.coupon.code}</span>

          <div className="absolute -top-6 -left-3 flex items-center justify-center w-[35px] h-[35px] bg-pink-600 rounded-full">
            <span className="text-white text-xs">-{cart.coupon.discount}%</span>
          </div>
        </div>
        <button className="text-pink-500 hover:text-pink-600 transition-all duration-300 text-sm" onClick={() => onCouponChange(null)}>
          <Trash2 size={20} />
        </button>
      </div>
    );
  }

  return (
    <div>
      {!showCouponInput && (
        <button
          className="animate-fade-in whitespace-nowrap px-6 py-3 bg-pink-600 hover:bg-pink-700 transition-all duration-300 rounded-md font-semibold"
          onClick={() => setShowCouponInput(!showCouponInput)}
        >
          ¿Tienes un cupón?
        </button>
      )}

      {showCouponInput && (
        <form onSubmit={handleSubmit} className="animate-fade-in flex gap-2 items-center w-full sm:w-fit">
          <input
            type="text"
            className="w-full md:w-fit px-4 py-2 border bg-transparent border-zinc-600 disabled:cursor-not-allowed"
            placeholder="Código del cupón"
            disabled={loadingCoupon || cart.coupon || !authenticated}
            value={couponCode.toUpperCase()}
            onChange={handleCouponCodeChange}
          />
          {authenticated ? (
            <button
              className="cursor-pointer disabled:cursor-not-allowed whitespace-nowrap px-6 py-3 bg-pink-600 disabled:bg-opacity-50 disabled:hover:bg-opacity-50 disabled:hover:bg-pink-600 hover:bg-pink-700 transition-all duration-300 rounded-md font-semibold"
              type="submit"
              disabled={loadingCoupon || couponCode.length === 0}
            >
              Aplicar
            </button>
          ) : (
            <button
              className="cursor-pointer disabled:cursor-not-allowed whitespace-nowrap px-6 py-3 bg-pink-600 disabled:bg-opacity-50 disabled:hover:bg-opacity-50 disabled:hover:bg-pink-600 hover:bg-pink-700 transition-all duration-300 rounded-md font-semibold"
              onClick={() => navigate('/auth/login', { state: { from: pathname } })}
            >
              Inicia sesión
            </button>
          )}
          <button
            className="whitespace-nowrap px-3 py-3 text-pink-500 hover:text-opacity-80 transition-all duration-300 rounded-md font-semibold"
            onClick={() => setShowCouponInput(!showCouponInput)}
          >
            <X size={26} />
          </button>
        </form>
      )}
    </div>
  );
};

export default AddCoupon;
