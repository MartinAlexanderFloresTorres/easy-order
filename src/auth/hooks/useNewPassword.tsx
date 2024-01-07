import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import ClientAxios from '@/config/ClientAxios';
import { ErrorMessage, SuccessMessage } from '@/shared/interfaces';

const useNewPassword = () => {
  const [isVerifyToken, setIsVerifyToken] = useState(false);
  const [loadingVerifyToken, setLoadingVerifyToken] = useState(true);
  const [loadingNewPassword, setLoadingNewPassword] = useState(false);

  const { token } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) return;

    const verifyToken = async () => {
      try {
        const { data } = await ClientAxios.get<SuccessMessage>(`/user/recover-password/${token}`, {
          headers: {
            'Content-Type': 'application/json',
          },
        });

        toast.success(data.message);
        setIsVerifyToken(true);
      } catch (error) {
        console.log(error);
        const { response } = error as ErrorMessage;
        toast.error(response.data.message);
        setIsVerifyToken(false);
      } finally {
        setLoadingVerifyToken(false);
      }
    };

    verifyToken();
  }, [token]);

  const newPassword = async (fields: { password: string }): Promise<{ success: boolean }> => {
    toast.dismiss();
    setLoadingNewPassword(true);
    try {
      const { data } = await ClientAxios.post<SuccessMessage>(`/user/recover-password/${token}`, fields, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      toast.success(data.message);
      navigate('/auth/login');
      return { success: true };
    } catch (error) {
      console.log(error);
      const { response } = error as ErrorMessage;
      toast.error(response.data.message);
      return { success: false };
    } finally {
      setLoadingNewPassword(false);
    }
  };

  return { isVerifyToken, loadingNewPassword, loadingVerifyToken, newPassword };
};

export default useNewPassword;
