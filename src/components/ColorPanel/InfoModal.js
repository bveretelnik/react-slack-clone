import React from "react";
import { Header, Icon, Modal } from "semantic-ui-react";

function InfoModal({ modal, closeModal }) {
  return (
    <Modal basic onClose={closeModal} open={modal} size="small">
      <Header icon>
        <Icon name="react" />
        Developed by B_Veretelnik
        <p>2021</p>
      </Header>
      <Modal.Content></Modal.Content>
      <Modal.Actions></Modal.Actions>
    </Modal>
  );
}

export default InfoModal;
