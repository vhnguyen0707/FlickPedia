import { useParams } from "react-router-dom";
import { useState, useMemo, useEffect } from 'react';
import HeroSlider from "../components/media/HeroSlider";
import uiConfigs from "../configs/uiConfigs";
import { Typography, Box, Stack, Button, Grid } from "@mui/material";
import { useDispatch } from "react-redux";
import { setGlobalLoading } from "../redux/features/globalLoadingSlice";
import { setAppState } from '../redux/features/appStateSlice';
import mediaRequests from "../axios/modules/mediaRequests";
import { toast } from "react-toastify";
import  usePrevious from '../hooks/usePrevious';
import MediaItem from "../components/media/MediaItem";
import { LoadingButton } from "@mui/lab";

const MediaList = () => {
  const { mediaType } = useParams();
  const [category, setCategory] = useState(0);
  const categories = useMemo(()=>['popular', 'top_rated'], []);
  const [currPage, setCurrPage] = useState(1);

  const prevMediaType = usePrevious(mediaType); //to reset current page
  const dispatch = useDispatch();
  const [medias, setMedias] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    dispatch(setAppState(mediaType));
    window.scrollTo(0,0);
  }, [mediaType, dispatch]);

  useEffect(() => {
    const getMedias = async() => {
      if (currPage === 1) dispatch(setGlobalLoading(true));
      setIsLoading(true);

      const {response:data, err} = await mediaRequests.getList({
        mediaType, 
        mediaCategory: categories[category], 
        page:currPage
      });
      setIsLoading(false);
      dispatch(setGlobalLoading(false));

      if (data) {
        if (currPage !== 1) setMedias(prev => [...prev, ...data.results]);
        else setMedias(data.results);
      }
      if (err) toast.error(err.message);
    };
    if (mediaType !== prevMediaType) {
      setCurrPage(1); //reset everything when nav between movies & tv series
      setMedias([]);
      setCategory(0);
      setIsLoading(false);
    }
    getMedias();
  }, [mediaType, currPage, category, prevMediaType, categories, dispatch]);
  const toggleCategory = () => {
    if (category===0) setCategory(1);
    if (category===1) setCategory(0);
    setCurrPage(1);
    setMedias([]);
    setIsLoading(false);
  }

  const handleLoadMore = () => {
    setCurrPage(prev=>prev+1);
  }

  return (
    <>
      <HeroSlider mediaType={mediaType} mediaCategory={categories[category]} />
      <Box sx={{...uiConfigs.style.mainContent}}>
        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <Typography variant="h5" sx={{textTransform: 'uppercase', fontWeight: '700'}}>
            {mediaType === 'movie' ? 'movies' : 'tv series'}
          </Typography>
          {/* buttons */}
          <Stack direction="row" width='max-content' spacing={1}>
            {categories.map((item, idx) => (
              <Button 
                key={item} width='max-content' 
                variant={category===idx ? "contained" : 'text'} 
                onClick={toggleCategory}
              >{item==='top_rated'?'top rated':'popular'}</Button>
            ))}
          
          </Stack>
        </Stack>
        <Box sx={{
            // bgcolor: 'white',
            marginTop: '2rem',
            paddingX: {
              xs: '1rem',
              md: '3rem'
            }
          }}
          >
            <Grid container spacing={1}>
              {medias.map(media =>(
                <Grid key={media.id} item xs={4} sm={3}>
                  <MediaItem media={media} mediaType={mediaType} />
                </Grid>
              ))}
            </Grid>
            <LoadingButton
              fullWidth
              sx={{marginTop: 8}}
              loading={isLoading}
              onClick={handleLoadMore}
            >
              Load More</LoadingButton>

    
          </Box>

      </Box>
    </>
  )
}

export default MediaList