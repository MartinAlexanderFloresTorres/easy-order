import Publication from '@/publication/components/Publication';
import NewPublication from '@/publication/components/NewPublication';
import useAccount from '@/account/hooks/useAccount';

const Publications = () => {
  const { authenticated } = useAccount();
  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-col gap-4">
        {authenticated && <NewPublication />}
        <Publication />
        <Publication />
        <Publication />
      </div>
    </div>
  );
};

export default Publications;
