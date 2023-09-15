import React from 'react'
import Container from './Container'
import { Paper, Stack, Button, Box} from '@mui/material';
import Logo from './Logo';
import menuConfigs from '../../configs/menuConfig';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <Container>
        <Paper square={true} sx={{ backgroundImage: "unset", padding: "2rem"}}>
            <Stack 
                alignItems='center'
                justifyContent='space-between'
                direction={{ xs: 'column', md: 'row' }}
                sx ={{height: "max-content"}}
            >
                <Logo />
                <Box>
                    {menuConfigs.main.map((config) => (
                        <Button
                            color="inherit"
                            key={config.display}
                            variant="text"
                            component={Link}
                            to={config.path}
                        >
                            {config.display}
                            </Button>
                    ))}
                </Box>
            </Stack>
        </Paper>
    </Container>
  )
}

export default Footer