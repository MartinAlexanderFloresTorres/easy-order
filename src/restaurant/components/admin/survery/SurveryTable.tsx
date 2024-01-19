import { Frown } from 'lucide-react';
import { Survey } from '@/restaurant/interfaces';
import SurveryTableItem from '@/restaurant/components/admin/survery/SurveryTableItem';
import Loading from '@/shared/components/Loading';

interface SurveyTableProps {
  surveys: Survey[];
  loading: boolean;
  surveyEdit: (survey: Survey) => void;
}

const SurveyTable = ({ surveys, loading, surveyEdit }: SurveyTableProps) => {
  if (loading) {
    return (
      <section className="bg-zinc-800 bg-opacity-80 text-center text-gray-400 border border-zinc-700 border-opacity-50 px-4 py-6 w-full">
        <Loading title="Cargando encuestas..." description="Espere un momento mientras se cargan las encuestas." />
      </section>
    );
  }

  if (surveys.length === 0) {
    return (
      <section className="bg-zinc-800 bg-opacity-80 text-center text-gray-400 border border-zinc-700 border-opacity-50 px-4 py-3 w-full">
        <div className="bg-zinc-800 bg-opacity-80 text-center text-gray-400 border border-zinc-700 border-opacity-50 px-4 py-3 w-full flex flex-col gap-4 justify-center items-center rounded-md">
          <p className="text-base">No hay encuestas registradas</p>
          <Frown size={50} />
        </div>
      </section>
    );
  }
  return (
    <section className="overflow-x-auto w-full">
      <table className="w-full border-collapse border border-zinc-700 border-opacity-50 text-center">
        <thead className="bg-zinc-800 bg-opacity-80">
          <tr className="text-gray-200 uppercase">
            <th className="border border-zinc-700 border-opacity-50 px-4 py-3">Nombre</th>
            <th className="border border-zinc-700 border-opacity-50 px-4 py-3">Descripción</th>
            <th className="border border-zinc-700 border-opacity-50 px-4 py-3">Activo</th>
            <th className="border border-zinc-700 border-opacity-50 px-4 py-3">Acciones</th>
          </tr>
        </thead>
        <tbody className="bg-zinc-800 bg-opacity-60">
          {surveys.map((survey) => (
            <SurveryTableItem key={survey._id} survey={survey} surveyEdit={surveyEdit} />
          ))}
        </tbody>
      </table>
    </section>
  );
};

export default SurveyTable;
