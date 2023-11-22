import TheMostSold from '@/best-sellers/components/TheMostSold';

const CategoriesPage = () => {
  return (
    <div>
      <TheMostSold title="Productos de la semana" subtitle="Los mejores productos de la semana" to="/products/" products={[]} />
    </div>
  );
};

export default CategoriesPage;
