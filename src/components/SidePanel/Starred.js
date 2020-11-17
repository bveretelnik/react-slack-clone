import React, { useState, useContext } from "react";
import { Menu, Icon } from "semantic-ui-react";
import { ChannelContext } from "../context/channel/channelContext";

export default function Starred() {
  const { setCurrentChannel, setPrivateChannel } = useContext(ChannelContext);

  const [state, setstate] = useState({
    activeChannel: "",
    starredChannels: [],
  });
  const setActiveChannel = (channel) => {
    setstate({ activeChannel: channel.id });
  };
  const changeChannel = (channel) => {
    setActiveChannel(channel);
    setCurrentChannel(channel);
    setPrivateChannel(false);
  };
  const displayChannels = (starredChannels) =>
    starredChannels.length > 0 &&
    starredChannels.map((channel) => (
      <Menu.Item
        key={channel.id}
        onClick={() => changeChannel(channel)}
        name={channel.name}
        style={{ opacity: 0.7 }}
        active={channel.id === state.activeChannel}
      >
        # {channel.name}
      </Menu.Item>
    ));
  const { starredChannels } = state;
  return (
    <Menu.Menu className="menu">
      <Menu.Item>
        <span>
          <Icon name="star" />
          STARRED
        </span>{" "}
        ({starredChannels.length})
      </Menu.Item>
      {displayChannels(starredChannels)}
    </Menu.Menu>
  );
}
