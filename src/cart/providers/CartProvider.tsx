import { createContext, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import Swal from 'sweetalert2';
import { Cart, CartItem } from '@/cart/interfaces';

interface CartContextProps {
  carts: Cart[];
  removeCart: (cart: Cart) => void;
  addItemsCart: (item: CartItem) => void;
  removeItemsCart: (item: CartItem) => void;
  updateCart: (cart: Cart) => void;
  clearCart: (showConfirmed?: boolean) => void;
  getItemLength: (restaurantId: string, itemId: string) => number;
  generatedOrder: () => void;
  changeOrder: number;

  openModalTableOrder: (cart: Cart) => void;
  closeModalTableOrder: () => void;
  updateTableOrder: (cart: Cart) => void;
  clearTableOrder: () => void;
  showModalTableOrder: boolean;
  tableOrder: Cart | null;
}
export const CartContext = createContext<CartContextProps>({
  carts: [],
  removeCart: () => {},
  addItemsCart: () => {},
  removeItemsCart: () => {},
  updateCart: () => {},
  clearCart: () => {},
  getItemLength: () => 0,
  generatedOrder: () => {},
  changeOrder: 0,

  openModalTableOrder: () => {},
  closeModalTableOrder: () => {},
  updateTableOrder: () => {},
  clearTableOrder: () => {},
  showModalTableOrder: false,
  tableOrder: null,
});

interface CartProviderProps {
  children: React.ReactNode;
}
const CartProvider = ({ children }: CartProviderProps) => {
  const [carts, setCarts] = useState<Cart[]>([]);
  const [changeOrder, setChangeOrder] = useState(0);
  const [showModalTableOrder, setshowModalTableOrder] = useState(false);
  const [tableOrder, setTableOrder] = useState<Cart | null>(null);

  useEffect(() => {
    const carts = localStorage.getItem('carts');
    if (carts) {
      setCarts(JSON.parse(carts));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('carts', JSON.stringify(carts));
  }, [carts]);

  const openModalTableOrder = (cart: Cart) => {
    setshowModalTableOrder(true);
    setTableOrder(cart);
  };

  const closeModalTableOrder = () => {
    setshowModalTableOrder(false);
    setTableOrder(null);
  };

  const clearTableOrder = async () => {
    const { isConfirmed } = await Swal.fire({
      text: '¿Estás seguro de limpiar este menu?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, limpiar',
      cancelButtonText: 'Cancelar',
    });

    if (!isConfirmed) return;
    setTableOrder(null);
  };

  const updateTableOrder = (cart: Cart) => {
    const newCart = { ...cart };
    newCart.discount = cart.coupon ? Math.round(cart.total * (cart.coupon.discount / 100)) : 0;
    newCart.total = calculateTotal(newCart);
    newCart.subtotal = calculateSubtotal(newCart);

    console.log(newCart);

    setTableOrder(newCart);
  };

  const generatedOrder = async () => {
    setChangeOrder(changeOrder + 1);
  };

  const removeCart = async (cart: Cart) => {
    const { isConfirmed } = await Swal.fire({
      text: '¿Estás seguro de eliminar los menus de este restaurante?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, eliminar',
      cancelButtonText: 'Cancelar',
    });

    if (!isConfirmed) return;

    const newCarts = carts.filter((c) => c.cartId !== cart.cartId);
    setCarts(newCarts.map((c) => ({ ...c, total: calculateTotal(c), subtotal: calculateSubtotal(c) })));
  };

  const calculateTotal = (cart: Cart) => {
    const total = cart.items.reduce((acc, item) => Math.round(acc + item.price * item.quantity), 0);
    return Math.round(total - (cart.coupon ? cart.discount : 0));
  };

  const calculateSubtotal = (cart: Cart) => {
    const subtotal = cart.items.reduce((acc, item) => Math.round(acc + item.price * item.quantity), 0);
    return Math.round(subtotal);
  };

  const addItemsCart = (item: CartItem) => {
    const indexCart = carts.findIndex((c) => c.restaurant.id === item.restaurant.id);

    // Existe un carrito con el mismo restaurante
    if (indexCart !== -1) {
      // Existe un item con el mismo id
      const existItem = carts[indexCart].items.find((i) => i.id === item.id);

      if (existItem) {
        const ifStock = existItem.quantity === existItem.stock;
        if (ifStock) {
          Swal.fire({
            title: 'No hay más stock disponible por el dia de hoy',
            icon: 'warning',
            confirmButtonText: 'Entendido',
          });
          return;
        }

        const newCart: Cart = {
          ...carts[indexCart],
          items: carts[indexCart].items.map((i) => {
            if (i.id === item.id) {
              if (i.quantity === i.stock) return i;
              return {
                ...item,
                quantity: i.quantity + 1,
              };
            }
            return i;
          }),
          /*     total: calculateTotal(carts[indexCart]),
          subtotal: calculateSubtotal(carts[indexCart]), */
        };

        updateCart(newCart);
        toast.success('Se agregó un nuevo item al carrito');
      } else {
        const newCart: Cart = {
          ...carts[indexCart],
          items: [...carts[indexCart].items, item],
          total: calculateTotal(carts[indexCart]),
        };

        updateCart(newCart);
        toast.success('Se agregó un nuevo item al carrito');
      }
    } else {
      const newCart: Cart = {
        cartId: Math.random().toString(),
        restaurant: item.restaurant,
        items: [item],
        coupon: null,
        discount: 0,
        total: item.price,
        subtotal: item.price,
      };

      setCarts([...carts, newCart]);
      toast.success('Se agregó un nuevo item al carrito');
    }
  };

  const removeItemsCart = async (item: CartItem) => {
    const { isConfirmed } = await Swal.fire({
      text: '¿Estás seguro de eliminar este menu?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, eliminar',
      cancelButtonText: 'Cancelar',
    });

    if (!isConfirmed) return;

    const indexCart = carts.findIndex((c) => c.restaurant.id === item.restaurant.id);

    // Existe un restaurante en el carrito
    if (indexCart !== -1) {
      const newCard = carts[indexCart];
      newCard.items = newCard.items.filter((i) => i.id !== item.id);
      newCard.total = calculateTotal(newCard);
      newCard.subtotal = calculateSubtotal(newCard);
      newCard.items.length > 0 ? updateCart(newCard) : removeCart(newCard);
    }
  };

  const updateCart = (cart: Cart) => {
    const newCarts = carts.map((c) => {
      if (c.cartId === cart.cartId) {
        // Calcular coupon
        if (cart.coupon) {
          const discount = Math.round(cart.total * (cart.coupon.discount / 100));
          cart.discount = discount;
          cart.total = calculateTotal(cart);
          cart.subtotal = calculateSubtotal(cart);
        } else {
          cart.discount = 0;
          cart.total = calculateTotal(cart);
          cart.subtotal = calculateSubtotal(cart);
        }

        return cart;
      }
      return c;
    });
    setCarts(newCarts);
  };

  const clearCart = async (showConfirmed: boolean = true) => {
    if (showConfirmed) {
      const { isConfirmed } = await Swal.fire({
        text: '¿Estás seguro de limpiar el carrito?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Si, limpiar',
        cancelButtonText: 'Cancelar',
      });

      if (!isConfirmed) return;
    }
    setCarts([]);
  };

  const getItemLength = (restaurantId: string, itemId: string) => {
    const indexCart = carts.findIndex((c) => c.restaurant.id === restaurantId);

    if (indexCart !== -1) {
      const item = carts[indexCart].items.find((i) => i.id === itemId);

      if (item) {
        return item.quantity;
      }
    }

    return 0;
  };

  return (
    <CartContext.Provider
      value={{
        generatedOrder,
        changeOrder,
        carts,
        getItemLength,
        removeCart,
        addItemsCart,
        removeItemsCart,
        updateCart,
        clearCart,

        openModalTableOrder,
        closeModalTableOrder,
        updateTableOrder,
        clearTableOrder,
        showModalTableOrder,
        tableOrder,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
