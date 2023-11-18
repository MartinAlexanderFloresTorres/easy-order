import { Link } from 'react-router-dom';
import { twMerge } from 'tailwind-merge';

interface Feature {
  id: number;
  description: string;
  isAvailable: boolean;
}

interface PlanProps {
  title: string;
  price: number;
  description: string;
  features: Feature[];
  className: string;
  type: 'free' | 'basic' | 'premium' | 'enterprise';
}

const Plan = ({ title, price, type, description, features, className }: PlanProps) => {
  return (
    <div className={twMerge('flex flex-col items-center justify-between w-80 p-[2px] rounded-lg shadow-lg', className)}>
      <div className=" bg-zinc-900 p-8 w-full h-full rounded-lg">
        <div
          className={twMerge(
            'text-center mb-4',
            className === 'bg-gradient-to-r from-green-400 to-green-700' && 'text-green-400',
            className === 'bg-gradient-to-r from-blue-400 to-blue-700' && 'text-blue-400',
            className === 'bg-gradient-to-r from-purple-400 to-purple-700' && 'text-purple-400',
            className === 'bg-gradient-to-r from-red-400 to-red-700' && 'text-red-400',
          )}
        >
          <h2 className="text-4xl font-bold mb-2">{title}</h2>
          <h3 className="text-2xl font-bold whitespace-nowrap">
            {type === 'free' && 'Gratis 4 meses'}
            {type === 'basic' && <span>S/ {price} Mensual</span>}
            {type === 'premium' && <span>S/ {price} Mensual</span>}
            {type === 'enterprise' && <span>S/ {price} Anual</span>}
          </h3>
        </div>

        <p className="text-sm font-medium text-zinc-400 mb-4">{description}</p>

        <div>
          <p className="text-sm font-medium text-zinc-400 mb-4">
            Disponible para <span className="font-bold">{type}</span>
          </p>
          <Link
            to="/auth/register"
            className={twMerge(
              'block w-fit mb-4',
              type === 'free' && 'text-green-400',
              type === 'basic' && 'text-blue-400',
              type === 'premium' && 'text-purple-400',
              type === 'enterprise' && 'text-red-400',
            )}
          >
            Registrate ahora
          </Link>

          <div>
            <ul className="mb-5">
              {features.map((feature) => (
                <li key={feature.id} className="grid grid-cols-[auto,1fr] gap-2 items-center mb-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="11" height="11" fill="none">
                    <path
                      fill={
                        !feature.isAvailable
                          ? '#4b4b4b'
                          : type === 'free'
                          ? '#10B981'
                          : type === 'basic'
                          ? '#3B82F6'
                          : type === 'premium'
                          ? '#8B5CF6'
                          : type === 'enterprise'
                          ? '#EF4444'
                          : '#fff'
                      }
                      d="m.215 5.618.018.005.006.002a6.557 6.557 0 0 1 5.128 5.114l.002.01.001.002c.084.32.164.332.248.034a6.555 6.555 0 0 1 5.13-5.159h.003c.326-.086.332-.167.016-.253A6.556 6.556 0 0 1 5.62.213L5.618.213c-.08-.283-.157-.283-.238.003l-.006.018-.001.006a2.13 2.13 0 0 0-.018.07v.002c-.008.042-.018.084-.028.126A6.557 6.557 0 0 1 .505 5.313l-.007.001a4.67 4.67 0 0 1-.235.052H.262l-.01.003H.249c-.32.084-.332.164-.034.248v.001Z"
                    />
                  </svg>

                  <span className={twMerge('text-xs font-medium text-zinc-300', !feature.isAvailable && 'text-zinc-500')}>{feature.description}</span>
                </li>
              ))}
            </ul>
          </div>

          <button
            type="button"
            className={twMerge(
              'block py-2 px-3 w-full rounded-md',
              className,
              type === 'free' && 'hover:from-green-500 hover:to-green-800',
              type === 'basic' && 'hover:from-blue-500 hover:to-blue-800',
              type === 'premium' && 'hover:from-purple-500 hover:to-purple-800',
              type === 'enterprise' && 'hover:from-red-500 hover:to-red-800',
            )}
          >
            Seleccionar
          </button>
        </div>
      </div>
    </div>
  );
};

export default Plan;
