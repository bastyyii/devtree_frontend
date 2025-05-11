import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/login";
import Register from "./pages/register";
// import NavBar from "./components/nav";
// import { useState, useEffect } from 'react';
import AuthLayout from "./layout/AuthLayout";
import AppLayout from "./layout/AppLayout";
import LinkTree from "./pages/LinkTree";
import Profile from "./pages/Profile";
import HandleView from "./pages/handleView";
import NotFound from "./pages/NotFound";
import HomePage from "./pages/homePage";
export default function router(){
    // const [ controlColor, setControlColor ] = useState(() => {
    //     const saved = localStorage.getItem('controlColor');
    //     return saved !== null ? JSON.parse(saved) : true;
    // });
    // useEffect(() => {
    //     localStorage.setItem('controlColor', JSON.stringify(controlColor));
    // }, [controlColor]);

    return(
        <main>
            {/* <NavBar controlColor={controlColor} setControlColor={setControlColor}></NavBar> */}
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<HomePage/>}>
                    </Route>
                    <Route element={<AuthLayout/>}>
                        <Route path="/login" element={<Login/>}/>
                        <Route path="/register" element={<Register/>}/>
                    </Route>
                    <Route path="/admin" element={<AppLayout/>}>
                        <Route index={true} element={<LinkTree/>}/>
                        <Route path="profile" element={<Profile/>}/>
                    </Route>
                    <Route path="/users/:handle">
                        <Route element={<HandleView/>} index={true}/>
                    </Route>
                    <Route path="/404" element={<AuthLayout/>}>
                        <Route element={<NotFound/>} index={true}/>
                    </Route>
                </Routes>
            </BrowserRouter>
        </main>
    )
}