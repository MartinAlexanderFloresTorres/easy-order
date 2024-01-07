import { useEffect, useState } from 'react';
import { Dropzone, ExtFile, FileMosaic } from '@files-ui/react';
import { Info, X } from 'lucide-react';
import toast from 'react-hot-toast';

import useNewOrUpdateMenu from '@/restaurant/hooks/useNewOrUpdateMenu';
import useRestaurant from '@/restaurant/hooks/useRestaurant';
import { Menu, NewMenu } from '@/restaurant/interfaces';
import Loading from '@/shared/components/Loading';
import Modal from '@/shared/components/Modal';
import { transformImageToExtFile } from '@/shared/helpers';
import Counter from '@/shared/components/Counter';
import Swal from 'sweetalert2';
import NutritionalInformation from './NutritionalInformation';

const DEFAULT_FIELDS: NewMenu = {
  name: '',
  description: '',
  category: '',
  discount: 0,
  stockDaily: 0,
  price: 0,
  images: [],
  ingredients: '',
  isActive: false,
  nutritionalInformation: [],
};

const MAX_ROWS_NUTRITIONAL_INFORMATION = 60;
const MAX_LENGTH_INGREDIENTS = 300;
const MAX_LENGTH_DESCRIPTION = 600;
const MAX_LENGTH_NAME = 50;
const MIN_LENGTH_NAME = 3;
const MIN_LENGTH_DESCRIPTION = 3;
const MAX_STOCK = 600;
const MAX_IMAGES = 60;

interface ModalFormMenuProps {
  onClose: () => void;
  menuEdit: Menu | null;
}

let timer: NodeJS.Timeout | null = null;

