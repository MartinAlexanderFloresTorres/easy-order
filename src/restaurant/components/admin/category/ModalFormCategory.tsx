import { useEffect, useState } from 'react';
import { Dropzone, ExtFile, FileMosaic } from '@files-ui/react';
import { X } from 'lucide-react';
import toast from 'react-hot-toast';

import useNewOrUpdateCategory from '@/restaurant/hooks/useNewOrUpdateCategory';
import useRestaurant from '@/restaurant/hooks/useRestaurant';
import { Category, NewCategory } from '@/restaurant/interfaces';
import Loading from '@/shared/components/Loading';
import Modal from '@/shared/components/Modal';
import { transformImageToExtFile } from '@/shared/helpers';

const DEFAULT_FIELDS = {
  name: '',
  description: '',
  image: null,
  banner: null,
};

interface ModalFormCategoryProps {
  onClose: () => void;
  categoryEdit: Category | null;
}

let timer: NodeJS.Timeout | null = null;

const ModalFormCategory = ({ onClose, categoryEdit }: ModalFormCategoryProps) => {
  const [fields, setFields] = useState<NewCategory>(DEFAULT_FIELDS);
  const [filesImage, setFilesImage] = useState<ExtFile[]>([]);
  const [filesBanner, setFilesBanner] = useState<ExtFile[]>([]);
  const [isClose, setIsClose] = useState(false);

  const { restaurant } = useRestaurant();
  const { loadingCategory, createCategory, updateCategory } = useNewOrUpdateCategory();

  useEffect(() => {
    if (categoryEdit) {
      (async () => {
        setFields({
          name: categoryEdit.name,
          description: categoryEdit.description,
          image: (await transformImageToExtFile(categoryEdit.image)).file || null,
          banner: (await transformImageToExtFile(categoryEdit.banner)).file || null,
        });

        setFilesImage([await transformImageToExtFile(categoryEdit.image)]);
        setFilesBanner([await transformImageToExtFile(categoryEdit.banner)]);
      })();
    }
  }, [categoryEdit]);

  const onCloseModal = () => {
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
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    toast.dismiss();

    // Validations
    if (!fields.name) {
      toast.error('Debes proporcionar un nombre');
      return;
    }

    if (fields.name.length < 3) {
      toast.error('El nombre no puede ser menor a 3 caracteres');
      return;
    }

    if (fields.name.length > 50) {
      toast.error('El nombre no puede ser mayor a 50 caracteres');
      return;
    }

    if (!fields.description) {
      toast.error('Debes proporcionar una descripción');
      return;
    }

    if (fields.description.length < 3) {
      toast.error('La descripción no puede ser menor a 3 caracteres');
      return;
    }

    if (fields.description.length > 200) {
      toast.error('La descripción no puede ser mayor a 200 caracteres');
      return;
    }

    if (!filesImage.length || !filesImage[0].file) {
      toast.error('Debes proporcionar una imagen');
      return;
    }

    if (!filesBanner.length || !filesBanner[0].file) {
      toast.error('Debes proporcionar un banner');
      return;
    }

    if (categoryEdit) {
      const isEqualsImage: boolean = categoryEdit.image?.url === filesImage[0].imageUrl;
      const isEqualsBanner: boolean = categoryEdit.banner?.url === filesBanner[0].imageUrl;

      updateCategory({
        categoryId: categoryEdit._id,
        data: fields,
        isEqualsImage,
        isEqualsBanner,
        callback: () => {
          setFields(DEFAULT_FIELDS);
          setFilesImage([]);
          setFilesBanner([]);
          onClose();
        },
      });
      return;
    }

    createCategory(fields, () => {
      setFields(DEFAULT_FIELDS);
      setFilesImage([]);
      setFilesBanner([]);
      onClose();
    });
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFields({ ...fields, [name]: value.trimStart() });
  };

  const updateFiles = (files: ExtFile[], field: 'image' | 'banner') => {
    if (field === 'image' && files.length && files[0].file) {
      if (files.length > 1) {
        toast.error('Solo puedes subir una imagen');
      }
      setFilesImage(files.slice(0, 1));
      setFields({ ...fields, image: files[0].file });
    }

    if (field === 'banner' && files.length && files[0].file) {
      if (files.length > 1) {
        toast.error('Solo puedes subir una imagen');
      }
      setFilesBanner(files.slice(0, 1));
      setFields({ ...fields, banner: files[0].file });
    }
  };

  const removeFile = (fileId: string | number | undefined, field: 'image' | 'banner') => {
    if (field === 'image') {
      const newFiles = filesImage.filter((file) => file.id !== fileId);
      setFilesImage(newFiles);
      setFields({ ...fields, image: null });
    } else {
      const newFiles = filesBanner.filter((file) => file.id !== fileId);
      setFilesBanner(newFiles);
      setFields({ ...fields, banner: null });
    }
  };

  if (!restaurant) return null;

  return (
    <Modal onClose={onCloseModal} isClose={isClose} className="bg-black bg-opacity-50 backdrop-blur-sm">
      <Modal.Overlay onClose={onCloseModal} disabled={loadingCategory}>
        {loadingCategory ? (
          <Loading title={categoryEdit ? 'Actualizando categoría' : 'Creando categoría'} description="Espere un momento por favor ..." />
        ) : (
          <div className="animate-fade-in select-none border border-zinc-700 border-opacity-50 backdrop-blur-sm max-w-xl w-full mx-auto overflow-auto">
            <div className="sticky top-0 z-10 backdrop-blur-sm border-b border-b-zinc-700 border-opacity-50 bg-zinc-800 bg-opacity-80 flex items-stretch justify-between text-center">
              <div className="px-4 py-3 flex items-center text-center gap-4 border-r border-r-zinc-700 border-opacity-50">
                <img
                  src={restaurant.logo ? restaurant.logo.secure_url : '/img/default-logo.png'}
                  alt={restaurant.name}
                  className="min-w-[50px] min-h-[50px] w-[50px] h-[50px] rounded-full object-cover"
                />
              </div>
              <div className="px-4 py-3 flex items-center justify-center text-center flex-1">
                <h3 className="text-2xl font-semibold text-gray-200 uppercase text-center">
                  {categoryEdit ? 'Actualizar categoría' : 'Crear categoría'}
                </h3>
              </div>
              <div className="px-4 py-3 flex items-center justify-end text-center gap-4 border-l border-l-zinc-700 border-opacity-50">
                <button
                  type="button"
                  className="min-w-[40px] min-h-[40px] w-[40px] h-[40px] flex items-center justify-center px2-4 py- rounded-full bg-zinc-700 bg-opacity-50 hover:bg-opacity-100 transition-all duration-300 text-gray-300"
                  onClick={onCloseModal}
                >
                  <X size={24} />
                </button>
              </div>
            </div>

            <div className=" bg-zinc-900 bg-opacity-80 md:flex-1">
              <div className="px-4 py-3 border-b border-b-zinc-700 border-opacity-50 flex items-center justify-center text-center">
                <p className="font-normal text-center text-gray-300">
                  {categoryEdit ? 'Actualiza los datos de la categoría' : 'Comienza a crear tus categorías para tus menús'}
                </p>
              </div>
              <form className="p-5 flex-col space-y-5" onSubmit={onSubmit}>
                <div className="flex flex-col space-y-1">
                  <label htmlFor="name" className="text-sm font-semibold text-gray-400">
                    Nombre
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    autoComplete="off"
                    autoFocus
                    placeholder="Ej: Bebidas"
                    value={fields.name}
                    onChange={onChange}
                    className="w-full px-4 py-2 border border-zinc-700 bg-zinc-900 bg-opacity-50 rounded-lg focus:outline-none focus:border-zinc-600 placeholder:text-zinc-500"
                  />
                </div>
                <div className="flex flex-col space-y-1">
                  <label htmlFor="description" className="text-sm font-semibold text-gray-400">
                    Descripcion
                  </label>
                  <textarea
                    name="description"
                    id="description"
                    placeholder="Ej: Bebidas frias y calientes"
                    autoComplete="off"
                    value={fields.description}
                    onChange={onChange}
                    className="w-full px-4 py-2 relative max-h-[200px] min-h-[80px] border border-zinc-700 bg-zinc-900 bg-opacity-50 rounded-lg focus:outline-none focus:border-zinc-600 placeholder:text-zinc-500"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col space-y-1 w-full">
                    <label htmlFor="image" className="text-sm font-semibold text-gray-400">
                      Image
                    </label>

                    <Dropzone
                      footer={false}
                      header={false}
                      accept="image/*"
                      label="Arrastra y suelta la imagen o haz click para seleccionarla"
                      onChange={(files) => updateFiles(files, 'image')}
                      value={filesImage}
                    >
                      {filesImage.map((file) => (
                        <FileMosaic
                          key={file.id}
                          darkMode
                          alwaysActive={false}
                          {...file}
                          onDelete={(fileId) => removeFile(fileId, 'image')}
                          preview
                        />
                      ))}
                    </Dropzone>
                  </div>

                  <div className="flex flex-col space-y-1 w-full">
                    <label htmlFor="banner" className="text-sm font-semibold text-gray-400">
                      Banner
                    </label>

                    <Dropzone
                      footer={false}
                      header={false}
                      accept="image/*"
                      label="Arrastra y suelta la imagen o haz click para seleccionarla"
                      onChange={(files) => updateFiles(files, 'banner')}
                      value={filesBanner}
                    >
                      {filesBanner.map((file) => (
                        <FileMosaic
                          key={file.id}
                          darkMode
                          alwaysActive={false}
                          {...file}
                          onDelete={(fileId) => removeFile(fileId, 'banner')}
                          preview
                        />
                      ))}
                    </Dropzone>
                  </div>
                </div>

                <div className="flex items-center justify-end">
                  <button
                    type="submit"
                    className="w-full md:w-fit whitespace-nowrap px-6 py-3 bg-pink-600 hover:bg-pink-700 transition-all duration-300 rounded-md font-semibold"
                  >
                    {categoryEdit ? 'Actualizar categoría' : 'Crear categoría'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </Modal.Overlay>
    </Modal>
  );
};

export default ModalFormCategory;
