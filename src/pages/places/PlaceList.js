import { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import { BASE_URL, PLACES_API, POPULATE } from "../../constants/api";
import PlaceItem from "./PlaceItem";
import LoadingSpinner from "../../components/common/LoadingSpinner";

function PlaceList() {
  const [places, setPlaces] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(function () {
    async function fetchData() {
      try {
        const response = await fetch(BASE_URL + PLACES_API + POPULATE);

        if (response.ok) {
          const json = await response.json();
          console.log(json.data);
          setPlaces(json.data);
        } else {
          setError("A server error occured");
        }
      } catch (error) {
        setError(error.toString());
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <div>An error occured: {error}</div>;
  }

  return (
    <Container>
      <Row xs={1} md={2} lg={3} xl={4}>
        {places.map(function (place) {
          return (
            <PlaceItem
              id={place.id}
              key={place.id}
              name={place?.attributes.name}
              image={place?.attributes.coverimage.data?.attributes.url}
              rating={place.attributes.ratingdecimal}
              people={place?.attributes.howmanypeople}
              price={place?.attributes.price}
              area={place?.attributes.area}
            />
          );
        })}
      </Row>
    </Container>
  );
}

export default PlaceList;
