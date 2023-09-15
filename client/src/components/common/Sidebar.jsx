import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import menuConfigs from '../../configs/menuConfig';
import Logo from './Logo';
import { Link } from 'react-router-dom';
import { setThemeMode } from '../../redux/features/themeModeSlice';
import { Box, Drawer, ListItemButton, Typography, ListItemIcon, ListItemText, List } from '@mui/material';
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import WbSunnyOutlinedIcon from "@mui/icons-material/WbSunnyOutlined";
import uiConfigs from '../../configs/uiConfigs';

const Sidebar = ({ open, toggleSidebar}) => {
    const dispatch = useDispatch();

    const { user } = useSelector(state=>state.user);
    const { appState } = useSelector(state=>state.appState);
    const { themeMode } = useSelector(state=>state.themeMode);

    const sidebarWidth = uiConfigs.size.sidebarWidth;
    const onSwitchTheme = () =>  {
        const theme = themeMode === 'dark' ? 'light' : 'dark';
        dispatch(setThemeMode(theme))
      }

    const drawer = (
        <Box onClick={toggleSidebar} sx={{ paddingY: "20px", color: 'text.primary'}}>
            {/* <Stack width="100%" direction="row" justif */}
            <Box textAlign="center" marginBottom='20px'>
                <Logo />
            </Box>
            <List sx={{ paddingX: '30px' }}>
                <Typography variant='h6' marginBottom='20px'>MENU</Typography>
                {menuConfigs.main.map(config => (
                    <ListItemButton
                        key={config.display}
                        sx={{
                            borderRadius: '10px',
                            marginY: 1,
                            backgroundColor: appState.includes(config.state) ? 'primary.main' : 'unset'
                        }}
                        component={Link}
                        to={config.path}
                        onClick={() => toggleSidebar(false)}
                    >
                        <ListItemIcon>{config.icon}</ListItemIcon>
                        <ListItemText sx={{textTransform: 'uppercase'}}>{config.display}</ListItemText>
                    </ListItemButton>
                ))}
                {!user && (
                    <>
                        <Typography variant='h6' marginBottom='20px'>PERSONAL</Typography>
                        {menuConfigs.user.map(config => (
                            <ListItemButton
                                key={config.display}
                                sx={{
                                    borderRadius: '10px',
                                    marginY: 1,
                                    backgroundColor: appState.includes(config.state) ? 'primary.main' : 'unset'
                                }}
                                component={Link}
                                to={config.path}
                                onClick={() => toggleSidebar(false)}
                            >
                                <ListItemIcon>{config.icon}</ListItemIcon>
                                <ListItemText sx={{textTransform: 'uppercase'}}>{config.display}</ListItemText>
                            </ListItemButton>
                        ))}
                    </>
                )}
                <Typography variant='h6' marginBottom='20px'>THEME</Typography>
                <ListItemButton
                        sx={{
                            borderRadius: '10px',
                            marginY: 1,
                        }}
                        onClick={onSwitchTheme}
                    >
                        <ListItemIcon>
                            {themeMode==='dark'? <DarkModeOutlinedIcon/> : <WbSunnyOutlinedIcon />}
                        </ListItemIcon>
                        <ListItemText sx={{textTransform: 'uppercase'}}>
                            {themeMode==='dark' ? 'dark mode' : 'light mode'}    
                        </ListItemText>        
                </ListItemButton>       
            </List>
        </Box>
    )
  return (
    <Drawer
        open={open}
        onClose={() => toggleSidebar(false)}
        sx={{
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: sidebarWidth }
        }}
    >
        {drawer}
    </Drawer>
  )
}

export default Sidebar