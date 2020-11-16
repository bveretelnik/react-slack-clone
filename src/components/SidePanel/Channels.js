import React, { Fragment, useState, useContext, useEffect } from "react";
import firebase from "../../firebase";
import {
  Menu,
  Icon,
  Modal,
  Form,
  Input,
  Button,
  Label,
} from "semantic-ui-react";
import { UserContext } from "../context/user/userContext";
import { ChannelContext } from "../context/channel/channelContext";
export default function Channels() {
  const { user } = useContext(UserContext);
  const { setCurrentChannel, setPrivateChannel } = useContext(ChannelContext);
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
    console.log(value);
  }, [value.channels]);

  useEffect(() => {
    addListeners();
  }, [value.channel]);

  useEffect(() => {
    return () => removeListeners();
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
    // setActiveChannel(channel);
    setCurrentChannel(channel);
    clearNotifications();
    setPrivateChannel(false);
    console.log(value);
    setValue({ ...value, activeChannel: channel.id, channel: channel });
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
  return (
    <Fragment>
      <Menu.Menu className="menu">
        <Menu.Item>
          <span>
            <Icon name="exchange" />
            CHANNELS
          </span>{" "}
          ({value.channels.length ? value.channels.length : 0}){" "}
          <Icon name="add" onClick={openModal} />
        </Menu.Item>
        {value.channels.length > 0 &&
          value.channels.map((channel) => (
            <Menu.Item
              key={channel.id}
              onClick={() => changeChannel(channel)}
              name={channel.name}
              style={{ opacity: 0.7 }}
              active={channel.id === value.activeChannel}
            >
              {getNotificationCount(channel) && (
                <Label color="red">{getNotificationCount(channel)}</Label>
              )}
              # {channel.name}
            </Menu.Item>
          ))}
      </Menu.Menu>

      {/* Add Channel Modal */}
      <Modal basic open={value.modal} onClose={closeModal}>
        <Modal.Header>Add a Channel</Modal.Header>
        <Modal.Content>
          <Form onSubmit={handleSubmit}>
            <Form.Field>
              <Input
                fluid
                label="Name of Channel"
                name="channelName"
                onChange={handleChange}
              />
            </Form.Field>

            <Form.Field>
              <Input
                fluid
                label="About the Channel"
                name="channelDetails"
                onChange={handleChange}
              />
            </Form.Field>
          </Form>
        </Modal.Content>
        <Modal.Actions>
          <Button color="green" inverted onClick={handleSubmit}>
            <Icon name="checkmark" /> Add
          </Button>
          <Button color="red" inverted onClick={closeModal}>
            <Icon name="remove" /> Cancel
          </Button>
        </Modal.Actions>
      </Modal>
    </Fragment>
  );
}
