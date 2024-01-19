import { Eye, Frown } from 'lucide-react';
import { SurveyResolved } from '@/restaurant/interfaces';
import Loading from '@/shared/components/Loading';

interface SurveyTableProps {
  surveys: SurveyResolved[];
  loading: boolean;
  showSurvey: (survey: SurveyResolved) => void;
}

const SurveryTableResolved = ({ surveys, loading, showSurvey }: SurveyTableProps) => {
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
            <th className="border border-zinc-700 border-opacity-50 px-4 py-3">Usuario</th>
            <th className="border border-zinc-700 border-opacity-50 px-4 py-3">Apellidos</th>
            <th className="border border-zinc-700 border-opacity-50 px-4 py-3">País</th>
            <th className="border border-zinc-700 border-opacity-50 px-4 py-3">Ciudad</th>
            <th className="border border-zinc-700 border-opacity-50 px-4 py-3">Email</th>
            <th className="border border-zinc-700 border-opacity-50 px-4 py-3">Fecha</th>
            <th className="border border-zinc-700 border-opacity-50 px-4 py-3">Acciones</th>
          </tr>
        </thead>
        <tbody className="bg-zinc-800 bg-opacity-60">
          {surveys.map((survey) => (
            <tr key={survey._id} className="transition-colors duration-300 bg-zinc-700 bg-opacity-20 hover:bg-opacity-40">
              <td className="text-zinc-400 border border-zinc-700 border-opacity-50 px-4 py-3 text-sm font-bold">
                <div>
                  {survey.client.photo && <img src={survey.client.photo.secure_url} alt={survey.client.name} className="w-8 h-8 rounded-full object-cover" />}
                  <span className="ml-2">{survey.client.name}</span>
                </div>
              </td>
              <td className="text-zinc-400 border border-zinc-700 border-opacity-50 px-4 py-3 text-sm">{survey.client.lastname}</td>
              <td className="text-zinc-400 border border-zinc-700 border-opacity-50 px-4 py-3 text-sm">{survey.client.country}</td>
              <td className="text-zinc-400 border border-zinc-700 border-opacity-50 px-4 py-3 text-sm">{survey.client.city}</td>
              <td className="text-zinc-400 border border-zinc-700 border-opacity-50 px-4 py-3 text-sm">
                <a href={`mailto:${survey.client.email}`} className="hover:underline">
                  {survey.client.email}
                </a>
              </td>
              <td className="text-zinc-400 border border-zinc-700 border-opacity-50 px-4 py-3 text-sm">{new Date(survey.createdAt).toLocaleDateString()}</td>
              <td className="border border-zinc-700 border-opacity-50 px-4 py-3">
                <div className="flex gap-4 items-center justify-center">
                  <button type="button" className="text-sm transition-colors duration-300 text-zinc-400 hover:text-gray-200" onClick={() => showSurvey(survey)}>
                    <Eye size={20} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
};

export default SurveryTableResolved;
