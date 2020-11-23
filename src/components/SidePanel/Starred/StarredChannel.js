import React from "react";
import { Menu } from "semantic-ui-react";

export default function StarredChannel({
  changeChannel,
  starredChannels,
  activeChannel,
}) {
  return (
    starredChannels.length > 0 &&
    starredChannels.map((channel) => (
      <Menu.Item
        key={channel.id}
        onClick={() => changeChannel(channel)}
        name={channel.name}
        style={{ opacity: 0.7 }}
        active={channel.id === activeChannel}
      >
        # {channel.name}
      </Menu.Item>
    ))
  );
}
