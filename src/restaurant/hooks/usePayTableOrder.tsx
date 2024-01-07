import { useState } from 'react';
import toast from 'react-hot-toast';
import Swal from 'sweetalert2';
import ClientAxios from '@/config/ClientAxios';
import { ErrorMessage } from '@/shared/interfaces';
import { TableOrderStatus, PaymentStatus } from '@/restaurant/types';

const usePayTableOrder = () => {
  const [loadingPayOrder, setLoadingPayOrder] = useState(false);
  const [isPayOrder, setIsPayOrder] = useState(false);

  const payOrder = async (
    restaurantId: string,
    orderId: string,
  ): Promise<{
    status: TableOrderStatus;
    paymentStatus: PaymentStatus;
  } | null> => {
    const { isConfirmed } = await Swal.fire({
      title: '¿Estás seguro?',
      text: '¿Estás seguro que deseas pagar la orden?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Si, pagar',
      cancelButtonText: 'No, cancelar',
    });

    if (!isConfirmed) return null;

    setLoadingPayOrder(true);
    try {
      const { data } = await ClientAxios.patch<{
        message: string;
        status: TableOrderStatus;
        paymentStatus: PaymentStatus;
      }>(
        `/table-order/pay/${restaurantId}/by/${orderId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('jwt')}`,
          },
        },
      );
      console.log(data);
      setIsPayOrder(true);
      toast.success(data.message);
      return {
        status: data.status,
        paymentStatus: data.paymentStatus,
      };
    } catch (error) {
      console.log(error);
      const { response } = error as ErrorMessage;
      toast.error(response.data.message);
      return null;
    } finally {
      setLoadingPayOrder(false);
    }
  };

  return { loadingPayOrder, payOrder, isPayOrder };
};

export default usePayTableOrder;
