import React from "react";
import { FaBan, FaClock, FaSmokingBan } from "react-icons/fa";
import { BsAlarm } from "react-icons/bs";

function IconComponentRules({ type }) {
  console.log(type);
  if (type === "checkintime") {
    return (
      <>
        <FaClock className="icon-margin" />
        <span className="mx-5">Check-in time: After</span>
      </>
    );
  } else if (type === "checkouttime") {
    return (
      <>
        <BsAlarm />
        <span className="mx-5">Check-out time:</span>
      </>
    );
  } else if (type === "nosmoking") {
    return (
      <>
        <FaSmokingBan className="icon-margin" />
        <span className="mx-5">No smoking</span>
      </>
    );
  } else if (type === "nopartiesorevents") {
    return (
      <>
        <FaBan className="icon-margin" />
        <span className="mx-5">No parties or events</span>
      </>
    );
  }
}

export default IconComponentRules;
