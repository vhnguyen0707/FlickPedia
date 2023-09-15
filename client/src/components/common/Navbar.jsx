import { Box, useScrollTrigger } from '@mui/material';
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setThemeMode } from '../../redux/features/themeModeSlice';
import { AppBar, Toolbar, IconButton, Button, Stack } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import menuConfigs from '../../configs/menuConfig';
import Logo from './Logo'
import { Link } from 'react-router-dom';
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import WbSunnyOutlinedIcon from "@mui/icons-material/WbSunnyOutlined";
import { setAuthModalOpen } from '../../redux/features/authModalSlice';
import UserMenu from './UserMenu';
import Sidebar from './Sidebar';

const ElevationScroll = ({ children, window }) =>{
  const { themeMode } = useSelector(state => state.themeMode);

  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 50,
    target: window ? window() : undefined
  });

  return React.cloneElement(children, {
    sx: {
      color: trigger ? 'text.primary' : themeMode === 'dark' ? 'primary.contrastText' : 'text.primary',
      backgroundColor: trigger ? 'background.paper' : themeMode === 'dark' ? 'transparent' : 'background.paper'
    }
  });
};

const Navbar = ({ children, window }) => {
  const { user } = useSelector(state => state.user);
  const { appState } = useSelector(state => state.appState);
  const { themeMode } = useSelector(state => state.themeMode);

  const [sidebarOpen, setSidebarOpen] = useState(false);

  const dispatch = useDispatch();

  const onSwitchTheme = () =>  {
    const theme = themeMode === 'dark' ? 'light' : 'dark';
    dispatch(setThemeMode(theme))
  }
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  return (
    <>
      <Sidebar open={sidebarOpen} toggleSidebar={toggleSidebar} />
      <ElevationScroll>
        <AppBar elevation={0}>
          <Toolbar sx={{ alignItems: "center", justifyContent: "space-between" }}>
            {/* when screen < md */}
            <Stack direction="row" spacing={1} alignItems="center">

              <IconButton
                color="inherit"
                onClick={toggleSidebar}
                sx={{mr: 2, display: {md: 'none'}}}
              >
                <MenuIcon />
              </IconButton>
              <Box sx={{ display: {xs: "inline-block", md: "none"}}}>
                <Logo />
              </Box>
            </Stack>
            {/* main */}
            <Box flexGrow={1} alignItems="center" display={{ xs: 'none', md: 'flex'}}>
              <Box marginRight="30px">
                <Logo />
              </Box>
              {menuConfigs.main.map((config) => (
                <Button
                  sx={{ mr:2, color: appState.includes(config.state) ? 'primary.contrastText' : 'inherit'}}
                  variant={appState.includes(config.state) ? 'contained': 'text'}
                  component={Link}
                  to={config.path}
                  key={config.display}
                >
                  {config.display}
                </Button>
              ))}
              <IconButton
                sx={{ color: 'inherit'}}
                onClick={onSwitchTheme}  
              >
                {themeMode === 'dark' && <DarkModeOutlinedIcon />}
                {themeMode === 'light' && <WbSunnyOutlinedIcon />}
              </IconButton>
            </Box>
            <Stack spacing={3} direction="row" alignItems="center">
              {!user && <Button
                variant="contained"
                onClick={() => dispatch(setAuthModalOpen(true))}
              >
                sign in
              </Button>}
            </Stack>
            {user && <UserMenu />}
          </Toolbar>
        </AppBar>
      </ElevationScroll>
    </>
  )
}

export default Navbar