const ModalFormMenu = ({ onClose, menuEdit }: ModalFormMenuProps) => {
  const [fields, setFields] = useState<NewMenu>(DEFAULT_FIELDS);
  const [filesImages, setFilesImages] = useState<ExtFile[]>([]);
  const [isClose, setIsClose] = useState(false);

  const { restaurant, activeCategories } = useRestaurant();
  const { loadingMenu, createMenu, updateMenu } = useNewOrUpdateMenu();

  useEffect(() => {
    if (menuEdit) {
      (async () => {
        setFields({
          name: menuEdit.name,
          description: menuEdit.description,
          category: menuEdit.category._id,
          discount: menuEdit.discount,
          ingredients: menuEdit.ingredients.join(', ').trimStart(),
          isActive: menuEdit.isActive,
          nutritionalInformation: menuEdit.nutritionalInformation,
          price: menuEdit.price,
          stockDaily: menuEdit.stockDaily,
          images: await Promise.all(menuEdit.images.map(async (image) => (await transformImageToExtFile(image)).file!)),
        });

        setFilesImages(await Promise.all(menuEdit.images.map(async (image) => await transformImageToExtFile(image))));
      })();
    }
  }, [menuEdit]);

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

    if (fields.name.length < MIN_LENGTH_NAME) {
      toast.error(`El nombre no puede ser menor a ${MIN_LENGTH_NAME} caracteres`);
      return;
    }

    if (fields.name.length > MAX_LENGTH_NAME) {
      toast.error(`El nombre no puede ser mayor a ${MAX_LENGTH_NAME} caracteres`);
      return;
    }

    if (!fields.description) {
      toast.error('Debes proporcionar una descripción');
      return;
    }

    if (fields.description.length < MIN_LENGTH_DESCRIPTION) {
      toast.error(`La descripción no puede ser menor a ${MIN_LENGTH_DESCRIPTION} caracteres`);
      return;
    }

    if (fields.description.length > MAX_LENGTH_DESCRIPTION) {
      toast.error(`La descripción no puede ser mayor a ${MAX_LENGTH_DESCRIPTION} caracteres`);
      return;
    }

    if (!fields.category) {
      toast.error('Debes proporcionar una categoria');
      return;
    }

    if (!fields.price) {
      toast.error('Debes proporcionar un precio');
      return;
    }

    if (fields.price < 0) {
      toast.error('El precio no puede ser menor a 0');
      return;
    }

    if (!fields.stockDaily) {
      toast.error('Debes proporcionar un stock diario');
      return;
    }

    if (fields.stockDaily < 0) {
      toast.error('El stock diario no puede ser menor a 0');
      return;
    }

    if (fields.stockDaily > MAX_STOCK) {
      toast.error(`El stock diario no puede ser mayor a ${MAX_STOCK}`);
      return;
    }

    if (fields.ingredients.length > MAX_LENGTH_INGREDIENTS) {
      toast.error(`Los ingredientes no pueden ser mayor a ${MAX_LENGTH_INGREDIENTS} caracteres`);
      return;
    }

    if (fields.nutritionalInformation.length > MAX_ROWS_NUTRITIONAL_INFORMATION) {
      toast.error(`La información nutricional no pueden ser mayor a ${MAX_ROWS_NUTRITIONAL_INFORMATION} filas`);
      return;
    }

    const isEmtpyNameNutritionalInformation = fields.nutritionalInformation.find((item) => item.name.trim() === '');
    if (isEmtpyNameNutritionalInformation) {
      toast.error(`Hay información nutricional sin nombre`);
      return;
    }

    const isEmtpyValueNutritionalInformation = fields.nutritionalInformation.find((item) => item.value.trim() === '');
    if (isEmtpyValueNutritionalInformation) {
      toast.error(`Hay información nutricional sin valor`);
      return;
    }

    const maxNameNutritionalInformation = fields.nutritionalInformation.find((item) => item.name.length > 50);
    if (maxNameNutritionalInformation) {
      toast.error(`El nombre de la información nutricional ${maxNameNutritionalInformation.name} no puede ser mayor a 50 caracteres`);
      return;
    }

    const maxValueNutritionalInformation = fields.nutritionalInformation.find((item) => item.value.length > 50);
    if (maxValueNutritionalInformation) {
      toast.error(`El valor de la información nutricional ${maxValueNutritionalInformation.value} no puede ser mayor a 50 caracteres`);
      return;
    }

    if (!filesImages.length) {
      toast.error('Debes proporcionar alguna imagen');
      return;
    }

    if (filesImages.length > MAX_IMAGES) {
      toast.error(`Las imagenes no pueden ser mayor a ${MAX_IMAGES}`);
      return;
    }

    if (menuEdit) {
      /* = categoryEdit.image?.url === filesImage[0].imageUrl */
      const isEqualsImages: boolean =
        menuEdit.images.every((image) => image.url === filesImages.find((file) => file.imageUrl === image.url)?.imageUrl) &&
        filesImages.length === menuEdit.images.length;

      updateMenu({
        menuId: menuEdit._id,
        data: {
          ...fields,
          discount: Number(fields.discount),
          price: Number(fields.price),
          stockDaily: Number(fields.stockDaily),
        },
        isEqualsImages,
        callback: () => {
          setFields(DEFAULT_FIELDS);
          setFilesImages([]);
          onClose();
        },
      });
      return;
    }

    createMenu(
      {
        ...fields,
        discount: Number(fields.discount),
        price: Number(fields.price),
        stockDaily: Number(fields.stockDaily),
      },
      () => {
        setFields(DEFAULT_FIELDS);
        setFilesImages([]);
        onClose();
      },
    );
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    if (name === 'price' || name === 'discount' || name === 'stock') {
      setFields((prev) => ({ ...prev, [name]: Number(value) }));
      return;
    }

    setFields({ ...fields, [name]: value.trimStart() });
  };

  const updateFiles = (files: ExtFile[]) => {
    if (files.length > MAX_IMAGES) {
      toast.error(`Las imagenes no pueden ser mayor a ${MAX_IMAGES}`);
      return;
    }

    setFilesImages(files);
    const images = files.map((file) => file.file!);
    setFields({ ...fields, images });
  };

  const removeFile = (fileId: string | number | undefined) => {
    const newFiles = filesImages.filter((file) => file.id !== fileId);
    const files = newFiles.filter((file) => file !== undefined).map((file) => file.file!);

    setFilesImages(newFiles);
    setFields({ ...fields, images: files });
  };

  const showInfoIngredients = () => {
    Swal.fire({
      title: 'Ingredientes',
      html: `
        <div>
          <p>Cada ingrediente debe ser separado por una coma</p>
          <pre class="inline-block my-4 bg-zinc-700 bg-opacity-50 px-2 py-1 rounded-md text-zinc-200">( , )</pre>
          <p class="text-zinc-400">Ejemplo: Pollo, lechuga, tomate, etc</p>
        </div>
      `,
      icon: 'info',
      confirmButtonText: 'Entendido',
    });
  };

  const showInfoCategories = () => {
    Swal.fire({
      title: 'Categorias',
      text: 'Todas las categoria activas se listaran',
      icon: 'info',
      confirmButtonText: 'Entendido',
    });
  };

  const showInfoVisibility = () => {
    Swal.fire({
      title: 'Visibilidad',
      text: 'El menu que tenga activada esta opcion en (SI) se mostrara el menu a los clientes para que realizen sus ordenes',
      icon: 'info',
      confirmButtonText: 'Entendido',
    });
  };

  if (!restaurant) return null;

  return (
    <Modal onClose={onCloseModal} isClose={isClose} className="bg-black bg-opacity-50 backdrop-blur-sm">
      <Modal.Overlay onClose={onCloseModal} disabled={loadingMenu}>
        {loadingMenu ? (
          <Loading title={menuEdit ? 'Actualizando menú' : 'Creando menú'} description="Espere un momento por favor ..." />
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
                <h3 className="text-2xl font-semibold text-gray-200 uppercase text-center">{menuEdit ? 'Actualizar menú' : 'Crear menú'}</h3>
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
                  {menuEdit ? 'Actualiza los datos de la menú' : 'Comienza a crear tus menus para tus menús'}
                </p>
              </div>
              <form className="p-5 flex-col space-y-5" onSubmit={onSubmit}>
                <div className="flex flex-col gap-4">
                  <label htmlFor="name" className="text-sm font-semibold text-gray-400">
                    Nombre del menu
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    autoComplete="off"
                    autoFocus
                    value={fields.name}
                    placeholder="Ej: Hamburguesa de pollo"
                    onChange={onChange}
                    className="px-4 py-2 border border-zinc-700 bg-zinc-900 bg-opacity-50 rounded-lg focus:outline-none focus:border-zinc-600 placeholder:text-zinc-500"
                  />
                </div>
                <div className="flex flex-col gap-4">
                  <label htmlFor="description" className="text-sm font-semibold text-gray-400">
                    Descripcion
                  </label>
                  <textarea
                    name="description"
                    id="description"
                    autoComplete="off"
                    value={fields.description}
                    placeholder="Ej: Prueba tu hamburguesa de pollo a increibles precios, Acompañala con una refrescante gaseosa"
                    onChange={onChange}
                    className="px-4 py-2 relative max-h-[200px] min-h-[80px] border border-zinc-700 bg-zinc-900 bg-opacity-50 rounded-lg focus:outline-none focus:border-zinc-600 placeholder:text-zinc-500"
                  />
                </div>

                <div className="flex flex-col sm:flex-row gap-4 w-full">
                  <div className="flex-1 flex flex-col gap-4">
                    <div className="flex items-center gap-2 ">
                      <label htmlFor="category" className="text-sm font-semibold text-gray-400">
                        Categoria
                      </label>
                      <button className="text-zinc-400" type="button" onClick={showInfoCategories}>
                        <Info size={20} />
                      </button>
                    </div>
                    <select
                      name="category"
                      id="category"
                      value={fields.category}
                      onChange={onChange}
                      className="px-4 py-2 border border-zinc-700 bg-zinc-900 bg-opacity-50 rounded-lg focus:outline-none focus:border-zinc-600 placeholder:text-zinc-500"
                    >
                      <option className={'text-zinc-200 bg-zinc-800'} value="">
                        Seleccionar
                      </option>
                      {activeCategories.map((category) => (
                        <option className={'text-zinc-200 bg-zinc-800'} key={category._id} value={category._id}>
                          {category.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="flex-1 flex flex-col gap-4">
                    <label htmlFor="price" className="text-sm font-semibold text-gray-400">
                      Precio
                    </label>
                    <input
                      type="number"
                      name="price"
                      id="price"
                      autoComplete="off"
                      value={fields.price || ''}
                      placeholder="5.50"
                      onChange={onChange}
                      className="px-4 py-2 border border-zinc-700 bg-zinc-900 bg-opacity-50 rounded-lg focus:outline-none focus:border-zinc-600 placeholder:text-zinc-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="w-full flex flex-col gap-4">
                    <label htmlFor="stockDaily" className="text-sm font-semibold text-gray-400">
                      Stock Diario
                    </label>
                    <div className="w-full flex items-center gap-4">
                      <Counter
                        className="w-full"
                        min={0}
                        max={MAX_STOCK}
                        countState={fields.stockDaily}
                        updateCount={(count) => setFields((prev) => ({ ...prev, stockDaily: count }))}
                        onChange={(count) => setFields((prev) => ({ ...prev, stockDaily: count }))}
                      >
                        <input
                          type="number"
                          name="stockDaily"
                          id="stockDaily"
                          autoComplete="off"
                          value={fields.stockDaily || ''}
                          placeholder="0"
                          onChange={onChange}
                          className="w-full text-center px-4 py-2 border border-zinc-700 bg-zinc-900 bg-opacity-50 rounded-lg focus:outline-none focus:border-zinc-600 placeholder:text-zinc-500"
                        />
                      </Counter>
                    </div>
                  </div>

                  <div className="flex-1 flex flex-col gap-4">
                    <label htmlFor="discount" className="text-sm font-semibold text-gray-400">
                      Descuento
                    </label>
                    <input
                      type="number"
                      name="discount"
                      id="discount"
                      autoComplete="off"
                      value={fields.discount || ''}
                      placeholder="1.50"
                      onChange={onChange}
                      className="px-4 py-2 border border-zinc-700 bg-zinc-900 bg-opacity-50 rounded-lg focus:outline-none focus:border-zinc-600 placeholder:text-zinc-500"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-4">
                  <div className="flex items-center gap-2">
                    <label htmlFor="ingredients" className="text-sm font-semibold text-gray-400">
                      Ingredientes <span className="text-zinc-500">(opcional)</span>
                    </label>
                    <button className="text-zinc-400" type="button" onClick={showInfoIngredients}>
                      <Info size={20} />
                    </button>
                  </div>
                  <input
                    type="text"
                    name="ingredients"
                    id="ingredients"
                    autoComplete="off"
                    value={fields.ingredients}
                    onChange={onChange}
                    placeholder="Ej: Pollo, lechuga, tomate, etc"
                    className="w-full px-4 py-2 border border-zinc-700 bg-zinc-900 bg-opacity-50 rounded-lg focus:outline-none focus:border-zinc-600 placeholder:text-zinc-500"
                  />
                </div>

                <div className="flex flex-col gap-4">
                  <label htmlFor="nutritionalInformation" className="text-sm font-semibold text-gray-400">
                    Información nutricional <span className="text-zinc-500">(opcional)</span>
                  </label>
                  <NutritionalInformation
                    values={fields.nutritionalInformation}
                    maxRows={MAX_ROWS_NUTRITIONAL_INFORMATION}
                    onChange={(items) => {
                      setFields({
                        ...fields,
                        nutritionalInformation: items,
                      });
                    }}
                  />
                </div>

                <div className="flex flex-col gap-4 w-full">
                  <div className="flex items-center gap-2">
                    <label htmlFor="nutritionalInformation" className="text-sm font-semibold text-gray-400">
                      Mostrar menu a los usuarios
                    </label>
                    <button className="text-zinc-400" type="button" onClick={showInfoVisibility}>
                      <Info size={20} />
                    </button>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="isActive"
                        id="isActive"
                        checked={fields.isActive}
                        onChange={() => setFields((prev) => ({ ...prev, isActive: true }))}
                        className="w-4 h-4 rounded-md bg-pink-600 focus:ring-0 focus:outline-none"
                      />
                      <label htmlFor="isActive" className="text-sm font-semibold text-gray-400">
                        Si
                      </label>
                    </div>
                    <div className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="isActive"
                        id="notActive"
                        checked={!fields.isActive}
                        onChange={() => setFields((prev) => ({ ...prev, isActive: false }))}
                        className="w-4 h-4 rounded-md bg-pink-600 focus:ring-0 focus:outline-none"
                      />
                      <label htmlFor="notActive" className="text-sm font-semibold text-gray-400">
                        No
                      </label>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-4 w-full">
                  <label htmlFor="image" className="text-sm font-semibold text-gray-400">
                    Imagenes
                  </label>

                  <Dropzone
                    footer={false}
                    header={false}
                    accept="image/*"
                    multiple={true}
                    label="Arrastra y suelta las imagenes o haz click para seleccionarlas"
                    onChange={(files) => updateFiles(files)}
                    value={filesImages}
                  >
                    {filesImages.map((file) => (
                      <FileMosaic key={file.id} darkMode alwaysActive={false} {...file} onDelete={(fileId) => removeFile(fileId)} preview />
                    ))}
                  </Dropzone>
                </div>

                <div className="flex items-center justify-end">
                  <button
                    type="submit"
                    className="w-full md:w-fit whitespace-nowrap px-6 py-3 bg-pink-600 hover:bg-pink-700 transition-all duration-300 rounded-md font-semibold"
                  >
                    {menuEdit ? 'Actualizar menú' : 'Crear menú'}
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

export default ModalFormMenu;
