import { createContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

interface PublicContextProps {
  search: string;
  onSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
  clearSearch: () => void;
  isShowModalSearch: boolean;
  onCloseModalSearch: () => void;
  onOpenModalSearch: () => void;
}

export const PublicContext = createContext<PublicContextProps>({
  search: '',
  onSearch: () => {},
  clearSearch: () => {},
  isShowModalSearch: false,
  onCloseModalSearch: () => {},
  onOpenModalSearch: () => {},
});

interface PublicProviderProps {
  children: React.ReactNode;
}

const PublicProvider = ({ children }: PublicProviderProps) => {
  const [search, setSearch] = useState<string>('');
  const [isShowModalSearch, setIsShowModalSearch] = useState<boolean>(false);

  // Get current route
  const { pathname } = useLocation();

  // Scroll to top when change route
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  const onSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value.trimStart());
  };

  const clearSearch = () => {
    setSearch('');
  };

  const onCloseModalSearch = () => {
    clearSearch();
    setIsShowModalSearch(false);
  };

  const onOpenModalSearch = () => setIsShowModalSearch(true);

  return (
    <PublicContext.Provider
      value={{
        search,
        onSearch,
        clearSearch,
        isShowModalSearch,
        onCloseModalSearch,
        onOpenModalSearch,
      }}
    >
      {children}
    </PublicContext.Provider>
  );
};

export default PublicProvider;
