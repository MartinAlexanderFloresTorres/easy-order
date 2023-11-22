import { SearchIcon } from 'lucide-react';
import usePublic from '@/shared/hooks/usePublic';

const Search = () => {
  const { onOpenModalSearch } = usePublic();

  return (
    <button
      className="select-none w-[50px] h-[50px] min-w-[50px] min-h-[50px] md:w-full md:h-auto flex items-center gap-2 border border-zinc-700 border-opacity-50 rounded-full px-3 py-2 bg-zinc-800 bg-opacity-30 hover:bg-opacity-60  outline-none focus:border-opacity-90 transition-colors duration-300"
      onClick={onOpenModalSearch}
    >
      <SearchIcon size={20} className="text-zinc-400" />
      <p className="hidden md:block text-left w-full whitespace-nowrap line-clamp-1  text-base text-zinc-500 ">Buscar restaurantes o platillos...</p>
    </button>
  );
};

export default Search;
