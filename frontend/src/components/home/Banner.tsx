import React from 'react'; 
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation, Pagination, Autoplay } from 'swiper';
import 'swiper/swiper.scss';
import 'swiper/components/navigation/navigation.scss'; 
import 'swiper/components/pagination/pagination.scss';
import './Banner.css';

const SwiperSlider: React.FC = () => { 

  SwiperCore.use([Navigation, Pagination, Autoplay]);
  return ( 
    <Swiper 
      style={{width:'100%'}}
      slidesPerView={1} 
      autoplay={true}
      navigation 
      pagination={{ clickable: true }}
      > 
      {ITEMS.map((item, idx: number) => (
        <SwiperSlide key={idx}>
          <img src={item} alt="" style={{width: '100%'}}/>
        </SwiperSlide>
      ))}
    </Swiper> 
  );
};

export default SwiperSlider;

const ITEMS: string[] = [
  'https://media.bunjang.co.kr/images/nocrop/625215620.jpg',
  'https://media.bunjang.co.kr/images/nocrop/616724920.jpg',
  'https://media.bunjang.co.kr/images/nocrop/617974702.jpg',
  'https://media.bunjang.co.kr/images/nocrop/627847283.jpg',
  'https://media.bunjang.co.kr/images/nocrop/628112349.jpg',
  'https://media.bunjang.co.kr/images/nocrop/614290770.jpg',
  'https://media.bunjang.co.kr/images/nocrop/624662947.jpg',
  'https://media.bunjang.co.kr/images/nocrop/626144379.jpg',
]