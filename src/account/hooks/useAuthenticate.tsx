import { User } from '@/auth/interfaces';
import ClientAxios from '@/config/ClientAxios';
import { ErrorMessage } from '@/shared/interfaces';
import { useState } from 'react';
import toast from 'react-hot-toast';

const useAuthenticate = () => {
  const [loadingAuthenticate, setLoadingAuthenticate] = useState(true);

  const authenticate = async (jwt: string): Promise<User | null> => {
    setLoadingAuthenticate(true);
    try {
      const { data } = await ClientAxios.get<User>('/user/authenticate', {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${jwt}`,
        },
      });

      return data;
    } catch (error) {
      console.log(error);
      const { response } = error as ErrorMessage;
      toast.error(response.data.message);
      return null;
    } finally {
      setLoadingAuthenticate(false);
    }
  };

  return {
    loadingAuthenticate,
    authenticate,
    setLoadingAuthenticate,
  };
};

export default useAuthenticate;
