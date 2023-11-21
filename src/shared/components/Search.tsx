import { useState } from 'react';
import { Link } from 'react-router-dom';
import { twMerge } from 'tailwind-merge';
import { Search as SearchIcon, Star, X } from 'lucide-react';
import RestaurantPreview from '@/restaurant/components/RestaurantPreview';
import ProductPreview from '@/shared/components/products/ProductPreview';
import User from '@/shared/components/User';

const Search = () => {
  const [search, setSearch] = useState('');
  const [isShowSuggestions, setIsShowSuggestions] = useState(false);
  const [isFocusSuggestions, setIsFocusSuggestions] = useState(false);

  const clearSearch = () => {
    setSearch('');
    setIsShowSuggestions(false);
    setIsFocusSuggestions(false);
  };

  return (
    <div className="md:relative xl:max-w-xl w-full mx-auto">
      <form className="relative md:static w-full">
        <SearchIcon size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-zinc-400" />
        <input
          type="text"
          className={twMerge(
            'w-full border pl-9 border-zinc-700 border-opacity-50 rounded-full py-2 text-sm text-zinc-400 bg-zinc-800 hover:bg-opacity-60 bg-opacity-50 outline-none focus:border-opacity-90 transition-colors duration-300 placeholder:text-zinc-600',
            search.length <= 0 ? 'pr-2' : 'pr-9',
          )}
          value={search}
          onChange={(e) => setSearch(e.target.value.trimStart())}
          placeholder="Buscar restaurantes o platillos..."
          onFocus={() => setIsShowSuggestions(true)}
          onBlur={() => {
            if (!isFocusSuggestions) {
              setIsShowSuggestions(false);
            }
          }}
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

      {isShowSuggestions && (
        <div
          className="xl:max-w-xl search__suggestions absolute top-full md:top-[48px] left-0 xl:left-auto w-full bg-zinc-900 bg-opacity-[0.98] border border-zinc-800 border-opacity-80 md:rounded-b-3xl rounded-t-none shadow-lg overflow-auto flex flex-col"
          onMouseEnter={() => setIsFocusSuggestions(true)}
          onMouseLeave={() => setIsFocusSuggestions(false)}
        >
          <div className="container flex-1 mx-auto p-4 flex flex-col gap-5">
            <div className="flex items-center justify-between gap-2">
              <User className="md:hidden flex" />
              <button
                type="button"
                className="ml-auto flex items-center gap-2 w-10 h-10 justify-center rounded-full hover:bg-zinc-800 hover:bg-opacity-40 transition-colors text-zinc-400 hover:text-zinc-200 text-sm font-semibold"
                onClick={() => setIsShowSuggestions(false)}
              >
                <X size={20} />
              </button>
            </div>

            <div className="w-full">
              <p className="text-[14px] font-medium text-zinc-400">Restaurantes</p>
              <div className="mt-2 flex flex-wrap gap-2">
                <RestaurantPreview
                  onClick={clearSearch}
                  className="min-w-fit w-fit pl-3 pr-5 py-2 text-xs bg-zinc-800 hover:bg-opacity-70 rounded-full text-zinc-400 hover:text-zinc-300 transition-all duration-300"
                >
                  <div className="flex items-center justify-end gap-1 text-xs font-medium text-yellow-400">
                    <Star size={16} fill="#FBBF24" />
                    <Star size={16} fill="#FBBF24" />
                    <Star size={16} fill="#FBBF24" />
                    <Star size={16} fill="#FBBF24" />
                    <Star size={16} />
                  </div>
                </RestaurantPreview>
                <RestaurantPreview
                  onClick={clearSearch}
                  className="min-w-fit w-fit pl-3 pr-5 py-2 text-xs bg-zinc-800 hover:bg-opacity-70 rounded-full text-zinc-400 hover:text-zinc-300 transition-all duration-300"
                >
                  <div className="flex items-center justify-end gap-1 text-xs font-medium text-yellow-400">
                    <Star size={16} fill="#FBBF24" />
                    <Star size={16} fill="#FBBF24" />
                    <Star size={16} />
                    <Star size={16} />
                    <Star size={16} />
                  </div>
                </RestaurantPreview>
                <RestaurantPreview
                  onClick={clearSearch}
                  className="min-w-fit w-fit pl-3 pr-5 py-2 text-xs bg-zinc-800 hover:bg-opacity-70 rounded-full text-zinc-400 hover:text-zinc-300 transition-all duration-300"
                >
                  <div className="flex items-center justify-end gap-1 text-xs font-medium text-yellow-400">
                    <Star size={16} fill="#FBBF24" />
                    <Star size={16} fill="#FBBF24" />
                    <Star size={16} fill="#FBBF24" />
                    <Star size={16} fill="#FBBF24" />
                    <Star size={16} />
                  </div>
                </RestaurantPreview>
                <RestaurantPreview
                  onClick={clearSearch}
                  className="min-w-fit w-fit pl-3 pr-5 py-2 text-xs bg-zinc-800 hover:bg-opacity-70 rounded-full text-zinc-400 hover:text-zinc-300 transition-all duration-300"
                >
                  <div className="flex items-center justify-end gap-1 text-xs font-medium text-yellow-400">
                    <Star size={16} fill="#FBBF24" />
                    <Star size={16} fill="#FBBF24" />
                    <Star size={16} fill="#FBBF24" />
                    <Star size={16} fill="#FBBF24" />
                    <Star size={16} fill="#FBBF24" />
                  </div>
                </RestaurantPreview>
              </div>
            </div>

            <div className="w-full">
              <p className="text-[14px] font-medium text-zinc-400">Platillos</p>
              <div className="mt-2 flex flex-wrap gap-2">
                <ProductPreview onClick={clearSearch} />
                <ProductPreview onClick={clearSearch} />
                <ProductPreview onClick={clearSearch} />
                <ProductPreview onClick={clearSearch} />
                <ProductPreview onClick={clearSearch} />
              </div>
            </div>

            <div className="w-full">
              <p className="text-[14px] font-medium text-zinc-400">Bebidas</p>
              <div className="mt-2 flex flex-wrap gap-2">
                <ProductPreview onClick={clearSearch} />
                <ProductPreview onClick={clearSearch} />
                <ProductPreview onClick={clearSearch} />
                <ProductPreview onClick={clearSearch} />
                <ProductPreview onClick={clearSearch} />
              </div>
            </div>

            <div className="w-full">
              <p className="text-[14px] font-medium text-zinc-400">Categorías</p>
              <div className="mt-2 flex gap-2 items-center justify-center flex-wrap">
                <Link
                  to="/category/by/1"
                  type="button"
                  className="flex-1 w-full max-w-[200px] justify-center h-[50px] flex items-center gap-2 pl-3 pr-1 text-xs bg-zinc-800 hover:bg-opacity-70 rounded-full text-zinc-400 hover:text-zinc-300 transition-all duration-300"
                >
                  <span>Pizza</span>
                  <div className="w-[40px] h-[40px] min-w-[40px] min-h-[40px] select-none flex items-center bg-zinc-800 justify-center rounded-full cursor-pointer transition-all">
                    <img className="block w-full h-full rounded-full" src="/user.webp" alt="usuario" />
                  </div>
                </Link>

                <Link
                  to="/category/by/1"
                  type="button"
                  className="flex-1 w-full max-w-[200px] justify-center h-[50px] flex items-center gap-2 pl-3 pr-1 text-xs bg-zinc-800 hover:bg-opacity-70 rounded-full text-zinc-400 hover:text-zinc-300 transition-all duration-300"
                >
                  <span>Pizza</span>
                  <div className="w-[40px] h-[40px] min-w-[40px] min-h-[40px] select-none flex items-center bg-zinc-800 justify-center rounded-full cursor-pointer transition-all">
                    <img className="block w-full h-full rounded-full" src="/user.webp" alt="usuario" />
                  </div>
                </Link>
                <Link
                  to="/category/by/1"
                  type="button"
                  className="flex-1 w-full max-w-[200px] justify-center h-[50px] flex items-center gap-2 pl-3 pr-1 text-xs bg-zinc-800 hover:bg-opacity-70 rounded-full text-zinc-400 hover:text-zinc-300 transition-all duration-300"
                >
                  <span>Pizza</span>
                  <div className="w-[40px] h-[40px] min-w-[40px] min-h-[40px] select-none flex items-center bg-zinc-800 justify-center rounded-full cursor-pointer transition-all">
                    <img className="block w-full h-full rounded-full" src="/user.webp" alt="usuario" />
                  </div>
                </Link>
                <Link
                  to="/category/by/1"
                  type="button"
                  className="flex-1 w-full max-w-[200px] justify-center h-[50px] flex items-center gap-2 pl-3 pr-1 text-xs bg-zinc-800 hover:bg-opacity-70 rounded-full text-zinc-400 hover:text-zinc-300 transition-all duration-300"
                >
                  <span>Pizza</span>
                  <div className="w-[40px] h-[40px] min-w-[40px] min-h-[40px] select-none flex items-center bg-zinc-800 justify-center rounded-full cursor-pointer transition-all">
                    <img className="block w-full h-full rounded-full" src="/user.webp" alt="usuario" />
                  </div>
                </Link>
                <Link
                  to="/category/by/1"
                  type="button"
                  className="flex-1 w-full max-w-[200px] justify-center h-[50px] flex items-center gap-2 pl-3 pr-1 text-xs bg-zinc-800 hover:bg-opacity-70 rounded-full text-zinc-400 hover:text-zinc-300 transition-all duration-300"
                >
                  <span>Pizza</span>
                  <div className="w-[40px] h-[40px] min-w-[40px] min-h-[40px] select-none flex items-center bg-zinc-800 justify-center rounded-full cursor-pointer transition-all">
                    <img className="block w-full h-full rounded-full" src="/user.webp" alt="usuario" />
                  </div>
                </Link>
                <Link
                  to="/category/by/1"
                  type="button"
                  className="flex-1 w-full max-w-[200px] justify-center h-[50px] flex items-center gap-2 pl-3 pr-1 text-xs bg-zinc-800 hover:bg-opacity-70 rounded-full text-zinc-400 hover:text-zinc-300 transition-all duration-300"
                >
                  <span>Pizza</span>
                  <div className="w-[40px] h-[40px] min-w-[40px] min-h-[40px] select-none flex items-center bg-zinc-800 justify-center rounded-full cursor-pointer transition-all">
                    <img className="block w-full h-full rounded-full" src="/user.webp" alt="usuario" />
                  </div>
                </Link>
                <Link
                  to="/category/by/1"
                  type="button"
                  className="flex-1 w-full max-w-[200px] justify-center h-[50px] flex items-center gap-2 pl-3 pr-1 text-xs bg-zinc-800 hover:bg-opacity-70 rounded-full text-zinc-400 hover:text-zinc-300 transition-all duration-300"
                >
                  <span>Pizza</span>
                  <div className="w-[40px] h-[40px] min-w-[40px] min-h-[40px] select-none flex items-center bg-zinc-800 justify-center rounded-full cursor-pointer transition-all">
                    <img className="block w-full h-full rounded-full" src="/user.webp" alt="usuario" />
                  </div>
                </Link>
              </div>
            </div>

            <div className="w-full">
              <p className="text-[14px] font-medium text-zinc-400">Últimas búsquedas</p>
              <div className="mt-2 flex gap-2 items-center flex-wrap">
                <button
                  type="button"
                  className="flex-1 px-3 py-2 text-xs bg-zinc-800 hover:bg-opacity-70 rounded-full text-zinc-400 hover:text-white transition-all duration-300"
                  onClick={() => setSearch('Pizza')}
                >
                  Pizza
                </button>
                <button
                  type="button"
                  className="flex-1 px-3 py-2 text-xs bg-zinc-800 hover:bg-opacity-70 rounded-full text-zinc-400 hover:text-white transition-all duration-300"
                  onClick={() => setSearch('Hamburguesa')}
                >
                  Hamburguesa
                </button>
                <button
                  type="button"
                  className="flex-1 px-3 py-2 text-xs bg-zinc-800 hover:bg-opacity-70 rounded-full text-zinc-400 hover:text-white transition-all duration-300"
                  onClick={() => setSearch('Pollo')}
                >
                  Pollo
                </button>
                <button
                  type="button"
                  className="flex-1 px-3 py-2 text-xs bg-zinc-800 hover:bg-opacity-70 rounded-full text-zinc-400 hover:text-white transition-all duration-300"
                  onClick={() => setSearch('Chifa')}
                >
                  Chifa
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Search;
