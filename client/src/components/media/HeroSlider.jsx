import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import { Box, Button, Stack, Typography, useTheme, Divider, Chip } from '@mui/material';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper';
import { toast } from 'react-toastify';
import { setGlobalLoading } from '../../redux/features/globalLoadingSlice';
import uiConfigs from '../../configs/uiConfigs';
import mediaRequests from '../../axios/modules/mediaRequests'; 
import tmdbConfig from '../../axios/configs/tmdbConfig';
import MediaRate from './MediaRate';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
const HeroSlider = ({ mediaType, mediaCategory}) => {
  const theme = useTheme();
  const dispatch = useDispatch();

  const [movies, setMovies] = useState([]);
  const [genres, setGenres] = useState([]);
  useEffect(() => {
    const getMovies = async() => {
        const {response:data, err} = await mediaRequests.getList({
            mediaType,
            mediaCategory,
            page: 1
        });
        if (data) setMovies(data.results);
        if (err) toast.error(err.message);
        dispatch(setGlobalLoading(false));
    }
    const getGenres = async() => {
        dispatch(setGlobalLoading(true));
        const {response:data, err} = await mediaRequests.getGenres({ mediaType });
        if (data) {
            setGenres(data.genres);
            getMovies();
        }
        if (err) {
            toast.error(err.message);
            dispatch(setGlobalLoading(false));
        }
    }
    getGenres();
  }, [mediaType, mediaCategory, dispatch]);
  
    return (
    <Box sx={{
        position: 'relative',
        color: 'primary.contrastText',
        "&::before": {
            content: '""',
            width: '100%',
            height: '30%',
            position: 'absolute',
            left: 0,
            bottom: 0,
            zIndex: 2,
            pointerEvents: 'none',
            ...uiConfigs.style.gradientBgImage[theme.palette.mode]
        }
    }}>
      <Swiper
        grabCursor={true}
        loop={true}
        // style={{ width: "100%", height: "max-content" }}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false
        }}
        navigation={true}
        pagination={{
          clickable: 'true'
        }}
        modules={[Autoplay, Navigation, Pagination]}
     
      >
        
       {movies.map((movie, index) => (
          <SwiperSlide key={index}>
            <Box sx={{
              paddingTop: {
                xs: "130%",
                sm: "80%",
                md: "60%",
                lg: "45%"
              },
              backgroundPosition: "top",
              backgroundSize: "cover",
              backgroundImage: `url(${tmdbConfig.backdropSrc(movie.backdrop_path || movie.poster_path)})`
            }} />
            {/* visual effect */}
            <Box sx={{
              height:"100%",
              width: "100%",
              position: "absolute",
              top: 0,
              left: 0,
              ...uiConfigs.style.horizontalGradientBgImage[theme.palette.mode]
            }}>
              <Box sx={{
                width: "100%",
                height: "100%",
                position: "absolute",
                top: 0,
                left: 0,
                paddingX: { sm: "10px", md: "5rem", lg: "10rem" }
              }}>
                <Box  sx={{
                  height: "100%",
                  display: "flex",
                  alignItems: "center",
                  paddingX: "30px",
                  color: "text.primary",
                  width: { sm: "unset", md: "30%", lg: "40%" }
                }}>
                  <Stack spacing={4} direction="column">
                    <Typography variant='h4'
                      fontSize={{xs: '2rem', sm: '2rem', md: '4rem'}}
                      fontWeight={700}
                      sx={{
                        ...uiConfigs.style.typoLines(2, "left")
                      }}
                    >
                      {movie.title}
                    </Typography>
                    <Stack direction="row" spacing={1} alignItems="center">
                      <MediaRate value={movie.vote_average} />
                      <Divider orientation="vertical" />
                      {movie.genre_ids.slice(0,2).map((id, idx) => (
                        <Chip key={idx} label={genres.find(genre=>genre.id===id)?.name} color="primary" />
                      ))}
                    </Stack>
                    <Typography variant='body1' sx={{
                      ...uiConfigs.style.typoLines(3)
                    }}>
                      {movie.overview}
                    </Typography>
                    <Button 
                      variant='contained'
                      startIcon={<PlayArrowIcon />}
                      component={Link}
                      to={`/${mediaType}/${movie.id}`}
                      sx={{maxWidth: '300px'}}
                    >Watch now</Button>
                  </Stack> 
                </Box>
              </Box>
            </Box>
          </SwiperSlide>
            ))}
      </Swiper>
    </Box>
  )
}

export default HeroSlider