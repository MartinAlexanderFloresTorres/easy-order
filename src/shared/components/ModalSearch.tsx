import { useState } from 'react';
import usePublic from '@/shared/hooks/usePublic';
import Modal from './Modal';
import { SearchIcon, X } from 'lucide-react';
import { twMerge } from 'tailwind-merge';

let timer: NodeJS.Timeout | null = null;
const ModalSearch = () => {
  const [isClose, setIsClose] = useState(false);

  const { onCloseModalSearch, clearSearch, onSearch, search } = usePublic();

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
      className="h-screen flex items-center flex-col justify-center bg-zinc-900 bg-opacity-30 backdrop-blur-md"
      onClose={onCloseSuggestions}
      isClose={isClose}
    >
      <Modal.Overlay onClose={onCloseSuggestions} className="block pt-10">
        <div className="max-w-xl mx-auto w-full">
          <form className="relative w-full" onSubmit={onSubmit}>
            <SearchIcon size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-zinc-400" />
            <input
              type="text"
              className={twMerge(
                'w-full border pl-9 border-zinc-700 border-opacity-50 rounded-full py-2 text-sm text-zinc-400 bg-zinc-800 hover:bg-opacity-60 bg-opacity-50 outline-none focus:border-opacity-90 transition-colors duration-300 placeholder:text-zinc-600',
                search.length <= 0 ? 'pr-2' : 'pr-9',
              )}
              autoFocus
              value={search}
              onChange={onSearch}
              placeholder="Buscar restaurantes o platillos..."
            />
            {search && (
              <button
                type="button"
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-zinc-400 hover:text-white transition-all duration-300"
                onClick={clearSearch}
              >
                <X size={20} />
              </button>
            )}
          </form>
        </div>
      </Modal.Overlay>
    </Modal>
  );
};

export default ModalSearch;
