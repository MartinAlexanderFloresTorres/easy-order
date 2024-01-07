import { useState } from 'react';
import toast from 'react-hot-toast';
import useRestaurant from './useRestaurant';
import ClientAxios from '@/config/ClientAxios';
import { ErrorMessage } from '@/shared/interfaces';
import { Menu } from '@/restaurant/interfaces';

const useRenewStockMenu = () => {
  const [loadingRenewStock, setLoadingStatus] = useState(false);

  const { sincronizeMenus } = useRestaurant();

  const renewStock = async (menuId: string, resturantId: string, callback = () => {}) => {
    try {
      setLoadingStatus(true);
      const { data } = await ClientAxios.patch<{ message: string; menu: Menu }>(
        `/menu/renew-stock/${menuId}/${resturantId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('jwt')}`,
          },
        },
      );
      toast.success(data.message);
      sincronizeMenus(data.menu, false);
      callback();
    } catch (error) {
      console.log(error);
      const { response } = error as ErrorMessage;
      toast.error(response.data.message);
    } finally {
      setLoadingStatus(false);
    }
  };

  return {
    loadingRenewStock,
    renewStock,
  };
};

export default useRenewStockMenu;
