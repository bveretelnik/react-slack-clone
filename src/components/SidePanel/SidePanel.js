import React from "react";
import UserPanel from "./UserPanel";
import { Menu } from "semantic-ui-react";
import Channels from "./Channel/Channels";
import DirectMessages from "./DirectMessage/DirectMessages";
import Starred from "./Starred/Starred";

export default function SidePanel({
  primaryColor,
  user,
  setPrivateChannel,
  setCurrentChannel,
}) {
  return (
    <Menu
      size="large"
      inverted
      fixed="left"
      vertical
      style={{ background: primaryColor, fontSize: "1.2rem" }}
    >
      <UserPanel primaryColor={primaryColor} />
      <Starred
        user={user}
        setCurrentChannel={setCurrentChannel}
        setPrivateChannel={setPrivateChannel}
      />
      <Channels
        user={user}
        setCurrentChannel={setCurrentChannel}
        setPrivateChannel={setPrivateChannel}
      />
      <DirectMessages
        user={user}
        setCurrentChannel={setCurrentChannel}
        setPrivateChannel={setPrivateChannel}
      />
    </Menu>
  );
}
