import { useContext } from 'react';
import { PublicContext } from '@/shared/providers/PublicProvider';

const usePublic = () => {
  return useContext(PublicContext);
};

export default usePublic;
