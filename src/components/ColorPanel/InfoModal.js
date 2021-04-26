import React from "react";
import { Header, Icon, Modal } from "semantic-ui-react";

function InfoModal({ modal, closeModal }) {
  const moonLanding = new Date();
  return (
    <Modal basic onClose={closeModal} open={modal} size="small">
      <Header icon>
        <Icon name="react" />
        Developed by <span>B_Veretelnik</span>
        <p>{moonLanding.getFullYear()}</p>
      </Header>
      <Modal.Actions>
        <Icon name="github" />
        <Icon name="linkedin" />
        <Icon name="facebook" />
      </Modal.Actions>
    </Modal>
  );
}

export default InfoModal;
