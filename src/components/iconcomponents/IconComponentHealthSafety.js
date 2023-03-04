import React from "react";

function IconComponentHealthSafety({ type }) {
  console.log(type);
  if (type === "nearbylakeriverwater") {
    return (
      <>
        <faDiamondExclamation className="icon-margin" />
        <span className="mx-5">Nearby lake, river, water</span>
      </>
    );
  } else if (type === "heightwithoutrailingsorsafety") {
    return (
      <>
        <faTriangleExclamation className="icon-margin" />
        <span className="mx-5">Height without railings or safety</span>
      </>
    );
  } else if (type === "carbonmonoxidealarm") {
    return (
      <>
        <faSensorOn className="icon-margin" />
        <span className="mx-5">Carbon monoxide alarm</span>
      </>
    );
  } else if (type === "smokedetectoralarm") {
    return (
      <>
        <faSensorCloud className="icon-margin" />
        <span className="mx-5">Smoke detector</span>
      </>
    );
  }
}

export default IconComponentHealthSafety;
