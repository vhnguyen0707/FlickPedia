import { useState } from 'react'
import { Modal, Box } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { setAuthModalOpen } from '../redux/features/authModalSlice';
import Logo from './common/Logo';

import SignIn from './forms/SignIn';
import SignUp from './forms/SignUp';


const AuthModal = () => {
    const dispatch = useDispatch();
    const { authModalOpen } = useSelector(state => state.authModal);
    const [signInForm, setSignInForm] = useState(true);

    const toggleCurrentForm = () => setSignInForm(!signInForm);

    const handleClose = () => dispatch(setAuthModalOpen(false));

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: "100%",
        maxWidth: "600px",
        padding: 4,
      };
    return (
        <Modal 
            // open={true}  //sua
            open={authModalOpen}
            onClose={handleClose}
        >
            <Box sx={style}>
                <Box sx={{ padding: 6, boxShadow: 24, backgroundColor: "background.paper", textAlign: 'center'}}>
                    <Logo />
                    {signInForm && <SignIn toggleCurrentForm={toggleCurrentForm}/>}
                    {!signInForm && <SignUp toggleCurrentForm={toggleCurrentForm}/>}
                </Box>
            </Box> 
        </Modal>

    )
}

export default AuthModal