import { useState } from 'react';
import Swal from 'sweetalert2';
import toast from 'react-hot-toast';
import ClientAxios from '@/config/ClientAxios';
import { Cart } from '@/cart/interfaces';
import { ErrorMessage } from '@/shared/interfaces';

const useGenerateOrder = () => {
  const [loadingOrder, setLoadingOrder] = useState(false);

  const generateOrder = async (
    cart: Cart,
    {
      address,
      latitude,
      longitude,
    }: {
      address: string;
      latitude: number;
      longitude: number;
    },
  ) => {
    try {
      setLoadingOrder(true);
      const order = {
        restaurantId: cart.restaurant.id,
        coupon: cart.coupon,
        discount: cart.discount,
        total: cart.total,
        subTotal: cart.subtotal,
        items: cart.items.map((item) => ({
          menuId: item.id,
          restaurantId: item.restaurant.id,
          price: item.price,
          quantity: item.quantity,
          stock: item.stock,
          total: item.total,
        })),
        address,
        latitude,
        longitude,
      };

      await ClientAxios.post('/order', order, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('jwt')}`,
        },
      });
      Swal.fire({
        title: 'Orden generada correctamente',
        icon: 'success',
        confirmButtonText: 'Entendido',
      });
    } catch (error) {
      console.log(error);
      const { response } = error as ErrorMessage;
      toast.error(response.data.message);
    } finally {
      setLoadingOrder(false);
    }
  };

  const generateTableOrder = async (cart: Cart) => {
    try {
      setLoadingOrder(true);
      const order = {
        restaurantId: cart.restaurant.id,
        coupon: cart.coupon,
        discount: cart.discount,
        total: cart.total,
        subTotal: cart.subtotal,
        items: cart.items.map((item) => ({
          menuId: item.id,
          restaurantId: item.restaurant.id,
          price: item.price,
          quantity: item.quantity,
          stock: item.stock,
          total: item.total,
        })),
      };

      await ClientAxios.post<{
        restaurantId: string;
        orderId: string;
      }>('/table-order', order, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('jwt')}`,
        },
      });
      Swal.fire({
        title: 'Orden generado correctamente',
        icon: 'success',
        confirmButtonText: 'Entendido',
      });
    } catch (error) {
      console.log(error);
      const { response } = error as ErrorMessage;
      toast.error(response.data.message);
    } finally {
      setLoadingOrder(false);
    }
  };

  const cancelOrder = async (id: string) => {
    setLoadingOrder(true);
    const { data } = await ClientAxios.put(
      `/order/${id}/cancel`,
      {},
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('jwt')}`,
        },
      },
    );
    console.log(data);
    setLoadingOrder(false);
  };

  return {
    loadingOrder,
    generateOrder,
    generateTableOrder,
    cancelOrder,
  };
};

export default useGenerateOrder;
