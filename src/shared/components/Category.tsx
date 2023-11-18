import { Link } from 'react-router-dom';

interface CategoryProps {
  onClose: () => void;
}

const Category = ({ onClose }: CategoryProps) => {
  return (
    <div>
      <Link
        onClick={onClose}
        to="/"
        className="block line-clamp-1 border-l-2 text-center border-zinc-800 hover:border-pink-400 hover:border-opacity-80 w-fit px-5 py-2 hover:bg-zinc-800 hover:bg-opacity-50 text-zinc-400 hover:text-white transition-all text-sm font-medium"
      >
        Comida
      </Link>
    </div>
  );
};

export default Category;
