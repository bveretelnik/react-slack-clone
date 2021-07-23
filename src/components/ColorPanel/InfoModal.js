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
        <a
          className="link"
          target="_blank"
          rel="noreferrer"
          href="https://github.com/bveretelnik"
        >
          <Icon name="github" />
        </a>
        <a
          className="link"
          target="_blank"
          rel="noreferrer"
          href="https://www.linkedin.com/in/bohdan-veretelnik-15a834147"
        >
          <Icon name="linkedin" />
        </a>
        <a
          className="link"
          target="_blank"
          rel="noreferrer"
          href="https://www.facebook.com/bogdan.veretelnik"
        >
          <Icon name="facebook" />
        </a>
      </Modal.Actions>
    </Modal>
  );
}

export default InfoModal;
