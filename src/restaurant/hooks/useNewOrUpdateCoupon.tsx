import { useState } from 'react';
import toast from 'react-hot-toast';
import { Coupon, NewCoupon } from '@/restaurant/interfaces';
import { ErrorMessage } from '@/shared/interfaces';
import ClientAxios from '@/config/ClientAxios';
import useRestaurant from './useRestaurant';

function useNewOrUpdateCoupon() {
  // States
  const [loadingCoupon, setLoadingCoupon] = useState(false);

  //  Hooks
  const { sincronizeCoupons } = useRestaurant();

  // Create coupon
  const createCoupon = async (data: NewCoupon, callback: () => void = () => {}) => {
    try {
      setLoadingCoupon(true);

      const { data: dataCoupon } = await ClientAxios.post<{
        message: string;
        coupon: Coupon;
      }>('/coupon', data, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('jwt')}`,
        },
      });

      // Sincronizar
      sincronizeCoupons(dataCoupon.coupon, true);

      toast.success('Cupón creado correctamente');
      callback();
    } catch (error) {
      console.log(error);
      const { response } = error as ErrorMessage;
      toast.error(response.data.message);
    } finally {
      setLoadingCoupon(false);
    }
  };

  // Update coupon
  const updateCoupon = async ({
    data,
    couponId,
    restaurantId,
    callback = () => {},
  }: {
    data: NewCoupon;
    couponId: string;
    restaurantId: string;
    callback?: () => void;
  }) => {
    try {
      setLoadingCoupon(true);
      const { data: dataCoupon } = await ClientAxios.patch<{
        message: string;
        coupon: Coupon;
      }>(`/coupon/${restaurantId}/${couponId}`, data, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('jwt')}`,
        },
      });

      // Sincronizar
      sincronizeCoupons(dataCoupon.coupon, false);

      toast.success('Cupón actualizado correctamente');
      callback();
    } catch (error) {
      console.log(error);
      const { response } = error as ErrorMessage;
      toast.error(response.data.message);
    } finally {
      setLoadingCoupon(false);
    }
  };
  return {
    loadingCoupon,
    createCoupon,
    updateCoupon,
  };
}

export default useNewOrUpdateCoupon;
