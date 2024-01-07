import { useState } from 'react';
import toast from 'react-hot-toast';
import Swal from 'sweetalert2';
import ClientAxios from '@/config/ClientAxios';
import { TableOrderStatus } from '@/restaurant/types';

const useChangeStatusTableOrder = () => {
  const [loadingStatus, setLoadingReject] = useState(false);

  const changeStatus = async (id: string, status: TableOrderStatus): Promise<TableOrderStatus | null> => {
    const { isConfirmed } = await Swal.fire({
      title: '¿Estás seguro de cambiar el estado de la orden?',
      text: 'Recuerda que no podrás revertir esta acción',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Cambiar estado',
      cancelButtonText: 'Cerrar',
    });

    if (!isConfirmed) return null;

    try {
      setLoadingReject(true);
      const { data } = await ClientAxios.patch<{
        message: string;
        status: TableOrderStatus;
      }>(
        `/table-order/${id}/status`,
        {
          status,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('jwt')}`,
          },
        },
      );
      toast.success('Estado cambiado');
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
      setLoadingReject(false);
    }
  };

  return {
    changeStatus,
    loadingStatus,
  };
};

export default useChangeStatusTableOrder;
