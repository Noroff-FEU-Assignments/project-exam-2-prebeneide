import axios from "axios";
import React, { useState, useEffect } from "react";
import { Container, Row, Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../../constants/api";
import LoadingSpinner from "../../components/common/LoadingSpinner";

const url = BASE_URL + "/api/inboxes";

function Inbox() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const redirect = (id) => {
    navigate(`/admin/inboxDetail/${id}`);
  };

  const getFormattedTime = (date) => {
    var d = new Date(date);
    var datestring = d.getHours() + ":" + d.getMinutes();

    return datestring;
  };

  const getFormattedDate = (date) => {
    var d = new Date(date);

    var datestring =
      d.getDate() + "-" + (d.getMonth() + 1) + "-" + d.getFullYear();

    return datestring;
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(url);
        setMessages(response.data.data);
      } catch (error) {
        setError(error.toString());
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

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
    <>
      <Container className="my-5">
        <Row>
          <h5 className="mb-5">Inbox</h5>
        </Row>

        <Table hover responsive="xl" className="messages-inbox__table">
          <thead className="messages-inbox__table--thead">
            <tr>
              <th>From</th>
              <th>Subject</th>
              <th>Email</th>
              <th>Date</th>
              <th>Time</th>
            </tr>
          </thead>
          <tbody className="messages-inbox__table--tbody">
            {messages.map((message) => {
              return (
                <tr onClick={() => redirect(message.id)} key={message.id}>
                  <td className="wider-td">{message.attributes.name}</td>
                  <td className="wider-td">{message.attributes.subject}</td>
                  <td className="wider-td">{message.attributes.email}</td>
                  <td>{getFormattedDate(message.attributes.createdAt)}</td>
                  <td>{getFormattedTime(message.attributes.createdAt)}</td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </Container>
    </>
  );
}

export default Inbox;
