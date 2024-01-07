import { useState } from 'react';
import toast from 'react-hot-toast';
import ClientAxios from '@/config/ClientAxios';
import { ErrorMessage } from '@/shared/interfaces';
import useAccount from '@/account/hooks/useAccount';
import { LoginResponse } from '@/auth/interfaces';

const useConfirmCode = () => {
  const [loadingConfirmation, setLoadingConfirmation] = useState(false);

  // Hooks
  const { login } = useAccount();

  const confirm = async (
    token: string,
    confirmationCode: string,
  ): Promise<{
    success: boolean;
  }> => {
    toast.dismiss();
    setLoadingConfirmation(true);
    try {
      const { data } = await ClientAxios.post<LoginResponse>(
        `/user/confirmation-code/${token}`,
        {
          confirmationCode,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );

      toast.success(data.message);
      login(data.user, data.jwt);
      localStorage.setItem('jwt', data.jwt);
      return { success: true };
    } catch (error) {
      console.log(error);
      const { response } = error as ErrorMessage;
      toast.error(response.data.message);
      return { success: false };
    } finally {
      setLoadingConfirmation(false);
    }
  };

  return { loadingConfirmation, confirm };
};

export default useConfirmCode;
