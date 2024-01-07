import { DEFAULT_FIELDS } from '@/restaurant/constants';
import { CopyPlus, X } from 'lucide-react';

interface Tab2Props {
  fields: typeof DEFAULT_FIELDS;
  setFields: React.Dispatch<React.SetStateAction<typeof DEFAULT_FIELDS>>;
  onChangeFile: (event: React.ChangeEvent<HTMLInputElement>) => void;
  previewImage: (file: File) => string;
}
const Tab2 = ({ fields, setFields, onChangeFile, previewImage }: Tab2Props) => (
  <div className="flex-1 p-2 border border-zinc-700 border-opacity-50 bg-zinc-800 shadow-md rounded-md animate-fade-in">
    <div className="rounded-md relative min-h-[400px] h-[400px] w-full">
      {fields.banner ? (
        <div className="relative z-10 overflow-hidden bg-zinc-400 bg-opacity-10 rounded-md flex items-center justify-center gap-2 flex-col w-full h-full">
          <div
            className="w-full h-full absolute top-0 left-0 -z-10"
            style={{
              backgroundImage: 'url(' + previewImage(fields.banner) + ')',
              backgroundPosition: 'center',
              backgroundSize: 'cover',
              backgroundRepeat: 'no-repeat',
              filter: 'blur(100px)',
            }}
          />

          <button
            type="button"
            className="z-20 absolute top-2 right-2 w-[40px] h-[40px] min-w-[40px] min-h-[40px] flex items-center justify-center bg-zinc-700 text-zinc-400 hover:text-zinc-200 hover:bg-zinc-600 border border-zinc-700 hover:border-zinc-700 hover:border-opacity-50 transition-all duration-300 rounded-full"
            onClick={() => setFields({ ...fields, banner: null })}
          >
            <X size={24} />
          </button>
          <img
            src={previewImage(fields.banner)}
            alt="preview"
            draggable={false}
            className="select-none z-10 w-full h-full object-contain rounded-md"
          />
        </div>
      ) : (
        <label htmlFor="banner" className="block w-full h-full">
          <div className="relative bg-zinc-400 bg-opacity-10 p-2 rounded-md flex items-center justify-center gap-2 flex-col w-full h-full">
            <CopyPlus size={30} />
            <h2 className="text-base font-semibold whitespace-nowrap">Agregar su banner</h2>
            <p className="text-sm text-zinc-400 whitespace-nowrap">o arrastra y suelta</p>
          </div>

          <input type="file" id="banner" name="banner" className="hidden" accept="image/*" onChange={onChangeFile} multiple={false} />
        </label>
      )}

      <div className="z-20 absolute right-4  backdrop-blur-md bottom-4 border-2 border-pink-600 min-h-[180px] min-w-[180px] h-[180px] w-[180px] rounded-full">
        {fields.logo ? (
          <div className="relative bg-zinc-400 bg-opacity-10 flex items-center justify-center gap-2 flex-col w-full h-full rounded-full">
            <button
              type="button"
              className="absolute top-2 right-2 w-[40px] h-[40px] min-w-[40px] min-h-[40px] flex items-center justify-center bg-zinc-700 text-zinc-400 hover:text-zinc-200 hover:bg-zinc-600 border border-zinc-700 hover:border-zinc-700 hover:border-opacity-50 transition-all duration-300 rounded-full"
              onClick={() => setFields({ ...fields, logo: null })}
            >
              <X size={24} />
            </button>
            <img src={previewImage(fields.logo)} alt="preview" draggable={false} className="select-none w-full h-full object-cover rounded-full" />
          </div>
        ) : (
          <label htmlFor="logo" className="block w-full h-full">
            <div className="relative bg-zinc-400 bg-opacity-10 p-2 flex items-center justify-center gap-2 flex-col w-full h-full rounded-full">
              <CopyPlus size={30} />
              <h2 className="text-sm font-semibold whitespace-nowrap">Agregar su foto de perfil</h2>
              <p className="text-sm text-zinc-400 whitespace-nowrap">o arrastra y suelta</p>
            </div>

            <input type="file" id="logo" name="logo" className="hidden" accept="image/*" onChange={onChangeFile} multiple={false} />
          </label>
        )}
      </div>
    </div>
  </div>
);

export default Tab2;
