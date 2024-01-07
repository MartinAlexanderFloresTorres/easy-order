import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import { ShoppingBag, Star } from 'lucide-react';
import ClientAxios from '@/config/ClientAxios';
import { SearchedMenuBySlug } from '@/restaurant/interfaces';
import { ErrorMessage } from '@/shared/interfaces';
import Avatar from '@/shared/components/Avatar';
import { showImage } from '@/shared/helpers';
import useCart from '@/cart/hooks/useCart';
import { twMerge } from 'tailwind-merge';
import { v4 as uuidv4 } from 'uuid';

const MenuBySlugPage = () => {
  const [menu, setMenu] = useState<SearchedMenuBySlug | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const { slug, provider } = useParams();

  const { addItemsCart, getItemLength, changeOrder, openModalTableOrder } = useCart();

  useEffect(() => {
    if (slug && provider) {
      (async () => {
        try {
          const { data } = await ClientAxios.get<SearchedMenuBySlug>(`/menu/by/${provider}/${slug}`);
          console.log(data);

          setMenu(data);
        } catch (error) {
          console.log(error);
          const { response } = error as ErrorMessage;
          toast.error(response.data.message);
        } finally {
          setLoading(false);
        }
      })();
    }
  }, [slug, provider, changeOrder]);

  if (loading) return <div>Cargando...</div>;

  if (!menu) return <div>No se encontró el menú</div>;

  return (
    <>
      <div className="max-w-2xl mx-auto p-4">
        <div className="border border-zinc-800 rounded-md bg-zinc-800 hover:bg-opacity-50 bg-opacity-30 backdrop-blur-sm transition-colors duration-300 shadow-lg overflow-hidden">
          <div className="basis-auto flex flex-wrap items-center justify-center">
            {menu.images.map((image) => (
              <button
                key={image._id}
                type="button"
                onClick={() =>
                  showImage({
                    src: image.secure_url,
                    alt: menu.name,
                    imageWidth: 800,
                  })
                }
                className="max-h-[210px] min-w-[210px] h-[210px] block select-none flex-1 overflow-hidden"
              >
                <img
                  onLoad={(e) => {
                    const currentTarget = e.currentTarget as HTMLImageElement;
                    currentTarget.classList.remove('animate-pulse');
                  }}
                  onError={(e) => {
                    const currentTarget = e.currentTarget as HTMLImageElement;
                    currentTarget.classList.remove('animate-pulse');
                    currentTarget.src = '/img/default-image.jpg';
                  }}
                  className="block w-full h-full animate-pulse bg-zinc-900 object-cover object-center hover:scale-105 transition-all duration-300"
                  src={image.secure_url}
                  alt={menu.name}
                />
              </button>
            ))}
          </div>
          <div className="p-4">
            <div className="flex items-center justify-between gap-3 mb-4">
              <div className="flex items-center justify-center w-fit px-[10px] py-[2px] border border-sky-800 text-center bg-sky-800 bg-opacity-10 text-sky-500 rounded-md">
                <span className="text-sm line-clamp-1">{menu.category.name}</span>
              </div>
            </div>

            <div className="w-full">
              <div className="block mb-4">
                <h2 className="line-clamp-1 text-zinc-300 hover:text-white transition-colors text-base uppercase font-bold mb-2">{menu.name}</h2>
                <p className="line-clamp-1 text-sm font-medium mb-2 bg-green-800 bg-opacity-20 w-fit py-1 px-3 rounded-md border border-green-800 border-opacity-30">
                  S/. {menu.price}
                </p>

                <p className="line-clamp-2 text-sm text-zinc-400 mb-2">{menu.description}</p>

                {menu.ingredients.length > 0 && (
                  <div className="mb-4">
                    <h2 className="text-sm font-bold text-zinc-300 mb-2 uppercase">Ingredientes</h2>
                    <div className="flex items-center gap-2">
                      {menu.ingredients.map((ingredient) => (
                        <p
                          key={ingredient}
                          className="px-6 capitalize py-2 bg-zinc-800 bg-opacity-80 border border-zinc-700 border-opacity-20 rounded-2xl shadow-sm shadow-zinc-800 text-sm text-zinc-400"
                        >
                          {ingredient}
                        </p>
                      ))}
                    </div>
                  </div>
                )}

                {menu.nutritionalInformation.length > 0 && (
                  <div className="mb-4">
                    <h2 className="text-sm font-bold text-zinc-300 mb-2 uppercase">Información nutricional</h2>
                    <div className="flex items-center gap-2">
                      {menu.nutritionalInformation.map((info) => (
                        <p
                          key={info._id}
                          className="px-6 capitalize py-2 bg-zinc-800 bg-opacity-80 border border-zinc-700 border-opacity-20 rounded-2xl shadow-sm shadow-zinc-800 text-sm text-zinc-400"
                        >
                          {info.name} - {info.value}
                        </p>
                      ))}
                    </div>
                  </div>
                )}

                <div className="flex gap-2 items-center w-full">
                  <button
                    type="button"
                    className={twMerge(
                      'max-w-xs w-full text-center animate-fade-in whitespace-nowrap py-3 px-4 text-sm uppercase bg-pink-600 hover:bg-pink-700 transition-colors duration-500 font-semibold text-white rounded-full',
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
                    {menu.stock === 0 ? 'Agotado' : 'Ordenar ahora'}
                  </button>
                  <button
                    type="button"
                    className="relative w-[50px] h-[50px] flex items-center justify-center text-zinc-400 hover:text-white transition-colors duration-500 rounded-full"
                    disabled={menu.stock === 0}
                    onClick={() =>
                      addItemsCart({
                        id: menu._id,
                        name: menu.name,
                        price: menu.price,
                        quantity: 1,
                        image: menu.images[0],
                        description: menu.description,
                        discount: 0,
                        restaurant: {
                          id: menu.restaurant._id,
                          name: menu.restaurant.name,
                          logo: menu.restaurant.logo,
                          address: menu.restaurant.address,
                          slug: menu.restaurant.slug,
                        },
                        slug: menu.slug,
                        stock: menu.stock,
                        total: menu.price,
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

              <div className="flex gap-2 justify-between items-center">
                <div className={'select-none flex items-center gap-2'}>
                  <Avatar url={menu.restaurant.logo.secure_url} alt={menu.restaurant.name} storieId="123" />
                  <div className="leading-none w-full h-fit flex flex-col justify-center gap-[3px]">
                    <h2 className="text-zinc-400 hover:text-zinc-300 transition-all duration-300 text-[16px] font-bold webkit-line-clamp-1">
                      {menu.restaurant.name}
                    </h2>
                    <p className="text-[14px] font-medium text-zinc-400 webkit-line-clamp-1">{menu.restaurant.address}</p>
                  </div>
                </div>
                {menu.ratings.length > 0 && (
                  <div className="flex items-center justify-end gap-1 text-sm font-medium text-yellow-400">
                    <span>{menu.ratings.reduce((acc, rating) => acc + rating.rating, 0) / menu.ratings.length}</span>
                    <Star size={16} fill="#FBBF24" />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MenuBySlugPage;
