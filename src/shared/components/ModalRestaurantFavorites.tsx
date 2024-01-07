import { Link } from 'react-router-dom';
import { useState } from 'react';
import { Star, X } from 'lucide-react';
import RestaurantPreview from '@/restaurant/components/RestaurantPreview';
import Modal from '@/shared/components/Modal';
import usePublic from '@/shared/hooks/usePublic';

interface ModalCartProps {
  onClose: () => void;
}

let timer: NodeJS.Timeout | null = null;

const ModalRestaurantFavorites = ({ onClose }: ModalCartProps) => {
  const [isClose, setIsClose] = useState(false);

  const { restaurantsFavorites } = usePublic();

  const onCloseModal = () => {
    if (timer) clearTimeout(timer);

    if (isClose) {
      onClose();
      setIsClose(false);
      return;
    }

    setIsClose(true);
    timer = setTimeout(() => {
      onClose();
      setIsClose(false);
    }, 200);
  };

  return (
    <Modal onClose={onCloseModal} isClose={isClose} className="bg-black bg-opacity-50 backdrop-blur-sm">
      <Modal.Overlay onClose={onCloseModal}>
        <div className="animate-fade-in select-none border border-zinc-700 border-opacity-50 backdrop-blur-sm max-w-3xl w-full mx-auto overflow-auto">
          <div className="sticky top-0 z-10 backdrop-blur-sm border-b border-b-zinc-700 border-opacity-50 bg-zinc-800 bg-opacity-80 flex items-stretch justify-between text-center">
            <div className="px-4 py-3 flex items-center text-center gap-4 border-r border-r-zinc-700 border-opacity-50">
              <Star className="min-w-[50px] min-h-[50px] w-[50px] h-[50px] text-yellow-400" fill={restaurantsFavorites.length <= 0 ? 'none' : 'currentColor'} />
            </div>
            <div className="px-4 py-3 flex items-center justify-center text-center flex-1">
              <h3 className="text-2xl font-semibold text-gray-200 uppercase text-center">
                <span className="text-yellow-400">Mis</span> Favoritos
              </h3>
            </div>
            <div className="px-4 py-3 flex items-center justify-end text-center gap-4 border-l border-l-zinc-700 border-opacity-50">
              <button type="button" className="min-w-[40px] min-h-[40px] w-[40px] h-[40px] flex items-center justify-center px2-4 py- rounded-full bg-zinc-700 bg-opacity-50 hover:bg-opacity-100 transition-all duration-300 text-gray-300" onClick={onCloseModal}>
                <X size={24} />
              </button>
            </div>
          </div>

          <div className="bg-zinc-900 bg-opacity-90">
            {restaurantsFavorites.length <= 0 ? (
              <div className="px-4 py-20 bg-zinc-800 bg-opacity-50 text-center animate-fade-in">
                <h2 className="font-extrabold text-center uppercase text-gray-300 mb-4">Restaurantes Favoritos</h2>
                <p className="text-gray-400 text-center mb-6 max-w-lg mx-auto">No tienes restaurantes favoritos, agrega restaurantes a tus favoritos para poder verlos aquí.</p>
                <Link to="/restaurants" className="inline-block bg-yellow-500 text-black font-semibold px-4 py-2 rounded-full" onClick={onCloseModal}>
                  Ver Restaurantes
                </Link>
              </div>
            ) : (
              <div className="p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {restaurantsFavorites.map((restaurant) => (
                  <RestaurantPreview key={restaurant._id} restaurant={restaurant} onClick={onCloseModal} />
                ))}
              </div>
            )}
          </div>
        </div>
      </Modal.Overlay>
    </Modal>
  );
};

export default ModalRestaurantFavorites;
