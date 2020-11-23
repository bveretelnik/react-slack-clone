import React, { useState, useContext, useEffect } from "react";
import firebase from "../../firebase";
import { Menu, Icon } from "semantic-ui-react";
import { UserContext } from "../context/user/userContext";
import { ChannelContext } from "../context/channel/channelContext";
import DirectChannelItems from "./DirectChannelItems";

export default function DirectMessages() {
  const { user } = useContext(UserContext);
  const { setCurrentChannel, setPrivateChannel } = useContext(ChannelContext);
  const { currentUser } = user;
  const [state, setState] = useState({
    activeChannel: "",
    users: [],
    usersRef: firebase.database().ref("user"),
    connectedRef: firebase.database().ref(".info/connected"),
    presenceRef: firebase.database().ref("presence"),
  });

  useEffect(() => {
    addListeners(currentUser.uid);
    // eslint-disable-next-line
  }, [currentUser]);

  const addListeners = (currentUserUid) => {
    const { usersRef, connectedRef, presenceRef } = state;
    let loadedUsers = [];
    usersRef.on("child_added", (snap) => {
      if (currentUserUid !== snap.key) {
        let usernet = snap.val();
        usernet["uid"] = snap.key;
        usernet["status"] = "offline";
        loadedUsers.push(usernet);
        return setState({
          ...state,
          users: loadedUsers,
        });
      }
    });
    connectedRef.on("value", (snap) => {
      if (snap.val() === true) {
        const ref = presenceRef.child(currentUserUid);
        ref.set(true);
        ref.onDisconnect().remove((err) => {
          if (err !== null) {
            console.log(err);
          }
        });
      }
    });

    presenceRef.on("child_added", (snap) => {
      if (currentUserUid !== snap.key) {
        addStatusToUser(snap.key);
      }
    });
    presenceRef.on("child_removed", (snap) => {
      if (currentUserUid !== snap.key) {
        addStatusToUser(snap.key, false);
      }
    });
  };

  const addStatusToUser = (userId, connected = true) => {
    const updatedUsers = state.users.reduce((acc, user) => {
      if (user.uid === userId) {
        user["status"] = `${connected ? "online" : "offline"}`;
      }
      return acc.concat(user);
    }, []);
    return setState({
      ...state,
      users: updatedUsers,
    });
  };

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
  const { users, activeChannel } = state;
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
