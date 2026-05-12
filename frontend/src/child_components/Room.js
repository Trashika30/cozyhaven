import React from 'react';
import { Card } from 'antd';
const { Meta } = Card;
const Room= ({obj}) => (
  <Card
    hoverable
    style={{ width: 240 }}
    cover={
      <img
        draggable={false}
        alt="example"
        src={URL.createObjectURL(obj.pic)}
      />
    }
  >
    
    <p>RoomNo: {obj.roomNo}</p>
    <p>Rent per day: {obj.rent}</p>
    <p>Maximum allowance:  {obj.max}</p>
 
  </Card>
);
export default Room;