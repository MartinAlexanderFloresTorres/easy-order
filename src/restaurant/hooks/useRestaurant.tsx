import { useContext } from 'react';
import { RestaurantContext } from '../providers/RestaurantProvider';

const useRestaurant = () => {
  return useContext(RestaurantContext);
};

export default useRestaurant;
