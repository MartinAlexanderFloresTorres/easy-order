import { Link } from 'react-router-dom';

const NotFoundPage = () => {
  return (
    <div className="container mx-auto flex text-center flex-col items-center justify-center min-h-screen">
      <h2 className="text-4xl font-bold mb-3">Pagina no encontrada</h2>
      <h3 className="text-6xl font-bold whitespace-nowrap mb-4">404</h3>
      <p className="text-sm font-medium text-zinc-400 mb-4 max-w-xs">
        La página que buscas no existe o no se encuentra disponible. <b>Regresa al inicio</b>
      </p>

      <Link className="bg-zinc-800 hover:bg-zinc-900 border border-zinc-800 px-4 py-2 text-zinc-300 hover:text-white transition-all" to="/">
        Ir al inicio
      </Link>
    </div>
  );
};

export default NotFoundPage;
