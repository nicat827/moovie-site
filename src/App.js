
import "../src/assets/styles/App.css"
import {
  BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom';
import Profile from "./pages/Profile";
import MainPage from "./pages/MainPage";
import Moovies from "./pages/Moovies";
import MooviePage from "./pages/MooviePage";
import Register from "./pages/Register";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import { useState } from "react";
import { MooviesContext } from "./context";


function App() {

  const [moovies, setMoovies] = useState([])
  const [searchValue, setSearchValue] = useState("")

  return (
    <>
    <MooviesContext.Provider value={{moovies, setMoovies, searchValue, setSearchValue}}>
    <BrowserRouter>
      <Routes>
        {localStorage.getItem("user") 
        ?
        <>
          <Route path="/" element={<MainPage/>} />
          <Route path="/moovies" element={<Moovies/>} />
          <Route path="/moovies/:moovieId" element={<MooviePage/>} />
          <Route path="/profile" element={<Profile/>}/>
          <Route path="*" element={<NotFound/>}/>
        </>
        :
        <>
          <Route path="/" element={<MainPage/>} />
          <Route path="/moovies" element={<Moovies/>} />
          <Route path="/moovies/:moovieId" element={<MooviePage/>} />
          <Route path="/register" element={<Register/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="*" element={<NotFound/>}/>
        </>
        }
        
        
      </Routes>
    </BrowserRouter>
    </MooviesContext.Provider>
    </>
    
  );
}

export default App;
