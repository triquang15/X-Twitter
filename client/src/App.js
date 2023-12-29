
import './App.css';
import {Routes, Route, useNavigate} from 'react-router-dom'
import { Authentication } from './Components/Auth/Authentication';
import { HomePage } from './Components/HomePage/HomePage';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getUserProfile } from './Store/Auth/Action';
import { Message } from './Components/Messages/Message';

function App() {
  const jwt = localStorage.getItem("jwt")
  const {auth} = useSelector(store=> store)
  const dispatch = useDispatch();
  const navigate = useNavigate()

  useEffect(() => {
    if(jwt) {
      dispatch(getUserProfile(jwt))
      navigate("/")
    }
  }, [auth.jwt])

  return (
    <div className="">
        <Routes>
            <Route path='/*' element={auth.user?<HomePage/>:<Authentication/>}></Route>
            <Route path='/messages' element={<Message/>}></Route>
        </Routes>
    </div>
  );
}

export default App;
