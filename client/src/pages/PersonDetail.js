import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import personRequests from '../axios/modules/personRequests';
import { useDispatch } from 'react-redux';
import { setGlobalLoading } from '../redux/features/globalLoadingSlice';
import { toast } from 'react-toastify';
import { Box, Stack, Typography} from '@mui/material';
import Container from '../components/common/Container';
import tmdbConfig from '../axios/configs/tmdbConfig';
import uiConfigs from '../configs/uiConfigs';
import PersonMediasPagination from '../components/media/PersonMediasPagination';

const PersonDetail = () => {
  const { personId } = useParams();
  const dispatch = useDispatch();
  const [person, setPerson] = useState();
  // const [medias, setMedias] = useState([]);

  useEffect(()=>{
    // window.scrollTo(0,0);
    const getPerson = async() => {
      dispatch(setGlobalLoading(true));
      const {response:data, err} = await personRequests.getDetail({personId});
      // dispatch(setGlobalLoading(false));
      if (data) setPerson(data);
      if (err) toast.error(err.message);
 
    }
    
    getPerson();
  }, [personId, dispatch]);

  return (
    <>
      {person && (
        <Box sx={{...uiConfigs.style.mainContent, marginTop: '100px'}}>
          <Stack direction={{xs: 'col', md: 'row'}}>
            <Box sx={{
                width:  '40%',
                margin: '20px auto 0'
              }}>
               <Box sx={{
                paddingTop: '130%', 
                ...uiConfigs.style.backgroundImage(tmdbConfig.posterSrc(person.profile_path))}}
                />
            </Box>
            <Stack width={{xs: '100%', md: '60%'}} direction='column' gap={1} sx={{marginTop: '1.5rem', paddingX: '1rem'}}>
              <Typography variant='h4' sx={{fontWeight: '700'}}>{person.name} ({person.birthday})</Typography>
              <Typography variant='body1' sx={{fontStyle: 'italic', opacity: '0.6'}}>{person.place_of_birth}</Typography>  
              <Typography variant='body1'>{person.biography}</Typography>
            </Stack>
          </Stack>
          <Box>
            <Container header='credits'>
                <PersonMediasPagination personId={personId} />
            </Container>
          </Box>
        </Box>
      )}
    </>
  )
}

export default PersonDetail