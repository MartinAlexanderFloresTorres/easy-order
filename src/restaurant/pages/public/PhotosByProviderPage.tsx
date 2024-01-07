import useRestaurantPublic from '@/restaurant/hooks/useRestaurantPublic';
import Spinner from '@/shared/components/Spinner';
import { showImage } from '@/shared/helpers';

const PhotosByProviderPage = () => {
  const { restaurant, loading } = useRestaurantPublic();

  if (loading)
    return (
      <div className="p-4">
        <Spinner className="mx-auto" />
      </div>
    );

  if (!restaurant) return null;
  return (
    <div className="container mx-auto p-4">
      <div
        className="grid gap-4 p-4 rounded-md shadow-md bg-zinc-800 border border-zinc-700 border-opacity-50"
        style={{
          gridTemplateColumns: 'repeat(auto-fill, minmax(210px, 1fr))',
          gridTemplateRows: 'repeat(auto-fill, minmax(210px, 1fr))',
        }}
      >
        {restaurant.gallery.length > 0 ? (
          restaurant.gallery.map((image) => (
            <button
              key={image._id}
              type="button"
              onClick={() =>
                showImage({
                  src: image.secure_url,
                  alt: restaurant.name,
                  imageWidth: 800,
                })
              }
              className="max-h-[210px] min-w-[210px] h-[210px] block select-none flex-1 overflow-hidden hover:opacity-50 transition-opacity duration-300"
            >
              <img
                onLoad={(e) => {
                  const currentTarget = e.currentTarget as HTMLImageElement;
                  currentTarget.src = image.secure_url;
                }}
                src={image.secure_url}
                alt={restaurant.name}
                className="w-full h-full object-cover"
              />
            </button>
          ))
        ) : (
          <div className="text-center text-white col-span-full row-span-full flex items-center justify-center text-xl font-semibold">
            No hay fotos
          </div>
        )}
      </div>
    </div>
  );
};

export default PhotosByProviderPage;
