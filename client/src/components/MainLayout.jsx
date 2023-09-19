import { Box } from '@mui/material'
import { Outlet } from 'react-router-dom';
import Loading from './common/Loading';
import Footer from './common/Footer';
import Navbar from './common/Navbar';
import AuthModal from './AuthModal';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { toast } from 'react-toastify';
// get user from JWT
import userRequests from '../axios/modules/userRequests';
import favoriteRequests from '../axios/modules/favoriteRequests';
import { setUser, setListFavorites } from '../redux/features/userSlice';

const MainLayout = () => {
  const dispatch = useDispatch();

  const { user } = useSelector(state=> state.user);
  useEffect(() => {
    const authUser = async() => {
      const { response, err } = await userRequests.getInfo();
      if (response) dispatch(setUser(response));
      if (err) dispatch(setUser(null));
    };
    authUser(); //useEffect doesn't like async 
  }, [dispatch])
  
  useEffect(() => {
    const getFavorites = async () => {
      const {response: data, err} = await favoriteRequests.getList();
      if (data) dispatch(setListFavorites(data));
      if (err) console.log(err.message);
    }
    if (user) getFavorites();
    else dispatch(setListFavorites([]));
  }, [user, dispatch])

  return (
    <>
    <Loading />

    {/* login modal */}
    <AuthModal />
    {/* login modal */}
    <Box display='flex' minHeight='100vh'>
        {/* header */}
        <Navbar />
        {/* header */}

        {/* main */}
        <Box
            component="main"
            flexGrow={1}
            overflow="hidden"
            minHeight="100vh"
        >   
            {/* placeholder for child route elemnt  */}
            <Outlet /> 
        </Box>
        {/* main */}
       
    </Box>
    <Footer />
    </>
  )
}

export default MainLayout