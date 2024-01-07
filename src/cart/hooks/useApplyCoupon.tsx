import { useState } from 'react';
import toast from 'react-hot-toast';
import ClientAxios from '@/config/ClientAxios';
import { Coupon } from '@/cart/interfaces';

const useApplyCoupon = () => {
  const [loadingCoupon, setLoadingCoupon] = useState(false);
  const handleApplyCoupon = async (couponCode: string, restaurantId: string, callback: (coupon: Coupon) => void) => {
    try {
      setLoadingCoupon(true);
      const { data } = await toast.promise(
        ClientAxios.get<Coupon>(`/coupon/apply/${restaurantId}/${couponCode}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('jwt')}`,
          },
        }),
        {
          loading: 'Aplicando cupón...',
          success: 'Cupón aplicado correctamente',
          error: (err) => err.response.data.message,
        },
      );

      callback(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingCoupon(false);
    }
  };

  return {
    loadingCoupon,
    handleApplyCoupon,
  };
};

export default useApplyCoupon;
