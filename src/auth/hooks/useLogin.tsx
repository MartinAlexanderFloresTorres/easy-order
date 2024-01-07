import { useState } from 'react';
import ClientAxios from '@/config/ClientAxios';
import toast from 'react-hot-toast';
import useAccount from '@/account/hooks/useAccount';
import { Login, LoginResponse } from '@/auth/interfaces';
import { ErrorMessage } from '@/shared/interfaces';

const useLogin = () => {
  const [loadingLogin, setLoadingLogin] = useState(false);

  const { login: loginAccount } = useAccount();

  const login = async (
    fields: Login,
  ): Promise<{
    success: boolean;
  }> => {
    toast.dismiss();
    setLoadingLogin(true);
    try {
      const { data } = await ClientAxios.post<LoginResponse>('/user/login', fields, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      toast.success(data.message);
      loginAccount(data.user, data.jwt);
      return { success: true };
    } catch (error) {
      console.log(error);
      const { response } = error as ErrorMessage;
      toast.error(response.data.message);
      return { success: false };
    } finally {
      setLoadingLogin(false);
    }
  };

  return { loadingLogin, login };
};

export default useLogin;
