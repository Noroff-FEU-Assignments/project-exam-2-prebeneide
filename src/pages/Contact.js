import React, { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Heading from "../components/layout/Heading";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import FormErrorMessage from "./../components/common/FormErrorMessage";
import * as yup from "yup";
import axios from "axios";
import { BASE_URL } from "../constants/api";

const url = BASE_URL + "/ap/inboxes";

const schema = yup.object().shape({
  name: yup
    .string()
    .required("Please enter your name")
    .min(2, "Your name must be at least 3 characters long"),
  email: yup
    .string()
    .required("Please enter your email")
    .email("Please enter a valid email"),
  subject: yup
    .string()
    .required("Please enter your subject")
    .min(5, "Subject must contain at least 5 characters"),
  message: yup
    .string()
    .required("Please enter your message")
    .min(25, "Message must contain at least 25 characters"),
});

function Contact() {
  const navigate = useNavigate();

  const [sending, setSending] = useState(false);
  const [error, setError] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const sendMessageFunction = async (_data) => {
    setSending(true);
    const body = {
      data: {
        name: _data.name,
        email: _data.email,
        subject: _data.subject,
        message: _data.message,
      },
    };
    try {
      await axios.post(url, body);
      console.log("message sent");
      navigate("/success");
    } catch (error) {
      setError("We are sorry, an error occured. The message was not sent.");
    } finally {
      setSending(false);
    }
  };

  return (
    <>
      <Container className="mt-4" style={{ paddingBottom: 200 }}>
        <Heading title="Contact" />
        <Row className="mt-5 mb-5">
          <h5>Do you have any questions?</h5>
          <p>
            Or just want to get in touch with us? Do not hesitate to contact us,
            we are here for you 24/7
          </p>
        </Row>
        <form onSubmit={handleSubmit(sendMessageFunction)}>
          <fieldset disabled={sending}>
            <Row className="my-3">
              <Col>
                <h6>Name</h6>
                <input
                  placeholder="Name"
                  type="text"
                  className="inputs input__borderradius--small"
                  {...register("name", { required: true })}
                />
                <div className="form__errormessage--contactform-right">
                  {errors.name && (
                    <FormErrorMessage>{errors.name.message}</FormErrorMessage>
                  )}
                </div>
              </Col>
            </Row>
            <Row className="mb-3">
              <Col>
                <h6>Email</h6>
                <input
                  placeholder="Email"
                  type="text"
                  className="inputs input__borderradius--small"
                  {...register("email", { required: true })}
                />
                <div className="form__errormessage--contactform-right">
                  {errors.email && (
                    <FormErrorMessage>{errors.email.message}</FormErrorMessage>
                  )}
                </div>
              </Col>
            </Row>
            <Row className="mb-3">
              <Col>
                <h6>Subject</h6>
                <input
                  placeholder="Subject"
                  type="text"
                  className="inputs input__borderradius--small"
                  {...register("subject", { required: true })}
                />
                <div className="form__errormessage--contactform-right">
                  {errors.subject && (
                    <FormErrorMessage>
                      {errors.subject.message}
                    </FormErrorMessage>
                  )}
                </div>
              </Col>
            </Row>
            <Row className="mb-5">
              <Col>
                <h6>Message</h6>
                <textarea
                  placeholder="Message"
                  type="text"
                  rows={10}
                  className="textarea"
                  {...register("message", { required: true })}
                />
                <div className="form__errormessage--contactform-right">
                  {errors.message && (
                    <FormErrorMessage>
                      {errors.message.message}
                    </FormErrorMessage>
                  )}
                </div>
              </Col>
            </Row>
          </fieldset>
          <Row>
            <div className="form__errormessage--contactform-center">
              {error && <FormErrorMessage>{error}</FormErrorMessage>}
            </div>
          </Row>
          <Row className="my-2 d-flex justify-content-center">
            <button className="btn__holidaze--primary w-50" type="submit">
              {sending ? "Sending..." : "Send Message"}
            </button>
          </Row>
        </form>
      </Container>
    </>
  );
}

export default Contact;