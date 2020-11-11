import React, { useState } from "react";
import { Menu, Icon } from "semantic-ui-react";

export default function DirectMessages() {
  const [user, setUser] = useState([]);
  return (
    <Menu.Menu className="menu">
      <Menu.Item>
        <span>
          <Icon name="mail" /> DIRECT MESSAGES
        </span>{" "}
        ({user.length})
      </Menu.Item>
      {/* Users to Send Direct Messages */}
    </Menu.Menu>
  );
}
