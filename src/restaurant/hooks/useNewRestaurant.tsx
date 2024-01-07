import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import ClientAxios from '@/config/ClientAxios';
import { ErrorMessage } from '@/shared/interfaces';
import { NewRestaurant } from '../interfaces/new-restaurant';
import useAccount from '@/account/hooks/useAccount';

const useNewRestaurant = () => {
  const [loadingNewRestaurant, setLoadingNewRestaurant] = useState(false);
  const [loadingUploads, setLoadingUploads] = useState(false);

  const navigate = useNavigate();
  const { sincronizeUser } = useAccount();

  const newRestaurant = async (tokenCreateRestaurant: string, fields: NewRestaurant, callback: () => void) => {
    setLoadingNewRestaurant(true);
    try {
      const { banner, logo, gallery, ...restaurant } = fields;
      const formData = new FormData();
      formData.append('logo', logo as Blob);
      formData.append('banner', banner as Blob);
      gallery.forEach((image) => {
        formData.append('gallery', image as Blob);
      });

      const { data: dataRestaurant } = await ClientAxios.post<{
        message: string;
        restaurantId: string;
      }>(`/restaurant/${tokenCreateRestaurant}`, restaurant, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('jwt')}`,
        },
      });

      setLoadingUploads(true);
      const { data: dataUploads } = await ClientAxios.patch<{
        message: string;
        slug: string;
      }>(`/restaurant/uploads/${dataRestaurant.restaurantId}`, formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('jwt')}`,
        },
      });

      toast.success(dataRestaurant.message);
      navigate(`/panel/${dataUploads.slug}`);
      sincronizeUser();

      callback();
    } catch (error) {
      console.log(error);
      const { response } = error as ErrorMessage;
      toast.error(response.data.message);
    } finally {
      setLoadingNewRestaurant(false);
      setLoadingUploads(false);
    }
  };

  return {
    loadingNewRestaurant,
    loadingUploads,
    newRestaurant,
  };
};

export default useNewRestaurant;
