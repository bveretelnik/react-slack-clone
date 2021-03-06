import React, { useState } from "react";
import mime from "mime-types";
import { Modal, Input, Button, Icon } from "semantic-ui-react";

function FileModal({ modal, closeModal, uploadFile }) {
  const initialState = {
    file: null,
    authorized: ["image/jpeg", "image/png"],
  };
  const [state, setState] = useState(initialState);

  const addFile = (event) => {
    const file = event.target.files[0];
    if (file) {
      setState({ ...state, file });
    }
  };
  const sendFile = () => {
    const { file } = state;

    if (file !== null) {
      if (isAuthorized(file.name)) {
        const metadata = { contentType: mime.lookup(file.name) };
        uploadFile(file, metadata);
        closeModal();
        clearFile();
      }
    }
  };
  const isAuthorized = (filename) =>
    state.authorized.includes(mime.lookup(filename));
  const clearFile = () => setState({ ...state, file: null });

  return (
    <Modal basic open={modal} onClose={closeModal}>
      <Modal.Header>Select an Image File</Modal.Header>
      <Modal.Content>
        <Input
          onChange={addFile}
          fluid
          label="File types: jpg, png"
          name="file"
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

export default FileModal;
