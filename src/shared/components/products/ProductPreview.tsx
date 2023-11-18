import { Link } from 'react-router-dom';

interface ProductPreviewProps {
  onClick?: () => void;
}

const ProductPreview = ({ onClick }: ProductPreviewProps) => {
  return (
    <Link
      {...(onClick && { onClick })}
      to={'/food/by/1'}
      draggable={false}
      className="flex-1 pr-3 pl-8 py-2 text-xs bg-zinc-800 hover:bg-opacity-70 rounded-full text-zinc-400 hover:text-zinc-300 transition-all duration-300"
    >
      <div className="select-none flex items-center gap-2">
        <div className="flex flex-col gap-1">
          <p className="text-[16px] font-bold webkit-line-clamp-1">Pizza hawaiana con piña</p>
          <p className="text-[14px] font-medium text-zinc-400 webkit-line-clamp-1">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut, nostrum reiciendis! Dicta doloremque illo exercitationem magnam ipsum saepe
            quam quibusdam.
          </p>

          <p className="text-yellow-400 font-medium">S/ 30.00</p>
        </div>

        <div className="w-[66px] h-[66px] min-w-[66px] min-h-[66px] select-none flex items-center bg-zinc-800 justify-center rounded-full cursor-pointer transition-all">
          <img className="block w-full h-full rounded-full" src="/user.webp" alt="usuario" />
        </div>
      </div>
    </Link>
  );
};

export default ProductPreview;
