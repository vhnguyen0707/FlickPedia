//https://mui.com/material-ui/customization/theming/#themeprovider
import { ThemeProvider } from "@mui/material/styles";
import { useSelector } from 'react-redux'; //hook allow  to extract data or state from store
import themeConfigs from "./configs/themeConfig";
import { ToastContainer } from 'react-toastify';
import { CssBaseline } from "@mui/material"; //~normalize.css
import { BrowserRouter, Routes, Route  } from "react-router-dom";
import PageWrapper from './components/PageWrapper';
import HomePage from './pages/HomePage';
import MainLayout from "./components/MainLayout";
import PersonDetail from "./pages/PersonDetail";
import MediaSearch from "./pages/MediaSearch";
import ProtectedPage from "./components/ProtectedPage";
import FavoriteList from "./pages/FavoriteList";
import MediaList from "./pages/MediaList";
import MediaDetail from "./pages/MediaDetail";
import ReviewList from "./pages/ReviewList";

// fix toast not styled correctly https://stackoverflow.com/a/75519951
import 'react-toastify/dist/ReactToastify.css';


function App() {
  const { themeMode } = useSelector((state) => state.themeMode);
  
  return (
    <ThemeProvider theme={themeConfigs.custom({ mode: themeMode })}>
      <ToastContainer
        limit={3} 
        position="bottom-left"
        autoClose={2500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        
        pauseOnFocusLoss
        pauseOnHover
        theme={themeMode}
      />
      <CssBaseline />
      {/* app routes */}
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<PageWrapper state={"home"}><HomePage /></PageWrapper>} />
            <Route path="/person/:personId" element={<PageWrapper state={"person.detail"}><PersonDetail /></PageWrapper> } />
            <Route path="/search" element={<PageWrapper state={"search"}><MediaSearch /></PageWrapper> } />
            <Route path="/favorites" element={<PageWrapper state={"favorites"}><ProtectedPage><FavoriteList /></ProtectedPage></PageWrapper> } />
            <Route path="/reviews" element={<PageWrapper state={"reviews"}><ProtectedPage><ReviewList /></ProtectedPage></PageWrapper> } />
            <Route path="/:mediaType" element={<MediaList /> } />
            <Route path="/:mediaType/:mediaId" element={<PageWrapper state={'media.detail'}><MediaDetail /></PageWrapper> } />
          </Route>
        </Routes>
      </BrowserRouter>

    </ThemeProvider>
  );
}

export default App;
