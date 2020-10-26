import React, { useState } from "react";
import firebase from "../../firebase";
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

export default function Register() {
  const [register, setRegister] = useState({
    username: "",
    email: "",
    password: "",
    passwordConfirmation: "",
    errors: [],
  });

  const isFormValid = () => {
    let errors = [];
    let error;

    if (isFormEmpty(register)) {
      error = { message: "Fill in all fields" };
      setRegister({ ...register, errors: errors.concat(error) });
      return false;
    } else if (!isPasswordValid(register)) {
      error = { message: "Password is invalid" };
      setRegister({ ...register, errors: errors.concat(error) });
      return false;
    } else {
      return true;
    }
  };

  const isFormEmpty = ({ username, email, password, passwordConfirmation }) => {
    return (
      !username ||
      !email.length ||
      !password.length ||
      !passwordConfirmation.length
    );
  };

  const isPasswordValid = ({ password, passwordConfirmation }) => {
    if (password.length < 6 || passwordConfirmation.length < 6) {
      return false;
    } else if (password !== passwordConfirmation) {
      return false;
    } else {
      return true;
    }
  };

  const displayErrors = (errors) => {
    return errors.map((error, i) => <p key={i}>{error.message}</p>);
  };

  const handleChange = (e) => {
    setRegister({ ...register, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    if (isFormValid()) {
      e.preventDefault();
      firebase
        .auth()
        .createUserWithEmailAndPassword(register.email, register.password)
        .then((createdUser) => {
          console.log(createdUser);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const { username, email, password, passwordConfirmation, errors } = register;

  return (
    <Grid textAlign="center" verticalAlign="middle" className="app">
      <Grid.Column style={{ maxWidth: 450 }}>
        <Header as="h2" icon color="purple" textAlign="center">
          <Icon name="puzzle piece" color="purple" />
          Register for Slack
        </Header>
        <Form size="large" onSubmit={handleSubmit}>
          <Segment stacked>
            <Form.Input
              fluid
              name="username"
              icon="user"
              iconPosition="left"
              placeholder="Username"
              onChange={handleChange}
              value={username}
              type="text"
            />
            <Form.Input
              fluid
              name="email"
              icon="mail"
              iconPosition="left"
              placeholder="Email Address"
              onChange={handleChange}
              value={email}
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
              type="password"
            />
            <Form.Input
              fluid
              name="passwordConfirmation"
              icon="repeat"
              iconPosition="left"
              placeholder="Password Confirmation"
              onChange={handleChange}
              value={passwordConfirmation}
              type="password"
            />
            <Button color="purple" fluid size="large">
              Submit
            </Button>
          </Segment>
        </Form>
        {errors.length > 0 && (
          <Message error>
            <h3>Error</h3>
            {displayErrors(errors)}
          </Message>
        )}
        <Message>
          Already a user <Link to="/login">Login</Link>
        </Message>
      </Grid.Column>
    </Grid>
  );
}
