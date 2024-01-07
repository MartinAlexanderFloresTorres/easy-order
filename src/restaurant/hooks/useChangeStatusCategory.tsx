import { useState } from 'react';
import toast from 'react-hot-toast';
import useRestaurant from './useRestaurant';
import ClientAxios from '@/config/ClientAxios';
import { Category } from '@/restaurant/interfaces';
import { ErrorMessage } from '@/shared/interfaces';

const useChangeStatusCategory = () => {
  const [loadingStatus, setLoadingStatus] = useState(false);

  const { sincronizeCategories } = useRestaurant();

  const changeStatus = async (categoryId: string, callback = () => {}) => {
    try {
      setLoadingStatus(true);
      const { data } = await ClientAxios.patch<{ message: string; category: Category }>(
        `/category/status/${categoryId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('jwt')}`,
          },
        },
      );
      toast.success(data.message);
      sincronizeCategories(data.category, false);
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

export default useChangeStatusCategory;
