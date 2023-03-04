import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Table } from "react-bootstrap";
import { BASE_URL } from "../../constants/api";
import { PageSubHeading } from "../../components/common/Headings";
import LoadingSpinner from "../../components/common/LoadingSpinner";
import { FaStar } from "react-icons/fa";

const url = BASE_URL + "/api/enquiries";

function Enquiries() {
  const navigate = useNavigate();
  const redirect = function (id) {
    navigate(`/admin/enquiries/details/${id}`);
  };

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(function () {
    async function fetchData() {
      try {
        const response = await axios.get(url);
        setData(response.data.data);
      } catch (error) {
        setError(error.toString());
      } finally {
        setLoading(false);
      }
    }
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

  const getFormattedDate = (date) => {
    var d = new Date(date);

    var datestring =
      d.getDate() + "-" + (d.getMonth() + 1) + "-" + d.getFullYear();

    return datestring;
  };

  return (
    <Container className="my-5" style={{ paddingBottom: 100 }}>
      <PageSubHeading text="Enquiries" />
      <Table hover responsive="xl" className="enquiries-inbox__table">
        <thead className="enquiries-inbox__table--thead">
          <tr>
            <th>Hotel/BnB/Guesthouse</th>
            <th>Check In</th>
            <th>Check Out</th>
            <th>Nights</th>
            <th>Guests</th>
            <th>Total Price</th>
            <th>Enquiry Date</th>
            <th>Firstname</th>
            <th>Lastname</th>
          </tr>
        </thead>
        <tbody className="enquiries-inbox__table--tbody">
          {data.map(function (enquiries) {
            return (
              <tr onClick={() => redirect(enquiries.id)} key={enquiries.id}>
                <td className="enquiries-inbox__table--productdetails-div">
                  <div className="enquiries-inbox__table--product-image">
                    <img
                      src={enquiries.attributes.establishmentCoverImage}
                      alt={"Hotelimage"}
                    />
                  </div>
                  <div className="enquiries-inbox__table--product-info">
                    <span>{enquiries.attributes.establishmentName}</span>
                    <span>{enquiries.attributes.establishmentArea} </span>
                    <span>
                      {enquiries.attributes.establishmentRatingDecimal}
                      <FaStar className="icon-margin" />
                    </span>
                    <span>{enquiries.attributes.establishmentPeople} </span>
                    <span>
                      {enquiries.attributes.establishmentPriceNumber} kr night
                    </span>
                  </div>
                </td>
                <td>
                  {getFormattedDate(enquiries.attributes.checkinDateTime)}
                </td>
                <td>
                  {getFormattedDate(enquiries.attributes.checkoutDateTime)}
                </td>
                <td>{enquiries.attributes.daysNumber} nights</td>
                <td>{enquiries.attributes.guests} guests</td>

                <td>{enquiries.attributes.priceNumber} kr</td>
                <td>{getFormattedDate(enquiries.attributes.createdAt)}</td>

                <td>{enquiries.attributes.firstName}</td>
                <td>{enquiries.attributes.lastName}</td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </Container>
  );
}

export default Enquiries;
