import React from 'react';
import { useState, useEffect } from 'react';
import mediaRequests from '../../axios/modules/mediaRequests';
import { toast } from 'react-toastify';
import 'swiper/css';
import { Swiper, SwiperSlide } from 'swiper/react';
import MediaItem from './MediaItem';

const MediaSlide = ({mediaType, mediaCategory}) => {
  const [medias, setMedias] = useState([]);
  
  useEffect(() => {
    const getMedias = async() => {
        const { response:data, err } = await mediaRequests.getList({
            mediaType,
            mediaCategory,
            pages: 1
        })
        if (data) setMedias(data.results);
        if (err) toast.error(err.message);
    }
    getMedias();
  }, [mediaType, mediaCategory])
    return (
        <Swiper
            grabCursor={true}
            loop={true}
            slidesPerView={4}
            breakpoints={{
                1000: {
                    slidesPerView: 5,
                }
            }}
        >
            {medias.map((media, idx) => (
                <SwiperSlide key={idx}>
                    <MediaItem media={media} mediaType={mediaType} />
                </SwiperSlide>
            ))}
        </Swiper>

  )
}

export default MediaSlide