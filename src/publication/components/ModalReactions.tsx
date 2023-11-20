import { useState } from 'react';
import { twMerge } from 'tailwind-merge';
import { X } from 'lucide-react';
import Modal from '@/shared/components/Modal';
import { REACTIONS } from '@/publication/constants/reactions';
import UserReaction from '@/publication/components/UserReaction';

interface ModalReactionsProps {
  onClose: () => void;
}

let timer: NodeJS.Timeout | null = null;

const ModalReactions = ({ onClose }: ModalReactionsProps) => {
  const [isClose, setIsClose] = useState(false);

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

  const classActive = (active: boolean, color: string) => active && twMerge('rounded-none hover:bg-transparent border-b-2 border-b-blue-500', color);

  return (
    <Modal
      onClose={onCloseModalStorie}
      isClose={isClose}
      className={'flex flex-col items-center justify-center overflow-hidden bg-zinc-900 bg-opacity-80'}
    >
      <Modal.Overlay onClose={onCloseModalStorie}>
        <div className="select-none bg-zinc-800 border border-zinc-700 border-opacity-50 w-full max-w-3xl  max-h-screen overflow-auto">
          <div className="sticky z-10 top-0 border-b border-b-zinc-700 border-opacity-50 bg-zinc-800 flex items-start lg:items-center justify-between text-center gap-1 px-4 py-3">
            <div className="flex items-center text-center gap-1 flex-1 flex-wrap">
              <button
                className={twMerge(
                  'flex items-center justify-center gap-1 px-4 py-2 text-zinc-300 hover:bg-zinc-700 transition-all duration-300 text-center rounded-lg text-sm',
                  classActive(true, 'text-blue-500'),
                )}
              >
                Todas
              </button>
              <button
                className={twMerge(
                  'flex items-center justify-center gap-1 px-6 py-2 text-zinc-300 hover:bg-zinc-700 transition-all duration-300 text-center rounded-lg text-sm',
                  classActive(false, 'text-blue-500'),
                )}
              >
                <img src={REACTIONS.like.url} alt={REACTIONS.like.name} />
                <span>59</span>
              </button>
              <button
                className={twMerge(
                  'flex items-center justify-center gap-1 px-6 py-2 text-zinc-300 hover:bg-zinc-700 transition-all duration-300 text-center rounded-lg text-sm',
                  classActive(false, 'text-rose-500'),
                )}
              >
                <img src={REACTIONS.love.url} alt={REACTIONS.love.name} />
                <span>59</span>
              </button>
              <button
                className={twMerge(
                  'flex items-center justify-center gap-1 px-6 py-2 text-zinc-300 hover:bg-zinc-700 transition-all duration-300 text-center rounded-lg text-sm',
                  classActive(false, 'text-yellow-500'),
                )}
              >
                <img src={REACTIONS.care.url} alt={REACTIONS.care.name} />
                <span>59</span>
              </button>

              <button
                className={twMerge(
                  'flex items-center justify-center gap-1 px-6 py-2 text-zinc-300 hover:bg-zinc-700 transition-all duration-300 text-center rounded-lg text-sm',
                  classActive(false, 'text-yellow-500'),
                )}
              >
                <img src={REACTIONS.laugh.url} alt={REACTIONS.laugh.name} />
                <span>59</span>
              </button>

              <button
                className={twMerge(
                  'flex items-center justify-center gap-1 px-6 py-2 text-zinc-300 hover:bg-zinc-700 transition-all duration-300 text-center rounded-lg text-sm',
                  classActive(false, 'text-yellow-500'),
                )}
              >
                <img src={REACTIONS.amazed.url} alt={REACTIONS.amazed.name} />
                <span>59</span>
              </button>

              <button
                className={twMerge(
                  'flex items-center justify-center gap-1 px-6 py-2 text-zinc-300 hover:bg-zinc-700 transition-all duration-300 text-center rounded-lg text-sm',
                  classActive(false, 'text-yellow-500'),
                )}
              >
                <img src={REACTIONS.sad.url} alt={REACTIONS.sad.name} />
                <span>59</span>
              </button>

              <button
                className={twMerge(
                  'flex items-center justify-center gap-1 px-6 py-2 text-zinc-300 hover:bg-zinc-700 transition-all duration-300 text-center rounded-lg text-sm',
                  classActive(false, 'text-yellow-500'),
                )}
              >
                <img src={REACTIONS.sad.url} alt={REACTIONS.sad.name} />
                <span>59</span>
              </button>

              <button
                className={twMerge(
                  'flex items-center justify-center gap-1 px-6 py-2 text-zinc-300 hover:bg-zinc-700 transition-all duration-300 text-center rounded-lg text-sm',
                  classActive(false, 'text-orange-500'),
                )}
              >
                <img src={REACTIONS.angry.url} alt={REACTIONS.angry.name} />
                <span>59</span>
              </button>
            </div>
            <button
              className="w-[40px] h-[40px] min-w-[40px] min-h-[40px] flex items-center justify-center bg-zinc-700 bg-opacity-50 hover:bg-opacity-100 transition-all duration-300 rounded-full"
              onClick={onCloseModalStorie}
            >
              <X size={24} />
            </button>
          </div>

          <div className="pb-4">
            <UserReaction onClose={onClose} />
            <UserReaction onClose={onClose} />
            <UserReaction onClose={onClose} />
            <UserReaction onClose={onClose} />
          </div>
        </div>
      </Modal.Overlay>
    </Modal>
  );
};

export default ModalReactions;
