import { Box, Button, Typography, Stack } from '@mui/material';
import { useSelector } from 'react-redux';
import uiConfigs from '../../configs/uiConfigs';
import MediaRate from './MediaRate';
import favoriteUtils from '../../utils/utils';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import tmdbConfig from '../../axios/configs/tmdbConfig';
import { Link } from 'react-router-dom';
import FavoriteIcon from '@mui/icons-material/Favorite';


const MediaItem = ({ media, mediaType, favorited}) => {
    const { listFavorites } = useSelector(state => state.user);
    let releaseYear;
    if (mediaType === 'movie') {
        releaseYear = media.release_date && media.release_date.split('-')[0] ; 
    } else if (mediaType === 'tv') {
        releaseYear =  media.first_air_date && media.first_air_date.split('-')[0];
    }
    const posterPath = tmdbConfig.posterSrc(media.poster_path || media.backdrop_path || media.prfile_path)
  return (
    <Link
        component={Link}
        to={mediaType!=='people' ? `/${mediaType}/${media.id}` : `/person/${media.id}`}
    >

        <Box sx={{
                ...uiConfigs.style.backgroundImage(posterPath),
                paddingTop: '160%',
                '&:hover .media-info': {opacity: 1, bottom: 0},
                '&:hover .media-back-drop, &:hover .media-play-btn': {opacity: 1},
                color: 'primary.contrastText'
        }}>
            {mediaType !== 'people' && (
                <>  
                    {(favorited || favoriteUtils.check({listFavorites, mediaId: media.id})) && (
                        <>
                            <FavoriteIcon
                                color="primary"
                                sx={{
                                    position: "absolute",
                                    top: 3,
                                    right: 3,
                                    fontSize: "2rem"
                                }}
                            />
                           
                        </>
                    )}
                    
                    <Box className="media-back-drop" sx={{
                            opacity: {xs: 1, md: 0},
                            transition: 'all 0.3s ease',
                            width: '100%',
                            height: '100%',
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            backgroundImage: "linear-gradient(to top, rgba(0,0,0,1), rgba(0,0,0,0))"
                        }}
                    />
                    <Button className="media-play-btn"
                        variant= 'contained'
                        startIcon={<PlayArrowIcon />}
                        sx={{
                            display: {xs: 'none', md: 'flex'},
                            opacity: 0,
                            transition: 'all 0.3s ease',
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            "& .MuiButton-startIcon": { marginRight: "-4px" }
                        }}
                    />
                    <Box
                        className="media-info"
                        sx={{
                            opacity: {xs: 1, md: 0},
                            transition: 'all 0.3s ease',
                            position: 'absolute',
                            bottom: {xs: 0, md: '-20px'},
                            width: '100%',
                            height: 'max-content',
                            boxSizing: 'border-box',
                            padding: { xs: '10px', md: '1.2rem 1rem'}
                        }}
                    >
                        <Stack direction="column" spacing={0.6}>
                            <MediaRate value={media.vote_average}/>
                            {releaseYear && <Typography>{releaseYear}</Typography>}
                            <Typography variant='h6'
                                sx={{...uiConfigs.style.typoLines(1, 'left'), fontSize: '1.1rem'}}
                            >
                                {media.title || media.name}
                            </Typography>
                        </Stack>
                    </Box>
                </>
            )}
        </Box>
    </Link>
  )
}

export default MediaItem