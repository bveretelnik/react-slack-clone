import React, { useState } from "react";
import firebase from "../../firebase";
import { Button, Modal, Icon, Label, Segment } from "semantic-ui-react";
import { SliderPicker } from "react-color";

function ModalColor({ modal, closeModal, user, onAddColor }) {
  const initialState = {
    primary: "",
    secondary: "",
    usersRef: firebase.database().ref("user"),
  };
  const [state, setState] = useState(initialState);

  const handleChangePrimary = (color) =>
    setState({ ...state, primary: color.hex });
  const handleChangeSecondary = (color) =>
    setState({ ...state, secondary: color.hex });

  const handleSaveColors = () => {
    if (state.primary === "#000000" && state.secondary === "#000000") {
      return;
    }
    if (state.primary && state.secondary)
      saveColors(state.primary, state.secondary);
  };

  const saveColors = (primary, secondary) => {
    onAddColor({ primary, secondary });
    state.usersRef
      .child(`${user.uid}/colors`)
      .push()
      .update({
        primary,
        secondary,
      })
      .then(() => {
        closeModal();
      })
      .catch((err) => console.error(err));
  };
  const { primary, secondary } = state;
  return (
    <Modal basic open={modal} onClose={closeModal}>
      <Modal.Header>Choose App Colors</Modal.Header>
      <Modal.Content>
        <Segment inverted>
          <Label content="Primary Color" />
          <SliderPicker color={primary} onChange={handleChangePrimary} />
        </Segment>

        <Segment inverted>
          <Label content="Secondary Color" />
          <SliderPicker color={secondary} onChange={handleChangeSecondary} />
        </Segment>
      </Modal.Content>
      <Modal.Actions>
        <Button
          disabled={
            primary === "#000000" && secondary === "#000000" ? true : false
          }
          color="green"
          inverted
          onClick={handleSaveColors}
        >
          <Icon name="checkmark" /> Save Colors
        </Button>
        <Button color="red" inverted onClick={closeModal}>
          <Icon name="remove" /> Cancel
        </Button>
      </Modal.Actions>
    </Modal>
  );
}

export default ModalColor;
