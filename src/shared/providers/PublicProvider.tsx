import { createContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useDebouncedCallback } from 'use-debounce';
import ClientAxios from '@/config/ClientAxios';
import useCart from '@/cart/hooks/useCart';
import { SearchedMenu } from '@/restaurant/interfaces/searched-menu';
import { SearchedRestaurant } from '@/restaurant/interfaces';
import { ErrorMessage } from '@/shared/interfaces';

interface PublicContextProps {
  search: string;
  onSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
  clearSearch: () => void;
  isShowModalSearch: boolean;
  onCloseModalSearch: () => void;
  onOpenModalSearch: () => void;

  restaurants: SearchedRestaurant[];
  loadingRestaurants: boolean;

  menus: SearchedMenu[];
  loadingMenus: boolean;

  menusSearch: SearchedMenu[];
  loadingMenusSearch: boolean;

  menusOffers: SearchedMenu[];
  loadingMenusOffers: boolean;

  restaurantsFavorites: SearchedRestaurant[];
  addRestaurantFavorite: (restaurant: SearchedRestaurant) => void;
  removeRestaurantFavorite: (restaurant: SearchedRestaurant) => void;
  hasRestaurantFavorite: (restaurant: SearchedRestaurant) => boolean;
}

export const PublicContext = createContext<PublicContextProps>({
  search: '',
  onSearch: () => {},
  clearSearch: () => {},
  isShowModalSearch: false,
  onCloseModalSearch: () => {},
  onOpenModalSearch: () => {},

  restaurants: [],
  loadingRestaurants: true,

  menus: [],
  loadingMenus: true,

  menusSearch: [],
  loadingMenusSearch: true,

  menusOffers: [],
  loadingMenusOffers: true,

  restaurantsFavorites: [],
  addRestaurantFavorite: () => {},
  removeRestaurantFavorite: () => {},
  hasRestaurantFavorite: () => false,
});

interface PublicProviderProps {
  children: React.ReactNode;
}

const PublicProvider = ({ children }: PublicProviderProps) => {
  const [search, setSearch] = useState<string>('');
  const [isShowModalSearch, setIsShowModalSearch] = useState<boolean>(false);
  const [restaurants, setRestaurants] = useState<SearchedRestaurant[]>([]);
  const [loadingRestaurants, setLoadingRestaurants] = useState<boolean>(true);
  const [menus, setMenus] = useState<SearchedMenu[]>([]);
  const [menusSearch, setMenusSearch] = useState<SearchedMenu[]>([]);
  const [loadingMenusSearch, setLoadingMenusSearch] = useState<boolean>(true);
  const [loadingMenus, setLoadingMenus] = useState<boolean>(true);
  const [menusOffers, setMenusOffers] = useState<SearchedMenu[]>([]);
  const [loadingMenusOffers, setLoadingMenusOffers] = useState<boolean>(true);
  const [restaurantsFavorites, setRestaurantsFavorites] = useState<SearchedRestaurant[]>([]);

  const { changeOrder } = useCart();

  const searchDebounced = useDebouncedCallback(async (value: string) => {
    try {
      const { data } = await ClientAxios.get(`/menu/search?query=${value}`);
      setMenusSearch(data);
    } catch (error) {
      console.log(error);
      const { response } = error as ErrorMessage;
      toast.error(response.data.message);
    } finally {
      setLoadingMenusSearch(false);
    }
  }, 500);

  // Get current route
  const { pathname } = useLocation();

  // Scroll to top when change route
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    const restaurantsFavorites = JSON.parse(localStorage.getItem('restaurantsFavorites') || '[]');
    setRestaurantsFavorites(restaurantsFavorites);
  }, []);

  useEffect(() => {
    if (pathname === '/restaurants') {
      if (restaurants.length) return setLoadingRestaurants(false);
      (async () => {
        try {
          setLoadingRestaurants(true);
          const { data } = await ClientAxios.get('/restaurant');
          setRestaurants(data);
        } catch (error) {
          console.log(error);
          const { response } = error as ErrorMessage;
          toast.error(response.data.message);
        } finally {
          setLoadingRestaurants(false);
        }
      })();
    }
  }, [pathname, restaurants.length]);

  useEffect(() => {
    if (pathname === '/menus') {
      if (menus.length && !changeOrder) return setLoadingMenus(false);
      (async () => {
        try {
          setLoadingMenus(true);
          const { data } = await ClientAxios.get('/menu');
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
  }, [pathname, menus.length, changeOrder]);

  useEffect(() => {
    if (pathname === '/offers') {
      if (menusOffers.length) return setLoadingMenusOffers(false);
      (async () => {
        try {
          setLoadingMenusOffers(true);
          const { data } = await ClientAxios.get('/menu/offers');
          setMenusOffers(data);
        } catch (error) {
          console.log(error);
          const { response } = error as ErrorMessage;
          toast.error(response.data.message);
        } finally {
          setLoadingMenusOffers(false);
        }
      })();
    }
  }, [pathname, menusOffers.length]);

  const onSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;

    setSearch(value);
    setLoadingMenusSearch(true);
    if (value.length <= 0) {
      setLoadingMenusSearch(false);
      setMenusSearch([]);
      return;
    }
    searchDebounced(value);
  };

  const clearSearch = () => {
    setSearch('');
  };

  const onCloseModalSearch = () => {
    clearSearch();
    setIsShowModalSearch(false);
  };

  const onOpenModalSearch = () => setIsShowModalSearch(true);

  const addRestaurantFavorite = (restaurant: SearchedRestaurant) => {
    // Exist restaurant in favorites
    if (hasRestaurantFavorite(restaurant)) {
      // Remove restaurant from favorites
      removeRestaurantFavorite(restaurant);
      return;
    }

    const newRestaurantsFavorites = [...restaurantsFavorites, restaurant];
    localStorage.setItem('restaurantsFavorites', JSON.stringify(newRestaurantsFavorites));
    setRestaurantsFavorites(newRestaurantsFavorites);
  };

  const removeRestaurantFavorite = (restaurant: SearchedRestaurant) => {
    const newRestaurantsFavorites = restaurantsFavorites.filter((restaurantFavorite: SearchedRestaurant) => restaurantFavorite._id !== restaurant._id);
    localStorage.setItem('restaurantsFavorites', JSON.stringify(newRestaurantsFavorites));
    setRestaurantsFavorites(newRestaurantsFavorites);
  };

  const hasRestaurantFavorite = (restaurant: SearchedRestaurant) => {
    return restaurantsFavorites.some((restaurantFavorite: SearchedRestaurant) => restaurantFavorite._id === restaurant._id);
  };
  return (
    <PublicContext.Provider
      value={{
        search,
        onSearch,
        clearSearch,
        isShowModalSearch,
        onCloseModalSearch,
        onOpenModalSearch,

        restaurants,
        loadingRestaurants,

        menus,
        loadingMenus,

        menusSearch,
        loadingMenusSearch,

        menusOffers,
        loadingMenusOffers,

        restaurantsFavorites,
        addRestaurantFavorite,
        removeRestaurantFavorite,
        hasRestaurantFavorite,
      }}
    >
      {children}
    </PublicContext.Provider>
  );
};

export default PublicProvider;
