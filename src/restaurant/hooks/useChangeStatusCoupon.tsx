import { useState } from 'react';
import toast from 'react-hot-toast';
import useRestaurant from './useRestaurant';
import ClientAxios from '@/config/ClientAxios';
import { Coupon } from '@/restaurant/interfaces';
import { ErrorMessage } from '@/shared/interfaces';

const useChangeStatusCoupon = () => {
  const [loadingStatus, setLoadingStatus] = useState(false);

  const { sincronizeCoupons } = useRestaurant();

  const changeStatus = async (couponId: string, restaurantId: string, callback = () => {}) => {
    try {
      setLoadingStatus(true);
      const { data } = await ClientAxios.patch<{ message: string; coupon: Coupon }>(
        `/coupon/status/${restaurantId}/${couponId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('jwt')}`,
          },
        },
      );
      toast.success(data.message);
      sincronizeCoupons(data.coupon, false);
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

export default useChangeStatusCoupon;
