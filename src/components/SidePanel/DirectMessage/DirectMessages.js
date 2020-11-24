import React, { useState, useEffect, useContext } from "react";
import { Menu, Icon } from "semantic-ui-react";
import DirectChannelItems from "./DirectChannelItems";
import { DirectContext } from "../../context/direct/directContext";

export default function DirectMessages({
  user,
  setCurrentChannel,
  setPrivateChannel,
}) {
  const { currentUser } = user;
  const { addListeners, direct } = useContext(DirectContext);
  const { users } = direct;
  const [state, setState] = useState({
    activeChannel: "",
  });

  useEffect(() => {
    addListeners(currentUser.uid);
    // eslint-disable-next-line
  }, [currentUser]);

  const isUserOnline = (user) => user.status === "online";

  const changeChannel = (user) => {
    const channelId = getChannelId(user.uid);
    const channelData = {
      id: channelId,
      name: user.name,
    };
    setCurrentChannel(channelData);
    setPrivateChannel(true);
    setActiveChannel(user.uid);
  };
  const getChannelId = (userId) => {
    const currentUserId = currentUser.uid;
    return userId < currentUserId
      ? `${userId}/${currentUserId}`
      : `${currentUserId}/${userId}`;
  };

  const setActiveChannel = (userId) => {
    setState({
      ...state,
      activeChannel: userId,
    });
  };
  const { activeChannel } = state;
  return (
    <Menu.Menu className="menu">
      <Menu.Item>
        <span>
          <Icon name="mail" /> DIRECT MESSAGES
        </span>{" "}
        ({users.length})
      </Menu.Item>
      <DirectChannelItems
        users={users}
        activeChannel={activeChannel}
        changeChannel={changeChannel}
        isUserOnline={isUserOnline}
      />
    </Menu.Menu>
  );
}
