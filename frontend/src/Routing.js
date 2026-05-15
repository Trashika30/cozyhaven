import { Route, Routes } from "react-router-dom";
import EditRoomPage from "./child_components/EditRoomPage";
import Home from "./parent_components/Home";
import OwnerDash from "./parent_components/OwnerDash";
import OwnerSignUp from "./parent_components/OwnerSignUp";
import SearchHotel from "./parent_components/SearchHotel";
import UserBooking from "./parent_components/UserBookings";
import ViewHotel from "./parent_components/ViewHotel";
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
      <Route path="/viewHotel/:id" element={<ViewHotel />} />
      <Route path="/ownerdash" element={<OwnerDash />} />
      <Route path="/editroom/:id" element={<EditRoomPage />} />
      <Route path="/booking/:userId" element={<UserBooking />} />
    </Routes>
  );
};

export default Routing;
