/* eslint-disable react-hooks/exhaustive-deps */

import { createContext, useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import { Category, Coupon, Menu, Restaurant } from '@/restaurant/interfaces';
import useAccount from '@/account/hooks/useAccount';
import ClientAxios from '@/config/ClientAxios';
import { ErrorMessage } from '@/shared/interfaces';
import Loading from '@/shared/components/Loading';

interface RestaurantContextProps {
  restaurant: Restaurant | null;
  loadingRestaurant: boolean;
  checkRestaurantPermits: boolean;
  setRestaurant: React.Dispatch<React.SetStateAction<Restaurant | null>>;

  categories: Category[];
  activeCategories: Category[];
  loadingCategories: boolean;
  sincronizeCategories: (category: Category, isNew: boolean) => void;

  coupons: Coupon[];
  loadingCoupons: boolean;
  sincronizeCoupons: (coupon: Coupon, isNew: boolean) => void;

  menus: Menu[];
  loadingMenus: boolean;
  sincronizeMenus: (menu: Menu, isNew: boolean) => void;
}

export const RestaurantContext = createContext<RestaurantContextProps>({
  restaurant: null,
  loadingRestaurant: true,
  checkRestaurantPermits: false,
  setRestaurant: () => {},

  categories: [],
  activeCategories: [],
  loadingCategories: true,
  sincronizeCategories: () => {},

  coupons: [],
  loadingCoupons: true,
  sincronizeCoupons: () => {},

  menus: [],
  loadingMenus: true,
  sincronizeMenus: () => {},
});

interface RestaurantProviderProps {
  children: React.ReactNode;
}
const RestaurantProvider = ({ children }: RestaurantProviderProps) => {
  const [restaurant, setRestaurant] = useState<Restaurant | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loadingRestaurant, setLoadingRestaurant] = useState(true);
  const [loadingCategories, setLoadingCategories] = useState(true);
  const [checkRestaurantPermits, setCheckRestaurantPermits] = useState(false);
  const [activeCategories, setActiveCategories] = useState<Category[]>([]);
  const [menus, setMenus] = useState<Menu[]>([]);
  const [loadingMenus, setLoadingMenus] = useState(true);

  const [coupons, setCoupons] = useState<Coupon[]>([]);
  const [loadingCoupons, setLoadingCoupons] = useState(true);

  const { user } = useAccount();
  const { provider } = useParams();

  const { pathname } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      try {
        if (!user) return navigate('/');
        console.log(user.restaurant);

        if (user.restaurant === null) return setCheckRestaurantPermits(false);

        const [dataRestaurant, dataCategories] = await Promise.all([
          ClientAxios.get<Restaurant>(`/restaurant/check-permits/${user.restaurant._id}/${provider}`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('jwt')}`,
            },
          }),
          ClientAxios.get<Category[]>(`/category/restaurant/${user.restaurant._id}`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('jwt')}`,
            },
          }),
        ]);

        setRestaurant(dataRestaurant.data);
        setCategories(dataCategories.data);
        setCheckRestaurantPermits(true);
      } catch (error) {
        console.log(error);
        const { response } = error as ErrorMessage;
        toast.error(response.data.message);
        navigate('/');
      } finally {
        setLoadingRestaurant(false);
        setLoadingCategories(false);
      }
    })();
  }, [pathname, user, provider]);

  useEffect(() => {
    if (pathname.includes(`/panel/${provider}/menu`) && restaurant) {
      if (menus.length) return setLoadingMenus(false);
      setLoadingMenus(true);
      (async () => {
        try {
          const { data } = await ClientAxios.get<Menu[]>(`/menu/${restaurant._id}`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('jwt')}`,
            },
          });

          setMenus(data);
        } catch (error) {
          console.log(error);
          const { response } = error as ErrorMessage;
          toast.error(response.data.message);
        } finally {
          setLoadingMenus(false);
        }
      })();
    }

    if (pathname.includes(`/panel/${provider}/coupon`) && restaurant) {
      if (coupons.length) return setLoadingCoupons(false);
      setLoadingCoupons(true);
      (async () => {
        try {
          const { data } = await ClientAxios.get<Coupon[]>(`/coupon/${restaurant._id}`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('jwt')}`,
            },
          });

          setCoupons(data);
        } catch (error) {
          console.log(error);
          const { response } = error as ErrorMessage;
          toast.error(response.data.message);
        } finally {
          setLoadingCoupons(false);
        }
      })();
    }
  }, [pathname, restaurant]);

  useEffect(() => {
    setActiveCategories(categories.filter((category) => category.isActive));
  }, [categories]);

  const sincronizeCategories = (category: Category, isNew: boolean) => {
    if (isNew) {
      setCategories((categories) => [...categories, category]);
      return;
    }

    setCategories((categories) => {
      const newCategories = categories.map((categoryMap) => {
        if (categoryMap._id === category._id) {
          return category;
        }
        return categoryMap;
      });
      return newCategories;
    });
  };

  const sincronizeMenus = (menu: Menu, isNew: boolean) => {
    if (isNew) {
      setMenus((menus) => [...menus, menu]);
      return;
    }

    setMenus((menus) => {
      const newMenus = menus.map((menuMap) => {
        if (menuMap._id === menu._id) {
          return menu;
        }
        return menuMap;
      });
      return newMenus;
    });
  };

  const sincronizeCoupons = (coupon: Coupon, isNew: boolean) => {
    if (isNew) {
      setCoupons((coupons) => [...coupons, coupon]);
      return;
    }

    setCoupons((coupons) => {
      const newCoupons = coupons.map((couponMap) => {
        if (couponMap._id === coupon._id) {
          return coupon;
        }
        return couponMap;
      });
      return newCoupons;
    });
  };
  return (
    <RestaurantContext.Provider
      value={{
        restaurant,
        loadingRestaurant,
        checkRestaurantPermits,
        setRestaurant,
        categories,
        activeCategories,
        loadingCategories,
        sincronizeCategories,
        menus,
        loadingMenus,
        sincronizeMenus,

        coupons,
        loadingCoupons,
        sincronizeCoupons,
      }}
    >
      {loadingRestaurant ? (
        <Loading className="h-tablet-view xl:h-view" title="Verificando permisos" description="Espere un momento por favor ..." />
      ) : (
        <>{checkRestaurantPermits ? children : null}</>
      )}
    </RestaurantContext.Provider>
  );
};
export default RestaurantProvider;
