import React, { useState } from "react";
import mime from "mime-types";
import { Modal, Input, Button, Icon } from "semantic-ui-react";

export default function FileModal({ modal, closeModal, uploadFile }) {
  const [state, setstate] = useState({
    file: null,
    authorized: ["image/jpeg", "image/png"],
  });
  const addFile = (e) => {
    const file = e.target.files[0];
    if (file) {
      return setstate({ ...state, file: file });
    }
  };

  const sendFile = () => {
    const { file } = state;
    if (file !== null) {
      if (isAuthorized(file.name)) {
        const metadata = { contentType: mime.lookup(file.name) };
        uploadFile(file, metadata);
        // clearFile();
        // closeModal();
      }
    }
  };

  const isAuthorized = (filename) =>
    state.authorized.includes(mime.lookup(filename));

  const clearFile = () => {
    return setstate({ ...state, file: null });
  };

  return (
    <Modal basic open={modal} onClose={closeModal}>
      <Modal.Header>Select an Image File</Modal.Header>
      <Modal.Content>
        <Input
          onChange={addFile}
          fluid
          label="File types: jpg, png"
          name="files"
          type="file"
        />
      </Modal.Content>
      <Modal.Actions>
        <Button onClick={sendFile} color="green" inverted>
          <Icon name="checkmark" /> Send
        </Button>
        <Button color="red" inverted onClick={closeModal}>
          <Icon name="remove" /> Cancel
        </Button>
      </Modal.Actions>
    </Modal>
  );
}
