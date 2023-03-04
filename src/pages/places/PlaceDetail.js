import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { BASE_URL, PLACES_API, POPULATE } from "../../constants/api";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import { LinkContainer } from "react-router-bootstrap";
import { Carousel } from "react-bootstrap";
import IconComponentPlaceOffers from "../../components/iconcomponents/IconComponentPlaceOffers";
import LoadingSpinner from "../../components/common/LoadingSpinner";
import BackLink from "../../components/common/BackLink";
import {
  FaBed,
  FaClock,
  FaDoorOpen,
  FaExclamation,
  FaExclamationTriangle,
  FaPaw,
  FaSmokingBan,
  FaStar,
  FaToilet,
} from "react-icons/fa";
import { GiAlarmClock, GiPerson } from "react-icons/gi";
import { MdSensors } from "react-icons/md";
import { AiOutlineCloudServer } from "react-icons/ai";

function PlaceDetail() {
  const [place, setPlace] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  let navigate = useNavigate();

  const { id } = useParams();

  if (!id) {
    navigate("/");
  }

  const url = BASE_URL + PLACES_API + "/" + id + POPULATE;

  useEffect(
    function () {
      async function fetchData() {
        try {
          const response = await fetch(url);

          if (response.ok) {
            const json = await response.json();
            console.log(json.data);
            setPlace(json.data);
          } else {
            setError("An error occured when loading data");
          }
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
    return <LoadingSpinner />;
  }

  if (error) {
    return <div>An error occured: {error}</div>;
  }

  return (
    <Container className="mt-5 px-md-2" style={{ paddingBottom: 150 }}>
      <BackLink title="Back to home" />

      <Row>
        <Col xs={12} sm={12} md={12} className="d-flex justify-content-between">
          <h5 className="product__detail--name mb-3">
            {place.attributes.name}
          </h5>
          <span>
            {place.attributes.ratingdecimal}
            <FaStar />
          </span>
        </Col>
      </Row>

      <Row className="product__detail--image-div-large-screen">
        <Col
          xs={12}
          sm={12}
          md={12}
          lg={6}
          className="product__detail--coverimage"
        >
          <img
            alt={place.attributes.coverimage.data.attributes.alternativeText}
            src={place.attributes.coverimage.data.attributes.url}
          />
        </Col>
        <Col xs={12} sm={12} md={12} lg={6}>
          <Row>
            <Col
              xs={6}
              sm={6}
              md={6}
              className="product__detail--rowimage pb-2"
            >
              <img
                alt={place.attributes.image2.data.attributes.alternativeText}
                src={place.attributes.image2.data.attributes.url}
              />
            </Col>
            <Col
              xs={6}
              sm={6}
              md={6}
              className="product__detail--rowimage pb-2"
            >
              <img
                alt={place.attributes.image3.data.attributes.alternativeText}
                src={place.attributes.image3.data.attributes.url}
              />
            </Col>
          </Row>
          <Row>
            <Col
              xs={6}
              sm={6}
              md={6}
              className="product__detail--rowimage pt-2"
            >
              <img
                alt={place.attributes.image4.data.attributes.alternativeText}
                src={place.attributes.image4.data.attributes.url}
              />
            </Col>
            <Col
              xs={6}
              sm={6}
              md={6}
              className="product__detail--rowimage pt-2"
            >
              <img
                alt={place.attributes.image5.data.attributes.alternativeText}
                src={place.attributes.image5.data.attributes.url}
              />
            </Col>
          </Row>
        </Col>
      </Row>

      <Row className="product__detail--image-div-small-screen">
        <Carousel>
          <Carousel.Item className="product__detail--image-div-small-screen-image">
            <img
              className="d-block w-100"
              src={place.attributes.coverimage.data.attributes.url}
              alt="Cover"
            />
          </Carousel.Item>
          <Carousel.Item className="product__detail--image-div-small-screen-image">
            <img
              className="d-block w-100"
              src={place.attributes.image2.data.attributes.url}
              alt="2"
            />
          </Carousel.Item>
          <Carousel.Item className="product__detail--image-div-small-screen-image">
            <img
              className="d-block w-100"
              src={place.attributes.image3.data.attributes.url}
              alt="3"
            />
          </Carousel.Item>
          <Carousel.Item className="product__detail--image-div-small-screen-image">
            <img
              className="d-block w-100"
              src={place.attributes.image4.data.attributes.url}
              alt="4"
            />
          </Carousel.Item>
          <Carousel.Item className="product__detail--image-div-small-screen-image">
            <img
              className="d-block w-100"
              src={place.attributes.image5.data.attributes.url}
              alt="5"
            />
          </Carousel.Item>
        </Carousel>
      </Row>

      <Row className="my-2">
        <Col
          xs={12}
          sm={12}
          md={12}
          lg={6}
          className="product__detail--amenities-column my-3"
        >
          <span>
            {place.attributes.howmanypeople} people{" "}
            <GiPerson className="icon-margin" />
          </span>
          <span>
            {place.attributes.howmanybedrooms} bedrooms{" "}
            <FaDoorOpen className="icon-margin" />
          </span>
          <span>
            {place.attributes.howmanybeds} beds{" "}
            <FaBed className="icon-margin" />
          </span>
          <span>
            {place.attributes.howmanybathrooms} bathrooms{" "}
            <FaToilet className="icon-margin" />
          </span>
        </Col>
        <Col
          xs={12}
          sm={12}
          md={12}
          lg={6}
          className="product__detail--price-column my-3"
        >
          <span className="product__detail--price">
            {place.attributes.price} kr night
          </span>
        </Col>
        <Col
          xs={12}
          sm={12}
          md={12}
          lg={6}
          className="product__detail--bookbutton-column-small-screen text-center my-3"
        >
          <LinkContainer to={`/sendEnquiry/${place.id}`}>
            <button className="btn__holidaze--primary">Book</button>
          </LinkContainer>
        </Col>
      </Row>

      <Row className="mt-5">
        <Col xs={12} sm={12} md={12} lg={6} className="d-flex flex-column">
          <h4 className="mb-2">About this place</h4>
          <p>{place.attributes.generalabouttext}</p>

          <h6 className="mb-2">The place</h6>
          <p>{place.attributes.theplacetext}</p>

          <h6 className="mb-2">Guest access</h6>
          <p>{place.attributes.guestaccesstext}</p>

          <h6 className="mb-2">Other things worth noting</h6>
          <p>{place.attributes.otherthingsworthnotingtext}</p>

          <Row>
            <h4>This place offers</h4>
          </Row>

          <Row>
            {Object.keys(place.attributes)
              .filter((i) => place.attributes[i] === true)
              .map((icons) => {
                return (
                  <Row>
                    <Col className="my-2">
                      <IconComponentPlaceOffers type={icons} />
                    </Col>
                  </Row>
                );
              })}
          </Row>

          <Row className="mt-lg-4 display-sm-none">
            <Col xs={12} sm={12} md={12} className="d-flex flex-column">
              <Col>
                <h5>Good to know</h5>
              </Col>
              <Row>
                <Col xs={12} sm={12} md={12} lg={6}>
                  <Col xs={12} sm={12} md={12} lg={12} className="my-2">
                    <h6>Rules</h6>
                  </Col>
                  <Col xs={12} sm={12} md={12} lg={12} className="my-3">
                    <FaClock className="icon-margin" />
                    <span className="mx-4">
                      Check-in: After {place.attributes.checkintimeaftertext}
                    </span>
                  </Col>
                  <Col xs={12} sm={12} md={12} lg={12} className="my-3">
                    <GiAlarmClock className="icon-margin" />
                    <span className="mx-4">
                      Check-out: {place.attributes.checkouttimetext}
                    </span>
                  </Col>
                  {place.attributes.nosmoking && (
                    <Col xs={12} sm={12} md={12} lg={12} className="my-3">
                      <FaSmokingBan className="icon-margin" />
                      <span className="mx-4">No smoking</span>
                    </Col>
                  )}
                  {place.attributes.nopartiesorevents && (
                    <Col xs={12} sm={12} md={12} lg={12} className="my-3">
                      <FaBed className="icon-margin" />
                      <span className="mx-4">No parties or events</span>
                    </Col>
                  )}
                  {place.attributes.rulesanimalsallowed && (
                    <Col xs={12} sm={12} md={12} lg={12} className="my-3">
                      <FaPaw className="icon-margin" />
                      <span className="mx-4">Animals allowed</span>
                    </Col>
                  )}
                </Col>
                <Col xs={12} sm={12} md={12} lg={6}>
                  <Col className="my-2">
                    <h6>Health and Safety</h6>
                  </Col>
                  {place.attributes.nearbylakeriverwater && (
                    <Col className="my-3">
                      <FaExclamation className="icon-margin" />
                      <span className="mx-4">Nearby lake, river or water</span>
                    </Col>
                  )}
                  {place.attributes.heightwithoutrailingsorsafety && (
                    <Col className="my-3">
                      <FaExclamationTriangle className="icon-margin" />
                      <span className="mx-4">
                        Height without railings or safety
                      </span>
                    </Col>
                  )}
                  {place.attributes.carbonmonoxidealarm && (
                    <Col className="my-3">
                      <MdSensors className="icon-margin" />

                      <span className="mx-4">Carbon monoxide alarm</span>
                    </Col>
                  )}
                  {place.attributes.smokedetector && (
                    <Col className="my-3">
                      <AiOutlineCloudServer className="icon-margin" />

                      <span className="mx-4">Smoke detector</span>
                    </Col>
                  )}
                </Col>
              </Row>
            </Col>
          </Row>
        </Col>
        <Col
          xs={12}
          sm={6}
          md={6}
          className="product__detail--bookbutton-column-large-screen text-center mt-2"
        >
          <LinkContainer to={`/sendEnquiry/${place.id}`}>
            <button className="btn__holidaze--primary">Book</button>
          </LinkContainer>
        </Col>
      </Row>
      <Row className="mt-4">
        <Col xs={12} sm={6} md={6} className="d-flex flex-column">
          <h4 className="mb-2">Cancellation terms</h4>
          <p>{place.attributes.cancellationterms}</p>
        </Col>
      </Row>
    </Container>
  );
}

export default PlaceDetail;
