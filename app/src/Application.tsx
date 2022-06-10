import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import About from "./pages/About";
import App from "./pages/HomePage";

function Application() {
    return(
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<App/>}/>
                <Route path="about" element={<About/>}/>
            </Routes>
        </BrowserRouter>
    );
};

export default Application;