import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setAppState } from "../redux/features/appStateSlice";


const PageWrapper = ({ state, children }) => {
  const dispatch = useDispatch();
  const appState = useSelector(state=>state.appState);

  useEffect(() => {
    window.scrollTo(0, 0); //to ensure when navigate to new page -> page scrolled to top
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(setAppState(state));
  }, [state, dispatch]);

  return (
    children
  );
};

export default PageWrapper;