import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import ClientAxios from '@/config/ClientAxios';
import useAccount from '@/account/hooks/useAccount';
import { ErrorMessage, SuccessMessage } from '@/shared/interfaces';

const useCheckAvailableNewRestaurant = (token: string | undefined) => {
  const [loadingAvailableForCreate, setLoadingAvailableForCreate] = useState(true);
  const [availableForCreate, setAvailableForCreate] = useState(false);

  const { authenticated, loadingAuthenticate } = useAccount();

  // Hooks
  const navigate = useNavigate();
  const { pathname } = useLocation();

  useEffect(() => {
    if (!token || loadingAuthenticate) return;

    if (!authenticated) {
      navigate('/auth/login', {
        state: { from: pathname },
      });
      toast.error('Debes iniciar sesión para crear un restaurante');
      return;
    }

    (async () => {
      try {
        const jwt = localStorage.getItem('jwt');
        const { data } = await ClientAxios<SuccessMessage>(`/user/new-restaurant/available-for-create/${token}`, {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        });
        toast.success(data.message);
        setAvailableForCreate(true);
      } catch (error) {
        console.log(error);
        const { response } = error as ErrorMessage;
        toast.error(response.data.message);
        navigate('/');
      } finally {
        setLoadingAvailableForCreate(false);
      }
    })();
  }, [token, pathname, navigate, loadingAuthenticate, authenticated]);

  return {
    loadingAvailableForCreate,
    availableForCreate,
  };
};

export default useCheckAvailableNewRestaurant;
