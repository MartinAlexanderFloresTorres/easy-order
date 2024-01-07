import { useContext } from 'react';
import { RestaurantPublicContext } from '@/restaurant/providers/RestaurantPublicProvider';

function useRestaurantPublic() {
  return useContext(RestaurantPublicContext);
}

export default useRestaurantPublic;
