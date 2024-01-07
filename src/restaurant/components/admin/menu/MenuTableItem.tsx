import useChangeStatusMenu from '@/restaurant/hooks/useChangeStatusMenu';
import useRenewStockMenu from '@/restaurant/hooks/useRenewStockMenu';
import { Menu } from '@/restaurant/interfaces';
import { Edit } from 'lucide-react';
import Swal from 'sweetalert2';
import { twMerge } from 'tailwind-merge';

interface MenuProps {
  menu: Menu;
  editMenu: (menu: Menu) => void;
}

const MenuTableItem = ({ menu, editMenu }: MenuProps) => {
  const { loadingStatus, changeStatus } = useChangeStatusMenu();
  const { loadingRenewStock, renewStock } = useRenewStockMenu();

  const handleStatus = async () => {
    if (loadingStatus) return;

    const { isConfirmed } = await Swal.fire({
      title: '¿Estás seguro?',
      text: `¿Deseas cambiar el estado del menu ${menu.name}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: menu.isActive ? 'Desactivar' : 'Activar',
      cancelButtonText: 'Cancelar',
    });

    if (!isConfirmed) return;

    changeStatus(menu._id);
  };

  const handleRenewStock = async () => {
    if (loadingRenewStock) return;

    const { isConfirmed } = await Swal.fire({
      title: '¿Estás seguro?',
      text: `¿Deseas renovar el stock del menu ${menu.name}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Renovar',
      cancelButtonText: 'Cancelar',
    });

    if (!isConfirmed) return;

    renewStock(menu._id, menu.restaurant);
  };

  return (
    <tr key={menu._id} className="transition-colors duration-300 bg-zinc-700 bg-opacity-20 hover:bg-opacity-40">
      <td className="border border-zinc-700 border-opacity-50 px-4 py-3">
        {menu.images.length ? (
          <div className="flex items-center justify-center">
            {menu.images.map((image, index) => (
              <img
                key={image._id}
                src={image.secure_url}
                onLoad={(e) => {
                  const currentTarget = e.currentTarget as HTMLImageElement;
                  currentTarget.classList.remove('animate-pulse');
                }}
                onError={(e) => {
                  const currentTarget = e.currentTarget as HTMLImageElement;
                  currentTarget.classList.remove('animate-pulse');
                  currentTarget.src = '/img/default-image.jpg';
                }}
                alt={menu.name}
                className={twMerge(
                  'animate-pulse bg-zinc-700 bg-opacity-30 min-w-[50px] min-h-[50px] w-[50px] h-[50px] rounded-full object-cover',
                  index === 0 ? '' : 'ml-[-20px]',
                )}
              />
            ))}
          </div>
        ) : (
          <img src="/img/default-image.jpg" alt={menu.name} className="min-w-[50px] min-h-[50px] w-[50px] h-[50px] rounded-full object-cover" />
        )}
      </td>
      <td className="text-zinc-400 border border-zinc-700 border-opacity-50 px-4 py-3 text-sm font-bold">{menu.name}</td>
      <td className="text-zinc-400 border border-zinc-700 border-opacity-50 px-4 py-3 text-sm">
        <p className="truncate max-w-xs">{menu.description}</p>
      </td>
      <td className="text-zinc-400 border border-zinc-700 border-opacity-50 px-4 py-3 text-sm font-bold">{menu.category.name}</td>

      <td className="text-zinc-400 border border-zinc-700 border-opacity-50 px-4 py-3 text-sm font-bold">{menu.price}</td>
      <td className="text-sky-500 border border-zinc-700 border-opacity-50 px-4 py-3 text-sm font-bold">{menu.stockDaily}</td>
      <td
        className={twMerge(
          'border border-zinc-700 border-opacity-50 px-4 py-3 text-sm font-bold',
          menu.stock === 0 ? 'text-red-500' : 'text-green-500',
        )}
      >
        {menu.stock}
      </td>
      <td className="text-zinc-400 border border-zinc-700 border-opacity-50 px-4 py-3 text-sm font-bold">{menu.ingredients.length}</td>
      <td className="text-zinc-400 border border-zinc-700 border-opacity-50 px-4 py-3">
        {menu.isActive ? <span className="text-green-500 font-bold">Sí</span> : <span className="text-red-500 font-bold">No</span>}
      </td>
      <td className="border border-zinc-700 border-opacity-50 px-4 py-3">
        <div className="flex gap-4 items-center justify-center whitespace-nowrap">
          <button
            type="button"
            className="text-sm transition-colors duration-300 text-zinc-400 hover:text-gray-200"
            onClick={() => editMenu(menu)}
            disabled={loadingStatus}
          >
            <Edit size={20} />
          </button>
          <button
            type="button"
            className="min-w-[100px] text-sm transition-colors duration-300 rounded-md px-2 py-1 font-semibold bg-blue-500 text-blue-500 border border-blue-500 bg-opacity-10 border-opacity-40 hover:bg-opacity-20"
            onClick={handleRenewStock}
            disabled={loadingRenewStock}
          >
            Renovar stock
          </button>
          <button
            type="button"
            className={twMerge(
              'min-w-[100px] text-sm transition-colors duration-300 rounded-md px-2 py-1 font-semibold',
              menu.isActive
                ? 'bg-red-500 text-red-500 border border-red-500 bg-opacity-10 border-opacity-40 hover:bg-opacity-20'
                : 'bg-green-500 text-green-500 border border-green-500 bg-opacity-10 border-opacity-40 hover:bg-opacity-20',
            )}
            onClick={handleStatus}
            disabled={loadingStatus}
          >
            {loadingStatus ? 'Cargando...' : menu.isActive ? 'Desactivar' : 'Activar'}
          </button>
        </div>
      </td>
    </tr>
  );
};

export default MenuTableItem;
