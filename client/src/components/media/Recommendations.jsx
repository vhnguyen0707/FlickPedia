import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import MediaItem from './MediaItem';
const Recommendations = ({ recommendations, mediaType }) => {
  return (
    <Swiper
    grabCursor={true}
    slidesPerView={4}
    breakpoints={{
        1000: {
            slidesPerView: 5,
        }
    }}
>
    {recommendations.map((media, idx) => (
        <SwiperSlide key={media.id}>
            <MediaItem media={media} mediaType={mediaType} />
        </SwiperSlide>
    ))}
</Swiper>

  )
}

export default Recommendations