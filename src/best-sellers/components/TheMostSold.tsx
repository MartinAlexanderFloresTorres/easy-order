import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';

import { Pagination } from 'swiper/modules';
import Item from '@/best-sellers/components/Item';

interface Item {
  id: string;
  name: string;
  price: number;
  description: string;
  image: string;
}

interface TheMostSoldProps {
  title: string;
  subtitle: string;
  to: string;
  products: Item[];
}

const TheMostSold = ({ title, subtitle, to, products = [] }: TheMostSoldProps) => {
  return (
    <section className="w-full">
      <div className="container mx-auto p-4">
        <h2 className="text-center text-4xl font-extrabold text-gray-300 mb-4">{title}</h2>
        <p className={'text-center text-sm font-medium text-gray-400 mb-14'}>{subtitle}</p>
        <Swiper
          slidesPerView={1}
          spaceBetween={10}
          freeMode={true}
          pagination={{
            clickable: true,
          }}
          modules={[Pagination]}
          className="mySwiper pb-10"
          breakpoints={{
            0: {
              slidesPerView: 1,
              spaceBetween: 10,
            },
            468: {
              slidesPerView: 2,
              spaceBetween: 10,
            },
            900: {
              slidesPerView: 3,
              spaceBetween: 10,
            },
          }}
        >
          <SwiperSlide className="w-full">
            <Item to={to} />
          </SwiperSlide>
          <SwiperSlide className="w-full">
            <Item to={to} />
          </SwiperSlide>
          <SwiperSlide className="w-full">
            <Item to={to} />
          </SwiperSlide>
          <SwiperSlide className="w-full">
            <Item to={to} />
          </SwiperSlide>
          <SwiperSlide className="w-full">
            <Item to={to} />
          </SwiperSlide>
        </Swiper>
      </div>
    </section>
  );
};

export default TheMostSold;
