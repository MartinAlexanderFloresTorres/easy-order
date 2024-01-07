import { useContext } from 'react';
import { CartContext } from '@/cart/providers/CartProvider';

const useCart = () => {
  return useContext(CartContext);
};

export default useCart;
