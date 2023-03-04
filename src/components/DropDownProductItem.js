import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { FaBed, FaStar } from "react-icons/fa";

function DropDownProductItem({ data }) {
  return (
    <>
      <Row>
        <Col className="navbar__search--dropdown-image">
          <img
            alt="Hotel,BnB,Guesthouse"
            src={data.attributes.coverimage.data.attributes.url}
          />
        </Col>
        <Col className="navbar__search--dropdown-infocolumn">
          <Row>
            <Col>
              <p className="card__text--name">{data.attributes.name}</p>
            </Col>
          </Row>
          <Row>
            <Col>
              <p className="card__text--people">
                <FaBed className="icon-margin" />
                {data.attributes.howmanypeople}
              </p>
            </Col>
            <Col>
              <p className="card__text--rating">
                {data.attributes.ratingdecimal}
                <FaStar className="icon-margin" />
              </p>
            </Col>
          </Row>
          <Row>
            <Col>
              <p className="card__text--price">{data.attributes.price} kr</p>
            </Col>
            <Col>
              <p className="card__text--area">{data.attributes.area}</p>
            </Col>
          </Row>
        </Col>
      </Row>
    </>
  );
}

export default DropDownProductItem;
