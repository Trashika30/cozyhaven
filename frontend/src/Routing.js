import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import SearchHotel from "./pages/SearchHotel";
import SignUp from "./pages/SignUp";

const Routing = () => {

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/signUp" element={<SignUp />} />
      <Route path="/login" element={<Login />} />
      <Route path="/search" element={<SearchHotel />} />
    </Routes>
  );
};

export default Routing;