import React from "react";
import UserPanel from "./UserPanel";
import Channels from "./Channels";
import { Divider, Menu } from "semantic-ui-react";
import { useSelector } from "react-redux";
import DirectMessages from "./DirectMessages";
import Starred from "./Starred";

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
      <Starred user={currentUser} />
      <Divider />
      <Channels currentUser={currentUser} />
      <Divider />
      <DirectMessages currentUser={currentUser} />
      <Divider />
    </Menu>
  );
};

export default SidePanel;
