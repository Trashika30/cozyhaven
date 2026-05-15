import { Route, Routes } from "react-router-dom";
import Home from "./parent_components/Home";

import SearchHotel from "./parent_components/SearchHotel";

import ViewHotel from "./parent_components/ViewHotel";
import OwnerDash from "./parent_components/OwnerDash";
import EditRoomPage from "./child_components/EditRoomPage";
import UserProfile from "./parent_components/UserProfile";
import OwnerSignUp from "./parent_components/OwnerSignUp";
import CustomerSignUp from "./parent_components/CustomerSignUp";
import SignIn from "./parent_components/SignIn";

const Routing = () => {

  return (
    <Routes>
       <Route path="/" element={<Home />} />

      <Route path="/ownerSignUp" element={<OwnerSignUp />} />
      <Route path="/customerSignUp" element={<CustomerSignUp />} />
      <Route path="/signIn" element={<SignIn />} />
     
      <Route path="/search" element={<SearchHotel />} />
      <Route path="/viewHotel/:hotelId" element={<ViewHotel/>}/>
      <Route path="/ownerdash" element={<OwnerDash/>}/>
      <Route path="/editroom/:id" element={<EditRoomPage/>}/>
      <Route path="/userProfile" element={<UserProfile/>}/>
    </Routes>
  );
};

export default Routing;