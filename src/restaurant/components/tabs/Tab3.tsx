import { DEFAULT_FIELDS } from '@/restaurant/constants';
import { CopyPlus, X } from 'lucide-react';
import { MAX_GALLERY } from '@/restaurant/constants';

interface Tab3Props {
  fields: typeof DEFAULT_FIELDS;
  setFields: React.Dispatch<React.SetStateAction<typeof DEFAULT_FIELDS>>;
  onChangeFile: (event: React.ChangeEvent<HTMLInputElement>) => void;
  previewImage: (file: File) => string;
}

const Tab3 = ({ fields, setFields, onChangeFile, previewImage }: Tab3Props) => (
  <div className="flex-1 p-2 border border-zinc-700 border-opacity-50 bg-zinc-800 shadow-md rounded-md animate-fade-in">
    <div className="rounded-md w-full flex flex-col gap-4">
      {fields.gallery.length > 0 && (
        <div className="flex w-full flex-wrap gap-4">
          {fields.gallery.map((image, index) => (
            <div
              className="relative z-10 overflow-hidden bg-zinc-400 bg-opacity-10 rounded-md flex items-center justify-center gap-2 flex-col flex-1 min-w-[200px] h-full"
              key={index}
            >
              <div
                className="w-full h-full absolute top-0 left-0 -z-10"
                style={{
                  backgroundImage: 'url(' + previewImage(image) + ')',
                  backgroundPosition: 'center',
                  backgroundSize: 'cover',
                  backgroundRepeat: 'no-repeat',
                  filter: 'blur(100px)',
                }}
              />
              <div className="min-h-[200px] h-[200px] z-10 w-full object-contain rounded-md">
                <img src={previewImage(image)} alt="preview" draggable={false} className="select-none z-10 w-full h-full object-contain rounded-md" />

                <button
                  type="button"
                  className="z-20 absolute top-2 right-2 w-[40px] h-[40px] min-w-[40px] min-h-[40px] flex items-center justify-center bg-zinc-700 text-zinc-400 hover:text-zinc-200 hover:bg-zinc-600 border border-zinc-700 hover:border-zinc-700 hover:border-opacity-50 transition-all duration-300 rounded-full"
                  onClick={() => {
                    const gallery = fields.gallery.filter((_, i) => i !== index);
                    setFields({ ...fields, gallery });
                  }}
                >
                  <X size={24} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {fields.gallery.length < MAX_GALLERY && (
        <label htmlFor="gallery" className="block w-full h-full">
          <div className="relative bg-zinc-400 bg-opacity-10 p-10 rounded-md flex items-center justify-center gap-2 flex-col w-full h-full">
            <CopyPlus size={30} />
            <h2 className="text-base font-semibold whitespace-nowrap">Agregar tus imagenes de galeria</h2>
            <p className="text-sm text-zinc-400 whitespace-nowrap">o arrastra y suelta</p>
          </div>

          <input type="file" id="gallery" name="gallery" className="hidden" accept="image/*" onChange={onChangeFile} multiple={true} />
        </label>
      )}
    </div>
  </div>
);

export default Tab3;
