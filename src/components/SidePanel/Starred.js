import React, { useState, useEffect } from "react";
import firebase from "../../firebase";
import { connect, useDispatch } from "react-redux";
import {
  setCurrentChannel,
  setPrivateChannel,
} from "../redux/channel/channelAction";
import { Menu, Icon } from "semantic-ui-react";

const Starred = ({ user }) => {
  const initialState = {
    usersRef: firebase.database().ref("users"),
    activeChannel: "",
    starredChannels: [],
  };

  const [state, setState] = useState(initialState);
  const dispatch = useDispatch();

  useEffect(() => {
    if (user) {
      addListeners(user.uid);
    }
    // react-hooks/exhaustive-deps
  }, []);

  const addListeners = (userId) => {
    state.usersRef
      .child(userId)
      .child("starred")
      .on("child_added", (snap) => {
        const starredChannel = { id: snap.key, ...snap.val() };
        setState({
          ...state,
          starredChannels: [...starredChannels, starredChannel],
        });
      });
    state.usersRef
      .child(userId)
      .child("starred")
      .on("child_added", (snap) => {
        const channelToRemove = { id: snap.key, ...snap.val() };
        const filteredChannels = state.starredChannels.filter((channel) => {
          return channel.id !== channelToRemove.id;
        });
        setState({ ...state, starredChannels: filteredChannels });
      });
  };

  const setActiveChannel = (channel) => {
    setState({ ...state, activeChannel: channel.id });
  };

  const changeChannel = (channel) => {
    setActiveChannel(channel);
    dispatch(setCurrentChannel(channel));
    dispatch(setPrivateChannel(false));
  };

  const displayChannels = (starredChannels) => {
    starredChannels.length > 0 &&
      starredChannels.map((channel) => (
        <Menu.Item
          key={channel.id}
          onClick={() => changeChannel(channel)}
          name={channel.name}
          style={{ opacity: 0.8 }}
          active={channel.id === state.activeChannel}
        >
          # {channel.name}
        </Menu.Item>
      ));
  };
  const { starredChannels } = state;
  return (
    <Menu.Menu className="menu">
      <Menu.Item>
        <span>
          <Icon name="star" /> STARRED
        </span>{" "}
        ({starredChannels.length})
      </Menu.Item>
      {displayChannels(starredChannels)}
    </Menu.Menu>
  );
};

export default connect(null, { setCurrentChannel, setPrivateChannel })(Starred);
