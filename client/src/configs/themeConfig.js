import { createTheme } from '@mui/material/styles';
import { colors } from '@mui/material';

// customize MUI default theme colors;
const themeConfigs = {
    custom: ({ mode }) => {
        const customPalette = mode === 'dark' ? {
            primary: {
                main: "#ff0000",
                contrastText: "#ffffff"
            },
            secondary: {
                main: "#f44336",
                contrastText: "#ffffff"
            },
            background: {
                default: "#000000",
                paper: "#131313"
            }

        } : {
            primary: {
                main: "#ff0000"
            },
            secondary: {
                main: "#f44336"
            },
            background: {
                default: colors.grey["100"],
            }
        };
        return createTheme({
            palette: {
                mode,
                ...customPalette
            },
            // components: {
            //     MuiButton: {
            //         defaultProps: { disableElevation: true } //flat btn, no shadow 
            //     }
            // }
        });
    }
};

export default themeConfigs