import { useState } from "react";
import { BASE_URL, PLACES_API, POPULATE } from "../../constants/api";
import { useForm } from "react-hook-form";
import FormErrorMessage from "../../components/common/FormErrorMessage";
import { useAuth } from "../../context/AuthContext";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import { useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import IconComponentPlaceOffers from "../../components/iconcomponents/IconComponentPlaceOffers";
import IconComponentHealthSafety from "../../components/iconcomponents/IconComponentHealthSafety";
import IconComponentRules from "../../components/iconcomponents/IconComponentRules";
import {
  BlueH5Heading,
  H6Heading,
  PageSubHeading,
  H5Heading,
} from "../../components/common/Headings";
import { FaBed, FaDoorOpen, FaStar, FaToilet } from "react-icons/fa";
import { GiPerson } from "react-icons/gi";

const schema = yup.object().shape({
  name: yup
    .string()
    .required("Please fill in name")
    .min(5, "Name must contain over 5 characters"),
  area: yup
    .string()
    .required("Please fill in area")
    .min(2, "Area must contain over 2 characters"),
  generalabouttext: yup
    .string()
    .required("Please fill in the general about text")
    .min(25, "This text must contain over 25 characters"),
  theplacetext: yup
    .string()
    .required("Please fill in the place text")
    .min(25, "This text must contain over 25 characters"),
  guestaccesstext: yup
    .string()
    .required("Please fill in the guest access text")
    .min(25, "This text must contain over 25 characters"),
  otherthingsworthnotingtext: yup
    .string()
    .required("Please fill in the this text")
    .min(15, "This text must contain over 15 characters"),
  cancellationterms: yup
    .string()
    .required("Please fill in the cancellation terms")
    .min(15, "This text must contain over 15 characters"),
  checkintimeaftertext: yup
    .string()
    .required("Please fill in the check in after time"),
  checkouttimetext: yup.string().required("Please fill in the check out time"),
  howmanypeople: yup
    .string()
    .required("Please fill in how many people(guests)"),
  howmanybedrooms: yup.string().required("Please fill in how many bedrooms"),
  howmanybeds: yup.string().required("Please fill in how many beds"),
  howmanybathrooms: yup.string().required("Please fill in how many bathrooms"),
  ratingdecimal: yup.string().required("Please fill in rating"),
  price: yup.string().required("Please fill in the price"),
});

function Addplace() {
  const navigate = useNavigate();

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [submitSuccessfull, setSubmitSuccessfull] = useState(false);

  const {
    register,
    handleSubmit,

    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const [auth] = useAuth();

  async function onSubmitHandler(data, e) {
    setSubmitting(true);
    setError(null);

    const url = BASE_URL + PLACES_API + POPULATE;

    const formData = new FormData();

    const dataApp = JSON.stringify({
      name: data.name,
      area: data.area,
      generalabouttext: data.generalabouttext,
      theplacetext: data.theplacetext,
      guestaccesstext: data.guestaccesstext,
      otherthingsworthnotingtext: data.otherthingsworthnotingtext,
      cancellationterms: data.cancellationterms,
      nearbylakeriverwater: data.nearbylakeriverwater,
      heightwithoutrailingsorsafety: data.heightwithoutrailingsorsafety,
      carbonmonoxidealarm: data.carbonmonoxidealarm,
      smokedetector: data.smokedetector,
      wifi: data.wifi,
      keybox: data.keybox,
      tv: data.tv,
      refrigerator: data.refrigerator,
      washingmachine: data.washingmachine,
      seanearby: data.seanearby,
      niceview: data.niceview,
      freeparking: data.freeparking,
      kitchen: data.kitchen,
      nosmoking: data.nosmoking,
      nopartiesorevents: data.nopartiesorevents,
      checkintimeaftertext: data.checkintimeaftertext,
      checkouttimetext: data.checkouttimetext,
      howmanypeople: data.howmanypeople,
      howmanybedrooms: data.howmanybedrooms,
      howmanybathrooms: data.howmanybathrooms,
      howmanybeds: data.howmanybeds,
      ratingdecimal: data.ratingdecimal,
      price: data.price,
    });

    formData.append("files.coverimage", data.coverimage[0]);
    formData.append("files.image2", data.image2[0]);
    formData.append("files.image3", data.image3[0]);
    formData.append("files.image4", data.image4[0]);
    formData.append("files.image5", data.image5[0]);
    formData.append("data", dataApp);

    const options = {
      method: "POST",
      body: formData,
      headers: {
        Authorization: `Bearer ${auth}`,
      },
    };

    try {
      const response = await fetch(url, options);
      const json = await response.json();
      console.log(json);
      e.target.reset();
      setSubmitSuccessfull(json);
      navigate("/admin/place/added");
    } catch (error) {
      console.log("error, invalid inputs", error);
      setError(error.toString());
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <Container
      className="add-place__container mt-5"
      style={{ paddingBottom: 200 }}
    >
      <PageSubHeading text="Add new place" />
      <Form onSubmit={handleSubmit(onSubmitHandler)}>
        <fieldset disabled={submitting}>
          <Row className="add-place__container--main-row mx-3">
            <Col className="px-3" xs={12} sm={12} md={12} lg={6}>
              <BlueH5Heading text="About this place" />
              <Row className="mx-1">
                <H6Heading text="Name" />
                <Col xs={12} sm={12} md={12}>
                  <input
                    placeholder="Name"
                    type="text"
                    {...register("name", { required: true })}
                    className="inputs input__borderradius--small"
                  />
                  <div className="form__errormessage--contactform-right">
                    {errors.name && (
                      <FormErrorMessage>{errors.name.message}</FormErrorMessage>
                    )}
                  </div>
                </Col>
              </Row>
              <Row className="mx-1 mb-2">
                <H6Heading text="Area" />
                <Col xs={12} sm={12} md={12}>
                  <input
                    placeholder="Area"
                    type="text"
                    {...register("area", { required: true })}
                    className="inputs input__borderradius--small"
                  />
                  <div className="form__errormessage--contactform-right">
                    {errors.area && (
                      <FormErrorMessage>{errors.area.message}</FormErrorMessage>
                    )}
                  </div>
                </Col>
              </Row>
              <Row className="mx-1">
                <H6Heading text="General about text" />
                <Col xs={12} sm={12} md={12}>
                  <textarea
                    placeholder="General about text"
                    type="text"
                    rows={5}
                    {...register("generalabouttext", { required: true })}
                    className="textarea"
                  />
                  <div className="form__errormessage--contactform-right">
                    {errors.generalabouttext && (
                      <FormErrorMessage>
                        {errors.generalabouttext.message}
                      </FormErrorMessage>
                    )}
                  </div>
                </Col>
              </Row>
              <Row className="mx-1">
                <H6Heading text="The place" />
                <Col xs={12} sm={12} md={12}>
                  <textarea
                    placeholder="The place"
                    type="text"
                    rows={5}
                    {...register("theplacetext", { required: true })}
                    className="textarea"
                  />
                  <div className="form__errormessage--contactform-right">
                    {errors.theplacetext && (
                      <FormErrorMessage>
                        {errors.theplacetext.message}
                      </FormErrorMessage>
                    )}
                  </div>
                </Col>
              </Row>
              <Row className="mx-1">
                <H6Heading text="Guest access" />
                <Col xs={12} sm={12} md={12}>
                  <textarea
                    placeholder="Guest access"
                    type="text"
                    rows={5}
                    {...register("guestaccesstext", { required: true })}
                    className="textarea"
                  />
                  <div className="form__errormessage--contactform-right">
                    {errors.guestaccesstext && (
                      <FormErrorMessage>
                        {errors.guestaccesstext.message}
                      </FormErrorMessage>
                    )}
                  </div>
                </Col>
              </Row>
              <Row className="mx-1">
                <H6Heading text="Other things worth noting" />
                <Col xs={12} sm={12} md={12}>
                  <textarea
                    placeholder="Other things worth noting"
                    type="text"
                    rows={5}
                    {...register("otherthingsworthnotingtext", {
                      required: true,
                    })}
                    className="textarea"
                  />
                  <div className="form__errormessage--contactform-right">
                    {errors.otherthingsworthnotingtext && (
                      <FormErrorMessage>
                        {errors.otherthingsworthnotingtext.message}
                      </FormErrorMessage>
                    )}
                  </div>
                </Col>
              </Row>
              <Row className="mx-1">
                <H6Heading text="Cancellation terms" />
                <Col xs={12} sm={12} md={12}>
                  <textarea
                    placeholder="Cancellation terms"
                    type="text"
                    rows={5}
                    {...register("cancellationterms", { required: true })}
                    className="textarea"
                  />
                  <div className="form__errormessage--contactform-right">
                    {errors.cancellationterms && (
                      <FormErrorMessage>
                        {errors.cancellationterms.message}
                      </FormErrorMessage>
                    )}
                  </div>
                </Col>
              </Row>

              <Col xs={12} sm={12} md={12}>
                <H5Heading text="Good to know" />
                <Row className="mx-1 my-4">
                  <H6Heading text="Rules" />
                  <Col xs={12} sm={12} md={12} className="mb-2">
                    <Form.Check
                      type={"checkbox"}
                      style={{ paddingLeft: 0 }}
                      className="d-flex justify-content-between"
                    >
                      <Form.Check.Label className="">
                        {<IconComponentRules type="checkintime" />}
                      </Form.Check.Label>
                      <input
                        className="input__small--width"
                        type={"time"}
                        {...register("checkintimeaftertext", {
                          required: true,
                        })}
                      />
                    </Form.Check>
                    <div className="form__errormessage--contactform-right">
                      {errors.checkintimeaftertext && (
                        <FormErrorMessage>
                          {errors.checkintimeaftertext.message}
                        </FormErrorMessage>
                      )}
                    </div>
                  </Col>
                  <Col xs={12} sm={12} md={12} className="mb-2">
                    <Form.Check
                      type={"checkbox"}
                      style={{ paddingLeft: 0 }}
                      className="d-flex justify-content-between"
                    >
                      <Form.Check.Label className="">
                        {<IconComponentRules type="checkouttime" />}
                      </Form.Check.Label>
                      <input
                        type={"time"}
                        {...register("checkouttimetext", { required: true })}
                      />
                    </Form.Check>
                    <div className="form__errormessage--contactform-right">
                      {errors.checkouttimetext && (
                        <FormErrorMessage>
                          {errors.checkouttimetext.message}
                        </FormErrorMessage>
                      )}
                    </div>
                  </Col>
                  <Col xs={12} sm={12} md={12} className="my-2">
                    <Form.Check
                      type={"checkbox"}
                      style={{ paddingLeft: 0 }}
                      className="d-flex justify-content-between"
                    >
                      <Form.Check.Label className="">
                        {<IconComponentRules type="nosmoking" />}
                      </Form.Check.Label>
                      <input
                        className="green"
                        type={"checkbox"}
                        {...register("nosmoking", { required: true })}
                      />
                    </Form.Check>
                  </Col>
                  <Col xs={12} sm={12} md={12} className="my-2">
                    <Form.Check
                      type={"checkbox"}
                      style={{ paddingLeft: 0 }}
                      className="d-flex justify-content-between"
                    >
                      <Form.Check.Label className="">
                        {<IconComponentRules type="nopartiesorevents" />}
                      </Form.Check.Label>
                      <input
                        className="green"
                        type={"checkbox"}
                        {...register("nopartiesorevents", { required: true })}
                      />
                    </Form.Check>
                  </Col>
                </Row>
                <Row className="mx-1 my-4">
                  <H6Heading text="Health and safety" />
                  <Col xs={12} sm={12} md={12} className="mb-2">
                    <Form.Check
                      type={"checkbox"}
                      style={{ paddingLeft: 0 }}
                      className="d-flex justify-content-between"
                    >
                      <Form.Check.Label className="">
                        {
                          <IconComponentHealthSafety type="nearbylakeriverwater" />
                        }
                      </Form.Check.Label>
                      <input
                        className="green"
                        type={"checkbox"}
                        {...register("nearbylakeriverwater", {
                          required: true,
                        })}
                      />
                    </Form.Check>
                  </Col>
                  <Col xs={12} sm={12} md={12} className="my-2">
                    <Form.Check
                      type={"checkbox"}
                      style={{ paddingLeft: 0 }}
                      className="d-flex justify-content-between"
                    >
                      <Form.Check.Label className="">
                        {
                          <IconComponentHealthSafety type="heightwithoutrailingsorsafety" />
                        }
                      </Form.Check.Label>
                      <input
                        className="green"
                        type={"checkbox"}
                        {...register("heightwithoutrailingsorsafety", {
                          required: true,
                        })}
                      />
                    </Form.Check>
                  </Col>
                  <Col xs={12} sm={12} md={12} className="my-2">
                    <Form.Check
                      type={"checkbox"}
                      style={{ paddingLeft: 0 }}
                      className="d-flex justify-content-between"
                    >
                      <Form.Check.Label className="">
                        {
                          <IconComponentHealthSafety type="carbonmonoxidealarm" />
                        }
                      </Form.Check.Label>
                      <input
                        className="green"
                        type={"checkbox"}
                        {...register("carbonmonoxidealarm", { required: true })}
                      />
                    </Form.Check>
                  </Col>
                  <Col xs={12} sm={12} md={12} className="my-2">
                    <Form.Check
                      type={"checkbox"}
                      style={{ paddingLeft: 0 }}
                      className="d-flex justify-content-between"
                    >
                      <Form.Check.Label className="">
                        {
                          <IconComponentHealthSafety type="smokedetectoralarm" />
                        }
                      </Form.Check.Label>
                      <input
                        className="green"
                        type={"checkbox"}
                        {...register("smokedetector", { required: true })}
                      />
                    </Form.Check>
                  </Col>
                </Row>
              </Col>
            </Col>
            <Col className="px-3" xs={12} sm={12} md={12} lg={6}>
              <H5Heading text="This place offers" />
              <Row className="mx-1 my-4">
                <Col xs={12} sm={12} md={12} className="mb-2">
                  <Form.Check
                    type={"checkbox"}
                    style={{ paddingLeft: 0 }}
                    className="d-flex justify-content-between"
                  >
                    <Form.Check.Label className="">
                      {<IconComponentPlaceOffers type="wifi" />}
                    </Form.Check.Label>
                    <input
                      className="green"
                      type={"checkbox"}
                      {...register("wifi", { required: true })}
                    />
                  </Form.Check>
                </Col>
                <Col xs={12} sm={12} md={12} className="my-2">
                  <Form.Check
                    type={"checkbox"}
                    style={{ paddingLeft: 0 }}
                    className="d-flex justify-content-between"
                  >
                    <Form.Check.Label className="">
                      {<IconComponentPlaceOffers type="keybox" />}
                    </Form.Check.Label>
                    <input
                      className="green"
                      type={"checkbox"}
                      {...register("keybox", { required: true })}
                    />
                  </Form.Check>
                </Col>
                <Col xs={12} sm={12} md={12} className="my-2">
                  <Form.Check
                    type={"checkbox"}
                    style={{ paddingLeft: 0 }}
                    className="d-flex justify-content-between"
                  >
                    <Form.Check.Label className="">
                      {<IconComponentPlaceOffers type="tv" />}
                    </Form.Check.Label>
                    <input
                      className="green"
                      type={"checkbox"}
                      {...register("tv", { required: true })}
                    />
                  </Form.Check>
                </Col>
                <Col xs={12} sm={12} md={12} className="my-2">
                  <Form.Check
                    type={"checkbox"}
                    style={{ paddingLeft: 0 }}
                    className="d-flex justify-content-between"
                  >
                    <Form.Check.Label className="">
                      {<IconComponentPlaceOffers type="refrigerator" />}
                    </Form.Check.Label>
                    <input
                      className="green"
                      type={"checkbox"}
                      {...register("refrigerator", { required: true })}
                    />
                  </Form.Check>
                </Col>
                <Col xs={12} sm={12} md={12} className="my-2">
                  <Form.Check
                    type={"checkbox"}
                    style={{ paddingLeft: 0 }}
                    className="d-flex justify-content-between"
                  >
                    <Form.Check.Label className="">
                      {<IconComponentPlaceOffers type="washingmachine" />}
                    </Form.Check.Label>
                    <input
                      className="green"
                      type={"checkbox"}
                      {...register("washingmachine", { required: true })}
                    />
                  </Form.Check>
                </Col>
                <Col xs={12} sm={12} md={12} className="my-2">
                  <Form.Check
                    type={"checkbox"}
                    style={{ paddingLeft: 0 }}
                    className="d-flex justify-content-between"
                  >
                    <Form.Check.Label className="">
                      {<IconComponentPlaceOffers type="seanearby" />}
                    </Form.Check.Label>
                    <input
                      className="green"
                      type={"checkbox"}
                      {...register("seanearby", { required: true })}
                    />
                  </Form.Check>
                </Col>
                <Col xs={12} sm={12} md={12} className="my-2">
                  <Form.Check
                    type={"checkbox"}
                    style={{ paddingLeft: 0 }}
                    className="d-flex justify-content-between"
                  >
                    <Form.Check.Label className="">
                      {<IconComponentPlaceOffers type="niceview" />}
                    </Form.Check.Label>
                    <input
                      className="green"
                      type={"checkbox"}
                      {...register("niceview", { required: true })}
                    />
                  </Form.Check>
                </Col>
                <Col xs={12} sm={12} md={12} className="my-2">
                  <Form.Check
                    type={"checkbox"}
                    style={{ paddingLeft: 0 }}
                    className="d-flex justify-content-between"
                  >
                    <Form.Check.Label className="">
                      {<IconComponentPlaceOffers type="freeparking" />}
                    </Form.Check.Label>
                    <input
                      className="green"
                      type={"checkbox"}
                      {...register("freeparking", { required: true })}
                    />
                  </Form.Check>
                </Col>
                <Col xs={12} sm={12} md={12} className="my-2">
                  <Form.Check
                    type={"checkbox"}
                    style={{ paddingLeft: 0 }}
                    className="d-flex justify-content-between"
                  >
                    <Form.Check.Label className="">
                      {<IconComponentPlaceOffers type="kitchen" />}
                    </Form.Check.Label>
                    <input
                      className="green"
                      type={"checkbox"}
                      {...register("kitchen", { required: true })}
                    />
                  </Form.Check>
                </Col>
              </Row>
              <H5Heading text="How many?" />

              <Row className="mx-1 my-4">
                <Col xs={12} sm={12} md={12} className="mt-2">
                  <Form.Check
                    type={"radio"}
                    style={{ paddingLeft: 0 }}
                    className="d-flex justify-content-between"
                  >
                    <Form.Check.Label>
                      {`People`}

                      <GiPerson className="icon-margin mx-3" />
                    </Form.Check.Label>
                    <input
                      className="inputs input__borderradius--small input__small--width"
                      type={"text"}
                      {...register("howmanypeople", { required: true })}
                    />
                  </Form.Check>
                  <div className="form__errormessage--contactform-right">
                    {errors.howmanypeople && (
                      <FormErrorMessage>
                        {errors.howmanypeople.message}
                      </FormErrorMessage>
                    )}
                  </div>
                </Col>
                <Col xs={12} sm={12} md={12} className="my-2">
                  <Form.Check
                    type={"radio"}
                    style={{ paddingLeft: 0 }}
                    className="d-flex justify-content-between"
                  >
                    <Form.Check.Label className="">
                      {`Bedroom(s)`}

                      <FaDoorOpen className="icon-margin" />
                    </Form.Check.Label>
                    <input
                      className="inputs input__borderradius--small input__small--width"
                      type={"text"}
                      {...register("howmanybedrooms", { required: true })}
                    />
                  </Form.Check>
                  <div className="form__errormessage--contactform-right">
                    {errors.howmanybedrooms && (
                      <FormErrorMessage>
                        {errors.howmanybedrooms.message}
                      </FormErrorMessage>
                    )}
                  </div>
                </Col>
                <Col xs={12} sm={12} md={12} className="my-2">
                  <Form.Check
                    type={"radio"}
                    style={{ paddingLeft: 0 }}
                    className="d-flex justify-content-between"
                  >
                    <Form.Check.Label className="">
                      {`Bathroom(s)`}

                      <FaToilet className="icon-margin" />
                    </Form.Check.Label>
                    <input
                      className="inputs input__borderradius--small input__small--width"
                      type={"text"}
                      {...register("howmanybathrooms", { required: true })}
                    />
                  </Form.Check>
                  <div className="form__errormessage--contactform-right">
                    {errors.howmanybathrooms && (
                      <FormErrorMessage>
                        {errors.howmanybathrooms.message}
                      </FormErrorMessage>
                    )}
                  </div>
                </Col>
                <Col xs={12} sm={12} md={12} className="my-2">
                  <Form.Check
                    type={"radio"}
                    style={{ paddingLeft: 0 }}
                    className="d-flex justify-content-between"
                  >
                    <Form.Check.Label className="">
                      {`Bed(s)`}
                      <FaBed className="icon-margin" />
                    </Form.Check.Label>
                    <input
                      className="inputs input__borderradius--small input__small--width"
                      type={"text"}
                      {...register("howmanybeds", { required: true })}
                    />
                  </Form.Check>
                  <div className="form__errormessage--contactform-right">
                    {errors.howmanybeds && (
                      <FormErrorMessage>
                        {errors.howmanybeds.message}
                      </FormErrorMessage>
                    )}
                  </div>
                </Col>
              </Row>

              <Row className="mb-2">
                <H5Heading text="Images" />
                <p className="px-4">Please choose 5 images, and upload them</p>
                <Col xs={12} sm={12} md={12} className="px-3 ml-2">
                  <div className="my-3">
                    <input
                      className="add-place__image-input"
                      placeholder="File"
                      type="file"
                      {...register("coverimage", { required: true })}
                    />
                    <span>{errors.title?.message}</span>
                  </div>
                  <div className="my-3">
                    <input
                      className="add-place__image-input"
                      placeholder="File"
                      type="file"
                      {...register("image2", { required: true })}
                    />
                    <span>{errors.title?.message}</span>
                  </div>
                  <div className="my-3">
                    <input
                      className="add-place__image-input"
                      placeholder="File"
                      type="file"
                      {...register("image3", { required: true })}
                    />
                    <span>{errors.title?.message}</span>
                  </div>
                  <div className="my-3">
                    <input
                      className="add-place__image-input"
                      placeholder="File"
                      type="file"
                      {...register("image4", { required: true })}
                    />
                    <span>{errors.title?.message}</span>
                  </div>
                  <div className="my-3">
                    <input
                      className="add-place__image-input"
                      placeholder="File"
                      type="file"
                      {...register("image5", { required: true })}
                    />
                    <span>{errors.title?.message}</span>
                  </div>
                </Col>
              </Row>

              <H5Heading text="Rating" />

              <Row className="mx-1 my-4">
                <Col
                  xs={12}
                  sm={12}
                  md={12}
                  style={{ paddingLeft: 0 }}
                  className="d-flex justify-content-between"
                >
                  <p className="mx-3">
                    <FaStar className="icon-margin" />
                    Rate the place with decimals (4.75){" "}
                  </p>
                  <input
                    type="text"
                    {...register("ratingdecimal", { required: true })}
                    className="inputs input__borderradius--small input__small--width"
                  />
                </Col>
                <div className="form__errormessage--contactform-right">
                  {errors.ratingdecimal && (
                    <FormErrorMessage>
                      {errors.ratingdecimal.message}
                    </FormErrorMessage>
                  )}
                </div>
              </Row>

              <H5Heading text="Price" />

              <Row className="mx-1 my-4">
                <Col xs={12} sm={12} md={12}>
                  <Form.Check
                    type={"radio"}
                    style={{ paddingLeft: 0 }}
                    className="d-flex justify-content-between"
                  >
                    <Form.Check.Label className="">{`Price ( NOK )`}</Form.Check.Label>
                    <input
                      type={"text"}
                      className="inputs input__borderradius--small input__small--width"
                      {...register("price", { required: true })}
                    />{" "}
                    kr night
                  </Form.Check>
                  <div className="form__errormessage--contactform-right">
                    {errors.price && (
                      <FormErrorMessage>
                        {errors.price.message}
                      </FormErrorMessage>
                    )}
                  </div>
                </Col>
              </Row>
            </Col>
          </Row>
          <Row className="d-flex justify-content-center mt-5">
            <button className="btn__holidaze--primary w-50 mt-5" type="submit">
              {submitting ? "Adding place..." : "Add place"}
            </button>
          </Row>
        </fieldset>
      </Form>
      {error && <FormErrorMessage>{error}</FormErrorMessage>}
      {submitSuccessfull && <div>Place added</div>}
    </Container>
  );
}

export default Addplace;
