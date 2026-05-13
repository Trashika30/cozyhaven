import { Route, Routes } from "react-router-dom";
import Home from "./parent_components/Home";
import Login from "./parent_components/Login";
import SearchHotel from "./parent_components/SearchHotel";
import SignUp from "./parent_components/SignUp";
import ViewHotel from "./parent_components/ViewHotel";
import OwnerDash from "./parent_components/OwnerDash";
import EditRoomPage from "./child_components/EditRoomPage";

const Routing = () => {

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/signUp" element={<SignUp />} />
      <Route path="/login" element={<Login />} />
      <Route path="/search" element={<SearchHotel />} />
      <Route path="/viewHotel" element={<ViewHotel/>}/>
      <Route path="/ownerdash" element={<OwnerDash/>}/>
      <Route path="/editroom/:id" element={<EditRoomPage/>}/>
    </Routes>
  );
};

export default Routing;