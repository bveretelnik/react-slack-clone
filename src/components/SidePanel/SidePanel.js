import React from "react";
import UserPanel from "./UserPanel";
import { Menu } from "semantic-ui-react";
import Channels from "./Channels";
import DirectMessages from "./DirectMessages";
import Starred from "./Starred";

export default function SidePanel({ primaryColor }) {
  return (
    <Menu
      size="large"
      inverted
      fixed="left"
      vertical
      style={{ background: primaryColor, fontSize: "1.2rem" }}
    >
      <UserPanel primaryColor={primaryColor} />
      <Starred />
      <Channels />
      <DirectMessages />
    </Menu>
  );
}
