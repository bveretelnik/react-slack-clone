import React, { useState, useEffect } from "react";
import firebase from "../../../firebase";
import { v4 as uuidv4 } from "uuid";
import { Segment, Button, Input } from "semantic-ui-react";
import { Picker, emojiIndex } from "emoji-mart";
import "emoji-mart/css/emoji-mart.css";

import FileModal from "../FileModal";
import ProgressBar from "../ProgressBar";

export default function MessagesForm({ getMessagesRef, channel, user }) {
  const { currentChannel } = channel;
  const { currentUser } = user;
  const [state, setstate] = useState({
    storageRef: firebase.storage().ref(),
    typingRef: firebase.database().ref("typing"),
    uploadTask: null,
    uploadState: "",
    percentUploaded: 0,
    messag: "",
    loading: false,
    errors: [],
    modal: false,
    emojiPicker: false,
  });

  useEffect(() => {
    if (state.uploadTask) addFilesOnChat();
    // eslint-disable-next-line
  }, [state.uploadTask]);

  const handleChange = (e) => {
    setstate({ ...state, [e.target.name]: e.target.value });
  };
  const createMessage = (fileUrl = null) => {
    const message = {
      timestamp: firebase.database.ServerValue.TIMESTAMP,
      user: {
        id: currentUser.uid,
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
    const { typingRef } = state;
    if (state.messag) {
      setstate({ ...state, loading: true });
      getMessagesRef()
        .child(currentChannel.id)
        .push()
        .set(createMessage())
        .then(() => {
          setstate({ ...state, loading: false, messag: "", errors: [] });
          typingRef.child(currentChannel.id).child(currentUser.uid).remove();
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

  const getPath = () => {
    if (channel.isPrivateChannel) {
      return `chat/private-${channel.currentChannel.id}`;
    } else {
      return `chat/public`;
    }
  };

  const uploadFile = (file, metadata) => {
    const filePath = `${getPath()}/${uuidv4()}.jpg`;
    setstate({
      ...state,
      uploadState: "uploading",
      uploadTask: state.storageRef.child(filePath).put(file, metadata),
    });
  };

  const addFilesOnChat = () => {
    const pathToUpload = currentChannel.id;
    const ref = getMessagesRef();

    state.uploadTask.on(
      "state_changed",
      (snap) => {
        const percentUploaded = Math.round(
          (snap.bytesTransferred / snap.totalBytes) * 100
        );
        setstate({ ...state, percentUploaded: percentUploaded });
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
  const handleKeyDown = () => {
    const { messag, typingRef } = state;
    if (messag) {
      typingRef
        .child(currentChannel.id)
        .child(currentUser.uid)
        .set(currentUser.displayName);
    } else {
      typingRef.child(currentChannel.id).child(currentUser.uid).remove();
    }
  };

  const handleTogglePicker = () => {
    setstate({ ...state, emojiPicker: !emojiPicker });
  };

  const handleAddEmoji = (emoji) => {
    const oldMessage = state.messag;
    const newMessage = colonToUnicode(`${oldMessage} ${emoji.colons} `);
    setstate({ ...state, messag: newMessage, emojiPicker: false });
  };
  const colonToUnicode = (message) => {
    return message.replace(/:[A-Za-z0-9_+-]+:/g, (x) => {
      x = x.replace(/:/g, "");
      let emoji = emojiIndex.emojis[x];
      if (typeof emoji !== "undefined") {
        let unicode = emoji.native;
        if (typeof unicode !== "undefined") {
          return unicode;
        }
      }
      x = ":" + x + ":";
      return x;
    });
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
          modal: false,
        });
      })
      .catch((err) => {
        console.log(err);
        setstate({
          ...state,
          errors: state.errors.concat(err),
        });
      });
  };
  const openModal = () => setstate({ ...state, modal: true });
  const closeModal = () => setstate({ ...state, modal: false });

  const {
    errors,
    messag,
    loading,
    percentUploaded,
    uploadState,
    emojiPicker,
  } = state;
  return (
    <Segment className="message__form">
      {emojiPicker && (
        <Picker
          set="apple"
          onSelect={handleAddEmoji}
          className="emojipicker"
          title="Pick your emoji"
          emoji="point_up"
        />
      )}
      <Input
        fluid
        name="messag"
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        value={messag}
        style={{ marginBottom: "0.7em" }}
        label={
          <Button
            icon={emojiPicker ? "close" : "add"}
            content={emojiPicker ? "Close" : null}
            onClick={handleTogglePicker}
          />
        }
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
