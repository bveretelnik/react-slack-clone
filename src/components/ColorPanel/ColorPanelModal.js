import React from "react";
import { Button, Modal, Icon, Label, Segment } from "semantic-ui-react";
import { SliderPicker } from "react-color";
export default function ColorPanelModal({
  modal,
  closeModal,
  handleChangePrimary,
  handleChangeSecondary,
  primary,
  secondary,
  handleSaveColors,
}) {
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
        <Button color="green" inverted onClick={handleSaveColors}>
          <Icon name="checkmark" /> Save Colors
        </Button>
        <Button color="red" inverted onClick={closeModal}>
          <Icon name="remove" /> Cancel
        </Button>
      </Modal.Actions>
    </Modal>
  );
}
