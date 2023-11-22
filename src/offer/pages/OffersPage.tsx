import TheMostSold from '@/best-sellers/components/TheMostSold';

const OffersPage = () => {
  return (
    <div>
      <TheMostSold title="Ofertas de la semana" subtitle="Aprovecha las ofertas de la semana" products={[]} to="/products/" />
    </div>
  );
};

export default OffersPage;
