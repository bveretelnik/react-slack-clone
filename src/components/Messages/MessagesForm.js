import React, { useState, useContext } from "react";
import firebase from "../../firebase";
import { Segment, Button, Input } from "semantic-ui-react";
import { ChannelContext } from "../context/channel/channelContext";
import { UserContext } from "../context/user/userContext";
import { MessegesContext } from "../context/messeges/messegesContext";
import FileModal from "./FileModal";

export default function MessagesForm({}) {
  const { channel } = useContext(ChannelContext);
  const { user } = useContext(UserContext);
  const { messege } = useContext(MessegesContext);
  const { messagesRef } = messege;
  const { currentChannel } = channel;
  const { currentUser } = user;
  const [state, setstate] = useState({
    messag: "",
    loading: false,
    errors: [],
    modal: false,
  });
  const openModal = () => setstate({ ...state, modal: true });
  const closeModal = () => setstate({ ...state, modal: false });

  const handleChange = (e) => {
    setstate({ ...state, [e.target.name]: e.target.value });
  };
  const createMessage = () => {
    const message = {
      timestamp: firebase.database.ServerValue.TIMESTAMP,
      user: {
        // id: currentChannel.uid,
        name: currentUser.displayName,
        avatar: currentUser.photoURL,
      },
      content: state.messag,
    };
    return message;
  };

  const sendMessage = () => {
    if (state.messag) {
      setstate({ ...state, loading: true });
      messagesRef
        .child(currentChannel.id)
        .push()
        .set(createMessage())
        .then(() => {
          setstate({ ...state, loading: false, messag: "", errors: [] });
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
        errors: errors.concat({ messag: "Add a message" }),
      });
    }
  };
  const { errors, messag, loading } = state;
  return (
    <Segment className="message__form">
      <Input
        fluid
        name="messag"
        onChange={handleChange}
        value={messag}
        style={{ marginBottom: "0.7em" }}
        label={<Button icon={"add"} />}
        labelPosition="left"
        placeholder="Write your message"
        className={
          errors.some((error) => error.messag.includes("message"))
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
          onClick={openModal}
          content="Upload Media"
          labelPosition="right"
          icon="cloud upload"
        />
        <FileModal modal={state.modal} closeModal={closeModal} />
      </Button.Group>
    </Segment>
  );
}
