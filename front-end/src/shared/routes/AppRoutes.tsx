import { Route, Routes } from "react-router-dom";
import Home from "../../modules/users/pages/Home.tsx";
import About from "../../modules/users/pages/About.tsx";
import Leaderboard from "../../modules/users/pages/Leaderboard.tsx";
import Signup from "../../modules/users/pages/SignUp.tsx";
import Login from "../../modules/users/pages/Login.tsx";


const AppRoutes = ()=>{
    return (<>
        <Routes>
              <Route path="/" element={<Home/>}/>
             <Route path="/about" element={<About/>}/>
             <Route path="/leaderboard" element={<Leaderboard/>}/>
             <Route path="/signup" element={<Signup/>}/>
            <Route path="/login" element={<Login/>}/>
        </Routes>
    </>)

}

export default AppRoutes;