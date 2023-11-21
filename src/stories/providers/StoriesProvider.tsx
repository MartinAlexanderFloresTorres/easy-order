import { useState, createContext } from 'react';

interface StoriesContextData {
  showStorie: boolean;
  openStorie: (storie: string) => void;
  closeStorie: () => void;
}

export const StoriesContext = createContext({} as StoriesContextData);

interface StoriesProviderProps {
  children: React.ReactNode;
}

const StoriesProvider = ({ children }: StoriesProviderProps) => {
  const [showStorie, setShowStorie] = useState(false);

  const openStorie = (storie: string) => {
    window.history.pushState({}, '', `/stories/${storie}`);
    setShowStorie(true);
  };

  const closeStorie = () => {
    window.history.back();
    setShowStorie(false);
  };

  return <StoriesContext.Provider value={{ showStorie, openStorie, closeStorie }}>{children}</StoriesContext.Provider>;
};

export default StoriesProvider;
