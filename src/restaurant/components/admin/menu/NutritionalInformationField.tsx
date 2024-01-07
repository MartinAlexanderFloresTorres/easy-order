import { NutritionalInformationNewMenu } from '@/restaurant/interfaces';
import { Trash } from 'lucide-react';

interface NutritionalInformationFieldProps {
  values: NutritionalInformationNewMenu;
  onChangeValues: (values: NutritionalInformationNewMenu) => void;
  onRemoveRow: (id: string) => void;
}

const NutritionalInformationField = ({ values, onChangeValues, onRemoveRow }: NutritionalInformationFieldProps) => {
  return (
    <div className="flex w-full gap-2 items-center animate-fade-in">
      <input
        type="text"
        autoFocus
        autoComplete="off"
        placeholder="Ejm: Calorias"
        className="w-full px-4 py-2 border border-zinc-700 bg-zinc-900 bg-opacity-50 rounded-lg focus:outline-none focus:border-zinc-600"
        value={values.name}
        onChange={({ target: { value } }) =>
          onChangeValues({
            ...values,
            name: value,
          })
        }
      />
      <input
        type="text"
        autoComplete="off"
        placeholder="0.0 KLG"
        className="w-full px-4 py-2 border border-zinc-700 bg-zinc-900 bg-opacity-50 rounded-lg focus:outline-none focus:border-zinc-600"
        value={values.value}
        onChange={({ target: { value } }) =>
          onChangeValues({
            ...values,
            value,
          })
        }
      />
      <button
        type="button"
        className="w-full md:w-fit whitespace-nowrap px-6 py-3 bg-red-800 bg-opacity-10 text-red-700 hover:bg-opacity-20 transition-all duration-300 rounded-md font-semibold"
        onClick={() => onRemoveRow(values.id)}
      >
        <Trash size={20} />
      </button>
    </div>
  );
};

export default NutritionalInformationField;
