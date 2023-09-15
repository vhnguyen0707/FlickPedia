import { useState } from 'react';
import menuConfigs from '../../configs/menuConfig';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Menu, ListItemButton, ListItemIcon, ListItemText, Typography } from '@mui/material';
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import { setUser } from '../../redux/features/userSlice';

const UserMenu = () => {
    const { user } = useSelector(state=> state.user);
    const dispatch = useDispatch();
    const [anchorEl, setAnchorEl] = useState(null);
    const toggleMenu = (e) => setAnchorEl(e.currentTarget);
   
  return (
    <>
        {user && (
            <>
                <Typography variant="h6"
                    sx={{cursor: 'pointer', userSelect: "none"}}
                    onClick={toggleMenu}
                >
                    {user.displayName}
                </Typography>
                <Menu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={() => setAnchorEl(null)}
                    placement="bottom-start"
                >
                    {menuConfigs.user.map(config => (
                        <ListItemButton
                            component={Link}
                            to={config.path}
                            key={config.display}
                            onClick={()=>setAnchorEl(null)}
                        >
                            <ListItemIcon>{config.icon}</ListItemIcon>
                            <ListItemText sx={{textTransform: 'uppercase'}}>{config.display}</ListItemText>
                        </ListItemButton>
                    ))}
                    <ListItemButton 
                        sx={{ borderRadius: "10px"}}
                        onClick={()=>dispatch(setUser(null))}
                    >
                        <ListItemIcon><LogoutOutlinedIcon /></ListItemIcon>
                        <ListItemText sx={{textTransform: 'uppercase'}}>sign out</ListItemText>
                    </ListItemButton>
                </Menu>
            </>
        )}
    </>
  )
}

export default UserMenu