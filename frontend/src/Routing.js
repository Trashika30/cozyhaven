import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import SearchHotel from "./pages/SearchHotel";
import SignUp from "./pages/SignUp";
import ViewHotel from "./pages/ViewHotel";

const Routing = () => {

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/signUp" element={<SignUp />} />
      <Route path="/login" element={<Login />} />
      <Route path="/search" element={<SearchHotel />} />
      <Route path="/viewHotel" element={<ViewHotel/>}/>
    </Routes>
  );
};

export default Routing;