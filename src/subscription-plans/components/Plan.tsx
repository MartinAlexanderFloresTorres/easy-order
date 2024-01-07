import { Link, useLocation, useNavigate } from 'react-router-dom';
import { twMerge } from 'tailwind-merge';
import { SubscriptionPlan } from '../interfaces';
import useAccount from '@/account/hooks/useAccount';
import { COLORS_BTN, COLORS_FEATURE, COLORS_TEXT } from '@/subscription-plans/constants';
import Swal from 'sweetalert2';
import { ErrorMessage } from '@/shared/interfaces';
import ClientAxios from '@/config/ClientAxios';

interface PlanProps {
  plan: SubscriptionPlan;
  className: string;
}

const Plan = ({ plan, className }: PlanProps) => {
  const { name, price, type, description, features, durationMonths, stock } = plan;
  const { authenticated, user } = useAccount();
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const handleSelectPlan = async (plan: SubscriptionPlan) => {
    if (!authenticated) return navigate('/auth/login', { state: { from: pathname } });

    // Si ya tiene un plan seleccionado
    /* if (user && user.subscriptionPlan) return toast.error('Ya tienes un plan seleccionado'); */

    const { isConfirmed } = await Swal.fire({
      title: '¿Estás seguro?',
      text: `Vas a seleccionar el plan ${plan.name} por ${plan.price} soles por ${plan.durationMonths} meses`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, seleccionar',
      cancelButtonText: 'Cancelar',
    });

    if (!isConfirmed) return;

    try {
      const { data } = await ClientAxios.post<{
        message: string;
      }>(
        '/subscription-plan/subscribe',
        { planId: plan._id },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('jwt')}`,
          },
        },
      );

      Swal.fire({
        title: '¡Felicidades!',
        text: data.message,
        icon: 'success',
        confirmButtonText: 'Aceptar',
      });

      navigate('/account');
    } catch (error) {
      const { response } = error as ErrorMessage;
      Swal.fire({
        title: 'Lo sentimos',
        text: response.data.message,
        icon: 'error',
        confirmButtonText: 'Aceptar',
      });
    }
  };

  return (
    <div className={twMerge('flex flex-col items-center justify-between w-80 p-[2px] rounded-lg shadow-lg relative', className)}>
      {user && user.subscriptionPlan === plan._id && <code className="text-center block text-xl p-2 uppercase font-extrabold">Plan selecionado</code>}
      <div className="bg-zinc-900 p-8 w-full h-full rounded-lg flex flex-col items-stretch justify-stretch">
        <div className="flex-1">
          <div className={twMerge('text-center mb-4', COLORS_TEXT[type])}>
            <h2 className="block text-4xl font-extrabold mb-2">{name}</h2>
            <code className="block text-2xl font-bold whitespace-nowrap">{price === 0 ? `Gratis x ${durationMonths} meses` : `S/. ${price} x ${durationMonths} ${durationMonths === 1 ? 'mes' : 'meses'}`}</code>
          </div>

          <p className="text-sm font-medium text-zinc-400 mb-4">
            {description} {durationMonths} meses
          </p>

          <div>
            {stock === 0 ? (
              <p className="text-sm font-medium text-zinc-400 mb-4">Agotado</p>
            ) : (
              <p className="text-sm font-medium text-zinc-400 mb-4">
                Disponible para <span className="font-bold">{type}</span>
              </p>
            )}
            {!authenticated && (
              <Link to="/auth/register" className={twMerge('block w-fit mb-4', type === 'free' && 'text-green-400', type === 'basic' && 'text-blue-400', type === 'premium' && 'text-purple-400', type === 'enterprise' && 'text-red-400')}>
                Registrate ahora
              </Link>
            )}

            <div>
              <ul className="mb-5">
                {features.map((feature) => (
                  <li key={feature._id} className="grid grid-cols-[auto,1fr] gap-2 items-center mb-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="11" height="11" fill="none">
                      <path fill={!feature.available ? '#4b4b4b' : COLORS_FEATURE[type]} d="m.215 5.618.018.005.006.002a6.557 6.557 0 0 1 5.128 5.114l.002.01.001.002c.084.32.164.332.248.034a6.555 6.555 0 0 1 5.13-5.159h.003c.326-.086.332-.167.016-.253A6.556 6.556 0 0 1 5.62.213L5.618.213c-.08-.283-.157-.283-.238.003l-.006.018-.001.006a2.13 2.13 0 0 0-.018.07v.002c-.008.042-.018.084-.028.126A6.557 6.557 0 0 1 .505 5.313l-.007.001a4.67 4.67 0 0 1-.235.052H.262l-.01.003H.249c-.32.084-.332.164-.034.248v.001Z" />
                    </svg>

                    <span className={twMerge('text-xs font-medium text-zinc-300', !feature.available && 'text-zinc-500')}>{feature.description}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {authenticated ? (
          <button type="button" className={twMerge('block py-2 px-3 w-full rounded-md text-center disabled:cursor-not-allowed   ', className, COLORS_BTN[type])} disabled={stock === 0 || (user ? user.subscriptionPlan === plan._id : false)} onClick={() => handleSelectPlan(plan)}>
            {stock === 0 ? 'Agotado' : user && user.subscriptionPlan === plan._id ? 'Plan seleccionado' : 'Seleccionar'}
          </button>
        ) : (
          <Link to="/auth/login" state={{ from: pathname }} className={twMerge('block py-2 px-3 w-full rounded-md text-center', className, COLORS_BTN[type])}>
            Inicia sesión
          </Link>
        )}
      </div>
    </div>
  );
};

export default Plan;
