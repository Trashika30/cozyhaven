// OwnerDash.jsx

import {useState} from "react";
import AddRoom from "../child_components/AddRoom";
import EditRoom from "../child_components/EditRoom";

const OwnerDash=()=>{
//dummy data
const [roomlist,setRoomlist]=useState([

{
roomId:101,
roomType:"Grand Seaside Resort",
maxOccupy:3,
baseFare:3000,
ac:true,
available:true,
hotelId:1,
location:"Goa",
imageUrl:"https://images.unsplash.com/photo-1566073771259-6a8506099945"
},

{
roomId:102,
roomType:"City View Hotel",
maxOccupy:2,
baseFare:2000,
ac:false,
available:true,
hotelId:2,
location:"Chennai",
imageUrl:"https://images.unsplash.com/photo-1522708323590-d24dbb6b0267"
}

]);

const updateRoom=(updatedRoom)=>{

     const updatedList=roomlist.map((room)=>{

     if(room.roomId===updatedRoom.roomId){

    return updatedRoom;
    }
return room;

}); setRoomlist(updatedList);

}

const deleteRoom=(id)=>{

   const filteredRooms=roomlist.filter((room)=>room.roomId!==id);

  setRoomlist(filteredRooms);

}

return(

<div
style={{
padding:"30px",
background:"#f6f3f7",
minHeight:"100vh"
}}
>

<div
style={{
display:"grid",
gridTemplateColumns:"repeat(auto-fit,minmax(350px,1fr))",
gap:"25px"
}}
>

{
roomlist.map((room)=>

<EditRoom
key={room.roomId}
room={room}
deleteRoom={deleteRoom}
/>

)
}

</div>

</div>

)

}

export default OwnerDash;