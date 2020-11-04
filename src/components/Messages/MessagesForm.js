import React, { useState, useContext } from "react";
import firebase from "../../firebase";
import { Segment, Button, Input } from "semantic-ui-react";
import { ChannelContext } from "../context/channel/channelContext";
import { UserContext } from "../context/user/userContext";

export default function MessagesForm({ messagesRef }) {
  const { channel } = useContext(ChannelContext);
  const { user } = useContext(UserContext);
  const [state, setstate] = useState({
    message: "",
    channelCur: null,
    user: user.currentUser,
    loading: false,
    errors: [],
  });

  const handleChange = (e) => {
    setstate({ ...state, [e.target.name]: e.target.value });
  };
  const createMessage = () => {
    const message = {
      timestamp: firebase.database.ServerValue.TIMESTAMP,
      user: {
        id: state.user.uid,
        name: state.user.displayName,
        avatar: state.user.photoURL,
      },
      content: state.message,
    };
    return message;
  };

  const sendMessage = () => {
    const { message, channelCur } = state;
    if (message) {
      setstate({ ...state, loading: true });
      messagesRef
        .child(channelCur.id)
        .push()
        .set(createMessage())
        .then(() => {
          setstate({ ...state, loading: false, message: "", errors: [] });
        })
        .catch((err) => {
          console.err(err);
          setstate({
            ...state,
            loading: false,
            errors: errors.concat(err),
          });
        });
    } else {
      setstate({
        ...state,
        loading: false,
        errors: errors.concat({ message: "Add a message" }),
      });
    }
  };
  const { errors, message, loading } = state;
  return (
    <Segment className="message__form">
      <Input
        fluid
        name="message"
        onChange={handleChange}
        value={message}
        style={{ marginBottom: "0.7em" }}
        label={<Button icon={"add"} />}
        labelPosition="left"
        placeholder="Write your message"
        className={
          errors.some((error) => error.message.includes("message"))
            ? "error"
            : ""
        }
      />
      <Button.Group icon widths="2">
        <Button
          onClick={sendMessage}
          disabled={loading}
          color="orange"
          content="Add Reply"
          labelPosition="left"
          icon="edit"
        />
        <Button
          color="teal"
          content="Upload Media"
          labelPosition="right"
          icon="cloud upload"
        />
      </Button.Group>
    </Segment>
  );
}
