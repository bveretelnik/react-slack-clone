<<<<<<< HEAD
import React, { useState } from "react";
import mime from "mime-types";
import { Modal, Input, Button, Icon } from "semantic-ui-react";

export default function FileModal({ modal, closeModal }) {
  const [state, setstate] = useState({
    file: null,
    authorized: ["image/jpeg", "image/png"],
  });
  const addFile = (e) => {
    const file = e.target.files[0];
    if (file) {
      setstate({ ...state, file: file });
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
  const clearFile = () => setstate({ ...state, file: null });
  const uploadFile = (file, metadata) => {
    console.log(file, metadata);
  };
=======
import React from "react";
import { Modal, Input, Button, Icon } from "semantic-ui-react";

export default function FileModal({ modal, closeModal }) {
>>>>>>> 7479faa14529890dc31c8b677e8077b287d8c27a
  return (
    <Modal basic open={modal} onClose={closeModal}>
      <Modal.Header>Select an Image File</Modal.Header>
      <Modal.Content>
<<<<<<< HEAD
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
=======
        <Input fluid label="File types: jpg, png" name="files" type="file" />
      </Modal.Content>
      <Modal.Actions>
        <Button color="green" inverted>
>>>>>>> 7479faa14529890dc31c8b677e8077b287d8c27a
          <Icon name="checkmark" /> Send
        </Button>
        <Button color="red" inverted onClick={closeModal}>
          <Icon name="remove" /> Cancel
        </Button>
      </Modal.Actions>
    </Modal>
  );
}
