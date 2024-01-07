import useChangeStatusCoupon from '@/restaurant/hooks/useChangeStatusCoupon';
import { Coupon } from '@/restaurant/interfaces';
import { formatDate } from '@/shared/helpers';
import { Edit } from 'lucide-react';
import Swal from 'sweetalert2';
import { twMerge } from 'tailwind-merge';

interface CategoryProps {
  coupon: Coupon;
  editCoupon: (coupon: Coupon) => void;
}

const CouponTableItem = ({ coupon, editCoupon }: CategoryProps) => {
  const { loadingStatus, changeStatus } = useChangeStatusCoupon();

  const handleStatus = async () => {
    if (loadingStatus) return;

    const { isConfirmed } = await Swal.fire({
      title: '¿Estás seguro?',
      text: `¿Deseas cambiar el estado del cupon ${coupon.name}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: coupon.isActive ? 'Desactivar' : 'Activar',
      cancelButtonText: 'Cancelar',
    });

    if (!isConfirmed) return;

    changeStatus(coupon._id, coupon.restaurant);
  };

  return (
    <tr key={coupon._id} className="transition-colors duration-300 bg-zinc-700 bg-opacity-20 hover:bg-opacity-40">
      <td className="text-zinc-400 border border-zinc-700 border-opacity-50 px-4 py-3 text-sm font-bold">
        {formatDate(coupon.expiration.toString())}
      </td>
      <td className="text-zinc-400 border border-zinc-700 border-opacity-50 px-4 py-3 text-sm font-bold">{coupon.code}</td>
      <td className="text-zinc-400 border border-zinc-700 border-opacity-50 px-4 py-3 text-sm">{coupon.name}</td>
      <td className="text-zinc-400 border border-zinc-700 border-opacity-50 px-4 py-3 text-sm">{coupon.description}</td>
      <td className="text-zinc-400 border border-zinc-700 border-opacity-50 px-4 py-3 text-sm">-%{coupon.discount}</td>
      <td className="text-zinc-400 border border-zinc-700 border-opacity-50 px-4 py-3 text-sm">{coupon.maximum}</td>
      <td className="text-zinc-400 border border-zinc-700 border-opacity-50 px-4 py-3 text-sm">{coupon.stockOfCoupons}</td>
      <td className="text-zinc-400 border border-zinc-700 border-opacity-50 px-4 py-3">
        {coupon.isActive ? <span className="text-green-500 font-bold">Sí</span> : <span className="text-red-500 font-bold">No</span>}
      </td>
      <td className="border border-zinc-700 border-opacity-50 px-4 py-3">
        <div className="flex gap-4 items-center justify-center">
          <button
            type="button"
            className="text-sm transition-colors duration-300 text-zinc-400 hover:text-gray-200"
            onClick={() => editCoupon(coupon)}
            disabled={loadingStatus}
          >
            <Edit size={20} />
          </button>
          <button
            type="button"
            className={twMerge(
              'min-w-[100px] text-sm transition-colors duration-300 rounded-md px-2 py-1 font-semibold',
              coupon.isActive
                ? 'bg-red-500 text-red-500 border border-red-500 bg-opacity-10 border-opacity-40 hover:bg-opacity-20'
                : 'bg-green-500 text-green-500 border border-green-500 bg-opacity-10 border-opacity-40 hover:bg-opacity-20',
            )}
            onClick={handleStatus}
            disabled={loadingStatus}
          >
            {loadingStatus ? 'Cargando...' : coupon.isActive ? 'Desactivar' : 'Activar'}
          </button>
        </div>
      </td>
    </tr>
  );
};

export default CouponTableItem;
