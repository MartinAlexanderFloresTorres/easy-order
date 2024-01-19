import { useState } from 'react';
import toast from 'react-hot-toast';
import useRestaurant from './useRestaurant';
import ClientAxios from '@/config/ClientAxios';
import { Survey } from '@/restaurant/interfaces';
import { ErrorMessage } from '@/shared/interfaces';

const useChangeStatusSurvey = () => {
  const [loadingStatus, setLoadingStatus] = useState(false);

  const { sincronizeSurveys } = useRestaurant();

  const changeStatus = async (categoryId: string, callback = () => {}) => {
    try {
      setLoadingStatus(true);
      const { data } = await ClientAxios.patch<{ message: string; survey: Survey }>(
        `/survey/status/${categoryId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('jwt')}`,
          },
        },
      );
      toast.success(data.message);
      sincronizeSurveys(data.survey, false);
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

export default useChangeStatusSurvey;
