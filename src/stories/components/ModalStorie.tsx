import { useState } from 'react';
import { twMerge } from 'tailwind-merge';
import { Link, useNavigate } from 'react-router-dom';
import Modal from '@/shared/components/Modal';
import { Globe2, Heart, MoreHorizontal, Play, Plus, Send, Volume2, X } from 'lucide-react';

interface Storie {
  id: string;
  name: string;
  image: string;
}

interface ModalStorieProps {
  onClose: () => void;
  stories: Storie[];
  showClose: boolean;
}

let timer: NodeJS.Timeout | null = null;

const ModalStorie = ({ onClose, showClose }: ModalStorieProps) => {
  const [isClose, setIsClose] = useState(false);
  const [focusComment, setFocusComment] = useState(false);

  // Hooks
  const navigate = useNavigate();

  const onCloseModalStorie = () => {
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
    <Modal
      onClose={onCloseModalStorie}
      isClose={isClose}
      className={twMerge(
        ' flex flex-col items-center justify-center overflow-hidden',
        !showClose ? 'bg-transparent' : 'bg-zinc-900 backdrop-blur-lg lg:backdrop-blur-none lg:bg-opacity-100  bg-opacity-80',
      )}
    >
      <div className="w-full h-full flex">
        <div className="hidden lg:flex flex-col w-[40vh] h-full bg-zinc-800">
          <div className="sticky top-0 bg-zinc-800 p-3 border-b border-b-zinc-700 border-opacity-40">
            {showClose ? (
              <button
                onClick={onCloseModalStorie}
                className="flex items-center justify-center w-9 h-9 rounded-full bg-zinc-900 hover:bg-opacity-50 transition-colors"
              >
                <X size={24} className="text-white" />
              </button>
            ) : (
              <Link
                to="/"
                className="block rounded-md w-fit text-center whitespace-nowrap bg-gradient-to-l from-pink-700 to-pink-400 transition-all duration-100 p-[1px] uppercase text-xs font-semibold"
              >
                <div className="px-4 py-[10px] rounded-md  text-center bg-zinc-800 text-pink-600 hover:text-pink-500 transition-all duration-300">
                  Ir a inicio
                </div>
              </Link>
            )}
          </div>

          <div className="flex-1 overflow-auto">
            <div className="p-4 border-b border-b-zinc-700 border-opacity-40">
              <h2 className="text-lg font-bold">Historias</h2>
            </div>
            <div className="p-4 border-b border-b-zinc-700 border-opacity-40">
              <h3 className="text-xs font-semibold mb-2">Tu historia</h3>
              <button className="w-full flex items-center justify-between gap-2">
                <div className="flex items-center justify-center  min-w-[60px] min-h-[60px] rounded-full bg-zinc-600 bg-opacity-50 transition-colors">
                  <Plus size={24} className="text-sky-600" />
                </div>

                <div className="text-left w-full">
                  <span className="text-sm font-semibold text-white line-clamp-1">Crear una historia</span>
                  <span className="block text-xs text-zinc-400">Comparte una foto o escribe algo</span>
                </div>
              </button>
            </div>

            <div className="p-4 border-b border-b-zinc-700 border-opacity-40">
              <h2 className="text-lg font-bold mb-2">Todas las historias</h2>
              <div className="flex flex-col gap-2">
                <button
                  className={twMerge(
                    'w-full  flex items-center gap-2 py-3 px-4 rounded-md bg-zinc-700 hover:bg-opacity-60 bg-opacity-30 transition-all duration-300',
                    true && 'bg-opacity-90',
                  )}
                >
                  <div className="min-w-[60px] min-h-[60px] w-[60px] h-[60px] select-none flex items-center border-[3px] border-pink-600 border-opacity-80 hover:border-opacity-100 bg-zinc-800 justify-center rounded-full cursor-pointer transition-all">
                    <img className="block w-full h-full rounded-full" src="/user.webp" alt="usuario" />
                  </div>
                  <div>
                    <div className="text-left w-full">
                      <span className="text-sm font-semibold text-white line-clamp-1">Martin Dev</span>
                      <span className="block text-xs text-zinc-400">12 h</span>
                    </div>
                  </div>
                </button>

                <button
                  className={twMerge(
                    'w-full  flex items-center gap-2 py-3 px-4 rounded-md bg-zinc-700 hover:bg-opacity-60 bg-opacity-30 transition-all duration-300',
                    false && 'bg-opacity-50',
                  )}
                >
                  <div className="min-w-[60px] min-h-[60px] w-[60px] h-[60px] select-none flex items-center border-[3px] border-pink-600 border-opacity-80 hover:border-opacity-100 bg-zinc-800 justify-center rounded-full cursor-pointer transition-all">
                    <img className="block w-full h-full rounded-full" src="/user.webp" alt="usuario" />
                  </div>
                  <div>
                    <div className="text-left w-full">
                      <span className="text-sm font-semibold text-white line-clamp-1">Martin Dev</span>
                      <span className="block text-xs text-zinc-400">12 h</span>
                    </div>
                  </div>
                </button>

                <button
                  className={twMerge(
                    'w-full  flex items-center gap-2 py-3 px-4 rounded-md bg-zinc-700 hover:bg-opacity-60 bg-opacity-30 transition-all duration-300',
                    false && 'bg-opacity-50',
                  )}
                >
                  <div className="min-w-[60px] min-h-[60px] w-[60px] h-[60px] select-none flex items-center border-[3px] border-pink-600 border-opacity-80 hover:border-opacity-100 bg-zinc-800 justify-center rounded-full cursor-pointer transition-all">
                    <img className="block w-full h-full rounded-full" src="/user.webp" alt="usuario" />
                  </div>

                  <div className="text-left w-full">
                    <span className="text-sm font-semibold text-white line-clamp-1">Martin Dev</span>
                    <span className="block text-xs text-zinc-400">12 h</span>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:p-2 h-full w-full">
          <div
            className="w-full p-2 lg:p-0 lg:w-fit h-full mx-auto"
            onClick={(e) => {
              if (showClose) {
                if (e.target === e.currentTarget) onCloseModalStorie();
              }
            }}
          >
            <div className="w-full sm:w-[54vh] mx-auto h-full">
              <div className="flex flex-col p-2 bg-zinc-800 rounded-md h-full">
                <div className="w-full h-[4px] bg-zinc-700 mb-2">
                  <div className="w-[60%] h-[4px] bg-pink-600"></div>
                </div>

                <div className="flex justify-between gap-2">
                  <div className="w-fit flex items-center gap-2">
                    <div className="min-w-[40px] min-h-[40px] w-[40px] h-[40px] select-none flex items-center border-[3px] border-pink-600 border-opacity-80 hover:border-opacity-100 bg-zinc-800 justify-center rounded-full cursor-pointer transition-all">
                      <img className="block w-full h-full rounded-full" src="/user.webp" alt="usuario" />
                    </div>

                    <span className="text-sm font-semibold text-white line-clamp-1">Martin Dev</span>
                    <span className="block text-xs text-zinc-400 whitespace-nowrap">12 h</span>
                    <button>
                      <Globe2 size={14} />
                    </button>
                  </div>

                  <div className="flex items-center gap-2">
                    <div className="hidden lg:flex items-center gap-2">
                      <button className="p-[3px] flex items-center justify-center">
                        <Play size={24} />
                      </button>
                      <button className="p-[3px] flex items-center justify-center">
                        <Volume2 size={24} />
                      </button>
                    </div>
                    <button className="p-[3px] flex items-center justify-center">
                      <MoreHorizontal size={24} />
                    </button>
                    <button
                      onClick={() => {
                        onCloseModalStorie();
                        if (!showClose) navigate('/');
                      }}
                      className="lg:hidden p-[3px] flex items-center justify-center"
                    >
                      <X size={24} />
                    </button>
                  </div>
                </div>
                <div className=" flex-1 flex items-center justify-center">
                  <p>content</p>
                </div>

                <div className="w-full">
                  <div className="p-1 flex items-center gap-2 mb-2">
                    <div className="flex items-center gap-2">
                      <Heart size={16} />
                      <Heart size={16} />
                      <Heart size={16} />
                      <Heart size={16} />
                    </div>
                    <span className="text-xs">
                      Enviado a <span className="font-semibold">Martin Dev</span>
                    </span>
                  </div>
                  <div className="flex items-center gap-2 overflow-hidden p-1">
                    <form className="relative w-full h-fit transition-all duration-300">
                      <input
                        type="text"
                        placeholder="Escribe un comentario"
                        className="block w-full bg-zinc-700 rounded-full py-2 pl-3 pr-10 text-sm text-zinc-200 placeholder:text-zinc-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-zinc-600"
                        onFocus={() => setFocusComment(true)}
                        onBlur={() => setFocusComment(false)}
                      />
                      <button className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-white transition-all duration-300">
                        <Send size={24} />
                      </button>
                    </form>

                    <div
                      className={twMerge('flex gap-2 items-center')}
                      style={{
                        animation: `${!focusComment ? 'fadeInReactions' : 'fadeOutReactions'} 0.3s ease-in-out forwards`,
                      }}
                    >
                      <button className="hover:scale-110 transition-transform duration-300">
                        <Heart size={24} />
                      </button>
                      <button className="hover:scale-110 transition-transform duration-300">
                        <Heart size={24} />
                      </button>
                      <button className="hover:scale-110 transition-transform duration-300">
                        <Heart size={24} />
                      </button>
                      <button className="hover:scale-110 transition-transform duration-300">
                        <Heart size={24} />
                      </button>
                      <button className="hover:scale-110 transition-transform duration-300">
                        <Heart size={24} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default ModalStorie;
