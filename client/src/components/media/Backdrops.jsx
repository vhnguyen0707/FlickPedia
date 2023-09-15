import React from 'react';
import MediaSwiper from './MediaSwiper';
import uiConfigs from '../../configs/uiConfigs';
import tmdbConfig from '../../axios/configs/tmdbConfig';
import { Box } from '@mui/material';
import { SwiperSlide } from 'swiper/react';

const Backdrops = ({backdrops}) => {
  return (
    <MediaSwiper>
        {backdrops.slice(0, 10).map((backdrop, idx) => (
            <SwiperSlide key={idx}>
                <Box  
                    sx={{
                        paddingTop: '50%',
                        backgroundPosition: "top",
                        backgroundSize: "cover",
                        backgroundImage: `url(${tmdbConfig.backdropSrc(backdrop.file_path)})`
                    }}
                />
            </SwiperSlide>
        ))}
        
    </MediaSwiper>
  )
}

export default Backdrops