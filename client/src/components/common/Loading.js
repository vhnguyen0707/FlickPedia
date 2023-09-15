import { useSelector } from "react-redux";
import { useEffect, useState  } from "react";
import { Paper, Box, LinearProgress, Toolbar } from '@mui/material';
import Logo from './Logo';

const Loading = () => {
    const { globalLoading } = useSelector((state) => state.globalLoading);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (globalLoading) setIsLoading(true);
        else {
            setTimeout(() => {
                setIsLoading(false) //gradually hiding loading indicator
            }, 500)
        }
    }, [globalLoading])
  return (
    <Paper sx={{
        opacity: isLoading ? 1 : 0,
        pointerEvents: "none",
        transition: "all .3s ease",
        position: "fixed",
        width: "100vw",
        height: "100vh",
        zIndex: 999
    }}> 
        <Toolbar />
        <LinearProgress />
        <Box sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)"
        }}>
            <Logo />
        </Box>
    </Paper>
  )
}

export default Loading