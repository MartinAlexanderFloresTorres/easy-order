import { createContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import { SearchedRestaurantByProvider } from '@/restaurant/interfaces';
import { ErrorMessage } from '@/shared/interfaces';
import ClientAxios from '@/config/ClientAxios';

interface RestaurantPublicContextProps {
  restaurant: SearchedRestaurantByProvider | null;
  loading: boolean;
}

export const RestaurantPublicContext = createContext<RestaurantPublicContextProps>({
  restaurant: null,
  loading: true,
});

interface RestaurantPublicProviderProps {
  children: React.ReactNode;
}

const RestaurantPublicProvider = ({ children }: RestaurantPublicProviderProps) => {
  const [restaurant, setRestaurant] = useState<SearchedRestaurantByProvider | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const { provider } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (provider) {
      (async () => {
        try {
          const { data } = await ClientAxios.get<SearchedRestaurantByProvider>(`/restaurant/by/${provider}`);
          setRestaurant(data);
        } catch (error) {
          console.log(error);
          const { response } = error as ErrorMessage;
          toast.error(response.data.message);
          navigate('/');
        } finally {
          setLoading(false);
        }
      })();
    }
  }, [navigate, provider]);

  return <RestaurantPublicContext.Provider value={{ restaurant, loading }}>{children}</RestaurantPublicContext.Provider>;
};

export default RestaurantPublicProvider;
