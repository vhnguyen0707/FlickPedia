import React from 'react';
import { useSelector } from 'react-redux';
import Container from '../components/common/Container';
import uiConfigs from '../configs/uiConfigs';
import { Box, Grid } from '@mui/material';
import MediaItem from '../components/media/MediaItem';

const FavoriteList = () => {
  const {listFavorites} = useSelector(state=>state.user);
  return (
    <>
      {/* <Toolbar /> */}
      <Box sx={{...uiConfigs.style.mainContent}}>
        <Container header={`Your favorites (${listFavorites.length})`}>
          {listFavorites && (
            <Grid container spacing={2}>
              {listFavorites.map(item=>(
                <Grid item key={item.id} xs={4} md={3}>
                  <MediaItem media={{
                    id: item.mediaId, poster_path: item.mediaPoster, vote_average: item.mediaRate, title: item.mediaTitle
                  }} mediaType={item.mediaType} favorited={true} />
                </Grid>
              ))}
            </Grid>
          )}
        </Container>
      </Box>
    </>
  )
}

export default FavoriteList