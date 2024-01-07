import ClientAxios from '@/config/ClientAxios';
import { TableOrderStatus } from '@/restaurant/types';
import { useState } from 'react';
import toast from 'react-hot-toast';
import Swal from 'sweetalert2';

const useCancelTableOrder = () => {
  const [loadingCancel, setLoadingCancel] = useState(false);

  const cancelOrder = async (id: string): Promise<TableOrderStatus | null> => {
    const { isConfirmed } = await Swal.fire({
      title: '¿Estás seguro de cancelar la orden?',
      text: 'Recuerda que no podrás revertir esta acción',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, cancelar',
      cancelButtonText: 'Cerrar',
    });

    if (!isConfirmed) return null;

    try {
      setLoadingCancel(true);
      const { data } = await ClientAxios.patch<{
        message: string;
        status: TableOrderStatus;
      }>(
        `/table-order/${id}/cancel`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('jwt')}`,
          },
        },
      );
      toast.success('Ordern cancelada');
      return data.status;
    } catch (error) {
      console.log(error);
      const { response } = error as {
        response: {
          data: {
            message: string;
            status: TableOrderStatus;
          };
        };
      };
      toast.error(response.data.message);
      return response.data.status;
    } finally {
      setLoadingCancel(false);
    }
  };

  return {
    cancelOrder,
    loadingCancel,
  };
};

export default useCancelTableOrder;
