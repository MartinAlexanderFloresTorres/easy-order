import { useState } from 'react';
import { SearchIcon, X } from 'lucide-react';
import { twMerge } from 'tailwind-merge';
import usePublic from '@/shared/hooks/usePublic';
import Modal from '@/shared/components/Modal';
import Menu from '@/restaurant/components/Menu';
import Spinner from './Spinner';

let timer: NodeJS.Timeout | null = null;
const ModalSearch = () => {
  const [isClose, setIsClose] = useState(false);

  const { onCloseModalSearch, clearSearch, onSearch, search, menusSearch, loadingMenusSearch } = usePublic();

  const onCloseSuggestions = () => {
    if (timer) clearTimeout(timer);

    if (isClose) {
      onCloseModalSearch();
      setIsClose(false);
      return;
    }

    setIsClose(true);
    timer = setTimeout(() => {
      onCloseModalSearch();
      setIsClose(false);
    }, 200);
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };
  return (
    <Modal
      className="h-screen flex items-center flex-col justify-center bg-zinc-900 bg-opacity-80 backdrop-blur-md"
      onClose={onCloseSuggestions}
      isClose={isClose}
    >
      <Modal.Overlay onClose={onCloseSuggestions} className="block pt-10">
        <div className="container mx-auto w-full">
          <form className="sticky top-0 z-10 w-full" onSubmit={onSubmit}>
            <SearchIcon size={20} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-zinc-200 z-10" />
            <input
              type="text"
              className={twMerge(
                'w-full border pl-11 border-zinc-700 backdrop-blur-lg border-opacity-50 rounded-full py-4 text-base text-zinc-200 bg-zinc-800 hover:bg-opacity-60 bg-opacity-50 outline-none focus:border-opacity-90 transition-colors duration-300 placeholder:text-zinc-400',
                search.length <= 0 ? 'pr-4' : 'pr-11',
              )}
              autoFocus
              value={search}
              onChange={onSearch}
              placeholder="Ingresa el nombre del menu que deseas buscar..."
            />
            {search && (
              <button
                type="button"
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-zinc-200 hover:text-white transition-all duration-300"
                onClick={clearSearch}
              >
                <X size={20} />
              </button>
            )}
          </form>

          {loadingMenusSearch ? (
            <Spinner className="mx-auto my-6" size={40} />
          ) : menusSearch.length > 0 ? (
            <div className="container mx-auto p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {menusSearch.map((menu) => (
                <Menu key={menu._id} menu={menu} onClick={onCloseSuggestions} />
              ))}
            </div>
          ) : (
            search.length > 0 && (
              <div className="container mx-auto my-6 p-4">
                <p className="text-center text-zinc-400">No se encontraron resultados</p>
              </div>
            )
          )}
        </div>
      </Modal.Overlay>
    </Modal>
  );
};

export default ModalSearch;
