import React from "react";
import { Icon, Modal, Form, Input, Button } from "semantic-ui-react";
export default function ChannelsModal({
  modal,
  closeModal,
  handleSubmit,
  handleChange,
}) {
  return (
    <Modal basic open={modal} onClose={closeModal}>
      <Modal.Header>Add a Channel</Modal.Header>
      <Modal.Content>
        <Form onSubmit={handleSubmit}>
          <Form.Field>
            <Input
              fluid
              label="Name of Channel"
              name="channelName"
              onChange={handleChange}
            />
          </Form.Field>

          <Form.Field>
            <Input
              fluid
              label="About the Channel"
              name="channelDetails"
              onChange={handleChange}
            />
          </Form.Field>
        </Form>
      </Modal.Content>
      <Modal.Actions>
        <Button color="green" inverted onClick={handleSubmit}>
          <Icon name="checkmark" /> Add
        </Button>
        <Button color="red" inverted onClick={closeModal}>
          <Icon name="remove" /> Cancel
        </Button>
      </Modal.Actions>
    </Modal>
  );
}
