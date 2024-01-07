import toast from 'react-hot-toast';
import { DEFAULT_FIELDS } from '@/restaurant/constants';
import { SocialMedia } from '@/restaurant/interfaces';
import { Info, Link, Plus, X } from 'lucide-react';
import { useState } from 'react';
import { twMerge } from 'tailwind-merge';

interface Tab4Props {
  fields: typeof DEFAULT_FIELDS;
  activeFocus: (field: keyof typeof DEFAULT_FIELDS) => string;
  setFields: React.Dispatch<React.SetStateAction<typeof DEFAULT_FIELDS>>;
  platforms: SocialMedia[];
  setPlatforms: React.Dispatch<React.SetStateAction<SocialMedia[]>>;
}

const Tab4 = ({ fields, setFields, activeFocus, platforms, setPlatforms }: Tab4Props) => {
  const [webSite, setWebSite] = useState('');

  const isExistingSocialMedia = (socialMedia: SocialMedia) => {
    return fields.socialMedia.some((site) => site.link === socialMedia.link || site.platform === socialMedia.platform);
  };

  const platformSelecteds = platforms.filter((platform) => !fields.socialMedia.some((site) => site.platform === platform.platform));

  const addSocialMedia = (socialMedia: SocialMedia) => {
    // Validar que no esté vacío
    if (!socialMedia.link) {
      return toast.error('El link no puede estar vacío');
    }

    const regex = new RegExp(/^(?:(?:https?|ftp):\/\/)?[\w/\-?=%.]+\.[\w/\-?=%.]+(?:\.[\w/\-?=%.]+)*\/?(?:#[\w\-?=%.]+)?$/);

    if (!regex.test(socialMedia.link)) {
      return toast.error('El link no es válido');
    }

    if (isExistingSocialMedia(socialMedia)) {
      return toast.error('Ya existe un sitio web con esa plataforma o link');
    }

    setFields({
      ...fields,
      socialMedia: [...fields.socialMedia, socialMedia],
    });
  };

  const removeSocialMedia = (socialMedia: SocialMedia) => {
    setFields({
      ...fields,
      socialMedia: fields.socialMedia.filter((site) => site.link !== socialMedia.link),
    });
  };

  const removeWebsite = () => {
    setWebSite('');
    setFields({
      ...fields,
      website: '',
    });
  };

  const addWebsite = (link: string) => {
    // Validar que no esté vacío
    if (!link) {
      return toast.error('El link no puede estar vacío');
    }

    const regex = new RegExp(/^(?:(?:https?|ftp):\/\/)?[\w/\-?=%.]+\.[\w/\-?=%.]+(?:\.[\w/\-?=%.]+)*\/?(?:#[\w\-?=%.]+)?$/);

    if (!regex.test(link)) {
      return toast.error('El link no es válido');
    }

    setFields({
      ...fields,
      website: link,
    });
    setWebSite('');
  };

  const onChangePlatform = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;

    setPlatforms(
      platforms.map((platform) => {
        if (platform.platform === name) {
          return { ...platform, link: value.trim() };
        }
        return platform;
      }),
    );
  };

  return (
    <div className="w-full flex-1 border border-zinc-700 border-opacity-50 bg-zinc-800 shadow-md rounded-md animate-fade-in">
      {fields.socialMedia.length === 0 && (
        <p className="text-pink-400 p-4 flex items-center gap-2 border-b border-zinc-700 border-opacity-50">
          <span>Agrega al menos una red social</span>
          <Info size={24} />
        </p>
      )}
      {platformSelecteds.length > 0 && (
        <div className="w-full flex flex-wrap items-center gap-5 p-4 border-b border-zinc-700 border-opacity-50 animate-fade-in">
          {platformSelecteds.map((platform) => (
            <div
              className="w-full flex-1 flex items-center gap-4 px-4 py-5 rounded-xl hover:bg-zinc-700 hover:bg-opacity-30 transition-all duration-300 animate-fade-in"
              key={platform.platform}
            >
              <img src={platform.image} alt={platform.platform} width={24} height={24} className="min-w-[36px] min-h-[36px] w-[36px] h-[36px]" />
              <div className="flex-1 contenedor-input relative block">
                <input
                  type="url"
                  className="w-full min-w-[160px] p-2 input-focus border border-zinc-700 hover:border-zinc-600 text-zinc-400 border-opacity-70 outline-none bg-zinc-700 bg-opacity-10 rounded-md transition-colors duration-300"
                  id={platform.platform}
                  name={platform.platform}
                  autoComplete="off"
                  value={platform.link.trim()}
                  onChange={onChangePlatform}
                />
                <label
                  htmlFor={platform.platform}
                  className="label-input leading-none text-[16px] absolute z-10 top-1/2 left-3 -translate-y-1/2 pointer-events-none select-none text-zinc-400 transition-all duration-300 active"
                >
                  {platform.platform}
                </label>
              </div>
              <button
                type="button"
                className="min-w-[36px] min-h-[36px] w-[36px] h-[36px] rounded-full bg-zinc-700 hover:bg-zinc-600 transition-all duration-300"
                onClick={() => {
                  addSocialMedia({ platform: platform.platform, link: platform.link, image: platform.image });
                }}
              >
                <Plus size={24} className=" text-zinc-400 mx-auto" />
              </button>
            </div>
          ))}
        </div>
      )}

      <section className="w-full">
        <h2 className="text-xl font-bold text-zinc-100 px-4 py-4">
          Redes Sociales <span className="text-pink-500">({fields.socialMedia.length})</span>
        </h2>
        <div className="border-b border-zinc-700 border-opacity-50" />
        <div className="flex flex-wrap gap-5 px-4 py-4">
          {fields.socialMedia.length ? (
            fields.socialMedia.map((socialMedia) => (
              <div className="flex items-center gap-4 flex-1 animate-fade-in" key={socialMedia.link}>
                <img src={socialMedia.image} alt={socialMedia.platform} className="min-w-[36px] min-h-[36px] w-[36px] h-[36px]" />
                <div className="flex-1 p-2 overflow-auto input-focus border border-zinc-700  border-opacity-70 outline-none bg-zinc-700 bg-opacity-10 rounded-md transition-colors duration-300">
                  <a
                    href={socialMedia.link}
                    rel="noopener noreferrer"
                    target="_blank"
                    className="w-fit min-w-[200px] line-clamp-1 break-all hover:underline text-sky-400 transition-colors duration-300"
                  >
                    {socialMedia.link}
                  </a>
                </div>

                <button
                  type="button"
                  className="min-w-[36px] min-h-[36px] w-[36px] h-[36px] rounded-full bg-red-800 bg-opacity-50 hover:bg-red-600 hover:bg-opacity-60 transition-all duration-300"
                  onClick={() => removeSocialMedia(socialMedia)}
                >
                  <X size={24} className=" text-zinc-200 mx-auto" />
                </button>
              </div>
            ))
          ) : (
            <p className="text-zinc-400 flex-1 animate-fade-in">No hay redes sociales agregadas</p>
          )}
        </div>
      </section>

      <section className="w-full">
        <div className="border-b border-zinc-700 border-opacity-50" />
        <div className="flex sm:flex-row flex-col sm:items-center">
          <h2 className="text-xl font-bold text-zinc-100 whitespace-nowrap px-4 py-4">Sitio web</h2>
          {!fields.website.length && (
            <div className="flex-1 flex gap-2 items-center border-l-0 border-t sm:border-t-0 sm:border-l border-zinc-700 border-opacity-70 px-4 py-4 animate-fade-in">
              <div className="flex-1 contenedor-input relative block">
                <input
                  type="url"
                  className="w-full min-w-[200px] p-2 input-focus border border-zinc-700 hover:border-zinc-600 text-zinc-400 border-opacity-70 outline-none bg-zinc-700 bg-opacity-10 rounded-md transition-colors duration-300"
                  id="website"
                  name="website"
                  autoComplete="off"
                  value={webSite.trim()}
                  onChange={(e) => setWebSite(e.target.value)}
                />

                <label
                  htmlFor="website"
                  className={twMerge(
                    'label-input leading-none text-[16px] absolute z-10 top-1/2 left-3 -translate-y-1/2 pointer-events-none select-none text-zinc-400 transition-all duration-300',
                    activeFocus('website') || webSite.length ? 'active' : '',
                  )}
                >
                  Sitio web
                </label>
              </div>
              <button
                type="button"
                className="min-w-[36px] min-h-[36px] w-[36px] h-[36px] rounded-full bg-zinc-700 hover:bg-zinc-600 transition-all duration-300"
                onClick={() => addWebsite(webSite)}
              >
                <Plus size={24} className=" text-zinc-400 mx-auto" />
              </button>
            </div>
          )}
        </div>
        <div className="border-b border-zinc-700 border-opacity-50" />
        <div className="flex flex-wrap gap-5 px-4 py-4">
          {fields.website.length ? (
            <div className="flex items-center gap-4 flex-1 animate-fade-in">
              <Link size={24} className="min-w-[36px] min-h-[36px] w-[36px] h-[36px]" />
              <div className="flex-1 p-2 overflow-auto input-focus border border-zinc-700  border-opacity-70 outline-none bg-zinc-700 bg-opacity-10 rounded-md transition-colors duration-300">
                <a
                  href={fields.website}
                  rel="noopener noreferrer"
                  target="_blank"
                  className="w-fit line-clamp-1 break-all hover:underline text-sky-400 transition-colors duration-300"
                >
                  {fields.website}
                </a>
              </div>

              <button
                type="button"
                className="min-w-[36px] min-h-[36px] w-[36px] h-[36px] rounded-full bg-red-800 bg-opacity-50 hover:bg-red-600 hover:bg-opacity-60 transition-all duration-300"
                onClick={() => removeWebsite()}
              >
                <X size={24} className=" text-zinc-200 mx-auto" />
              </button>
            </div>
          ) : (
            <p className="text-zinc-400 flex-1 animate-fade-in">No has agregado un sitio web</p>
          )}
        </div>
      </section>
    </div>
  );
};

export default Tab4;
