import { useState } from 'react';
import { REACTIONS } from '../constants';
import { twMerge } from 'tailwind-merge';
import { Reaction as ReactionInterface } from '@/publication/interfaces';

interface ReactionProps {
  publicationId: string;
  onReaction: (publicationId: string, reaction: ReactionInterface) => void;
  onRemoveReaction: (publicationId: string, reaction: ReactionInterface) => void;
  reactionActive: ReactionInterface | null;
  children?: React.ReactNode;
  classNameButton?: string;
  classNameReaction?: string;
  classNameIcon?: string;
  classNameReactions?: string;
  style?: React.CSSProperties;
}

let debounceTimerReaction: NodeJS.Timeout | null = null;

const Reaction = ({
  publicationId,
  reactionActive,
  classNameButton,
  classNameReaction,
  classNameIcon,
  classNameReactions,
  style,
  onReaction,
  onRemoveReaction,
  children,
}: ReactionProps) => {
  const [showReaction, setShowReaction] = useState(false);
  const [reaction, setReaction] = useState<ReactionInterface | null>(reactionActive);

  const openReaction = () => {
    if (debounceTimerReaction) clearTimeout(debounceTimerReaction);

    debounceTimerReaction = setTimeout(() => {
      setShowReaction(true);
    }, 600);
  };

  const closeReaction = () => {
    if (debounceTimerReaction) clearTimeout(debounceTimerReaction);

    debounceTimerReaction = setTimeout(() => {
      setShowReaction(false);
    }, 300);
  };

  const handleReaction = (newReaction: ReactionInterface) => {
    setShowReaction(false);

    if (reactionActive && reactionActive.name === newReaction.name) {
      onRemoveReaction(publicationId, newReaction);
      setReaction(null);
    } else {
      onReaction(publicationId, newReaction);
      setReaction(newReaction);
    }
  };

  return (
    <>
      <button
        className={twMerge('select-none', classNameButton)}
        style={style}
        onMouseEnter={openReaction}
        onMouseLeave={closeReaction}
        onClick={() => handleReaction(reaction ? reaction : REACTIONS.like)}
      >
        {!reaction ? (
          children
        ) : (
          <div className={twMerge(classNameReaction)}>
            <img
              draggable={false}
              width={24}
              height={24}
              className={twMerge('w-[24px] h-[24px] min-w-[24px] min-h-[24px]', classNameIcon)}
              src={reaction.url}
              alt={reaction.name}
            />
            <span className="whitespace-nowrap hidden md:block">{reaction.name}</span>
          </div>
        )}
      </button>

      <div
        className={twMerge(
          'select-none absolute z-10 opacity-0 left-7 flex lg:flex-nowrap p-2 flex-wrap items-center justify-center bg-zinc-800 border border-zinc-700 border-opacity-40 rounded-md shadow-md transition-all duration-300',
          showReaction ? 'opacity-100 pointer-events-auto -top-[55px]' : 'opacity-0 pointer-events-none -top-[100px]',
          classNameReactions,
        )}
        onMouseEnter={openReaction}
        onMouseLeave={closeReaction}
      >
        <button className="relative group transition-all p-1 duration-300 text-zinc-400" onClick={() => handleReaction(REACTIONS.like)}>
          <img
            width={30}
            height={30}
            draggable={false}
            src={REACTIONS.like.url}
            alt={REACTIONS.like.name}
            className="block group-hover:scale-125 transition-transform duration-300 min-w-[30px] min-h-[30px]"
          />
          <span className="text-xs opacity-0 group-hover:opacity-100 group-hover:-top-9 -top-7 min-w-fit whitespace-nowrap absolute left-1/2 -translate-x-1/2 bg-zinc-900 px-3 py-1 rounded-md transition-all duration-200">
            Me gusta
          </span>
        </button>

        <button className="relative group transition-all p-1 duration-300 text-zinc-400" onClick={() => handleReaction(REACTIONS.love)}>
          <img
            width={30}
            height={30}
            draggable={false}
            src={REACTIONS.love.url}
            alt={REACTIONS.love.name}
            className="block group-hover:scale-125 transition-transform duration-300 min-w-[30px] min-h-[30px]"
          />
          <span className="text-xs opacity-0 group-hover:opacity-100 group-hover:-top-9 -top-7 min-w-fit whitespace-nowrap absolute left-1/2 -translate-x-1/2 bg-zinc-900 px-3 py-1 rounded-md transition-all duration-200">
            Me encanta
          </span>
        </button>
        <button className="relative group transition-all p-1 duration-300 text-zinc-400" onClick={() => handleReaction(REACTIONS.care)}>
          <img
            width={30}
            height={30}
            draggable={false}
            src={REACTIONS.care.url}
            alt={REACTIONS.care.name}
            className="block group-hover:scale-125 transition-transform duration-300 min-w-[30px] min-h-[30px]"
          />
          <span className="text-xs opacity-0 group-hover:opacity-100 group-hover:-top-9 -top-7 min-w-fit whitespace-nowrap absolute left-1/2 -translate-x-1/2 bg-zinc-900 px-3 py-1 rounded-md transition-all duration-200">
            Me encanta
          </span>
        </button>
        <button className="relative group transition-all p-1 duration-300 text-zinc-400" onClick={() => handleReaction(REACTIONS.laugh)}>
          <img
            width={30}
            height={30}
            draggable={false}
            src={REACTIONS.laugh.url}
            alt={REACTIONS.laugh.name}
            className="block group-hover:scale-125 transition-transform duration-300 min-w-[30px] min-h-[30px]"
          />
          <span className="text-xs opacity-0 group-hover:opacity-100 group-hover:-top-9 -top-7 min-w-fit whitespace-nowrap absolute left-1/2 -translate-x-1/2 bg-zinc-900 px-3 py-1 rounded-md transition-all duration-200">
            Me divierte
          </span>
        </button>
        <button className="relative group transition-all p-1 duration-300 text-zinc-400" onClick={() => handleReaction(REACTIONS.amazed)}>
          <img
            width={30}
            height={30}
            draggable={false}
            src={REACTIONS.amazed.url}
            alt={REACTIONS.amazed.name}
            className="block group-hover:scale-125 transition-transform duration-300 min-w-[30px] min-h-[30px]"
          />
          <span className="text-xs opacity-0 group-hover:opacity-100 group-hover:-top-9 -top-7 min-w-fit whitespace-nowrap absolute left-1/2 -translate-x-1/2 bg-zinc-900 px-3 py-1 rounded-md transition-all duration-200">
            Me asombra
          </span>
        </button>
        <button className="relative group transition-all p-1 duration-300 text-zinc-400" onClick={() => handleReaction(REACTIONS.sad)}>
          <img
            width={30}
            height={30}
            draggable={false}
            src={REACTIONS.sad.url}
            alt={REACTIONS.sad.name}
            className="block group-hover:scale-125 transition-transform duration-300 min-w-[30px] min-h-[30px]"
          />
          <span className="text-xs opacity-0 group-hover:opacity-100 group-hover:-top-9 -top-7 min-w-fit whitespace-nowrap absolute left-1/2 -translate-x-1/2 bg-zinc-900 px-3 py-1 rounded-md transition-all duration-200">
            Me entristece
          </span>
        </button>
        <button className="relative group transition-all p-1 duration-300 text-zinc-400" onClick={() => handleReaction(REACTIONS.angry)}>
          <img
            width={30}
            height={30}
            draggable={false}
            src={REACTIONS.angry.url}
            alt={REACTIONS.angry.name}
            className="block group-hover:scale-125 transition-transform duration-300 min-w-[30px] min-h-[30px]"
          />
          <span className="text-xs opacity-0 group-hover:opacity-100 group-hover:-top-9 -top-7 min-w-fit whitespace-nowrap absolute left-1/2 -translate-x-1/2 bg-zinc-900 px-3 py-1 rounded-md transition-all duration-200">
            Me enoja
          </span>
        </button>
      </div>
    </>
  );
};

export default Reaction;
