import React from 'react'
import FormErrorMessage from "../../../components/common/FormErrorMessage";
import { useState, useContext } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import AuthContext from "../../../context/AuthContext";
import { BASE_URL, TOKEN_PATH } from '../../../constants/api';
import Heading from "../../../components/layout/Heading";
import { Form, Button, Container } from "react-bootstrap";

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

    const [auth, setAuth] = useContext(AuthContext);

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
                console.log('User token:', response.data.jwt);
                console.log('User profile:', response.data.user);
                navigate("/admin/welcome");

                console.log('Login Successful');
        } catch (error) {
                console.log('error:', error.message);
                SetLoginError('Wrong username or password, try again');
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
              <div className="form__errormessage--div">
              {loginError && <FormErrorMessage>{loginError}</FormErrorMessage>}
              </div>
              <fieldset disabled={submitting}>
                <Form.Group className="mb-4" controlId="formBasicUsername">
                  <Form.Label>Username</Form.Label>
                  <Form.Control
                    className="inputs small"
                    type="username"
                    placeholder="Username"
                    {...register("username", { required: true })}
                  />
                  <div className="form__errormessage--div">
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
                    className="inputs small"
                    type="password"
                    placeholder="Password"
                    {...register("password", { required: true })}
                  />
                  <div className="form__errormessage--div">
                    {errors.password && (
                      <FormErrorMessage>
                        {errors.password.message}
                      </FormErrorMessage>
                    )}
                  </div>
                </Form.Group>
                <Button
                  variant="primary"
                  type="submit"
                >
                  {submitting ? "Logging in..." : "Login"}
                </Button>
              </fieldset>
            </Form>
          </Container>
        </div>
      </>
    );


}

export default LoginForm