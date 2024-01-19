import { useState } from 'react';
import useRestaurant from '@/restaurant/hooks/useRestaurant';
import { SurveyResolved } from '@/restaurant/interfaces';
import ModalDetail from '@/restaurant/components/admin/survery/ModalDetail';
import SurveryTableResolved from '@/restaurant/components/admin/survery/SurveryTableResolved';

const RestaurantSurveryResolved = () => {
  const [isShowSurvey, setIsShowSurvey] = useState(false);
  const [survey, setSurveyEdit] = useState<SurveyResolved | null>(null);

  const { restaurant, surveysResolved, loadingSurveysResolved } = useRestaurant();

  if (!restaurant) return;

  const editSurvey = (survey: SurveyResolved) => {
    setSurveyEdit(survey);
    setIsShowSurvey(true);
  };

  const closeModal = () => {
    setIsShowSurvey(false);
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
            <h3 className="text-2xl font-semibold text-gray-200 uppercase text-center">Encuestas resueltas</h3>
          </div>
        </div>

        <SurveryTableResolved surveys={surveysResolved} showSurvey={editSurvey} loading={loadingSurveysResolved} />
      </div>

      {isShowSurvey && <ModalDetail onClose={closeModal} survey={survey!} />}
    </>
  );
};

export default RestaurantSurveryResolved;
