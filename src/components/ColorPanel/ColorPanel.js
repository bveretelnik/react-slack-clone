import React from "react";
import { Sidebar, Menu, Divider, Button } from "semantic-ui-react";

function ColorPanel() {
  return (
    <Sidebar
      style={{ background: "#350d36" }}
      as={Menu}
      icon="labeled"
      inverted
      vertical
      visible
      width="very thin"
    >
      <Divider />
      <Button icon="add" size="small" inverted />
    </Sidebar>
  );
}

export default ColorPanel;
