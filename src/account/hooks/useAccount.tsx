import { useContext } from 'react';
import { UserContext } from '@/account/providers/AccountProvider';

const useAccount = () => {
  return useContext(UserContext);
};

export default useAccount;
