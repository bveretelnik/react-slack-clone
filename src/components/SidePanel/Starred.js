import React, { useState, useContext, useEffect } from "react";
import firebase from "../../firebase";
import { Menu, Icon } from "semantic-ui-react";
import { ChannelContext } from "../context/channel/channelContext";
import { UserContext } from "../context/user/userContext";

export default function Starred() {
  const { setCurrentChannel, setPrivateChannel } = useContext(ChannelContext);
  const { user } = useContext(UserContext);
  const [state, setstate] = useState({
    usersRef: firebase.database().ref("user"),
    activeChannel: "",
    starredChannels: [],
  });

  useEffect(() => {
    if (user) addListeners(user.currentUser.uid);
  }, [user.currentUser]);

  const addListeners = (userId) => {
    state.usersRef
      .child(userId)
      .child("starred")
      .on("child_added", (snap) => {
        const starredChannel = { id: snap.key, ...snap.val() };
        setstate({
          ...state,
          starredChannels: [...state.starredChannels, starredChannel],
        });
      });
    state.usersRef
      .child(userId)
      .child("starred")
      .on("child_removed", (snap) => {
        const channelRemove = { id: snap.key, ...snap.val() };
        const filteredChannels = state.starredChannels.filter((channel) => {
          return channel.id !== channelRemove.id;
        });
        setstate({
          ...state,
          activeChannel: filteredChannels,
        });
      });
  };

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
