import React from "react";
import { Menu, Label } from "semantic-ui-react";

export default function ChannelsItems({
  channels,
  changeChannel,
  getNotificationCount,
  activeChannel,
}) {
  return (
    channels.length > 0 &&
    channels.map((channel) => (
      <Menu.Item
        key={channel.id}
        onClick={() => changeChannel(channel)}
        name={channel.name}
        style={{ opacity: 0.7 }}
        active={channel.id === activeChannel}
      >
        {getNotificationCount(channel) && (
          <Label color="red">{getNotificationCount(channel)}</Label>
        )}
        # {channel.name}
      </Menu.Item>
    ))
  );
}
