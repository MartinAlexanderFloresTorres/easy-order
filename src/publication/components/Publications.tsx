import Publication from '@/publication/components/Publication';

const Publications = () => {
  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-col gap-4">
        <Publication />
        <Publication />
        <Publication />
      </div>
    </div>
  );
};

export default Publications;
