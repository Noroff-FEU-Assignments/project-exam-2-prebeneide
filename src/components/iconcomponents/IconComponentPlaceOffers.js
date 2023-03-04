import React from "react";
import {
  FaCar,
  FaEye,
  FaKey,
  FaPaw,
  FaTv,
  FaWater,
  FaWifi,
} from "react-icons/fa";
import { TbToolsKitchen2 } from "react-icons/tb";
import { GiWashingMachine } from "react-icons/gi";
import { CgSmartHomeRefrigerator } from "react-icons/cg";

function IconComponentPlaceOffers({ type }) {
  console.log(type);
  if (type === "wifi") {
    return (
      <>
        <FaWifi className="icon-margin" />
        <span className="mx-5">Wifi</span>
      </>
    );
  } else if (type === "keybox") {
    return (
      <>
        <FaKey className="icon-margin" />
        <span className="mx-5">Key-box</span>
      </>
    );
  } else if (type === "tv") {
    return (
      <>
        <FaTv className="icon-margin" />
        <span className="mx-5">Tv</span>
      </>
    );
  } else if (type === "seanearby") {
    return (
      <>
        <FaWater className="icon-margin" />
        <span className="mx-5">Sea nearby</span>
      </>
    );
  } else if (type === "freeparking") {
    return (
      <>
        <FaCar className="icon-margin" />
        <span className="mx-5">Free parking</span>
      </>
    );
  } else if (type === "kitchen") {
    return (
      <>
        <TbToolsKitchen2 className="icon-margin" />
        <span className="mx-5">Kitchen</span>
      </>
    );
  } else if (type === "washingmachine") {
    return (
      <>
        <GiWashingMachine className="icon-margin" />
        <span className="mx-5">Washing machine</span>
      </>
    );
  } else if (type === "refrigerator") {
    return (
      <>
        <CgSmartHomeRefrigerator className="icon-margin" />
        <span className="mx-5">Refrigerator</span>
      </>
    );
  } else if (type === "niceview") {
    return (
      <>
        <FaEye className="icon-margin" />
        <span className="mx-5">Nice view</span>
      </>
    );
  } else if (type === "animalsallowed") {
    return (
      <>
        <FaPaw className="icon-margin" />
        <span className="mx-5">Animals allowed</span>
      </>
    );
  }
}

export default IconComponentPlaceOffers;
