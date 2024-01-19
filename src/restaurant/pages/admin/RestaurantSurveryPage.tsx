import { useState } from 'react';
import ModalFormSurvey from '@/restaurant/components/admin/survery/ModalFormSurvery';
import SurveyTable from '@/restaurant/components/admin/survery/SurveryTable';
import useRestaurant from '@/restaurant/hooks/useRestaurant';
import { Survey } from '@/restaurant/interfaces';

const RestaurantSurveyPage = () => {
  const [isShowFormSurvey, setIsShowFormSurvey] = useState(false);
  const [surveyEdit, setSurveyEdit] = useState<Survey | null>(null);

  const { restaurant, surveys, loadingSurveys } = useRestaurant();

  if (!restaurant) return;

  const editSurvey = (survey: Survey) => {
    setSurveyEdit(survey);
    setIsShowFormSurvey(true);
  };

  const closeModal = () => {
    setIsShowFormSurvey(false);
    setSurveyEdit(null);
  };

  return (
    <>
      <div className="select-none w-full backdrop-blur-sm animate-fade-in">
        <div className="border-t border-l border-r border-zinc-700 border-opacity-50 bg-zinc-800 bg-opacity-80 flex items-stretch justify-between text-center">
          <div className="px-4 py-3 flex items-center text-center gap-4 border-r border-r-zinc-700 border-opacity-50">
            <img src={restaurant.logo ? restaurant.logo.secure_url : '/img/default-logo.png'} alt={restaurant.name} className="min-w-[50px] min-h-[50px] w-[50px] h-[50px] rounded-full object-cover" />
          </div>
          <div className="px-4 py-3 flex items-center justify-center text-center flex-1">
            <h3 className="text-2xl font-semibold text-gray-200 uppercase text-center">Encuestas</h3>
          </div>
          <div className="px-4 py-3 flex items-center justify-end text-center gap-4 border-l border-l-zinc-700 border-opacity-50">
            <button className="w-full md:w-fit whitespace-nowrap px-6 py-3 bg-pink-600 hover:bg-pink-700 transition-all duration-300 rounded-md font-semibold" onClick={() => setIsShowFormSurvey(true)}>
              Crear encuesta
            </button>
          </div>
        </div>

        <SurveyTable surveys={surveys} surveyEdit={editSurvey} loading={loadingSurveys} />
      </div>

      {isShowFormSurvey && <ModalFormSurvey onClose={closeModal} surveyEdit={surveyEdit} />}
    </>
  );
};

export default RestaurantSurveyPage;
