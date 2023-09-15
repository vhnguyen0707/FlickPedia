import React from 'react';
import MediaSwiper from './MediaSwiper';
import { SwiperSlide } from 'swiper/react';
import { Box } from '@mui/material';
import tmdbConfig from '../../axios/configs/tmdbConfig';

const Posters = ({ posters }) => {
  return (
    <MediaSwiper slidesPerView={3}>
        {posters.slice(0, 10).map((poster, idx) => (
            <SwiperSlide key={idx}>
                <Box sx={{
                    paddingTop: '150%',
                    backgroundImage: `url(${tmdbConfig.posterSrc(poster.file_path)})`,
                    backgroundPosition: 'top',
                    backgroundSize: 'cover'
                }}
                
                />
            </SwiperSlide>
        ))}
    </MediaSwiper>
  )
}

export default Posters