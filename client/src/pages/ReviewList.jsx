import React from 'react'
import uiConfigs from '../configs/uiConfigs';
import { Box, Stack, Typography, Tooltip, IconButton } from '@mui/material';
import { useState, useEffect } from 'react';
import reviewRequests from '../axios/modules/reviewRequests';
import { toast } from 'react-toastify';
import tmdbConfig from '../axios/configs/tmdbConfig';
import Container from '../components/common/Container';
import { format } from 'date-fns';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { Link } from 'react-router-dom';

const ReviewList = () => {
  const [reviews, setReviews] = useState([]);
  useEffect(() => {
    const getMyReviews = async() => {
      const { response: data, err } = await reviewRequests.getList();
      if (data) setReviews(data);
      if (err) console.log(err.message);
    }
    getMyReviews();
  }, []);

  const handleDeleteReview = async(reviewId) => {
    const {response:data, err} = await reviewRequests.remove({reviewId});
    if (data) {
      setReviews(reviews.filter(review=>review.id !== reviewId));
      toast.success('Review removed');
    }
    if (err) console.log(err.message);
  }
  return (
    <>
      {/* <Toolbar /> */}
      <Box sx={{...uiConfigs.style.mainContent}}>
        <Container header={`Your reviews (${reviews.length})`}>
          <Stack spacing={4} width="100%">
            {reviews.map(review => (
              <Stack key={review.id} direction='row' spacing={3} sx={{
                color: 'text.primary', 
                padding: '1rem 2rem',
                '&:hover': {
                    bgcolor: 'background.paper'
                },
              }}>
                <Box sx={{width: {xs: 0, md: '15%'}}}>
                  <Link to={`/movie/${review.mediaId}`}>
                    <Box sx={{paddingTop: '130%', ...uiConfigs.style.backgroundImage(tmdbConfig.posterSrc(review.mediaPoster))}}/>

                  </Link>
                </Box>
                <Stack spacing={2} sx={{flex: '50%'}}>
                  <Typography variant="h6">{review.mediaTitle}</Typography>
                  <p style={{
                                fontStyle: 'italic',
                                opacity: '0.6',
                                fontSize: '0.9rem'
                            }}>{format(new Date(review.createdAt), 'yyyy/MM/dd HH:mm:ss')}</p>
                  <Typography variant='body1'>{review.content}</Typography>
                </Stack>
                <Box sx={{padding: '1rem', display: 'flex', alignItems: 'center'}}>
                                <Tooltip title="Delete">
                                    <IconButton onClick={()=>handleDeleteReview(review.id)}><DeleteOutlineIcon /></IconButton>
                                </Tooltip> 
                </Box>
              </Stack>
            ))}
          </Stack>
        </Container>
      </Box>
    </>
  )
}

export default ReviewList