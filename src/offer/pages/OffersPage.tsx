import usePublic from '@/shared/hooks/usePublic';
import Menu from '@/restaurant/components/Menu';
import Spinner from '@/shared/components/Spinner';

const OffersPage = () => {
  const { menusOffers, loadingMenusOffers } = usePublic();
  if (loadingMenusOffers) {
    return (
      <div className="p-4">
        <Spinner className="mx-auto" size={40} />
      </div>
    );
  }
  return (
    <div className="container mx-auto p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {menusOffers.map((menu) => (
        <Menu key={menu._id} menu={menu} />
      ))}
    </div>
  );
};

export default OffersPage;
