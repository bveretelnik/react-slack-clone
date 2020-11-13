import React, { useState, useContext, useEffect } from "react";
import firebase from "../../firebase";
import { Menu, Icon } from "semantic-ui-react";
import { UserContext } from "../context/user/userContext";
import { ChannelContext } from "../context/channel/channelContext";

export default function DirectMessages() {
  const { user } = useContext(UserContext);
  const { setCurrentChannel, setPrivateChannel } = useContext(ChannelContext);
  const { currentUser } = user;
  const [state, setState] = useState({
    users: [],
    usersRef: firebase.database().ref("user"),
    connectedRef: firebase.database().ref(".info/connected"),
    presenceRef: firebase.database().ref("presence"),
  });

  useEffect(() => {
    if (currentUser) addListeners(currentUser.uid);
    // eslint-disable-next-line
  }, []);

  const addListeners = (currentUserUid) => {
    const { usersRef, connectedRef, presenceRef } = state;
    let loadedUsers = [];
    usersRef.on("child_added", (snap) => {
      if (currentUserUid !== snap.key) {
        let usernet = snap.val();
        usernet["uid"] = snap.key;
        usernet["status"] = "offline";
        loadedUsers.push(usernet);
        setState({
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
    setState({
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
  };
  const getChannelId = (userId) => {
    const currentUserId = currentUser.uid;
    return userId < currentUserId
      ? `${userId}/${currentUserId}`
      : `${currentUserId}/${userId}`;
  };
  const { users } = state;
  return (
    <Menu.Menu className="menu">
      <Menu.Item>
        <span>
          <Icon name="mail" /> DIRECT MESSAGES
        </span>{" "}
        ({users.length})
      </Menu.Item>
      {users.map((user) => (
        <Menu.Item
          key={user.uid}
          onClick={() => changeChannel(user)}
          style={{ opacity: 0.7, fontStyle: "italic" }}
        >
          <Icon name="circle" color={isUserOnline(user) ? "green" : "red"} />@{" "}
          {user.name}
        </Menu.Item>
      ))}
    </Menu.Menu>
  );
}
