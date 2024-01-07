import { useState } from 'react';
import toast from 'react-hot-toast';
import useRestaurant from './useRestaurant';
import ClientAxios from '@/config/ClientAxios';
import { ErrorMessage } from '@/shared/interfaces';
import { Menu } from '@/restaurant/interfaces';

const useChangeStatusMenu = () => {
  const [loadingStatus, setLoadingStatus] = useState(false);

  const { sincronizeMenus } = useRestaurant();

  const changeStatus = async (menuId: string, callback = () => {}) => {
    try {
      setLoadingStatus(true);
      const { data } = await ClientAxios.patch<{ message: string; menu: Menu }>(
        `/menu/status/${menuId}`,
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
    loadingStatus,
    changeStatus,
  };
};

export default useChangeStatusMenu;
