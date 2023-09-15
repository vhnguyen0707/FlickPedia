import { Link } from 'react-router-dom'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper';
import 'swiper/css';
import { Typography, Box } from '@mui/material';
import uiConfigs from '../../configs/uiConfigs';
import tmdbConfig from '../../axios/configs/tmdbConfig';

import 'swiper/css/navigation';

const Casts = ({ casts }) => {
  return (
    <Swiper navigation={true} 
            modules={[Navigation]}   
            grabCursor={true} slidesPerView={4}  style={{ width: "100%", height: "max-content" }}>
            {casts.map((actor) => 
                (actor.profile_path && (
                    <SwiperSlide  key={actor.id}>
                        <Link to={`/person/${actor.id}`}>
                            <Box sx={{ paddingTop:  "120%",
                                    ...uiConfigs.style.backgroundImage(tmdbConfig.posterSrc(actor.profile_path))
                                    }}>
                                <Box sx={{
                                position: 'absolute',
                                width: '100%',
                                height: 'max-content',
                                bottom: 0,
                                left: 0,
                                padding: '10px',
                                backgroundColor: 'rgba(0,0,0,0.6)'
                                }}>
                                    <Typography sx={{...uiConfigs.style.typoLines(1, 'left'), color: 'primary.contrastText'}}>
                                        {actor.name}
                                    </Typography>
                                </Box>
                            </Box>  
                        </Link>
                    </SwiperSlide>
                    )
                )
        )}
  </Swiper>
  )
}

export default Casts