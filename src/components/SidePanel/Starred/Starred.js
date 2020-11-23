import React, { useState, useEffect } from "react";
import firebase from "../../../firebase";
import { Menu, Icon } from "semantic-ui-react";
import StarredChannel from "./StarredChannel";

export default function Starred({
  user,
  setPrivateChannel,
  setCurrentChannel,
}) {
  const [state, setstate] = useState({
    usersRef: firebase.database().ref("user"),
    activeChannel: "",
    starredChannels: [],
  });

  useEffect(() => {
    if (user) addListeners(user.currentUser.uid);
    // eslint-disable-next-line
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

  const { starredChannels, activeChannel } = state;
  return (
    <Menu.Menu className="menu">
      <Menu.Item>
        <span>
          <Icon name="star" />
          STARRED
        </span>{" "}
        ({starredChannels.length})
      </Menu.Item>
      <StarredChannel
        starredChannels={starredChannels}
        changeChannel={changeChannel}
        activeChannel={activeChannel}
      />
    </Menu.Menu>
  );
}
