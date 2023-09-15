import React from 'react'
import { Box } from '@mui/material'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper';
// import uiConfigs from '../../configs/uiConfigs';
// import tmdbConfig from '../../axios/configs/tmdbConfig';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';


const MediaSwiper = ({ children, slidesPerView }) => {
  return (
    <Box sx={{
      '& .swiper': {
        paddingX: {xs: '1rem', md: '4rem'},
        width: '100%',
        height: '100%',
      },
      '& .swiper-slide': {
        width: '100%',
        opacity: '0.6',
        paddingBottom: '3rem'
      },
      '& .swiper-slide-active': {
        opacity: '1'
      },
      '& .swiper-pagination-bullet': {
        backgroundColor: 'text.primary'
      },
      ' & .swiper-button-next, & .swiper-button-prev': {
        color: 'text.primary',
        "&::after": {
          fontSize: { xs: "1rem", md: "2rem" }
        }
      }
    }}
      >
         <Swiper
          slidesPerView={slidesPerView ? 3 : 1}
          // slidesPerGroup={slidesPerView ? 3 : 1}
          spaceBetween={10}
          grabCursor={true}
          pagination={{ clickable: true}}
          navigation={true}
          modules={[Navigation, Pagination]}
          style={{ width: "100%", height: "max-content" }}
          breakpoints={{
            1000: {
              slidesPerView: `${slidesPerView ? 4 : 1}`
            }
          }}
        > 
          { children }
        </Swiper>
    </Box>
 
  )
}

export default MediaSwiper