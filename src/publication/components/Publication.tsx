import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { MessageCircle, MoreHorizontal, Share2, ThumbsUp } from 'lucide-react';
import InputForm from '@/publication/components/InputForm';
import Avatar from '@/shared/components/Avatar';
import ModalReactions from '@/publication/components/ModalReactions';
import ModalPublication from '@/publication/components/ModalPublication';
import { REACTIONS } from '@/publication/constants/reactions';
import { Reaction as ReactionInterface } from '@/publication/interfaces';
import Reaction from '@/publication/components/Reaction';
import share from '@/helpers/shared';

const Publication = () => {
  const [showComment, setShowComment] = useState(false);
  const [showModalReactions, setShowModalReactions] = useState(false);
  const [showModalPublication, setShowModalPublication] = useState(false);
  const [reactionActive, setReactionActive] = useState<ReactionInterface | null>(null);

  const toggleComment = () => setShowComment((prev) => !prev);
  const { pathname } = useLocation();

  const sharedPublication = () => {
    share({
      title: 'Publicación',
      text: 'Texto de la publicación',
      url: 'https://www.google.com',
    });
  };

  const openModalReactions = () => setShowModalReactions(true);
  const closeModalReactions = () => setShowModalReactions(false);

  const openModalPublication = () => {
    if (!pathname.includes('/publication/by/')) {
      window.history.pushState({}, '', '/publication/by/id');
    }
    setShowModalPublication(true);
  };
  const closeModalPublication = () => {
    if (!pathname.includes('/publication/by/')) {
      window.history.pushState({}, '', '/');
    }
    setShowModalPublication(false);
  };

  return (
    <>
      <div className="bg-zinc-800 bg-opacity-50 backdrop-blur-md rounded-md shadow-md">
        <div className="p-3 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="relative w-[60px] h-[60px]">
              <Link to={'/restaurants/by/martin-dev'}>
                <img className="w-full h-full object-cover rounded-md block object-center" src="/user.webp" alt="banner" />
              </Link>
              <Avatar alt="avatar" storieId="123" url="/user.webp" className="absolute bottom-0 right-0 w-[30px] h-[30px] min-w-[30px] min-h-[30px]" />
            </div>
            <div className="leading-none">
              <Link className="line-clamp-1 text-base font-semibold text-zinc-200 hover:text-zinc-100 hover:underline transition-all duration-300" to={'/restaurants/by/martin-dev'}>
                Restaurante x
              </Link>
              <div className="flex flex-col md:flex-row md:items-center gap-2">
                <Link to={'/user/by/martin-dev'} className="line-clamp-1 text-sm text-zinc-400 hover:text-zinc-300 hover:underline transition-all duration-300">
                  Nombre del propietario
                </Link>

                <p className="flex items-center gap-2 text-xs text-zinc-400 transition-all duration-300">
                  <span className="hidden md:block">•</span>
                  <span>1h</span>
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button className="text-blue-500 px-2 py-1 hover:text-blue-400 transition-all duration-300 text-xs font-semibold">seguir</button>
            <button className="w-8 h-8 rounded-full hover:bg-zinc-800 text-white flex items-center justify-center transition-all duration-300">
              <MoreHorizontal size={24} />
            </button>
          </div>
        </div>

        <div className="leading-5 px-3 pt-1 pb-3 flex flex-col gap-1">
          <h2 className="leading-5 text-lg text-zinc-200">Ignauguración del restaurante</h2>

          <Link className="leading-5 w-fit text-base my-2 text-pink-500 hover:text-pink-400 hover:underline transition-all duration-300" to={'/'}>
            Nombre del proyecto
          </Link>
          <p className="leading-5 text-base text-zinc-300">Agradece a todos los que nos acompañaron en la inauguración de nuestro restaurante.</p>
          <p className="leading-5 text-base text-zinc-300">Con la presencia de autoridades y personalidades de la ciudad. </p>
        </div>

        <div role="button" className="block w-full select-none" onClick={openModalPublication}>
          <div className="relative overflow-hidden w-full h-[460px] md:h-[600px]">
            <div
              className="w-full h-full absolute top-0 left-0 -z-10"
              style={{
                backgroundImage: `url("/img/publicacion-preview.jpg")`,
                backgroundPosition: 'center',
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
                filter: 'blur(100px)',
              }}
            />
            <img className="w-full h-full object-contain rounded-md block object-center z-10" src="/img/publicacion-preview.jpg" alt="post" />
          </div>
        </div>

        <div className="flex items-center justify-between gap-3 p-3 select-none">
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-2">
              <button className="border-2 border-zinc-800 rounded-full hover:scale-110 transition-all duration-300 z-10" onClick={openModalReactions}>
                <img width={20} height={20} src={REACTIONS.like.url} alt={REACTIONS.like.name} />
              </button>
              <button className="-ml-3 border-2 border-zinc-800 rounded-full hover:scale-110 transition-all duration-300 z-10" onClick={openModalReactions}>
                <img width={20} height={20} src={REACTIONS.love.url} alt={REACTIONS.love.name} />
              </button>
              <button className="-ml-3 border-2 border-zinc-800 rounded-full hover:scale-110 transition-all duration-300 z-10" onClick={openModalReactions}>
                <img width={20} height={20} src={REACTIONS.care.url} alt={REACTIONS.care.name} />
              </button>
              <button className="-ml-3 border-2 border-zinc-800 rounded-full hover:scale-110 transition-all duration-300 z-10" onClick={openModalReactions}>
                <img width={20} height={20} src={REACTIONS.laugh.url} alt={REACTIONS.laugh.name} />
              </button>
              <button className="-ml-3 border-2 border-zinc-800 rounded-full hover:scale-110 transition-all duration-300 z-10" onClick={openModalReactions}>
                <img width={20} height={20} src={REACTIONS.amazed.url} alt={REACTIONS.amazed.name} />
              </button>
              <button className="-ml-3 border-2 border-zinc-800 rounded-full hover:scale-110 transition-all duration-300 z-10" onClick={openModalReactions}>
                <img width={20} height={20} src={REACTIONS.sad.url} alt={REACTIONS.sad.name} />
              </button>
              <button className="-ml-3 border-2 border-zinc-800 rounded-full hover:scale-110 transition-all duration-300 z-10" onClick={openModalReactions}>
                <img width={20} height={20} src={REACTIONS.angry.url} alt={REACTIONS.angry.name} />
              </button>
            </div>

            <button className="text-zinc-400 text-xs text-center  hover:underline" onClick={openModalReactions}>
              <span>Tu</span>
              <span> y </span>
              <span>
                <span>1230</span>
                <span className="hidden sm:inline"> personas más</span>
              </span>
            </button>
          </div>

          <button className="flex items-center gap-1 text-zinc-400 text-xs hover:underline text-center" onClick={openModalPublication}>
            <span>
              230<span className="hidden sm:inline"> comentarios</span>
            </span>
            <MessageCircle className="inline sm:hidden" fill="rgb(161 161 170)" size={16} />
          </button>
        </div>

        <div className="min-h-[70px] relative border-t border-t-zinc-700 border-opacity-50 flex items-center justify-between gap-2 p-2 select-none">
          <Reaction
            publicationId="1231"
            onReaction={(publicationId, reaction) => {
              console.log({ publicationId, reaction });

              setReactionActive(reaction);
            }}
            onRemoveReaction={(publicationId, reaction) => {
              console.log({ publicationId, reaction });

              setReactionActive(null);
            }}
            reactionActive={reactionActive}
            classNameButton="flex-1"
            classNameReaction="flex items-center gap-2 justify-center text-center px-4 py-2 hover:bg-zinc-800 transition-all duration-300 text-zinc-400 rounded-lg flex-1 active:bg-opacity-60"
          >
            <div className="flex items-center gap-2 justify-center text-center px-4 py-2 hover:bg-zinc-800 transition-all duration-300 text-zinc-400 rounded-lg flex-1 active:bg-opacity-86">
              <ThumbsUp size={24} className="w-[24px] h-[24px] min-w-[24px] min-h-[24px]  pointer-events-none" />
              <span className="pointer-events-none hidden md:block">Me gusta</span>
            </div>
          </Reaction>
          <label htmlFor="123" className="flex cursor-pointer items-center gap-2 justify-center text-center px-4 py-2 hover:bg-zinc-800 transition-all duration-300 text-zinc-400 rounded-lg flex-1 active:bg-opacity-60" onClick={toggleComment}>
            <MessageCircle size={24} />
            <span className="hidden md:block">Comentar</span>
          </label>
          <button className="flex items-center gap-2 justify-center text-center px-4 py-2 hover:bg-zinc-800 transition-all duration-300 text-zinc-400 rounded-lg flex-1 active:bg-opacity-60" onClick={sharedPublication}>
            <Share2 size={24} />
            <span className="hidden md:block">Compartir</span>
          </button>
        </div>

        {showComment && (
          <InputForm
            id="123"
            placeholder="Escribe un comentario..."
            onSend={({ text, image, id }) => {
              console.log({ text, image, id });
            }}
          />
        )}
      </div>

      {showModalReactions && <ModalReactions onClose={closeModalReactions} />}
      {showModalPublication && <ModalPublication onClose={closeModalPublication} />}
    </>
  );
};

export default Publication;
