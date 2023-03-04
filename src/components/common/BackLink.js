import PropTypes from "prop-types";
import { Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { FaAngleLeft } from "react-icons/fa";

export default function BackLink({ title }) {
  const navigate = useNavigate();
  return (
    <Row xs={12} sm={12} md={12} lg={12}>
      <h6 className="mb-5 cursor-pointer" onClick={() => navigate(-1)}>
        <span>
          <FaAngleLeft />
          {title}
        </span>
      </h6>
    </Row>
  );
}

BackLink.propTypes = {
  title: PropTypes.string.isRequired,
};