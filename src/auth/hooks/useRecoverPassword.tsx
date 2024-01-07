import { useState } from 'react';
import toast from 'react-hot-toast';
import ClientAxios from '@/config/ClientAxios';
import { LoginResponse } from '@/auth/interfaces';
import { ErrorMessage } from '@/shared/interfaces';

const useRecoverPassword = () => {
  const [loadingRecoverPassword, setLoadingRecoverPassword] = useState(false);

  const recoverPassword = async (email: string): Promise<{ success: boolean }> => {
    toast.dismiss();
    setLoadingRecoverPassword(true);
    try {
      const { data } = await ClientAxios.post<LoginResponse>(
        '/user/recover-password',
        { email },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );

      toast.success(data.message);
      return { success: true };
    } catch (error) {
      console.log(error);
      const { response } = error as ErrorMessage;
      toast.error(response.data.message);
      return { success: false };
    } finally {
      setLoadingRecoverPassword(false);
    }
  };

  return { loadingRecoverPassword, recoverPassword };
};

export default useRecoverPassword;
