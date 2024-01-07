import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import ClientAxios from '@/config/ClientAxios';
import { ErrorMessage, SuccessMessage } from '@/shared/interfaces';

const useConfirmCodeValid = (token: string | undefined) => {
  const [isTokenConfirmValid, setIsTokenConfirmValid] = useState(false);
  const [loadingConfirmationValid, setLoadingConfirmationValid] = useState(true);

  useEffect(() => {
    if (!token) return;

    (async () => {
      try {
        await ClientAxios.get<SuccessMessage>(`/user/confirmation-code/${token}`);
        setIsTokenConfirmValid(true);
      } catch (error) {
        console.log(error);
        const { response } = error as ErrorMessage;
        toast.error(response.data.message);
        return { success: false };
      } finally {
        setLoadingConfirmationValid(false);
      }
    })();
  }, [token]);

  return { loadingConfirmationValid, isTokenConfirmValid };
};

export default useConfirmCodeValid;
