import { Frown } from 'lucide-react';
import { Category } from '@/restaurant/interfaces';
import CategoryTableItem from '@/restaurant/components/admin/category/CategoryTableItem';

interface CategoryTableProps {
  categories: Category[];
  editCategory: (category: Category) => void;
}

const CategoryTable = ({ categories, editCategory }: CategoryTableProps) => {
  if (categories.length === 0) {
    return (
      <section className="bg-zinc-800 bg-opacity-80 text-center text-gray-400 border border-zinc-700 border-opacity-50 px-4 py-3 w-full">
        <div className="bg-zinc-800 bg-opacity-80 text-center text-gray-400 border border-zinc-700 border-opacity-50 px-4 py-3 w-full flex flex-col gap-4 justify-center items-center rounded-md">
          <p className="text-base">No hay categorías registradas aún, crea una nueva.</p>
          <Frown size={50} />
        </div>
      </section>
    );
  }
  return (
    <section className="overflow-x-auto w-full">
      <table className="w-full border-collapse border border-zinc-700 border-opacity-50 text-center">
        <thead className="bg-zinc-800 bg-opacity-80">
          <tr className="text-gray-200 uppercase">
            <th className="border border-zinc-700 border-opacity-50 px-4 py-3 w-[50px]">Imagen</th>
            <th className="border border-zinc-700 border-opacity-50 px-4 py-3">Nombre</th>
            <th className="border border-zinc-700 border-opacity-50 px-4 py-3">Descripción</th>
            <th className="border border-zinc-700 border-opacity-50 px-4 py-3">Activo</th>
            <th className="border border-zinc-700 border-opacity-50 px-4 py-3">Acciones</th>
          </tr>
        </thead>
        <tbody className="bg-zinc-800 bg-opacity-60">
          {categories.map((category) => (
            <CategoryTableItem key={category._id} category={category} editCategory={editCategory} />
          ))}
        </tbody>
      </table>
    </section>
  );
};

export default CategoryTable;
