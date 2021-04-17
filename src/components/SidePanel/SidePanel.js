import React from "react";
import UserPanel from "./UserPanel";
import Channels from "./Channels";
import { Divider, Menu } from "semantic-ui-react";
import { useSelector } from "react-redux";

const SidePanel = () => {
  const currentUser = useSelector((state) => state.user.currentUser);
  return (
    <Menu
      size="large"
      inverted
      fixed="left"
      vertical
      style={{ background: "#3F0E40", fontSize: "1.2rem" }}
    >
      <UserPanel />
      <Divider />
      <Channels currentUser={currentUser} />
      <Divider />
    </Menu>
  );
};

export default SidePanel;
