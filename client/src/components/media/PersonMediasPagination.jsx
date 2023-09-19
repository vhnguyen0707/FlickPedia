import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { Grid} from '@mui/material';
import MediaItem from './MediaItem';
import personRequests from '../../axios/modules/personRequests';
import { setGlobalLoading } from '../../redux/features/globalLoadingSlice';

import { useEffect, useState } from 'react';
import { LoadingButton } from '@mui/lab';
const PersonMediasPagination = ({ personId }) => {
    const [medias, setMedias] = useState([]);
    const [currShown, setCurrShown] = useState([]);
    const [currPage, setCurrPage] = useState(1);
    const pageSize = 12;
    const dispatch = useDispatch();

    const getReleaseDate = (media) => {
        if (media.media_type==="movie") return new Date(media.release_date).getTime();
        if (media.media_type==='tv') return new Date(media.first_air_date).getTime();
    }
    useEffect(() => {
        const getMedias = async() => {
            const {response:data, err} = await personRequests.getMedias({personId});
            
            if (data) {
                const sortedMedias = data.cast.sort((a,b) => getReleaseDate(b) - getReleaseDate(a));
                setMedias(sortedMedias);
                setCurrShown([...sortedMedias].slice(0, pageSize)); //1st page
            }
            if (err) console.log(err.message); 
            dispatch(setGlobalLoading(false));
        }
        getMedias();
    }, [personId, dispatch]);

    const handleLoadMore = () => {
        setCurrShown([...currShown, ...[...medias].splice(currPage*pageSize, pageSize)]);
        setCurrPage(prev => prev+1);

    }
    return (
        <>
            {currShown && (
                <>
                    <Grid container spacing={1}>
                        {currShown.map(media =>(
                            <Grid key={media.id} item xs={4} md={3}>
                                <MediaItem media={media} mediaType={media.media_type} />
                            </Grid>
                        ))}
                    </Grid>
                    <LoadingButton
                        fullWidth
                        sx={{marginTop: 8}}
                        onClick={handleLoadMore}
                        disabled={currPage*pageSize>=medias.length}
                    >
                        Load more
                    </LoadingButton>
                </>
                
            )}
           
                
        </>    
  )
}

export default PersonMediasPagination