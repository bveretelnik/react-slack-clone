import firebase from "../../firebase";
import React, { Fragment, useState, useContext, useEffect } from "react";
import { Menu, Icon, Modal, Form, Input, Button } from "semantic-ui-react";
import { UserContext } from "../context/user/userContext";
import { ChannelContext } from "../context/channel/channelContext";

export default function Channels() {
  const { state } = useContext(UserContext);
  const { setCurrentChannel } = useContext(ChannelContext);
  const [channal, setChannal] = useState({
    activeChannel: "",
    user: state.currentUser,
    channels: [],
    channelName: "",
    channelDetails: "",
    channelsRef: firebase.database().ref("channels"),
    modal: false,
    firstLoad: true,
  });

  useEffect(() => {
    addListeners();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    setFirstChannel();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    return () => {
      removeListeners();
    };
    // eslint-disable-next-line
  }, []);

  const addListeners = () => {
    let loadedChannels = [];
    channal.channelsRef.on("child_added", (snap) => {
      loadedChannels.push(snap.val());
      setChannal({ ...channal, channels: loadedChannels });
    });
  };

  const removeListeners = () => {
    channal.channelsRef.off();
  };

  const setFirstChannel = () => {
    const firstChannel = channal.channels[0];
    if (channal.firstLoad && channal.channels.length > 0) {
      setCurrentChannel(firstChannel);
      setActiveChannel(firstChannel);
    }
    setChannal({ ...channal, firstLoad: false });
  };

  const addChannel = () => {
    const { channelsRef, channelName, channelDetails, user } = channal;
    const key = channelsRef.push().key;

    const newChannel = {
      id: key,
      name: channelName,
      details: channelDetails,
      createdBy: {
        nam: user.displayName,
        avatar: user.photoURL,
      },
    };

    channelsRef
      .child(key)
      .update(newChannel)
      .then(() => {
        setChannal({ ...channal, channelName: "", channelDetails: "" });
        closeModal();
        console.log("channel added");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //   const displayChannels = (channels) => {
  //     channels.length > 0 &&
  //       channels.map((channel) => (
  //         <Menu.Item
  //           key={channel.id}
  //           onClick={() => console.log(channel)}
  //           name={channel.name}
  //           style={{ opacity: 0.7 }}
  //         >
  //           # {channel.name}
  //         </Menu.Item>
  //       ));
  //   };

  const changeChannel = (channel) => {
    setActiveChannel(channel);
    setCurrentChannel(channel);
  };
  const setActiveChannel = (channel) => {
    setChannal({ ...channal, activeChannel: channel.id });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isFormValid(channal)) {
      addChannel();
    }
  };
  const isFormValid = ({ channelName, channelDetails }) =>
    channelName && channelDetails;

  const handleChange = (e) => {
    setChannal({ ...channal, [e.target.name]: e.target.value });
  };
  const openModal = () => setChannal({ ...channal, modal: true });
  const closeModal = () => setChannal({ ...channal, modal: false });

  const { channels, modal } = channal;
  return (
    <Fragment>
      <Menu.Menu style={{ paddingBottom: "2em" }}>
        <Menu.Item>
          <span>
            <Icon name="exchange" />
            CHANNELS
          </span>{" "}
          ({channels.length}) <Icon name="add" onClick={openModal} />
        </Menu.Item>
        {channels.length > 0 &&
          channels.map((channel) => (
            <Menu.Item
              key={channel.id}
              onClick={() => changeChannel(channel)}
              name={channel.name}
              style={{ opacity: 0.7 }}
              active={channel.id === channal.activeChannel}
            >
              # {channel.name}
            </Menu.Item>
          ))}
      </Menu.Menu>

      {/* Add Channel Modal */}
      <Modal basic open={modal} onClose={closeModal}>
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
