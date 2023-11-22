import Publication from '@/publication/components/Publication';
import NewPublication from './NewPublication';

const Publications = () => {
  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-col gap-4">
        <NewPublication />
        <Publication />
        <Publication />
        <Publication />
      </div>
    </div>
  );
};

export default Publications;
