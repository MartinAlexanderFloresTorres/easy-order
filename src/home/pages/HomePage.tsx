import OffersOfTheDay from '@/best-sellers/components/OffersOfTheDay';
import TheMostSold from '@/best-sellers/components/TheMostSold';
import Divider from '@/shared/components/Divider';
import StorieList from '@/stories/components/StorieList';

const HomePage = () => {
  return (
    <div>
      <StorieList />

      <Divider />
      <OffersOfTheDay />

      <Divider />
      <TheMostSold title="Los más vendidos en comida" subtitle="¡No te quedes sin probarlos!" products={[]} to="products" />

      <Divider />
      <TheMostSold title="Los más vendidos en bebidas" subtitle="¡No te quedes sin probarlos!" products={[]} to="products" />

      <Divider />
      <TheMostSold title="Los más vendidos en postres" subtitle="¡No te quedes sin probarlos!" products={[]} to="products" />
    </div>
  );
};

export default HomePage;
