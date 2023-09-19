import  { Box, Stack, Avatar, Typography, Tooltip, TextField, IconButton } from '@mui/material'; 
import LoadingButton from '@mui/lab/LoadingButton';
import { format } from 'date-fns';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import SendIcon from '@mui/icons-material/Send';
import { useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import reviewRequests from '../../axios/modules/reviewRequests';
import { toast } from 'react-toastify';

function CustomAvatar({ name }){
    const stringToColor = () => {
        let hash = 0;
        let i;
        /* eslint-disable no-bitwise */
        for (i = 0; i < name.length; i += 1) {
          hash = name.charCodeAt(i) + ((hash << 5) - hash);
        }
        let color = '#';
        for (i = 0; i < 3; i += 1) {
          const value = (hash >> (i * 8)) & 0xff;
          color += `00${value.toString(16)}`.slice(-2);
        }

        return color;
    }
    return (
        <Avatar 
            children={name[0]}
            sx={{
                color: 'white',
                backgroundColor: stringToColor()
            }}
        />
    )
}
const Reviews = ({ reviews, mediaType, media }) => {
    const { user } = useSelector(state=>state.user);
    const [reviewTxt, setReviewTxt] = useState('');
    const [reviewsList, setReviewsList] = useState([]);
    const [onRequest, setOnRequest] = useState(false);

    useEffect(()=>{
        setReviewsList(reviews);
    }, [reviews]);

    const handleSubmitReview = async() => {
        setOnRequest(true);
        const { response:data, err } = await reviewRequests.add({
            mediaId: media.id,
            mediaType,
            mediaTitle: media.name || media.original_title || '',
            mediaPoster: media.poster_path, 
            content: reviewTxt
        })
        setOnRequest(false);
        if (data) { 
            setReviewTxt('');
            toast.success('New review submitted!')
            setReviewsList(prev => [...prev, data]);
        } 
        if (err){
            console.log(err.message);
        }
    }

    const handleDeleteReview = async(reviewId) => {
        const { response: data, err } = await reviewRequests.remove({reviewId});
        if (data) {
            toast.success('Review removed');
            setReviewsList([...reviewsList.filter(review => review.id !==reviewId)]);
        }
        if (err) console.log(err.message);
    }
    return (
        <Stack spacing={4}>
            {reviewsList && (
                reviewsList.map(review => (
                    <Stack key={review.id} direction="row" spacing={1} sx={{
                        color: 'text.primary', 
                        padding: '1rem 2rem',
                        '&:hover': {
                            bgcolor: 'background.paper'
                        }
                    }}>
                        <Box sx={{padding: '1rem'}}><CustomAvatar name={review.user.displayName} /></Box>
                        <Stack direction="column" spacing={0.4} sx={{flex: '80%'}}>
                            <Typography variant='h6' sx={{fontWeight: 700}}>{review.user.displayName}</Typography>
                            <p style={{
                                fontStyle: 'italic',
                                opacity: '0.6',
                                fontSize: '0.9rem'
                            }}>{format(new Date(review.createdAt), 'yyyy/MM/dd HH:mm:ss')}</p>
                            <Typography variant='body1'>{review.content}</Typography>
                        </Stack>
                        {user && user.id === review.user.id && (
                            <Box sx={{padding: '1rem', display: 'flex', alignItems: 'center'}}>
                                <Tooltip title="Delete">
                                    <IconButton onClick={()=>handleDeleteReview(review.id)}><DeleteOutlineIcon /></IconButton>
                                </Tooltip> 
                            </Box>
                        )}
                    </Stack>
                ))
            )}
            {user && (
                <Stack direction="row" spacing={1} sx={{color: 'text.primary',  padding: '1rem 2rem'}}>
                    <Box sx={{padding: '1rem'}}><CustomAvatar name={user.displayName} /></Box>
                    <Stack direction="column" gap={0.6} sx={{flex: 1}}>
                        <Typography variant='h6' sx={{fontWeight: 700}}>{user.displayName}</Typography>
                        <TextField rows={3} multiline value={reviewTxt} onChange={(e)=>setReviewTxt(e.target.value)}/>
                        <LoadingButton 
                            disabled={!reviewTxt} 
                            onClick={handleSubmitReview}
                            startIcon={<SendIcon />} 
                            loading={onRequest}
                            loadingPosition='start'
                            sx={{width: 'max-content', marginTop: '1rem'}} 
                            variant="contained"
                        >
                            Submit
                        </LoadingButton>
                    </Stack>
                    
                </Stack>
            )}
        </Stack>

    // </Box>
  )
}

export default Reviews