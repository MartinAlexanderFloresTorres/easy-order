import { Edit } from 'lucide-react';
import Swal from 'sweetalert2';
import { twMerge } from 'tailwind-merge';
import useChangeStatusCategory from '@/restaurant/hooks/useChangeStatusCategory';
import { Category } from '@/restaurant/interfaces';

interface CategoryProps {
  category: Category;
  editCategory: (category: Category) => void;
}

const CategoryTableItem = ({ category, editCategory }: CategoryProps) => {
  const { loadingStatus, changeStatus } = useChangeStatusCategory();

  const handleStatus = async () => {
    if (loadingStatus) return;

    const { isConfirmed } = await Swal.fire({
      title: '¿Estás seguro?',
      text: `¿Deseas cambiar el estado de la categoría ${category.name}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: category.isActive ? 'Desactivar' : 'Activar',
      cancelButtonText: 'Cancelar',
    });

    if (!isConfirmed) return;

    changeStatus(category._id);
  };

  return (
    <tr key={category._id} className="transition-colors duration-300 bg-zinc-700 bg-opacity-20 hover:bg-opacity-40">
      <td className="border border-zinc-700 border-opacity-50 px-4 py-3">
        <img
          src={category.image?.secure_url}
          onLoad={(e) => {
            const currentTarget = e.currentTarget as HTMLImageElement;
            currentTarget.classList.remove('animate-pulse');
          }}
          onError={(e) => {
            const currentTarget = e.currentTarget as HTMLImageElement;
            currentTarget.classList.remove('animate-pulse');
            currentTarget.src = '/img/default-image.jpg';
          }}
          alt={category.name}
          className="mx-auto animate-pulse bg-zinc-700 bg-opacity-30 min-w-[50px] min-h-[50px] w-[50px] h-[50px] rounded-full object-cover"
        />
      </td>
      <td className="text-zinc-400 border border-zinc-700 border-opacity-50 px-4 py-3 text-sm font-bold">{category.name}</td>
      <td className="text-zinc-400 border border-zinc-700 border-opacity-50 px-4 py-3 text-sm">{category.description}</td>
      <td className="text-zinc-400 border border-zinc-700 border-opacity-50 px-4 py-3">
        {category.isActive ? <span className="text-green-500 font-bold">Sí</span> : <span className="text-red-500 font-bold">No</span>}
      </td>
      <td className="border border-zinc-700 border-opacity-50 px-4 py-3">
        <div className="flex gap-4 items-center justify-center">
          <button
            type="button"
            className="text-sm transition-colors duration-300 text-zinc-400 hover:text-gray-200"
            onClick={() => editCategory(category)}
            disabled={loadingStatus}
          >
            <Edit size={20} />
          </button>
          <button
            type="button"
            className={twMerge(
              'min-w-[100px] text-sm transition-colors duration-300 rounded-md px-2 py-1 font-semibold',
              category.isActive
                ? 'bg-red-500 text-red-500 border border-red-500 bg-opacity-10 border-opacity-40 hover:bg-opacity-20'
                : 'bg-green-500 text-green-500 border border-green-500 bg-opacity-10 border-opacity-40 hover:bg-opacity-20',
            )}
            onClick={handleStatus}
            disabled={loadingStatus}
          >
            {loadingStatus ? 'Cargando...' : category.isActive ? 'Desactivar' : 'Activar'}
          </button>
        </div>
      </td>
    </tr>
  );
};

export default CategoryTableItem;
