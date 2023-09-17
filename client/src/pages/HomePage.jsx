import React from 'react';
import HeroSlider from '../components/media/HeroSlider';
import tmdbConfigs from '../axios/configs/tmdbConfig';
import uiConfigs from '../configs/uiConfigs';
import Container from '../components/common/Container';
import { Box } from '@mui/material';
import MediaSlide from '../components/media/MediaSlide';

const HomePage = () => {
  return (
    <div>
      <HeroSlider mediaType={tmdbConfigs.mediaType.movie} mediaCategory={tmdbConfigs.mediaCategory.popular}/>
      <Box sx={{...uiConfigs.style.mainContent}}>
        <Container header="popular movies">
          <MediaSlide mediaType='movie' mediaCategory='popular'/>
        </Container>
        <Container header="popular tv series">
          <MediaSlide mediaType='tv' mediaCategory='popular'/>
        </Container>
        <Container header="top-rated movies">
          <MediaSlide mediaType='movie' mediaCategory='top_rated'/>
        </Container>
        <Container header="top-rated tv series">
          <MediaSlide mediaType='tv' mediaCategory='top_rated'/>
        </Container>
      </Box>
    
    </div>
  )
}

export default HomePage