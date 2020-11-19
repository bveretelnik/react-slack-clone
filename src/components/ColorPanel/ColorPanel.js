import React, { useState, useContext } from "react";
import firebase from "../../firebase";
import {
  Sidebar,
  Menu,
  Divider,
  Button,
  Modal,
  Icon,
  Label,
  Segment,
} from "semantic-ui-react";
import { SliderPicker } from "react-color";
import { UserContext } from "../context/user/userContext";

export default function ColorPanel() {
  const { user } = useContext(UserContext);
  const [state, setstate] = useState({
    modal: false,
    primary: "",
    secondary: "",
    user: user.currentUser,
    usersRef: firebase.database().ref("user"),
  });

  const handleChangePrimary = (color) =>
    setstate({
      ...state,
      primary: color.hex,
    });

  const handleChangeSecondary = (color) =>
    setstate({
      ...state,
      secondary: color.hex,
    });

  const handleSaveColors = () => {
    if (state.primary && state.secondary) {
      saveColors(state.primary, state.secondary);
    }
  };
  const saveColors = (primary, secondary) => {
    state.usersRef
      .child(`${user.currentUser.uid}/colors`)
      .push()
      .update({
        primary,
        secondary,
      })
      .then(() => {
        console.log("Colors added");
        closeModal();
      })
      .catch((err) => console.error(err));
  };

  const openModal = () => setstate({ ...state, modal: true });
  const closeModal = () => setstate({ ...state, modal: false });

  const { modal, primary, secondary } = state;
  return (
    <Sidebar
      as={Menu}
      icon="labeled"
      inverted
      vertical
      visible
      width="very thin"
    >
      <Divider />
      <Button icon="add" size="small" color="blue" onClick={openModal} />

      {/* Color Picker Modal */}
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
          <Button color="green" inverted onClick={handleSaveColors}>
            <Icon name="checkmark" /> Save Colors
          </Button>
          <Button color="red" inverted onClick={closeModal}>
            <Icon name="remove" /> Cancel
          </Button>
        </Modal.Actions>
      </Modal>
    </Sidebar>
  );
}
