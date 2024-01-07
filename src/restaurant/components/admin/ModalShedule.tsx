import { useState } from 'react';
import { X } from 'lucide-react';
import Modal from '@/shared/components/Modal';
import useRestaurant from '@/restaurant/hooks/useRestaurant';

interface ModalFormCategoryProps {
  onClose: () => void;
}

let timer: NodeJS.Timeout | null = null;

const ModalShedule = ({ onClose }: ModalFormCategoryProps) => {
  const [isClose, setIsClose] = useState(false);

  const { restaurant } = useRestaurant();

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

  if (!restaurant) return null;

  return (
    <Modal onClose={onCloseModal} isClose={isClose} className="bg-black bg-opacity-50 backdrop-blur-sm">
      <Modal.Overlay onClose={onCloseModal}>
        <div className="animate-fade-in select-none border border-zinc-700 border-opacity-50 backdrop-blur-sm max-w-xl w-full mx-auto overflow-auto">
          <div className="sticky top-0 z-10 backdrop-blur-sm border-b border-b-zinc-700 border-opacity-50 bg-zinc-800 bg-opacity-80 flex items-stretch justify-between text-center">
            <div className="px-4 py-3 flex items-center text-center gap-4 border-r border-r-zinc-700 border-opacity-50">
              <img
                src={restaurant.logo ? restaurant.logo.secure_url : '/img/default-logo.png'}
                alt={restaurant.name}
                className="min-w-[50px] min-h-[50px] w-[50px] h-[50px] rounded-full object-cover"
              />
            </div>
            <div className="px-4 py-3 flex items-center justify-center text-center flex-1">
              <h3 className="text-2xl font-semibold text-gray-200 uppercase text-center">Horario</h3>
            </div>
            <div className="px-4 py-3 flex items-center justify-end text-center gap-4 border-l border-l-zinc-700 border-opacity-50">
              <button
                type="button"
                className="min-w-[40px] min-h-[40px] w-[40px] h-[40px] flex items-center justify-center px2-4 py- rounded-full bg-zinc-700 bg-opacity-50 hover:bg-opacity-100 transition-all duration-300 text-gray-300"
                onClick={onCloseModal}
              >
                <X size={24} />
              </button>
            </div>
          </div>

          <div className=" bg-zinc-900 bg-opacity-80 md:flex-1">
            <div className="px-4 py-3 border-b border-b-zinc-700 border-opacity-50 flex items-center justify-center text-center">
              <p className="font-normal text-center text-gray-300">
                {restaurant.openingHours} - {restaurant.closingTime}
              </p>
            </div>

            <form className="p-5 flex-col space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col space-y-1">
                  <label htmlFor="name" className="text-sm font-semibold text-gray-400">
                    Horario de apertura (AM)
                  </label>
                  <input
                    type="time"
                    name="openingHours"
                    id="openingHours"
                    autoComplete="off"
                    value={restaurant.openingHours}
                    className="w-full px-4 py-2 border border-zinc-700 bg-zinc-900 bg-opacity-50 rounded-lg focus:outline-none focus:border-zinc-600 placeholder:text-zinc-500"
                  />
                </div>

                <div className="flex flex-col space-y-1">
                  <label htmlFor="name" className="text-sm font-semibold text-gray-400">
                    Horario de cierre (PM)
                  </label>
                  <input
                    type="time"
                    name="closingTime"
                    id="closingTime"
                    value={restaurant.closingTime}
                    autoComplete="off"
                    className="w-full px-4 py-2 border border-zinc-700 bg-zinc-900 bg-opacity-50 rounded-lg focus:outline-none focus:border-zinc-600 placeholder:text-zinc-500"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end">
                <button
                  type="submit"
                  className="w-full md:w-fit whitespace-nowrap px-6 py-3 bg-pink-600 hover:bg-pink-700 transition-all duration-300 rounded-md font-semibold"
                >
                  Guardar horario
                </button>
              </div>
            </form>
          </div>
        </div>
      </Modal.Overlay>
    </Modal>
  );
};

export default ModalShedule;
