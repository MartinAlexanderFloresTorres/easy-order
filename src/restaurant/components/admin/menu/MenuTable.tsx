import { Frown } from 'lucide-react';
import { Menu } from '@/restaurant/interfaces';
import MenuTableItem from '@/restaurant/components/admin/menu/MenuTableItem';
import Spinner from '@/shared/components/Spinner';

interface MenuTableProps {
  menus: Menu[];
  editMenu: (menu: Menu) => void;
  loadingMenus: boolean;
}

const MenuTable = ({ menus, loadingMenus, editMenu }: MenuTableProps) => {
  if (loadingMenus) {
    return (
      <section className="bg-zinc-800 bg-opacity-80 text-center text-gray-400 border border-zinc-700 border-opacity-50 px-4 py-3 w-full animate-fade-in">
        <div className="bg-zinc-800 bg-opacity-80 text-center text-gray-400 border border-zinc-700 border-opacity-50 px-4 py-3 w-full flex flex-col gap-4 justify-center items-center rounded-md">
          <Spinner />
        </div>
      </section>
    );
  }

  if (menus.length === 0) {
    return (
      <section className="bg-zinc-800 bg-opacity-80 text-center text-gray-400 border border-zinc-700 border-opacity-50 px-4 py-3 w-full animate-fade-in">
        <div className="bg-zinc-800 bg-opacity-80 text-center text-gray-400 border border-zinc-700 border-opacity-50 px-4 py-3 w-full flex flex-col gap-4 justify-center items-center rounded-md">
          <p className="text-base">No hay menus registrados aún, crea uno nuevo.</p>
          <Frown size={50} />
        </div>
      </section>
    );
  }
  return (
    <section className="overflow-x-auto w-full">
      <table className="w-full border-collapse border border-zinc-700 border-opacity-50 text-center">
        <thead className="bg-zinc-800 bg-opacity-80">
          <tr className="text-gray-200 uppercase whitespace-nowrap">
            <th className="border border-zinc-700 border-opacity-50 px-4 py-3">Imagenes</th>
            <th className="border border-zinc-700 border-opacity-50 px-4 py-3">Nombre</th>
            <th className="border border-zinc-700 border-opacity-50 px-4 py-3">Descripción</th>
            <th className="border border-zinc-700 border-opacity-50 px-4 py-3">Categoria</th>
            <th className="border border-zinc-700 border-opacity-50 px-4 py-3">Precio</th>
            <th className="border border-zinc-700 border-opacity-50 px-4 py-3">Stock Diario</th>
            <th className="border border-zinc-700 border-opacity-50 px-4 py-3">Stock</th>
            <th className="border border-zinc-700 border-opacity-50 px-4 py-3">Ingredientes</th>
            <th className="border border-zinc-700 border-opacity-50 px-4 py-3">Activo</th>
            <th className="border border-zinc-700 border-opacity-50 px-4 py-3">Acciones</th>
          </tr>
        </thead>
        <tbody className="bg-zinc-800 bg-opacity-60">
          {menus.map((menu) => (
            <MenuTableItem key={menu._id} menu={menu} editMenu={editMenu} />
          ))}
        </tbody>
      </table>
    </section>
  );
};

export default MenuTable;
