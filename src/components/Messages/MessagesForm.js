import React, { useState, useContext, useEffect } from "react";
import firebase from "../../firebase";
import { v4 as uuidv4 } from "uuid";
import { Segment, Button, Input } from "semantic-ui-react";
import { ChannelContext } from "../context/channel/channelContext";
import { UserContext } from "../context/user/userContext";
import FileModal from "./FileModal";
import ProgressBar from "./ProgressBar";

export default function MessagesForm({ messagesRef }) {
  const { channel } = useContext(ChannelContext);
  const { user } = useContext(UserContext);
  const { currentChannel } = channel;
  const { currentUser } = user;
  const [state, setstate] = useState({
    storageRef: firebase.storage().ref(),
    uploadTask: null,
    uploadState: "",
    percentUploaded: 0,
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
  const createMessage = (fileUrl = null) => {
    const message = {
      timestamp: firebase.database.ServerValue.TIMESTAMP,
      user: {
        // id: currentChannel.uid,
        name: currentUser.displayName,
        avatar: currentUser.photoURL,
      },
    };
    if (fileUrl !== null) {
      message["image"] = fileUrl;
    } else {
      message["content"] = state.messag;
    }
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

  useEffect(() => {
    if (state.uploadTask) addFilesOnChat();
    console.log(state);
  }, [state.uploadTask]);

  const uploadFile = (file, metadata) => {
    const filePath = `chat/public/${uuidv4()}.jpg`;
    setstate({
      ...state,
      uploadState: "uploading",
      uploadTask: state.storageRef.child(filePath).put(file, metadata),
    });
  };

  const addFilesOnChat = () => {
    const pathToUpload = channel.id;
    const ref = state.messagesRef;

    state.uploadTask.on(
      "state_changed",
      (snap) => {
        const percentUploaded = Math.round(
          (snap.bytesTransferred / snap.totalBytes) * 100
        );
        setstate({ ...state, percentUploaded });
      },
      (err) => {
        console.error(err);
        setstate({
          ...state,
          errors: state.errors.concat(err),
          uploadState: "error",
          uploadTask: null,
        });
      },
      () => {
        state.uploadTask.snapshot.ref
          .getDownloadURL()
          .then((downloadUrl) => {
            sendFileMessage(downloadUrl, ref, pathToUpload);
          })
          .catch((err) => {
            console.error(err);
            setstate({
              errors: state.errors.concat(err),
              uploadState: "error",
              uploadTask: null,
            });
          });
      }
    );
  };

  const sendFileMessage = (fileUrl, ref, pathToUpload) => {
    ref
      .child(pathToUpload)
      .push()
      .set(createMessage(fileUrl))
      .then(() => {
        setstate({
          ...state,
          uploadState: "done",
        });
        console.log(state);
      })
      .catch((err) => {
        console.log(err);
        setstate({
          ...state,
          errors: state.errors.concat(err),
        });
      });
  };

  const { errors, messag, loading, percentUploaded, uploadState } = state;
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
          onClick={() => sendMessage()}
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
      </Button.Group>
      <FileModal
        modal={state.modal}
        closeModal={closeModal}
        uploadFile={uploadFile}
      />
      <ProgressBar
        uploadState={uploadState}
        percentUploaded={percentUploaded}
      />
    </Segment>
  );
}
