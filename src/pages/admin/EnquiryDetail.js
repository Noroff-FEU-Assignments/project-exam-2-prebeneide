import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { BASE_URL, ENQUIRIES, POPULATE } from "../../constants/api";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import LoadingSpinner from "../../components/common/LoadingSpinner";
import BackLink from "../../components/common/BackLink";
import { FaStar } from "react-icons/fa";

function EnquiryDetail() {
  const { id } = useParams();

  const url = BASE_URL + ENQUIRIES + "/" + id + POPULATE;

  const [data, setData] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(
    function () {
      async function fetchData() {
        try {
          const response = await axios.get(url);
          setData(response.data.data);
          console.log(response.data.data);
        } catch (error) {
          setError(error.toString());
        } finally {
          setLoading(false);
        }
      }
      fetchData();
    },
    [url]
  );

  if (loading) {
    return (
      <>
        <LoadingSpinner />
      </>
    );
  }

  if (error) {
    return <p>Something went wrong</p>;
  }

  const getFormattedDate = (date) => {
    var d = new Date(date);

    var datestring =
      d.getDate() + "-" + (d.getMonth() + 1) + "-" + d.getFullYear();

    return datestring;
  };

  return (
    <>
      <Container className="mt-5 px-4">
        <BackLink title="Back to enquiries" />
        <Row>
          <h2 className="mb-2">Enquiry</h2>
          <h4 className="mb-4">Customers booking request details</h4>
        </Row>
      </Container>

      <Container className="px-5" style={{ paddingBottom: 100 }}>
        <Row className="enquiry-detail">
          <Col xs={12} sm={12} md={6}>
            <h5 className="my-5">Hotel / BnB / Guesthouse</h5>
            <Row className="enquiry-detail__selectedproductinfo--box mx-1">
              <Col xs={12} sm={12} md={6}>
                <div className="enquiry-detail__selectedproductinfo--image">
                  <img
                    src={data.attributes.establishmentCoverImage}
                    alt="Chosen Hotel / BnB / Guesthouse"
                  />
                </div>
              </Col>
              <Col
                xs={12}
                sm={8}
                md={6}
                className="enquiry-detail__selectedproductinfo--textdiv"
              >
                <div className="enquiry-detail__selectedproductinfo--row">
                  <span>{data.attributes.establishmentName}</span>
                  <span>{data.attributes.establishmentArea}</span>
                </div>
                <div className="enquiry-detail__selectedproductinfo--row">
                  <span>
                    {data.attributes.establishmentRatingDecimal}
                    <FaStar className="icon-margin" />
                  </span>
                  <span>
                    {data.attributes.establishmentPriceNumber} kr night
                  </span>
                </div>
              </Col>
            </Row>

            <Row>
              <Col xs={6} sm={6} md={6}>
                <h6 className="mt-5 mb-2">Check in</h6>
                {getFormattedDate(data.attributes.checkinDateTime)}
              </Col>
              <Col xs={6} sm={6} md={6}>
                <h6 className="mt-5 mb-2">Check out</h6>
                {getFormattedDate(data.attributes.checkoutDateTime)}
              </Col>
            </Row>

            <Row>
              <Col xs={6} sm={6} md={6}>
                <h6 className="mt-5 mb-2">Nights</h6>
                {data.attributes.daysNumber}
              </Col>
              <Col xs={6} sm={6} md={6}>
                <h6 className="mt-5 mb-2">Guests</h6>
                {data.attributes.guests}
              </Col>
            </Row>

            <Row>
              <Col xs={6} sm={6} md={6}>
                <h6 className="mt-5 mb-2">Total Price (NOK) </h6>
                {data.attributes.priceNumber} kr
              </Col>
              <Col xs={6} sm={6} md={6}>
                <h6 className="mt-5 mb-2">Holidaze Earnings</h6>
                150 kr
              </Col>
            </Row>
          </Col>

          <Col xs={12} sm={12} md={6}>
            <h5 className="my-5">Customer personal information</h5>
            <Row>
              <Col xs={6} sm={6} md={6}>
                <h6 className="mb-1">Firstname</h6>
                {data.attributes.firstName}
              </Col>
              <Col xs={6} sm={6} md={6}>
                <h6 className="mb-1">Lastname</h6>
                {data.attributes.lastName}
              </Col>
            </Row>
            <Row className="my-5">
              <Col xs={6} sm={6} md={6}>
                <h6 className="mb-1">Address</h6>
                {data.attributes.address}
              </Col>
            </Row>
            <Row className="my-5">
              <Col xs={6} sm={6} md={6}>
                <h6 className="mb-1">Postal Code</h6>
                {data.attributes.postalCode}
              </Col>
              <Col xs={6} sm={6} md={6}>
                <h6 className="mb-1">City</h6>
                {data.attributes.city}
              </Col>
            </Row>
            <Row className="my-5">
              <Col xs={6} sm={6} md={6}>
                <h6 className="mb-1">Country</h6>
                {data.attributes.country}
              </Col>
            </Row>
            <Row className="my-5">
              <Col xs={6} sm={6} md={6}>
                <h6 className="mb-1">Email</h6>
                {data.attributes.email}
              </Col>
            </Row>
            <Row className="my-5">
              <Col xs={6} sm={6} md={6}>
                <h6 className="mb-1">Phonenumber</h6>
                {data.attributes.phoneNumber}
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default EnquiryDetail;
