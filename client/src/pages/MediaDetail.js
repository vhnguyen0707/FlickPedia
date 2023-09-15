import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Stack, Typography, Button, Chip, useTheme, Divider } from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import { useParams } from 'react-router-dom';
import mediaRequests from '../axios/modules/mediaRequests';
import { setGlobalLoading } from '../redux/features/globalLoadingSlice';
import { toast } from 'react-toastify';
import tmdbConfig from '../axios/configs/tmdbConfig';
import uiConfigs from '../configs/uiConfigs';
import MediaRate from '../components/media/MediaRate';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import LoadingButton from '@mui/lab/LoadingButton';
import Container from '../components/common/Container';
import Casts from '../components/media/Casts';
import Videos from '../components/media/Videos';
import Backdrops from '../components/media/Backdrops';
import Posters from '../components/media/Posters';
import Recommendations from '../components/media/Recommendations';
import Reviews from '../components/media/Reviews';
import MediaSlide from '../components/media/MediaSlide';
import favoriteRequests from '../axios/modules/favoriteRequests';
import { setAuthModalOpen } from '../redux/features/authModalSlice';
import { addFavorite, removeFavorite } from '../redux/features/userSlice';
import { setAppState } from '../redux/features/appStateSlice';
const MediaDetail = () => {
  const theme = useTheme();
  const { mediaType, mediaId } = useParams();
  const { user, listFavorites } = useSelector(state => state.user);
  const [media, setMedia] = useState();
  const [isFavorite, setIsFavorite] = useState(false);
  const [genres, setGenres] = useState([]);

  const dispatch = useDispatch();
  useEffect(() => {
    // dispatch(setAppState(`${mediaType}.detail`));
    window.scrollTo(0,0);
    const getMedia = async() => {
      dispatch(setGlobalLoading(true));
      const { response:data, err } = await mediaRequests.getDetail({mediaType, mediaId});
      dispatch(setGlobalLoading(false));
      if (data) {
        setMedia(data);
        setIsFavorite(data.isFavorite);
        setGenres(data.genres.slice(0,2).map(genre=>genre.name));
      }
      if (err) toast.error(err.message);
    }
    getMedia();
  }, [mediaType, mediaId, dispatch]);
  
  const toggleFavorite = async() => {
    if (!user) { 
      dispatch(setAuthModalOpen(true));
      return;
    }
    
    if (isFavorite) { //remove favorite
      const favoriteId = listFavorites.find(fav=>fav.mediaId.toString()===mediaId.toString()).id;
      const { response: data, err } = await favoriteRequests.remove({
        favoriteId
      });
      if (data) {
        setIsFavorite(false);
        dispatch(removeFavorite({mediaId}));
      }
      if (err) toast.error(err.message);
    } else {
      const { response: data, err} = await favoriteRequests.add({
        mediaId,
        mediaType,
        mediaTitle: media.title || media.name,
        mediaPoster: media.poster_path, 
        mediaRate: media.vote_average
      })
      if (data) {
        setIsFavorite(true);
        dispatch(addFavorite(data));
      }
      if (err) toast.error(err.message);
    }
    }

    
  return (
    media ? (
      <>
        <Box sx={{
          zIndex: '-1',
          position: 'relative',
          paddingTop: {xs: "60%", sm: "40%",md: "35%"},
          backgroundPosition: "top",
          backgroundSize: "cover",
          backgroundAttachment: "fixed",

          backgroundImage: `url(${tmdbConfig.backdropSrc(media.backdrop_path)})`,
          "&::before": {
            content: '""',
            width: '100%',
            height: '100%',
            position: 'absolute',
            left: 0,
            bottom: 0,
            pointerEvents: 'none',
            ...uiConfigs.style.gradientBgImage[theme.palette.mode]
        }
        }} />
        <Box sx={{
          color: 'primary.contrastText',
          ...uiConfigs.style.mainContent
        }}>
              {/* content */}
          <Box sx={{
            marginTop: {xs: '-10rem', md: '-15rem', lg: '-20rem'}
          }}>
            {/* Content (1st part): poster + info + cast */}
            <Box sx={{
              display: 'flex',
              flexDirection: {xs: 'column', md: 'row'}
            }}>
              
              <Box sx={{
                width: {xs: '70%', sm: '50%', md: '40%'},
                margin: {xs: '0 auto 0', md: '0 2rem 0'}
              }}>
                <Box className="poster" sx={{
                  paddingTop: '140%',
                  ...uiConfigs.style.backgroundImage(tmdbConfig.posterSrc(media.poster_path))
                }}/>
                </Box>
                {/* Info */}
                <Box sx={{
                    width: { xs: "100%", md: "60%" },
                    color: "text.primary",
                    marginTop: '2rem'
                  }}>
                  <Stack spacing={5}>
                    {/* title */}
                    <Typography
                      variant="h4"
                      fontSize={{ xs: "2rem", md: "2rem", lg: "4rem" }}
                      fontWeight="700"
                      sx={{ ...uiConfigs.style.typoLines(2, "left") }}
                    >
                      {`${media.title || media.name} ${mediaType === 'movie' ? media.release_date.split("-")[0] : media.first_air_date.split("-")[0]}`}
                    </Typography>
                    <Stack direction='row' gap={1} alignItems="center">
                      <MediaRate value={Number(media.vote_average).toPrecision(2)} />
                      <Divider orientation='vertical' />
                      {genres.map(genre => (
                        <Chip label={genre} key={genre} color="primary"/>
                      ))}
                    </Stack>
                    <Typography variant='body1' sx={{fontSize: '1.1em'}}>{media.overview}</Typography>
                    {/* buttons */}
                    <Stack direction="row" spacing={1} alignItems='center'>
                      <LoadingButton
                        // variant="text"
                        sx={{width: 'max-content'}}
                        size="large"
                        startIcon={isFavorite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
                        loadingPosition='start'
                        // disabled
                        onClick={toggleFavorite}
                      />
                      <Button
                        startIcon={<PlayArrowIcon />}
                        variant='contained'
                      >Watch now</Button>
                    </Stack>

                  </Stack>
                  <Box>
                    <Container header="cast" className='container'>
                      {/* CastSlider */}
                      <Casts casts={media.credits.cast} />
                      
                    </Container>
                  </Box>
                </Box>
          
            </Box>
            <Box>
              <Container header='videos'>
                <Videos videos={media.videos.results} />
              </Container>
            </Box>
            <Box>
              <Container header='backdrops'>
                <Backdrops backdrops={media.images.backdrops} />
              </Container>
            </Box>
            <Box>
              <Container header='posters'>
                <Posters posters={media.images.posters} />
              </Container>
            </Box>
            <Box>
              <Container header= 'reviews'>
                <Reviews reviews={media.reviews} mediaType={mediaType} media={media}/>
              </Container>
            </Box>
            <Box>
              <Container header='more to explore'>
                {media.recommend.length > 0 && <Recommendations recommendations={media.recommend} mediaType={mediaType}/>}
                {media.recommend.length === 0 && <MediaSlide mediaType={mediaType} mediaCategory='top_rated'/>}
              </Container>
            </Box>
            

          </Box>
          
        </Box>
      
      
      </>
    ) : null
  )
}

export default MediaDetail