import React, { Fragment, useState, useEffect } from "react";
import firebase from "../../../firebase";
import { Menu, Icon } from "semantic-ui-react";
import ChannelsModal from "./ChannelsModal";
import ChannelsItems from "./ChannelsItems";
export default function Channels({
  user,
  setPrivateChannel,
  setCurrentChannel,
}) {
  const [value, setValue] = useState({
    channelName: "",
    channelDetails: "",
    activeChannel: "",
    channel: null,
    channels: [],
    channelsRef: firebase.database().ref("channels"),
    messagesRef: firebase.database().ref("messages"),
    notifications: [],
    modal: false,
    firstLoad: true,
  });

  useEffect(() => {
    setFirstChannel();
    // eslint-disable-next-line
  }, [value.channels]);

  useEffect(() => {
    addListeners();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    return () => removeListeners();
    // eslint-disable-next-line
  }, [value.channels]);

  const addListeners = () => {
    let loadedChannels = [];
    value.channelsRef.on("child_added", (snap) => {
      loadedChannels.push(snap.val());
      setValue({
        ...value,
        channels: loadedChannels,
      });
      addNotificationListener(snap.key);
    });
  };

  const addNotificationListener = (channelId) => {
    value.messagesRef.child(channelId).on("value", (snap) => {
      if (value.channel) {
        handleNotifications(
          channelId,
          value.channel.id,
          value.notifications,
          snap
        );
      }
    });
  };

  const handleNotifications = (
    channelId,
    currentChannelId,
    notifications,
    snap
  ) => {
    let lastTotal = 0;

    let index = notifications.findIndex(
      (notification) => notification.id === channelId
    );

    if (index !== -1) {
      if (channelId !== currentChannelId) {
        lastTotal = notifications[index].total;

        if (snap.numChildren() - lastTotal > 0) {
          notifications[index].count = snap.numChildren() - lastTotal;
        }
      }
      notifications[index].lastKnownTotal = snap.numChildren();
    } else {
      notifications.push({
        id: channelId,
        total: snap.numChildren(),
        lastKnownTotal: snap.numChildren(),
        count: 0,
      });
    }
    setValue({ ...value, notifications: notifications });
  };

  const removeListeners = () => {
    value.channelsRef.off();
  };

  const setActiveChannel = (channel) => {
    setValue({
      ...value,
      activeChannel: channel.id,
      firstLoad: false,
      channel: channel,
    });
  };

  const setFirstChannel = () => {
    const firstChannel = value.channels[0];
    if (value.firstLoad && value.channels.length > 0) {
      setCurrentChannel(firstChannel);
      setActiveChannel(firstChannel);
    }
    // setValue({ ...value, channel: firstChannel, firstLoad: false });
  };

  const addChannel = () => {
    const key = value.channelsRef.push().key;
    const newChannel = {
      id: key,
      name: value.channelName,
      details: value.channelDetails,
      createdBy: {
        name: user.currentUser.displayName,
        avatar: user.currentUser.photoURL,
      },
    };
    value.channelsRef
      .child(key)
      .update(newChannel)
      .then(() => {
        setValue({ ...value, channelName: " ", channelDetails: " " });
        closeModal();
        console.log("channel added");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const changeChannel = (channel) => {
    setCurrentChannel(channel);
    clearNotifications();
    setPrivateChannel(false);
    setActiveChannel(channel);
  };

  const clearNotifications = () => {
    let index = value.notifications.findIndex(
      (notification) => notification.id === value.channel.id
    );
    if (index !== -1) {
      let updatedNotifications = [...value.notifications];
      updatedNotifications[index].total =
        value.notifications[index].lastKnownTotal;
      updatedNotifications[index].count = 0;
      setValue({ ...value, notifications: updatedNotifications });
    }
  };
  const getNotificationCount = (channel) => {
    let count = 0;
    value.notifications.forEach((notification) => {
      if (notification.id === channel.id) {
        count = notification.count;
      }
    });
    if (count > 0) return count;
  };

  const isFormValid = (channelName, channelDetails) =>
    channelName && channelDetails;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isFormValid(value.channelName, value.channelDetails)) {
      addChannel();
    }
  };

  const handleChange = (e) => {
    setValue({ ...value, [e.target.name]: e.target.value });
  };
  const openModal = () => setValue({ ...value, modal: true });
  const closeModal = () => setValue({ ...value, modal: false });

  const { modal, channels, activeChannel } = value;
  return (
    <Fragment>
      <Menu.Menu className="menu">
        <Menu.Item>
          <span>
            <Icon name="exchange" />
            CHANNELS
          </span>{" "}
          ({channels.length ? channels.length : 0}){" "}
          <Icon name="add" onClick={openModal} />
        </Menu.Item>
        <ChannelsItems
          channels={channels}
          activeChannel={activeChannel}
          changeChannel={changeChannel}
          getNotificationCount={getNotificationCount}
        />
      </Menu.Menu>
      <ChannelsModal
        modal={modal}
        closeModal={closeModal}
        handleSubmit={handleSubmit}
        handleChange={handleChange}
      />
    </Fragment>
  );
}
