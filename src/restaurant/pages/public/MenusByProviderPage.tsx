import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { SearchedMenu } from '@/restaurant/interfaces';
import ClientAxios from '@/config/ClientAxios';
import { ErrorMessage } from '@/shared/interfaces';
import Menu from '@/restaurant/components/Menu';
import useRestaurantPublic from '@/restaurant/hooks/useRestaurantPublic';
import Spinner from '@/shared/components/Spinner';
import useCart from '@/cart/hooks/useCart';

const MenusByProviderPage = () => {
  const [menus, setMenus] = useState<SearchedMenu[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const { restaurant } = useRestaurantPublic();
  const { changeOrder } = useCart();

  useEffect(() => {
    if (restaurant) {
      (async () => {
        try {
          const { data } = await ClientAxios.get<SearchedMenu[]>(`/menu?restaurantId=${restaurant._id}`);
          setMenus(data);
        } catch (error) {
          console.log(error);
          const { response } = error as ErrorMessage;
          toast.error(response.data.message);
        } finally {
          setLoading(false);
        }
      })();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [restaurant, changeOrder]);

  if (loading)
    return (
      <div className="p-4">
        <Spinner className="mx-auto" size={40} />
      </div>
    );
  return (
    <div className="container mx-auto p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {menus.map((menu) => (
        <Menu key={menu._id} menu={menu} />
      ))}
    </div>
  );
};

export default MenusByProviderPage;
