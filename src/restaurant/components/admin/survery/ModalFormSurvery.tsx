import { useEffect, useState } from 'react';
import { Trash, X } from 'lucide-react';
import toast from 'react-hot-toast';
import { v4 as uuidv4 } from 'uuid';

import useRestaurant from '@/restaurant/hooks/useRestaurant';
import { Survey, NewSurvey, TypeAnswer } from '@/restaurant/interfaces';
import Loading from '@/shared/components/Loading';
import Modal from '@/shared/components/Modal';
import ClientAxios from '@/config/ClientAxios';

const DEFAULT_FIELDS: NewSurvey = {
  name: '',
  description: '',
  questions: [],
};

interface ModalFormCategoryProps {
  onClose: () => void;
  surveyEdit: Survey | null;
}

let timer: NodeJS.Timeout | null = null;

const ModalFormSurvey = ({ onClose, surveyEdit }: ModalFormCategoryProps) => {
  const [fields, setFields] = useState<NewSurvey>(DEFAULT_FIELDS);
  const [isClose, setIsClose] = useState(false);
  const [loading, setLoading] = useState(false);

  const { restaurant, sincronizeSurveys } = useRestaurant();

  useEffect(() => {
    if (surveyEdit) {
      (async () => {
        setFields({
          name: surveyEdit.name,
          description: surveyEdit.description,
          questions: surveyEdit.questions.map((question) => ({
            id: question._id,
            question: question.question,
            typeQuestion: question.typeQuestion,
            typeAnswer: question.typeAnswer,
            options: question.options.map((option) => ({
              id: option._id,
              option: option.option,
            })),
          })),
        });
      })();
    }
  }, [surveyEdit]);

  const onCloseModal = () => {
    if (timer) clearTimeout(timer);

    if (isClose) {
      onClose();
      setIsClose(false);
      return;
    }

    setIsClose(true);
    timer = setTimeout(() => {
      onClose();
      setIsClose(false);
    }, 200);
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Validar
    if (fields.name.trim() === '') {
      toast.error('El nombre es obligatorio');
      return;
    }

    if (fields.description.trim() === '') {
      toast.error('La descripción es obligatoria');
      return;
    }

    if (fields.questions.length === 0) {
      toast.error('Debes agregar al menos una pregunta');
      return;
    }

    if (fields.questions.some((question) => question.question.trim() === '')) {
      toast.error('Debes agregar una pregunta');
      return;
    }

    if (fields.questions.some((question) => question.typeQuestion === 'close' && question.options.length === 0)) {
      toast.error('Debes agregar al menos una opción');
      return;
    }

    if (fields.questions.some((question) => question.typeQuestion === 'close' && question.options.some((option) => option.option.trim() === ''))) {
      toast.error('Las opciones no pueden estar vacias');
      return;
    }

    toast.dismiss();

    try {
      setLoading(true);

      if (surveyEdit) {
        const { data } = await ClientAxios.patch(`/survey/${surveyEdit._id}`, fields, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('jwt')}`,
          },
        });

        sincronizeSurveys(data, false);
      } else {
        const { data } = await ClientAxios.post(`/survey/${restaurant!._id}`, fields, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('jwt')}`,
          },
        });
        sincronizeSurveys(data, true);
      }

      setFields(DEFAULT_FIELDS);
      toast.success('Encuesta creada correctamente');
      onClose();
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFields({ ...fields, [name]: value.trimStart() });
  };

  const addQuestion = () => {
    setFields({
      ...fields,
      questions: [
        ...fields.questions,
        {
          id: uuidv4(),
          question: `Pregunta ${fields.questions.length + 1}`,
          typeQuestion: 'open',
          typeAnswer: 'text',
          options: [],
        },
      ],
    });
  };

  const addOption = (id: string, option: string) => {
    setFields({
      ...fields,
      questions: fields.questions.map((question) => {
        if (question.id === id) {
          return {
            ...question,
            options: [
              ...question.options,
              {
                id: uuidv4(),
                option,
              },
            ],
          };
        }
        return question;
      }),
    });
  };

  const removeOption = (id: string, idOption: string) => {
    setFields({
      ...fields,
      questions: fields.questions.map((question) => {
        if (question.id === id) {
          return {
            ...question,
            options: question.options.filter((option) => option.id !== idOption),
          };
        }
        return question;
      }),
    });
  };

  const updateQuestion = (id: string, question: string) => {
    setFields({
      ...fields,
      questions: fields.questions.map((item) => {
        if (item.id === id) {
          return {
            ...item,
            question,
          };
        }
        return item;
      }),
    });
  };

  const updateTypeQuestion = (id: string, typeQuestion: 'open' | 'close') => {
    setFields({
      ...fields,
      questions: fields.questions.map((item) => {
        if (item.id === id) {
          if (typeQuestion === 'close') {
            return {
              ...item,
              options: [
                {
                  id: uuidv4(),
                  option: 'Si',
                },
                {
                  id: uuidv4(),
                  option: 'No',
                },
              ],
              typeQuestion,
              typeAnswer: 'text',
            };
          }

          return {
            ...item,
            options: [],
            typeQuestion,
            typeAnswer: 'text',
          };
        }
        return item;
      }),
    });
  };

  const updateTypeAnswer = (id: string, typeAnswer: TypeAnswer) => {
    setFields({
      ...fields,
      questions: fields.questions.map((item) => {
        if (item.id === id) {
          return {
            ...item,
            typeAnswer,
          };
        }
        return item;
      }),
    });
  };

  const updateOption = (id: string, idOption: string, option: string) => {
    setFields({
      ...fields,
      questions: fields.questions.map((question) => {
        if (question.id === id) {
          return {
            ...question,
            options: question.options.map((item) => {
              if (item.id === idOption) {
                return {
                  ...item,
                  option,
                };
              }
              return item;
            }),
          };
        }
        return question;
      }),
    });
  };

  const removeQuestion = (id: string) => {
    setFields({
      ...fields,
      questions: fields.questions.filter((question) => question.id !== id),
    });
  };

  if (!restaurant) return null;

  return (
    <Modal onClose={onCloseModal} isClose={isClose} className="bg-black bg-opacity-50 backdrop-blur-sm">
      <Modal.Overlay onClose={onCloseModal} disabled={true}>
        {loading ? (
          <Loading title={surveyEdit ? 'Actualizando categoría' : 'Creando categoría'} description="Espere un momento por favor ..." />
        ) : (
          <div className="animate-fade-in select-none border border-zinc-700 border-opacity-50 backdrop-blur-sm max-w-xl w-full mx-auto overflow-auto">
            <div className="sticky top-0 z-10 backdrop-blur-sm border-b border-b-zinc-700 border-opacity-50 bg-zinc-800 bg-opacity-80 flex items-stretch justify-between text-center">
              <div className="px-4 py-3 flex items-center text-center gap-4 border-r border-r-zinc-700 border-opacity-50">
                <img src={restaurant.logo ? restaurant.logo.secure_url : '/img/default-logo.png'} alt={restaurant.name} className="min-w-[50px] min-h-[50px] w-[50px] h-[50px] rounded-full object-cover" />
              </div>
              <div className="px-4 py-3 flex items-center justify-center text-center flex-1">
                <h3 className="text-2xl font-semibold text-gray-200 uppercase text-center">{surveyEdit ? 'Actualizar encuesta' : 'Crear encuesta'}</h3>
              </div>
              <div className="px-4 py-3 flex items-center justify-end text-center gap-4 border-l border-l-zinc-700 border-opacity-50">
                <button type="button" className="min-w-[40px] min-h-[40px] w-[40px] h-[40px] flex items-center justify-center px2-4 py- rounded-full bg-zinc-700 bg-opacity-50 hover:bg-opacity-100 transition-all duration-300 text-gray-300" onClick={onCloseModal}>
                  <X size={24} />
                </button>
              </div>
            </div>

            <div className=" bg-zinc-900 bg-opacity-80 md:flex-1">
              <div className="px-4 py-3 border-b border-b-zinc-700 border-opacity-50 flex items-center justify-center text-center">
                <p className="font-normal text-center text-gray-300">{surveyEdit ? 'Actualiza los datos de la encuesta' : 'Comienza a crear tus encuesta para tus clientes'}</p>
              </div>
              <form className="p-5 flex-col space-y-5" onSubmit={onSubmit}>
                <div className="flex flex-col space-y-1">
                  <label htmlFor="name" className="text-sm font-semibold text-gray-400">
                    Nombre
                  </label>
                  <input type="text" name="name" id="name" autoComplete="off" autoFocus placeholder="Ej: Bebidas" value={fields.name} onChange={onChange} className="w-full px-4 py-2 border border-zinc-700 bg-zinc-900 bg-opacity-50 rounded-lg focus:outline-none focus:border-zinc-600 placeholder:text-zinc-500" />
                </div>
                <div className="flex flex-col space-y-1">
                  <label htmlFor="description" className="text-sm font-semibold text-gray-400">
                    Descripcion
                  </label>
                  <textarea name="description" id="description" placeholder="Ej: Bebidas frias y calientes" autoComplete="off" value={fields.description} onChange={onChange} className="w-full px-4 py-2 relative max-h-[200px] min-h-[80px] border border-zinc-700 bg-zinc-900 bg-opacity-50 rounded-lg focus:outline-none focus:border-zinc-600 placeholder:text-zinc-500" />
                </div>

                <div className="flex flex-col space-y-1">
                  <div className="flex items-center justify-between p-4  bg-zinc-800 bg-opacity-80 border border-zinc-700 border-opacity-50 rounded-md">
                    <h2 className="text-lg font-semibold text-gray-200">Preguntas</h2>

                    <div className="flex items-center justify-end">
                      <button type="button" className="w-fit whitespace-nowrap px-6 py-3 bg-pink-600 hover:bg-pink-700 transition-all duration-300 rounded-md font-semibold" onClick={addQuestion}>
                        Agregar pregunta
                      </button>
                    </div>
                  </div>
                  <div className="flex flex-col space-y-2">
                    {fields.questions.map((question) => (
                      <div key={question.id} className="flex flex-col space-y-2 gap-4 mt-4 p-4  bg-zinc-800 bg-opacity-80 border border-zinc-700 border-opacity-50 rounded-md">
                        <div className="flex flex-col space-y-1">
                          <label htmlFor={question.id} className="text-sm font-semibold text-gray-400">
                            Pregunta
                          </label>
                          <div className="flex items-center gap-2">
                            <input type="text" name={question.id} id={question.id} autoComplete="off" autoFocus placeholder="Ej: Bebidas" value={question.question} onChange={(e) => updateQuestion(question.id, e.target.value)} className="w-full px-4 py-2 border border-zinc-700 bg-zinc-900 bg-opacity-50 rounded-lg focus:outline-none focus:border-zinc-600 placeholder:text-zinc-500" />
                            <button type="button" className="w-fit whitespace-nowrap px-4 py-3 text-pink-600 hover:text-pink-700 transition-all duration-300 rounded-md font-semibold" onClick={() => removeQuestion(question.id)}>
                              <Trash size={20} />
                            </button>
                          </div>
                        </div>
                        <div className="flex w-full items-center gap-2">
                          <div className="flex flex-1 flex-col space-y-1">
                            <label htmlFor="description" className="text-sm font-semibold text-gray-400">
                              Tipo de pregunta
                            </label>
                            <select name="typeQuestion" id="typeQuestion" value={question.typeQuestion} onChange={(e) => updateTypeQuestion(question.id, e.target.value as 'open' | 'close')} className="w-full px-4 py-2 border border-zinc-700 bg-zinc-900 bg-opacity-50 rounded-lg focus:outline-none focus:border-zinc-600 placeholder:text-zinc-500">
                              <option className="bg-zinc-900" value="open">
                                Abierta
                              </option>
                              <option className="bg-zinc-900" value="close">
                                Cerrada
                              </option>
                            </select>
                          </div>

                          <div className="flex flex-1 flex-col space-y-1">
                            <label htmlFor="description" className="text-sm font-semibold text-gray-400">
                              Tipo de respuesta
                            </label>
                            <select name="typeAnswer" id="typeAnswer" value={question.typeAnswer} onChange={(e) => updateTypeAnswer(question.id, e.target.value as TypeAnswer)} className="w-full px-4 py-2 border border-zinc-700 bg-zinc-900 bg-opacity-50 rounded-lg focus:outline-none focus:border-zinc-600 placeholder:text-zinc-500">
                              {question.typeQuestion === 'open' ? (
                                <>
                                  <option className="bg-zinc-900" value="text">
                                    Texto
                                  </option>
                                  <option className="bg-zinc-900" value="number">
                                    Número
                                  </option>
                                  <option className="bg-zinc-900" value="date">
                                    Fecha
                                  </option>

                                  <option className="bg-zinc-900" value="time">
                                    Hora
                                  </option>

                                  <option className="bg-zinc-900" value="email">
                                    Correo
                                  </option>

                                  <option className="bg-zinc-900" value="textarea">
                                    Area de texto
                                  </option>

                                  <option className="bg-zinc-900" value="phone">
                                    Teléfono
                                  </option>
                                </>
                              ) : (
                                <>
                                  <option className="bg-zinc-900" value="radio">
                                    Radio
                                  </option>

                                  <option className="bg-zinc-900" value="checkbox">
                                    Checkbox
                                  </option>
                                </>
                              )}
                            </select>
                          </div>
                        </div>
                        {question.typeQuestion === 'close' && (
                          <>
                            <div className="flex flex-col space-y-1">
                              <div className="flex items-center justify-between p-4  bg-zinc-800 bg-opacity-80 border border-zinc-700 border-opacity-50 rounded-md mb-4">
                                <h2 className="text-lg font-semibold text-gray-200">Opciones</h2>
                                <p className="text-sm text-gray-400">Agrega las opciones de respuesta</p>
                              </div>

                              <div className="flex flex-col space-y-2">
                                {question.options.map((option, index) => (
                                  <div key={option.id} className="flex flex-col space-y-2">
                                    <div className="flex flex-col space-y-1">
                                      <label htmlFor={option.id} className="text-sm font-semibold text-gray-400">
                                        Opcion {index + 1}
                                      </label>

                                      <div className="flex gap-2 items-center">
                                        <input
                                          type={question.typeAnswer}
                                          disabled={question.typeQuestion === 'open'}
                                          name={option.id}
                                          id={option.id}
                                          autoComplete="off"
                                          placeholder={question.typeAnswer === 'text' ? 'Ej: Escribir opcion' : question.typeAnswer === 'number' ? 'Ej: 18' : 'Ej: 2021-08-05'}
                                          value={option.option}
                                          onChange={(e) => updateOption(question.id, option.id, e.target.value)}
                                          className="w-full px-4 py-2 border border-zinc-700 bg-zinc-900 bg-opacity-50 rounded-lg focus:outline-none focus:border-zinc-600 placeholder:text-zinc-500"
                                        />
                                        {(question.typeAnswer === 'radio' || question.typeAnswer === 'checkbox') && <input type="text" name={option.id} id={option.id} onChange={(e) => updateOption(question.id, option.id, e.target.value)} placeholder="Nombre" className="w-fit px-4 py-2 border border-zinc-700 bg-zinc-900 bg-opacity-50 rounded-lg focus:outline-none focus:border-zinc-600 placeholder:text-zinc-500" />}
                                        <button type="button" className="w-fit whitespace-nowrap px-4 py-3 text-pink-600 hover:text-pink-700 transition-all duration-300 rounded-md font-semibold" onClick={() => removeOption(question.id, option.id)}>
                                          <Trash size={20} />
                                        </button>
                                      </div>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>

                            <div className="flex items-center gap-2 justify-end">
                              <button type="button" className="w-fit whitespace-nowrap px-4 py-2 text-sm text-pink-600 border border-pink-600 transition-all duration-300 rounded-md font-semibold" onClick={() => addOption(question.id, '')}>
                                Agregar opción
                              </button>
                            </div>
                          </>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-end">
                  <button type="submit" className="w-full md:w-fit whitespace-nowrap px-6 py-3 bg-pink-600 hover:bg-pink-700 transition-all duration-300 rounded-md font-semibold">
                    {surveyEdit ? 'Actualizar encuesta' : 'Crear encuesta'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </Modal.Overlay>
    </Modal>
  );
};

export default ModalFormSurvey;
