import React from "react";
import FormErrorMessage from "../../../components/common/FormErrorMessage";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import { useAuth } from "../../../context/AuthContext";
import { BASE_URL, TOKEN_PATH } from "../../../constants/api";
import Heading from "../../../components/layout/Heading";
import { Form, Container } from "react-bootstrap";

const url = BASE_URL + TOKEN_PATH;

const schema = yup.object().shape({
  username: yup.string().required("Please enter your username"),
  password: yup.string().required("Please enter your password"),
});

function LoginForm() {
  const [submitting, setSubmitting] = useState(false);
  const [loginError, SetLoginError] = useState(null);

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const [, setAuth] = useAuth();

  async function onSubmitHandler(data) {
    setSubmitting(true);
    SetLoginError(null);

    console.log(data);

    try {
      const response = await axios.post(url, {
        identifier: data.username,
        password: data.password,
      });
      setAuth(response.data.jwt);
      console.log("User token:", response.data.jwt);
      console.log("User profile:", response.data.user);
      navigate("/admin/welcome");

      console.log("Login Successful");
    } catch (error) {
      console.log("error:", error.message);
      SetLoginError("Wrong username or password, try again");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <>
      <div className="login__div">
        <Container className="login__container">
          <Heading title="Login" />
          <Form onSubmit={handleSubmit(onSubmitHandler)}>
            <div className="form__errormessage--center">
              {loginError && <FormErrorMessage>{loginError}</FormErrorMessage>}
            </div>
            <fieldset disabled={submitting}>
              <Form.Group className="mb-4" controlId="formBasicUsername">
                <Form.Label>Username</Form.Label>
                <Form.Control
                  className="inputs input__borderradius--small"
                  type="username"
                  placeholder="Username"
                  {...register("username")}
                />
                <div className="form__errormessage--center">
                  {errors.username && (
                    <FormErrorMessage>
                      {errors.username.message}
                    </FormErrorMessage>
                  )}
                </div>
              </Form.Group>

              <Form.Group className="mb-4" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  className="inputs input__borderradius--small"
                  type="password"
                  placeholder="Password"
                  {...register("password")}
                />
                <div className="form__errormessage--center">
                  {errors.password && (
                    <FormErrorMessage>
                      {errors.password.message}
                    </FormErrorMessage>
                  )}
                </div>
              </Form.Group>
              <button className="btn__holidaze--primary" type="submit">
                {submitting ? "Logging in..." : "Login"}
              </button>
            </fieldset>
          </Form>
        </Container>
      </div>
    </>
  );
}

export default LoginForm;
