import React from 'react';
import { Box, Typography, CircularProgress, Stack } from '@mui/material';

const MediaRate = ({ value }) => {
  return (
    <Box sx={{
        display: 'inline-block',
        width: 'max-content',
        position: 'relative'
    }}> 
        <CircularProgress variant="determinate" value={value*10} color='inherit'/>
        <Box sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: 'absolute',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}>
          <Typography variant="caption" component="div" color="text.primary">
            {Number(value).toPrecision(2)} 
            {/* Math.floor(value*10)/10 */}
          
          </Typography>
        </Box>
    </Box>
  )
}

export default MediaRate