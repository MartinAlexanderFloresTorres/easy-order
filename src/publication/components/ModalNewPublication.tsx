import { useState } from 'react';
import { CopyPlus, Image, SmilePlus, X } from 'lucide-react';
import { ParamsPublication } from '@/publication/interfaces';
import Modal from '@/shared/components/Modal';
import User from '@/shared/components/User';

interface ModalNewPublicationProps {
  onClose: () => void;
  params: ParamsPublication;
}

let timerNewModalPublication: NodeJS.Timeout | null = null;

const ModalNewPublication = ({ params, onClose }: ModalNewPublicationProps) => {
  const [isClose, setIsClose] = useState(false);
  const [videoAndImage, setVideoToImage] = useState<boolean>(() => params.video || params.image);
  const [file, setFile] = useState<File | null>(null);
  const [text, setText] = useState<string>('');

  const onCloseModal = () => {
    if (timerNewModalPublication) clearTimeout(timerNewModalPublication);

    if (isClose) {
      onClose();
      setIsClose(false);
      return;
    }

    setIsClose(true);
    timerNewModalPublication = setTimeout(() => {
      onClose();
      setIsClose(false);
    }, 200);
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log({
      text,
      file,
    });
  };

  const onChangeFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setFile(file);
    }
  };

  return (
    <Modal onClose={onCloseModal} isClose={isClose} className="bg-zinc-900 bg-opacity-80">
      <Modal.Overlay onClose={onCloseModal}>
        <div className="select-none bg-zinc-800 border border-zinc-700 border-opacity-50 w-full max-w-3xl  max-h-screen overflow-auto">
          <div className="sticky z-10 top-0 border-b border-b-zinc-700 border-opacity-50 bg-zinc-800 flex items-center justify-between text-center gap-1 px-4 py-3">
            <div className="text-center flex-1">
              <h4 className="line-clamp-1 text-center">Crear publicación</h4>
            </div>
            <button
              className="w-[40px] h-[40px] min-w-[40px] min-h-[40px] flex items-center justify-center bg-zinc-700 bg-opacity-50 hover:bg-opacity-100 transition-all duration-300 rounded-full"
              onClick={onCloseModal}
            >
              <X size={24} />
            </button>
          </div>

          <div className="p-4">
            <User className="mb-4" />

            <form className="w-full" onSubmit={onSubmit}>
              <div className="flex flex-col gap-4">
                <textarea
                  autoFocus
                  className="w-full h-32 px-6 py-3 bg-zinc-800 outline-none bg-opacity-50 rounded-md resize-none"
                  placeholder="¿Qué estas pensando?"
                  value={text}
                  onChange={(e) => setText(e.target.value.trimStart())}
                />

                {videoAndImage && (
                  <div className="border border-zinc-700 p-2 rounded-md">
                    {file ? (
                      <div className="relative bg-zinc-400 bg-opacity-10 rounded-md flex items-center justify-center gap-2 flex-col min-h-[300px]">
                        <button
                          type="button"
                          className="absolute top-2 right-2 w-[40px] h-[40px] min-w-[40px] min-h-[40px] flex items-center justify-center bg-zinc-700 text-zinc-400 hover:text-zinc-200 hover:bg-zinc-600 transition-all duration-300 rounded-full"
                          onClick={() => setFile(null)}
                        >
                          <X size={24} />
                        </button>
                        <img src={URL.createObjectURL(file)} alt="preview" className="w-full h-full object-cover rounded-md" />
                      </div>
                    ) : (
                      <label htmlFor="file-new-publication">
                        <div className="relative bg-zinc-400 bg-opacity-10 p-2 rounded-md flex items-center justify-center gap-2 flex-col min-h-[300px]">
                          <button
                            type="button"
                            className="absolute top-2 right-2 w-[40px] h-[40px] min-w-[40px] min-h-[40px] flex items-center justify-center bg-zinc-700 text-zinc-400 hover:text-zinc-200 hover:bg-zinc-600 transition-all duration-300 rounded-full"
                            onClick={() => setVideoToImage(!videoAndImage)}
                          >
                            <X size={24} />
                          </button>
                          <CopyPlus size={30} />
                          <h2 className="text-base font-semibold whitespace-nowrap">Agregar fotos/videos</h2>
                          <p className="text-sm text-zinc-400 whitespace-nowrap">o arrastra y suelta</p>
                        </div>

                        <input
                          type="file"
                          id="file-new-publication"
                          className="hidden"
                          accept="image/*, video/*"
                          onChange={onChangeFile}
                          multiple={false}
                        />
                      </label>
                    )}
                  </div>
                )}

                <div className="w-full flex  gap-4 flex-col md:flex-row items-center md:justify-between">
                  <div className="w-full flex items-center justify-start gap-2">
                    <button
                      type="button"
                      className="flex items-center gap-2 px-6 py-3 bg-zinc-700 bg-opacity-50 hover:bg-opacity-100 transition-all duration-300 rounded-md"
                    >
                      <SmilePlus size={24} />
                      <span className="whitespace-nowrap">Emoji</span>
                    </button>
                    <button
                      type="button"
                      className="flex items-center gap-2 px-6 py-3 bg-zinc-700 bg-opacity-50 hover:bg-opacity-100 disabled:hover:bg-opacity-50 transition-all duration-300 rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
                      onClick={() => setVideoToImage(!videoAndImage)}
                      disabled={videoAndImage || !!file}
                    >
                      <Image size={24} />
                      <span className="whitespace-nowrap">Imagen / Video</span>
                    </button>
                  </div>
                  <button
                    type="submit"
                    className="w-full md:w-fit whitespace-nowrap px-6 py-3 bg-pink-600 hover:bg-pink-700 transition-all duration-300 rounded-md font-semibold"
                  >
                    Publicar
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </Modal.Overlay>
    </Modal>
  );
};

export default ModalNewPublication;
