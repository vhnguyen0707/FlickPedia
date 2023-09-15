import { Typography, useTheme } from '@mui/material';

const Logo = () => {
    // FlickPedia
  const theme = useTheme();

  return (
    <Typography fontWeight="700" fontSize="1.7rem">
      Flick<span style={{ color: theme.palette.primary.main }}>Pedia</span>
    </Typography>
  );
};

export default Logo;