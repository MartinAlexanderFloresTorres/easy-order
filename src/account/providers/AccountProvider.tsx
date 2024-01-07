import { createContext, useEffect, useState } from 'react';
import { User } from '@/auth/interfaces';
import useAuthenticate from '../hooks/useAuthenticate';
import Swal from 'sweetalert2';
import toast from 'react-hot-toast';

interface UserContextProps {
  user: User | null;
  loadingAuthenticate: boolean;
  logout: (callback?: () => void) => void;
  login: (user: User, jwt: string) => void;
  authenticated: boolean;
  sincronizeUser: () => void;
}

export const UserContext = createContext<UserContextProps>({
  user: null,
  logout: () => {},
  login: () => {},
  loadingAuthenticate: true,
  authenticated: false,
  sincronizeUser: () => {},
});

interface AccountProviderProps {
  children: React.ReactNode;
}
const AccountProvider = ({ children }: AccountProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [authenticated, setAuthenticated] = useState(false);

  const { authenticate, loadingAuthenticate, setLoadingAuthenticate } = useAuthenticate();

  const sincronizeUser = async () => {
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
      (async () => {
        try {
          const user = await authenticate(jwt);
          if (!user) return logout();

          setUser(user);
          setAuthenticated(true);
        } catch (error) {
          console.log(error);
        }
      })();
    } else {
      setLoadingAuthenticate(false);
    }
  };

  useEffect(() => {
    sincronizeUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const logout = async (callback = () => {}) => {
    const { isConfirmed } = await Swal.fire({
      title: '¿Estás seguro de cerrar sesión?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, cerrar sesión',
      cancelButtonText: 'No, cancelar',
    });

    if (!isConfirmed) return;

    localStorage.removeItem('jwt');
    setUser(null);
    setAuthenticated(false);
    callback();
    toast.success('Sesión cerrada');
  };

  const login = (user: User, jwt: string) => {
    localStorage.setItem('jwt', jwt);
    setAuthenticated(true);
    setUser(user);
  };

  return (
    <UserContext.Provider
      value={{
        loadingAuthenticate,
        authenticated,
        user,
        logout,
        login,
        sincronizeUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default AccountProvider;
