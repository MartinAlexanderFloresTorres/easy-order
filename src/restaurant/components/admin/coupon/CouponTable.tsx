import { Frown } from 'lucide-react';
import { Coupon } from '@/restaurant/interfaces';
import CouponTableItem from '@/restaurant/components/admin/coupon/CouponTableItem';

interface CouponTableProps {
  coupons: Coupon[];
  editCoupon: (coupon: Coupon) => void;
}

const CouponTable = ({ coupons, editCoupon }: CouponTableProps) => {
  if (coupons.length === 0) {
    return (
      <section className="bg-zinc-800 bg-opacity-80 text-center text-gray-400 border border-zinc-700 border-opacity-50 px-4 py-3 w-full">
        <div className="bg-zinc-800 bg-opacity-80 text-center text-gray-400 border border-zinc-700 border-opacity-50 px-4 py-3 w-full flex flex-col gap-4 justify-center items-center rounded-md">
          <p className="text-base">No hay cupones registrados aún, crea un nuevo cupon.</p>
          <Frown size={50} />
        </div>
      </section>
    );
  }
  return (
    <section className="overflow-x-auto w-full">
      <table className="w-full border-collapse border border-zinc-700 border-opacity-50 text-center  whitespace-nowrap">
        <thead className="bg-zinc-800 bg-opacity-80">
          <tr className="text-gray-200 uppercase">
            <th className="border border-zinc-700 border-opacity-50 px-4 py-3">Fecha de expiración</th>
            <th className="border border-zinc-700 border-opacity-50 px-4 py-3">Codigo</th>
            <th className="border border-zinc-700 border-opacity-50 px-4 py-3">Nombre</th>
            <th className="border border-zinc-700 border-opacity-50 px-4 py-3">Descripción</th>
            <th className="border border-zinc-700 border-opacity-50 px-4 py-3">Descuento</th>
            <th className="border border-zinc-700 border-opacity-50 px-4 py-3">Stock maximo </th>
            <th className="border border-zinc-700 border-opacity-50 px-4 py-3">Stock restante</th>
            <th className="border border-zinc-700 border-opacity-50 px-4 py-3">Activo</th>
            <th className="border border-zinc-700 border-opacity-50 px-4 py-3">Acciones</th>
          </tr>
        </thead>
        <tbody className="bg-zinc-800 bg-opacity-60">
          {coupons.map((coupon) => (
            <CouponTableItem key={coupon._id} coupon={coupon} editCoupon={editCoupon} />
          ))}
        </tbody>
      </table>
    </section>
  );
};

export default CouponTable;
