import React from "react";
import { Menu, Icon } from "semantic-ui-react";

export default function DirectChannelItems({
  users,
  activeChannel,
  changeChannel,
  isUserOnline,
}) {
  return users.map((user) => (
    <Menu.Item
      key={user.uid}
      active={user.uid === activeChannel}
      onClick={() => changeChannel(user)}
      style={{ opacity: 0.7, fontStyle: "italic" }}
    >
      <Icon name="circle" color={isUserOnline(user) ? "green" : "red"} />@{" "}
      {user.name}
    </Menu.Item>
  ));
}
