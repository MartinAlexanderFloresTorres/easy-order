import { useState } from 'react';
import { Link } from 'react-router-dom';
import Avatar from '@/shared/components/Avatar';
import Reaction from '@/publication/components/Reaction';
import ModalReactions from '@/publication/components/ModalReactions';
import { Reaction as ReactionInterface } from '@/publication/interfaces';
import { REACTIONS } from '@/publication/constants';
import InputForm from '@/publication/components/InputForm';

interface ReactionProps {
  publicationId: string;
}

const Comment = ({ publicationId }: ReactionProps) => {
  const [showModalReactions, setShowModalReactions] = useState(false);
  const [reactionActive, setReactionActive] = useState<ReactionInterface | null>(null);
  const [showComment, setShowComment] = useState(false);

  const toggleComment = () => setShowComment((prev) => !prev);

  const openModalReactions = () => setShowModalReactions(true);
  const closeModalReactions = () => setShowModalReactions(false);

  return (
    <>
      <div className="w-full pb-1 border-b border-zinc-700 border-opacity-50">
        <div className="px-3 py-2 bg-zinc-800 rounded-lg">
          <div className="flex items-center gap-2">
            <Avatar className="w-8 h-8 min-w-[32px] min-h-[32px]" />
            <Link
              to={'user/by/martin-dev'}
              className="text-sm font-semibold text-zinc-300 hover:underline hover:to-zinc-200 transition-all duration-300"
            >
              Martin dev
            </Link>
          </div>
          <p className="text-xs text-zinc-300 leading-4">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus praesentium quas hic voluptate magnam distinctio ut quidem libero
            labore. Temporibus, quos? Inventore cupiditate aut repellendus sunt aperiam pariatur, harum consequatur!
          </p>
        </div>

        <div className="flex items-center gap-2 mt-1">
          <div className="relative flex-1 flex items-center gap-2">
            <p className="text-xs text-zinc-400">1d</p>
            <Reaction
              publicationId="123"
              onReaction={(publicationId, reaction) => {
                console.log({ publicationId, reaction });
                setReactionActive(reaction);
              }}
              onRemoveReaction={(publicationId, reaction) => {
                console.log({ publicationId, reaction });
                setReactionActive(null);
              }}
              reactionActive={reactionActive}
              classNameButton="text-xs text-zinc-400 hover:underline cursor-pointer transition-all duration-300"
              classNameReaction="flex items-center gap-2 text-xs"
              classNameReactions="-top-[66px] -left-7"
              classNameIcon="w-4 h-4 min-w-[20px] min-h-[20px]"
            >
              <span className="min-w-fit w-fit whitespace-nowrap">Me gusta</span>
            </Reaction>

            <label
              htmlFor="22222"
              className="text-xs text-zinc-400 hover:underline cursor-pointer transition-all duration-300"
              onClick={toggleComment}
            >
              <span>Responder</span>
            </label>
          </div>
          <div className="flex items-center gap-2 p-1 bg-zinc-800 rounded-full border border-zinc-700 border-opacity-50">
            <button className="border-2 border-zinc-800 rounded-full hover:scale-110 transition-all duration-300 z-10" onClick={openModalReactions}>
              <img width={20} height={20} className="min-w-[20px] min-h-[20px]" src={REACTIONS.like.url} alt={REACTIONS.like.name} />
            </button>
            <button
              className="-ml-3 border-2 border-zinc-800 rounded-full hover:scale-110 transition-all duration-300 z-10"
              onClick={openModalReactions}
            >
              <img width={20} height={20} className="min-w-[20px] min-h-[20px]" src={REACTIONS.love.url} alt={REACTIONS.love.name} />
            </button>
            <button
              className="-ml-3 border-2 border-zinc-800 rounded-full hover:scale-110 transition-all duration-300 z-10"
              onClick={openModalReactions}
            >
              <img width={20} height={20} className="min-w-[20px] min-h-[20px]" src={REACTIONS.care.url} alt={REACTIONS.care.name} />
            </button>
          </div>
        </div>

        {showComment && (
          <InputForm
            id="22222"
            placeholder="Responder a Martin dev"
            className="mt-4 border-none"
            onSend={({ text, image, id }) => {
              console.log({ text, image, id });
            }}
          />
        )}
      </div>

      {showModalReactions && <ModalReactions onClose={closeModalReactions} />}
    </>
  );
};

export default Comment;
