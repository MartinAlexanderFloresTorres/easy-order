import { useParams } from 'react-router-dom';
import NewRestaurantForm from '@/restaurant/components/NewRestaurantForm';
import useCheckAvailableNewRestaurant from '@/restaurant/hooks/useCheckAvailableNewRestaurant';

const NewRestaurantPage = () => {
  const { token } = useParams();
  const { availableForCreate, loadingAvailableForCreate } = useCheckAvailableNewRestaurant(token);

  // loading available for create
  if (loadingAvailableForCreate) return null;

  if (availableForCreate) {
    return <NewRestaurantForm token={token} />;
  }

  return null;
};

export default NewRestaurantPage;
