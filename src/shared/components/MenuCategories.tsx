import { twMerge } from 'tailwind-merge';
import Category from '@/shared/components/Category';
import CategoryItems from '@/shared/components/CategoryItems';

interface MenuCategoriesProps {
  onClose: () => void;
  isOpen: boolean;
}

const MenuCategories = ({ onClose, isOpen }: MenuCategoriesProps) => {
  return (
    <section
      className={twMerge(
        'absolute top-auto w-full left-0 ring-0 border-b border-zinc-800 border-opacity-30 p-3 backdrop-blur-xl bg-zinc-900 bg-opacity-80 overflow-auto transition-all duration-300 z-50',
        isOpen ? 'opacity-100 visible events-auto' : 'opacity-0 invisible events-none',
      )}
      style={{
        maxHeight: 'calc(100vh - 70px)',
        minHeight: 'calc(100vh - 70px)',
      }}
    >
      <div className="container mx-auto flex items-start gap-4 overflow-auto">
        <div className="flex flex-col">
          <Category onClose={onClose} />
          <Category onClose={onClose} />
          <Category onClose={onClose} />
          <Category onClose={onClose} />
          <Category onClose={onClose} />
          <Category onClose={onClose} />
          <Category onClose={onClose} />
        </div>

        <div className="w-full h-full">
          <CategoryItems onClose={onClose} />
        </div>
      </div>
    </section>
  );
};

export default MenuCategories;
