import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper';
import { Box } from '@mui/material';
import MediaItem from './MediaItem';
const Recommendations = ({ recommendations, mediaType }) => {
  return (
    <Box sx={{
        ' & .swiper-button-next, & .swiper-button-prev': {
          color: 'text.primary',
          "&::after": {
            fontSize: { xs: "1rem", md: "2rem" }
          }
        }
      }}
        >
        <Swiper
            grabCursor={true}
            slidesPerView={4}
            breakpoints={{
                1000: {
                    slidesPerView: 5,
                }
            }}
            navigation={true}
            modules={[Navigation]}
        >
            {recommendations.map((media, idx) => (
                <SwiperSlide key={media.id}>
                    <MediaItem media={media} mediaType={mediaType} />
                </SwiperSlide>
            ))}
        </Swiper>
    </Box>
  )
}

export default Recommendations