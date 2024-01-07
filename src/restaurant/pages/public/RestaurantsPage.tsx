import Spinner from '@/shared/components/Spinner';
import usePublic from '@/shared/hooks/usePublic';
import RestaurantPreview from '@/restaurant/components/RestaurantPreview';

const RestaurantsPage = () => {
  const { restaurants, loadingRestaurants } = usePublic();

  if (loadingRestaurants) {
    return (
      <div className="p-4">
        <Spinner className="mx-auto" size={40} />
      </div>
    );
  }

  return (
    <div className="container p-4 mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {restaurants.map((restaurant) => (
        <RestaurantPreview key={restaurant._id} restaurant={restaurant} />
      ))}
    </div>
  );
};

export default RestaurantsPage;
