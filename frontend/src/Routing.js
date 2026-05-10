

import { Routes, Route } from "react-router-dom";


import Login from "./pages/Login";
import SearchHotel from "./pages/SearchHotel";
import Home from "./pages/Home";

const Routing = () => {

  return (

    <Routes>

      <Route path="/" element={<Home/>} />

      <Route path="/login" element={<Login />} />

      <Route path="/search" element={<SearchHotel />} />

    </Routes>

  );
};

export default Routing;