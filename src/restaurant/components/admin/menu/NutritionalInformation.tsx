import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import NutritionalInformationField from '@/restaurant/components/admin/menu/NutritionalInformationField';
import { NutritionalInformationNewMenu } from '@/restaurant/interfaces';
import { Plus } from 'lucide-react';
import toast from 'react-hot-toast';

interface NutritionalInformationProps {
  onChange: (items: NutritionalInformationNewMenu[]) => void;
  values: NutritionalInformationNewMenu[];
  maxRows: number;
}

const NutritionalInformation = ({ onChange, values, maxRows }: NutritionalInformationProps) => {
  const [nutritionalInformations, setNutritionalInformations] = useState<NutritionalInformationNewMenu[]>(values);

  const addRow = () => {
    if (nutritionalInformations.length >= maxRows) return toast.error('No puedes agregar mas filas');
    setNutritionalInformations([
      ...nutritionalInformations,
      {
        id: uuidv4(),
        name: '',
        value: '',
      },
    ]);
    onChange(nutritionalInformations);
  };

  const onChangeValues = (values: NutritionalInformationNewMenu) => {
    const rowIndex = nutritionalInformations.findIndex((row) => row.id === values.id);

    const rows = [...nutritionalInformations];
    rows[rowIndex] = values;

    setNutritionalInformations(rows);
    onChange(rows); // Send to parent component
  };

  const onRemoveRow = (id: string) => {
    const rowIndex = nutritionalInformations.findIndex((row) => row.id === id);
    const rows = [...nutritionalInformations];
    rows.splice(rowIndex, 1);

    setNutritionalInformations(rows);
    onChange(rows); // Send to parent component
  };

  return (
    <div className="w-full flex flex-col gap-2">
      {nutritionalInformations.map((values) => (
        <NutritionalInformationField key={values.id} values={values} onChangeValues={onChangeValues} onRemoveRow={onRemoveRow} />
      ))}

      <div className="flex gap-2 w-full justify-end">
        <p className="rounded-md text-zinc-400 px-4 py-2 text-center flex-1 border border-zinc-700 bg-zinc-700 bg-opacity-10">
          {nutritionalInformations.length ? 'Agrega nueva fila' : 'Agrega informacion nutricional'}
        </p>

        <button
          onClick={addRow}
          type="button"
          className="sticky bottom-0 w-full md:w-fit whitespace-nowrap px-6 py-3 bg-pink-600 hover:bg-pink-700 transition-all duration-300 rounded-md font-semibold"
        >
          <Plus size={20} />
        </button>
      </div>
    </div>
  );
};

export default NutritionalInformation;
