import React, { useState } from "react";
import { Sidebar, Menu, Divider, Button } from "semantic-ui-react";

function ColorPanel() {
  const [them, setThem] = useState(true);
  return (
    <Sidebar
      style={{ background: them ? "#350d36" : "#121417" }}
      as={Menu}
      icon="labeled"
      inverted
      vertical
      visible
      width="very thin"
    >
      <Divider />
      <Button icon="add" size="small" inverted />

      <Divider />
      <Button
        onClick={() => setThem(!them)}
        icon={them ? "sun" : "moon"}
        inverted
        size="small"
      />
    </Sidebar>
  );
}

export default ColorPanel;
