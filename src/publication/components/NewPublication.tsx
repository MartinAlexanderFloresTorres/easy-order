import { useState } from 'react';
import { Film, Image } from 'lucide-react';
import Avatar from '@/shared/components/Avatar';
import ModalNewPublication from '@/publication/components/ModalNewPublication';
import { ParamsPublication } from '@/publication/interfaces';
import useAccount from '@/account/hooks/useAccount';

const DEFAULT_PARAMS = { image: false, video: false };

const NewPublication = () => {
  const [showModalNewPublication, setShowModalNewPublication] = useState(false);
  const [params, setParams] = useState<ParamsPublication>(DEFAULT_PARAMS);

  const { user } = useAccount();

  const openModalNewPublication = (image: boolean, video: boolean) => {
    setParams({ image, video });
    setShowModalNewPublication(true);
  };

  const closeModalNewPublication = () => {
    setParams(DEFAULT_PARAMS);
    setShowModalNewPublication(false);
  };

  if (!user) return null;
  return (
    <>
      <div className="w-full bg-zinc-800 bg-opacity-50 backdrop-blur-md rounded-md shadow-md">
        <div className="p-3 flex items-center justify-between gap-4">
          <Avatar alt={user.name} storieId="213" url={user.photo ? user.photo.secure_url : '/img/default-user.png'} />
          <button
            className="text-left px-4 py-3 bg-zinc-800 hover:bg-zinc-700 hover:bg-opacity-50 transition-all duration-300 text-zinc-400 rounded-lg flex-1 active:bg-opacity-80"
            onClick={() => openModalNewPublication(false, false)}
          >
            ¿Qué estás pensando?
          </button>
        </div>

        <div className="min-h-[70px] relative border-t border-t-zinc-700 border-opacity-50 flex items-center justify-between gap-2 p-2 select-none">
          <button
            className="flex cursor-pointer items-center gap-2 justify-center text-center px-4 py-2 hover:bg-zinc-800 transition-all duration-300 text-zinc-400 rounded-lg flex-1 active:bg-opacity-60"
            onClick={() => openModalNewPublication(true, false)}
          >
            <Image size={24} />
            <span>Foto</span>
          </button>
          <button
            className="flex items-center gap-2 justify-center text-center px-4 py-2 hover:bg-zinc-800 transition-all duration-300 text-zinc-400 rounded-lg flex-1 active:bg-opacity-60"
            onClick={() => openModalNewPublication(false, true)}
          >
            <Film size={24} />
            <span>Video</span>
          </button>
        </div>
      </div>

      {showModalNewPublication && <ModalNewPublication onClose={closeModalNewPublication} params={params} />}
    </>
  );
};

export default NewPublication;
