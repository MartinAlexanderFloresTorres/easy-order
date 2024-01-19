import { Edit } from 'lucide-react';
import { Survey } from '@/restaurant/interfaces';
import { twMerge } from 'tailwind-merge';
import useChangeStatusSurvey from '@/restaurant/hooks/useChangeStatusSurvey';
import Swal from 'sweetalert2';

interface CategoryProps {
  survey: Survey;
  surveyEdit: (survey: Survey) => void;
}

const SurveyTableItem = ({ survey, surveyEdit }: CategoryProps) => {
  const { loadingStatus, changeStatus } = useChangeStatusSurvey();

  const handleStatus = async () => {
    if (loadingStatus) return;

    const { isConfirmed } = await Swal.fire({
      title: '¿Estás seguro?',
      text: `¿Deseas cambiar el estado de esta categoria?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: survey.isActive ? 'Desactivar' : 'Activar',
      cancelButtonText: 'Cancelar',
    });

    if (!isConfirmed) return;

    changeStatus(survey._id);
  };

  return (
    <tr key={survey._id} className="transition-colors duration-300 bg-zinc-700 bg-opacity-20 hover:bg-opacity-40">
      <td className="text-zinc-400 border border-zinc-700 border-opacity-50 px-4 py-3 text-sm font-bold">{survey.name}</td>
      <td className="text-zinc-400 border border-zinc-700 border-opacity-50 px-4 py-3 text-sm">{survey.description}</td>
      <td className="text-zinc-400 border border-zinc-700 border-opacity-50 px-4 py-3">{survey.isActive ? <span className="text-green-500 font-bold">Sí</span> : <span className="text-red-500 font-bold">No</span>}</td>
      <td className="border border-zinc-700 border-opacity-50 px-4 py-3">
        <div className="flex gap-4 items-center justify-center">
          <button type="button" className="text-sm transition-colors duration-300 text-zinc-400 hover:text-gray-200" onClick={() => surveyEdit(survey)} disabled={false}>
            <Edit size={20} />
          </button>

          <button type="button" className={twMerge('min-w-[100px] text-sm transition-colors duration-300 rounded-md px-2 py-1 font-semibold', survey.isActive ? 'bg-red-500 text-red-500 border border-red-500 bg-opacity-10 border-opacity-40 hover:bg-opacity-20' : 'bg-green-500 text-green-500 border border-green-500 bg-opacity-10 border-opacity-40 hover:bg-opacity-20')} onClick={handleStatus} disabled={loadingStatus}>
            {loadingStatus ? 'Cargando...' : survey.isActive ? 'Desactivar' : 'Activar'}
          </button>
        </div>
      </td>
    </tr>
  );
};

export default SurveyTableItem;
