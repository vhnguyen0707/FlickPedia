import { useEffect, useRef } from 'react'
import { SwiperSlide } from 'swiper/react';
import { Box }  from '@mui/material'
import tmdbConfig from '../../axios/configs/tmdbConfig';
import 'swiper/css';
import 'swiper/css/navigation';
import MediaSwiper from './MediaSwiper';

const Video = ({video}) => {
    const iframeRef = useRef();
    useEffect(() => {
        if (video) {
            const height = `${iframeRef.current.offsetWidth * 9 / 16}px`;
            iframeRef.current.style.height = height;
        }
    }, [video])

    return (
        // <iframe width="560" height="315" src="https://www.youtube.com/embed/wkA8B8PiRxI?si=5wBVXQkwRXMLYC1q" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
        <iframe 
            src={video ? tmdbConfig.trailerSrc(video.key) : ''}
            ref={iframeRef}
            title={video ? video.name: ''}
            width="100%"
            style={{border: 0}}
            // loading='lazy'
        ></iframe>

    )
}
const Videos = ({ videos }) => {
  return (
    <MediaSwiper>
        {videos.map(video => (
            <SwiperSlide key={video.id}>
                <Box sx={{height: 'max-content'}}>
                    <Video video={video} />
                </Box>
            </SwiperSlide>
        ))}
    </MediaSwiper>
  )
}

export default Videos