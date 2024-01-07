import { useState } from 'react';
import ClientAxios from '@/config/ClientAxios';
import { Register, RegisterResponse } from '@/auth/interfaces';
import toast from 'react-hot-toast';
import { ErrorMessage } from '@/shared/interfaces';

const useRegister = () => {
  const [loadingRegister, setLoadingRegister] = useState(false);

  const register = async (
    fields: Register,
  ): Promise<{
    success: boolean;
    tokenConfirm: string | null;
  }> => {
    toast.dismiss();
    setLoadingRegister(true);
    try {
      const { data } = await ClientAxios.post<RegisterResponse>('/user/register', fields, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      toast.success(data.message);
      return { success: true, tokenConfirm: data.tokenConfirm };
    } catch (error) {
      console.log(error);
      const { response } = error as ErrorMessage;
      toast.error(response.data.message);
      return { success: false, tokenConfirm: null };
    } finally {
      setLoadingRegister(false);
    }
  };

  return { loadingRegister, register };
};

export default useRegister;
