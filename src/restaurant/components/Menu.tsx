import { Link } from 'react-router-dom';
import { twMerge } from 'tailwind-merge';
import { v4 as uuidv4 } from 'uuid';
import { ChevronRight, ShoppingBag, Star } from 'lucide-react';
import { SearchedMenu } from '@/restaurant/interfaces/searched-menu';
import useCart from '@/cart/hooks/useCart';
import Avatar from '@/shared/components/Avatar';

interface MenuProps {
  menu: SearchedMenu;
  onClick?: () => void;
}

const Menu = ({ menu, onClick }: MenuProps) => {
  const { addItemsCart, getItemLength, openModalTableOrder } = useCart();

  return (
    <div className="group border border-zinc-800 rounded-md bg-zinc-800 hover:bg-opacity-50 bg-opacity-30 backdrop-blur-sm transition-colors duration-300 shadow-lg overflow-hidden">
      <div>
        <Link
          draggable={false}
          {...(onClick ? { onClick } : {})}
          to={`/r/${menu.restaurant.slug}/menus/by/${menu.slug}`}
          className="block select-none w-full h-48 overflow-hidden"
        >
          <img
            className="block w-full h-48 bg-zinc-900 object-cover object-center hover:scale-105 transition-all duration-300"
            src={menu.images.length ? menu.images[0].secure_url : '/img/default-image.jpg'}
            alt={menu.name}
          />
        </Link>
        <div className="p-4">
          <div className="flex items-center justify-between gap-3 mb-4">
            <div className="break-all flex items-center justify-center w-fit px-[10px] py-[2px] border border-sky-800 text-center bg-sky-800 bg-opacity-10 text-sky-500 rounded-md">
              <span className="text-xs line-clamp-1">{menu.category.name}</span>
            </div>

            <Link
              {...(onClick ? { onClick } : {})}
              to={`/r/${menu.restaurant.slug}/menus/by/${menu.slug}`}
              className="p-1 text-zinc-600 hover:text-white transition-all duration-300"
            >
              <ChevronRight size={24} />
            </Link>
          </div>

          <div className="flex flex-col gap-4">
            <Link {...(onClick ? { onClick } : {})} to={`/r/${menu.restaurant.slug}/menus/by/${menu.slug}`} className="block">
              <div className="break-all min-h-[20px] mb-2">
                <h2 className="line-clamp-1 text-zinc-300 hover:text-white transition-colors text-base uppercase font-bold">{menu.name}</h2>
              </div>
              <div className="break-all mb-2">
                <p className="line-clamp-1 text-xs font-medium bg-green-800 bg-opacity-20 w-fit py-1 px-3 rounded-md border border-green-800 border-opacity-30">
                  S/. {menu.price}
                </p>
              </div>

              <div className="min-h-[40px] break-all mb-2">
                <p className="line-clamp-2 text-sm text-zinc-400">{menu.description}</p>
              </div>
            </Link>

            <div className="flex gap-2 justify-between items-center">
              <div className={'select-none flex items-center gap-2'}>
                <Avatar url={menu.restaurant.logo.secure_url} alt={menu.restaurant.name} storieId="123" />
                <div className="leading-none w-full h-fit flex flex-col justify-center gap-[3px]">
                  <Link
                    {...(onClick ? { onClick } : {})}
                    to={`/r/${menu.restaurant.slug}`}
                    draggable={false}
                    className="line-clamp-1 text-zinc-400 hover:text-zinc-300 transition-all duration-300 text-[16px] font-bold webkit-line-clamp-1"
                  >
                    {menu.restaurant.name}
                  </Link>
                  <p className="line-clamp-1 text-[14px] font-medium text-zinc-400 webkit-line-clamp-1">{menu.restaurant.address}</p>
                </div>
              </div>
              {menu.ratings.length > 0 && (
                <div className="flex items-center justify-end gap-1 text-xs font-medium text-yellow-400">
                  <span>{menu.ratings.reduce((acc, rating) => acc + rating.rating, 0) / menu.ratings.length}</span>
                  <Star size={16} fill="#FBBF24" />
                </div>
              )}
            </div>
            <div className="flex flex-wrap gap-2 items-center w-full">
              <button
                type="button"
                className={twMerge(
                  'flex-1 text-center animate-fade-in whitespace-nowrap py-3 px-4 text-sm uppercase bg-pink-600 hover:bg-pink-700 transition-colors duration-500 font-semibold text-white rounded-full',
                  menu.stock === 0 && 'bg-opacity-50 bg-gray-600 hover:bg-gray-600 hover:bg-opacity-50 cursor-not-allowed',
                )}
                disabled={menu.stock === 0}
                onClick={() =>
                  openModalTableOrder({
                    cartId: uuidv4(),
                    coupon: null,
                    discount: 0,
                    items: [
                      {
                        id: menu._id,
                        description: menu.description,
                        discount: menu.discount,
                        image: menu.images[0],
                        name: menu.name,
                        price: menu.price,
                        quantity: 1,
                        restaurant: {
                          id: menu.restaurant._id,
                          name: menu.restaurant.name,
                          slug: menu.restaurant.slug,
                          logo: menu.restaurant.logo,
                          address: menu.restaurant.address,
                        },
                        slug: menu.slug,
                        stock: menu.stock,
                        total: menu.price,
                      },
                    ],
                    total: menu.price,
                    subtotal: menu.price,
                    restaurant: {
                      id: menu.restaurant._id,
                      name: menu.restaurant.name,
                      slug: menu.restaurant.slug,
                      logo: menu.restaurant.logo,
                      address: menu.restaurant.address,
                    },
                  })
                }
              >
                {menu.stock === 0 ? 'Agotado' : 'Ordenar en mesa'}
              </button>
              <button
                type="button"
                className={twMerge(
                  'relative text-zinc-400 w-[50px] h-[50px] flex items-center justify-center transition-all duration-500 rounded-full',
                  menu.stock === 0
                    ? 'bg-opacity-50 bg-gray-600 hover:bg-gray-600 hover:bg-opacity-50 cursor-not-allowed'
                    : 'text-zinc-400 hover:text-white active:scale-75',
                )}
                disabled={menu.stock === 0}
                onClick={() =>
                  addItemsCart({
                    id: menu._id,
                    slug: menu.slug,
                    total: menu.price,
                    description: menu.description,
                    discount: menu.discount,
                    name: menu.name,
                    price: menu.price,
                    quantity: 1,
                    image: menu.images[0],
                    stock: menu.stock,
                    restaurant: {
                      id: menu.restaurant._id,
                      name: menu.restaurant.name,
                      slug: menu.restaurant.slug,
                      logo: menu.restaurant.logo,
                      address: menu.restaurant.address,
                    },
                  })
                }
              >
                <ShoppingBag size={24} />

                {getItemLength(menu.restaurant._id, menu._id) > 0 && (
                  <span className="absolute -top-2 -right-2 bg-pink-600 text-xs text-white rounded-full w-[20px] h-[20px] flex items-center justify-center">
                    {getItemLength(menu.restaurant._id, menu._id)}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Menu;
