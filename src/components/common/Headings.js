import React from "react";
import Row from "react-bootstrap/Row";

export const H6Heading = ({ text }) => {
    return <h6 className="mt-3 mb-2">{text}</h6>
}

export const H5Heading = ({ text }) => {
    return <h5 className="mt-5 mx-3">{text}</h5>
}

export const H5Heading_1 = ({ text }) => {
    return <h5 className="mt-5">{text}</h5>
}

export const BlueH5Heading = ({ text}) => {
    return <h5 className="mt-5 mx-3">{text}</h5>
}

export const PageSubHeading = ({text}) => {
    return <Row><h4 className="px-4">{text}</h4></Row>
}

export const Label = ({text}) => {
    return <h6 className="mt-2 mb-2">{text}</h6>
}

export const EnquiryDetailHeading = ({text}) => {
    return <h5 className="my-5">{text}</h5>
}
