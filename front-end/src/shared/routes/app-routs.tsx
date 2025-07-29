import { Route, Routes } from "react-router-dom";
import Login from "../../modules/user/pages/Login.tsx";
import Signup from "../../modules/user/pages/signup.tsx";
import Home from "../../modules/user/pages/home.tsx";
import Quizzes from "../../modules/user/pages/quizzes.tsx";
import Dashboard from "../../modules/user/pages/Dashboard.tsx";

const AppRoutes = ()=>{
    return (<>
        <Routes>
            <Route path="/login" element={<Login/>}/>
             <Route path="/signup" element={<Signup/>}/>
              <Route path="/dashboard" element={<Dashboard/>}/>
              <Route path="/quizzes" element={<Quizzes/>}/>
              <Route path="/" element={<Home/>}/>
        </Routes>
    </>)

}

export default AppRoutes;