import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { BASE_URL } from "../../constants/api";
import { useParams } from "react-router-dom";
import axios from "axios";
import LoadingSpinner from "../../components/common/LoadingSpinner";
import BackLink from "../../components/common/BackLink";

function InboxDetail() {
  const { id } = useParams();
  const url = BASE_URL + `/api/inboxes/${id}`;

  const [message, setMessage] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(url);
        setMessage(response.data.data);
      } catch (error) {
        setError(error.toString());
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [url]);

  const getFormattedDate = (date) => {
    var d = new Date(date);

    var datestring =
      d.getDate() + "-" + (d.getMonth() + 1) + "-" + d.getFullYear();

    return datestring;
  };
  const getFormattedTime = (date) => {
    var d = new Date(date);
    var datestring = d.getHours() + ":" + d.getMinutes();

    return datestring;
  };

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

  return (
    <Container className="mt-5" style={{ paddingBottom: 50 }}>
      <BackLink title="Back to inbox" />
      <Row className="mb-5">
        <h5>Message</h5>
      </Row>
      <Row className="my-md-3 mx-md-5">
        <Col xs={4} sm={4} md={3} className="px-md-5">
          <h6 className="mb-2">From</h6>
        </Col>
        <Col xs={8} sm={8} md={3} className="px-md-5">
          <span>{message.attributes.name}</span>
        </Col>
        <Col xs={4} sm={4} md={3} className="px-md-5">
          <h6 className="mb-4">Email</h6>
        </Col>
        <Col xs={8} sm={8} md={3} className="px-md-4">
          <span>{message.attributes.email}</span>
        </Col>
      </Row>

      <Row className="my-md-3 mx-md-5">
        <Col xs={4} sm={4} md={3} className="px-md-5">
          <h6 className="mb-2">Subject</h6>
        </Col>
        <Col xs={8} sm={8} md={3} className="px-md-5">
          <span>{message.attributes.subject}</span>
        </Col>
        <Col xs={4} sm={4} md={3} className="px-md-5">
          <h6>Date</h6>
        </Col>
        <Col xs={8} sm={8} md={3} className="px-md-3 px-xs-5">
          <span>{getFormattedDate(message.attributes.createdAt)}</span>
        </Col>
      </Row>
      <Row className="my-md-3 mx-md-5">
        <Col xs={4} sm={4} md={3} className="px-md-5">
          <h6 className="mb-2">Time</h6>
        </Col>
        <Col xs={8} sm={8} md={3}>
          <span>{getFormattedTime(message.attributes.createdAt)}</span>
        </Col>
      </Row>
      <Row className="my-md-3 mx-md-5">
        <Col xs={12} sm={12} md={12} className="px-md-5">
          <h6 className="mb-4">Message</h6>
          <Col xs={12} sm={12} md={12} className="">
            <span>{message.attributes.message}</span>
          </Col>
        </Col>
      </Row>
    </Container>
  );
}

export default InboxDetail;
