import React, { useState } from "react";
import firebase, { provider, auth } from "../../firebase";
import {
  Grid,
  Form,
  Segment,
  Button,
  Header,
  Message,
  Icon,
} from "semantic-ui-react";
import { Link } from "react-router-dom";

export default function Login() {
  const [login, setLogin] = useState({
    email: "",
    password: "",
    errors: [],
    loading: false,
  });

  const displayErrors = (errors) =>
    errors.map((error, i) => <p key={i}>{error.message}</p>);

  const handleChange = (e) => {
    setLogin({
      ...login,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isFormValid(login)) {
      setLogin({ ...login, errors: [], loading: true });
      firebase
        .auth()
        .signInWithEmailAndPassword(login.email, login.password)
        .then((signedInUser) => {
          console.log(signedInUser);
        })
        .catch((err) => {
          console.error(err);
          setLogin({
            ...login,
            errors: login.errors.concat(err),
            loading: false,
          });
        });
    }
  };

  const isFormValid = ({ email, password }) => email && password;

  const handleInputError = (errors, inputName) => {
    return errors.some((error) =>
      error.message.toLowerCase().includes(inputName)
    )
      ? "error"
      : "";
  };

  const handleLoginWithGoogle = async () => {
    return await auth
      .signInWithPopup(provider)
      .then((result) => {
        console.log(result);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const { email, password, errors, loading } = login;
  return (
    <Grid textAlign="center" verticalAlign="middle" className="app">
      <Grid.Column style={{ maxWidth: 450 }}>
        <Header as="h1" icon color="violet" textAlign="center">
          <Icon name="code branch" color="violet" />
          Login to Slack
        </Header>
        <Form onSubmit={handleSubmit} size="large">
          <Segment stacked>
            <Form.Input
              fluid
              name="email"
              icon="mail"
              iconPosition="left"
              placeholder="Email Address"
              onChange={handleChange}
              value={email}
              className={handleInputError(errors, "email")}
              type="email"
            />
            <Form.Input
              fluid
              name="password"
              icon="lock"
              iconPosition="left"
              placeholder="Password"
              onChange={handleChange}
              value={password}
              className={handleInputError(errors, "password")}
              type="password"
            />
            <Button
              disabled={loading}
              className={loading ? "loading" : ""}
              color="violet"
              fluid
              size="large"
            >
              Submit
            </Button>
          </Segment>
          <Button
            disabled={loading}
            className={loading ? "loading" : ""}
            color="red"
            fluid
            size="large"
            onClick={handleLoginWithGoogle}
          >
            Login with Google
          </Button>
        </Form>
        {errors.length > 0 && (
          <Message error>
            <h3>Error</h3>
            {displayErrors(errors)}
          </Message>
        )}
        <Message>
          Don`t have an account <Link to="/register">Register</Link>
        </Message>
      </Grid.Column>
    </Grid>
  );
}
