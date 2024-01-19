import ClientAxios from '@/config/ClientAxios';
import { QuestionAnswer, SurveyRestaurant } from '@/restaurant/interfaces';
import Loading from '@/shared/components/Loading';
import { FormEvent, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router-dom';
import { twMerge } from 'tailwind-merge';

const SurveyPage = () => {
  const [survey, setSurvey] = useState<SurveyRestaurant | null>(null);
  const [loading, setLoading] = useState(true);
  const [loadingSubmit, setLoadingSubmit] = useState(false);
  const [surveyQuestions, setSurveyQuestions] = useState<QuestionAnswer[]>([]);

  const navigate = useNavigate();
  const { surveyId } = useParams<{ surveyId: string }>();

  useEffect(() => {
    (async () => {
      try {
        const { data } = await ClientAxios.get<SurveyRestaurant>(`/survey/by/${surveyId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('jwt')}`,
          },
        });
        console.log(data);
        setSurvey(data);
        setSurveyQuestions(data.questions.map((question) => ({ ...question, answer: '', options: question.options.map((option) => ({ ...option, checked: false })) })));
      } catch (error) {
        console.log(error);
        toast.error('No se pudo cargar la encuesta');
        navigate('/');
      } finally {
        setLoading(false);
      }
    })();
  }, [surveyId, navigate]);

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Validar que los open esten con su answer
    const openQuestions = surveyQuestions.filter((question) => question.typeQuestion === 'open');
    for (const question of openQuestions) {
      if (!question.answer || question.answer.trim().length === 0) {
        toast.error('Por favor, responde todas las preguntas abiertas');
        return;
      }
    }

    // Validar que los close tenga al menos una opcion seleccionada
    const closeQuestions = surveyQuestions.filter((question) => question.typeQuestion === 'close');
    for (const question of closeQuestions) {
      if (question.typeAnswer === 'radio') {
        const option = question.options.find((option) => option.checked);

        if (!option) {
          toast.error('Por favor, responde todas las preguntas cerradas');
          return;
        }
      } else {
        const option = question.options.find((option) => option.checked);
        if (!option) {
          toast.error('Por favor, responde todas las preguntas cerradas');
          return;
        }
      }
    }

    toast.dismiss();

    try {
      setLoadingSubmit(true);

      await ClientAxios.post(
        `/survey/answer/${surveyId}`,
        { questions: surveyQuestions },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('jwt')}`,
          },
        },
      );

      toast.success('Gracias por responder la encuesta');
      navigate('/');
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingSubmit(false);
    }
  };

  const updateAnswer = (e: FormEvent<HTMLInputElement | HTMLTextAreaElement>, questionId: string, optionId: string | null) => {
    const { value } = e.currentTarget;

    if (optionId) {
      const question = [...surveyQuestions].find((question) => question._id === questionId);
      if (!question) return;
      const option = [...question.options].find((option) => option._id === optionId);
      if (!option) return;

      const isCheck = e.currentTarget instanceof HTMLInputElement && e.currentTarget.checked;

      const newQuestions = [...surveyQuestions].map((question) => {
        if (question._id === questionId) {
          return {
            ...question,
            options: question.options.map((option) => {
              if (option._id === optionId) {
                option.checked = isCheck;
              } else {
                if (question.typeAnswer === 'radio') {
                  option.checked = false;
                }
              }

              return option;
            }),
          };
        }
        return question;
      });

      setSurveyQuestions(newQuestions);

      console.log(isCheck);
    } else {
      setSurveyQuestions((prev) =>
        prev.map((question) =>
          question._id === questionId
            ? {
                ...question,
                answer: value,
              }
            : question,
        ),
      );
    }
  };

  if (loading) {
    return <Loading className="p-10" title="Cargando encuesta..." description="Espere un momento mientras se carga la encuesta." />;
  }

  if (!survey) return;

  if (loadingSubmit) {
    return <Loading className="p-10" title="Enviando encuesta..." description="Espere un momento mientras se envia la encuesta." />;
  }

  return (
    <div className="container mx-auto p-8">
      <div className="animate-fade-in select-none border border-zinc-700 border-opacity-50 backdrop-blur-sm max-w-3xl w-full mx-auto overflow-auto">
        <div className="sticky top-0 z-10 backdrop-blur-sm border-b border-b-zinc-700 border-opacity-50 bg-zinc-800 bg-opacity-80 flex items-stretch justify-between text-center">
          <div className="px-4 py-3 flex items-center text-center gap-4 border-r border-r-zinc-700 border-opacity-50">
            <img src={survey.restaurant.logo ? survey.restaurant.logo.secure_url : '/img/default-logo.png'} alt={survey.restaurant.name} className="min-w-[50px] min-h-[50px] w-[50px] h-[50px] rounded-full object-cover" />
          </div>
          <div className="px-4 py-3 flex items-center justify-center text-center flex-1">
            <h3 className="text-2xl font-semibold text-gray-200 uppercase text-center">Encuesta de {survey.restaurant.name}</h3>
          </div>
        </div>

        <div className=" bg-zinc-900 bg-opacity-80 md:flex-1">
          <div className="px-4 py-3 border-b border-b-zinc-700 border-opacity-50 flex items-center justify-center text-center">
            <p className="font-normal text-center text-gray-300">Por favor, ayúdanos a mejorar respondiendo esta encuesta.</p>
          </div>
          <form className="p-5 flex-col space-y-5" onSubmit={onSubmit}>
            <div className="flex flex-col gap-4">
              {surveyQuestions.map((question) => (
                <div key={question._id} className="w-full">
                  <h3 className="text-xl font-semibold text-gray-200 mb-4">{question.question}</h3>

                  {question.typeQuestion === 'close' ? (
                    <div className={twMerge('flex items-center gap-10', question.typeAnswer === 'checkbox' && 'flex-col items-start gap-2')}>
                      {question.options.map((option) => (
                        <div key={option._id} className="flex items-center gap-2 leading-normal">
                          <label htmlFor={option._id} className="text-base font-semibold text-gray-400">
                            {option.option}
                          </label>
                          <input type={question.typeAnswer} defaultChecked={option.checked} onChange={(e) => updateAnswer(e, question._id, option._id)} name={question._id} id={option._id} autoComplete="off" className="w-fit px-4 py-2 border-b-2 border-zinc-700 bg-zinc-900 bg-opacity-50 focus:outline-none focus:border-zinc-600 placeholder:text-zinc-500" />
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="flex flex-col space-y-2">
                      {question.typeAnswer === 'textarea' ? (
                        <textarea name={question._id} id={question._id} value={question.answer} onChange={(e) => updateAnswer(e, question._id, null)} autoComplete="off" className="w-full min-h-[60px] max-h-[200px] px-4 py-2 border-b-2 border-zinc-700 bg-zinc-900 bg-opacity-50 focus:outline-none focus:border-zinc-600 placeholder:text-zinc-500" />
                      ) : (
                        <input type={question.typeAnswer} name={question._id} value={question.answer} id={question._id} onChange={(e) => updateAnswer(e, question._id, null)} autoComplete="off" className="w-full px-4 py-2 border-b-2 border-zinc-700 bg-zinc-900 bg-opacity-50 focus:outline-none focus:border-zinc-600 placeholder:text-zinc-500" />
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="flex items-center justify-end">
              <button type="submit" className="w-full md:w-fit whitespace-nowrap px-6 py-3 bg-pink-600 hover:bg-pink-700 transition-all duration-300 rounded-md font-semibold">
                Enviar encuesta
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SurveyPage;
