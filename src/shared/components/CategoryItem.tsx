import { Link } from 'react-router-dom';

const CategoryItem = () => {
  return (
    <div className="border border-zinc-800 bg-zinc-800 hover:bg-opacity-70 backdrop-blur-sm transition-colors duration-300 shadow-lg overflow-hidden">
      <div className="w-full p-2">
        <div>
          <Link to="/food/by/1" className="block">
            <h2 className="line-clamp-2 text-zinc-300 hover:text-white transition-colors text-xs font-bold mb-2">Nombre del producto</h2>
            <p className="line-clamp-1 whitespace-nowrap text-xs font-medium mb-2 bg-green-800 bg-opacity-20 w-fit py-1 px-3 rounded-md border border-green-800 border-opacity-30">
              $ 100.00
            </p>
            <p className="line-clamp-3 text-xs text-zinc-400">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem reprehenderit voluptate tenetur quibusdam amet quasi ipsam nemo optio
              aliquam! Repellendus rerum nisi quas cum at assumenda ea dolor ipsum quae!
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CategoryItem;
