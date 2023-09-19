import uiConfigs from '../configs/uiConfigs'
import { Button, Stack, Toolbar, Box, TextField, Grid, Typography, useTheme } from '@mui/material';
import { useState, useEffect, useCallback} from 'react';
import mediaRequests from '../axios/modules/mediaRequests';
import { toast } from 'react-toastify';
import MediaItem from '../components/media/MediaItem';
import tmdbConfig from '../axios/configs/tmdbConfig';
import { Link } from 'react-router-dom'
import { LoadingButton } from '@mui/lab';

const mediaTypes = ['movie', 'tv', 'people'];
let timer;
const delay = 500;
const MediaSearch = () => {
  const theme = useTheme();
  const [currMedia, setCurrMedia] = useState(mediaTypes[0]);
  const [query, setQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [medias, setMedias] = useState([]);
  const handleSwitchCurrMedia = (media) => setCurrMedia(media);

  const search = useCallback(async() => {
    setIsLoading(true);
    const {response:data, err} = await mediaRequests.search({
      mediaType: currMedia,
      query,
      page
    });

    if (data) {
      if (page===1) setMedias(data.results);
      else setMedias(prev => [...prev, ...data.results]);
    }

    if (err) console.log(err.message);
    setIsLoading(false)
  }, [currMedia, query, page]);

  useEffect(() => {
    if (query === '') {
      setMedias([]);
      setPage(1);
    } else {
      search();
    }
  }, [query, search, page, currMedia]);

  useEffect(() => {
    setMedias([]);
    setPage(1);
  }, [currMedia]);
 //rate-limiting updates
 const onQueryChange = (e) => {
  const newQuery = e.target.value.trim();
  clearTimeout(timer); //not counting till when user stop triggers new event
  timer = setTimeout(() => {
    setQuery(newQuery);
  }, delay);
 }
  return (
    <>
      <Toolbar />
      <Box sx={{...uiConfigs.style.mainContent}}>
        <Stack direction="column" spacing={3} width='100%' alignItems='center'>
          <Stack 
            direction="row"
            justifyContent="center"
            width='60%'
            spacing={2}
          >
            {mediaTypes.map((media, idx) => (
              <Button
                variant= {media===currMedia ? 'contained' : 'outlined'}
                key={media}
                sx={{
                  flex: 1, 
                  color: (theme === 'dark') || (media === currMedia) ? 'primary.contrastText' :'text.primary', 
                  border: 'none',
                  '&:hover': {border: 'none'}
                }}
                onClick={()=>handleSwitchCurrMedia(media)}
              >
                  {media}
              </Button>
            ))}
          </Stack>
          <TextField variant="outlined" color="info" sx={{width: "100%"}}
            onChange={onQueryChange}
          />
        </Stack>
        {medias.length > 0 && (
          <>
            <Grid container spacing={2} sx={{marginTop: '15px'}} className='results'>
              {currMedia !== 'people' ? 
                (
                  medias.map(media => (
                    <Grid item xs={4} md={3} key={media.id}>
                        <MediaItem media={media} mediaType={currMedia} />
                    </Grid>
                  ))
                )
                : (
                  medias.map(media => (
                    <Grid item xs={4} md={3} key={media.id} style={{ width: "100%", height: "max-content" }}>
                      <Link to={`/person/${media.id}`}>
                              <Box sx={{ paddingTop:  "160%",
                                      ...uiConfigs.style.backgroundImage(tmdbConfig.posterSrc(media.profile_path))
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
                                          {media.name}
                                      </Typography>
                                  </Box>
                              </Box>  
                          </Link>
                        {/* <MediaItem media={media} mediaType={currMedia} /> */}
                    </Grid>
                  ))
                )
              }
              
            </Grid>
            <LoadingButton
              loading={isLoading}
              fullWidth
              sx={{marginTop: '1rem'}}
              onClick={()=>setPage(page+1)}
              >
              Load more
            </LoadingButton>
          </>
        )}
      </Box>
    </>
  )
}

export default MediaSearch