import React, { Fragment, useState, useContext, useEffect } from "react";
import { Menu, Icon, Modal, Form, Input, Button } from "semantic-ui-react";
import { UserContext } from "../context/user/userContext";
import { ChannelContext } from "../context/channel/channelContext";

export default function Channels() {
  const { user } = useContext(UserContext);
<<<<<<< HEAD
  const {
    setCurrentChannel,
    setActiveChannel,
    openModal,
    closeModal,
    channel,
  } = useContext(ChannelContext);
  const {
    activeChannel,
    currentChannel,
    channelsRef,
    channels,
    firstLoad,
    modal,
  } = channel;
  const [value, setValue] = useState({
=======
  const { setCurrentChannel } = useContext(ChannelContext);
  const [channal, setChannal] = useState({
    activeChannel: "",
    user: user.currentUser,
    channels: [],
>>>>>>> 04cba0af2e4fdeb9e5720a89d2b36b29e726732a
    channelName: "",
    channelDetails: "",
  });

  useEffect(() => {
<<<<<<< HEAD
    setFirstChannel();
    //eslint-disable-next-line
  }, [channels]);
=======
    addListeners();
    // eslint-disable-next-line
  }, []);

  // useEffect(() => {
  //     setFirstChannel();
  //   // eslint-disable-next-line
  // }, []);

  // useEffect(() => {
  //   return () => {
  //     removeListeners();
  //   };
  //   // eslint-disable-next-line
  // }, [channel]);

  const addListeners = () => {
    let loadedChannels = [];
    channal.channelsRef.on("child_added", (snap) => {
      loadedChannels.push(snap.val());
      setChannal({ ...channal, channels: loadedChannels });
    });

    console.log(channal);
  };

  const removeListeners = () => {
    channal.channelsRef.off();
  };
>>>>>>> 04cba0af2e4fdeb9e5720a89d2b36b29e726732a

  const setFirstChannel = () => {
    const firstChannel = channels[0];
    if (firstLoad && channels.length > 0) {
      setCurrentChannel(firstChannel);
      setActiveChannel(firstChannel);
    }
<<<<<<< HEAD
=======
    setChannal({ ...channal, firstLoad: false });
    console.log(channal);
>>>>>>> 04cba0af2e4fdeb9e5720a89d2b36b29e726732a
  };

  const addChannel = () => {
    const key = channelsRef.push().key;
    const newChannel = {
      id: key,
      name: value.channelName,
      details: value.channelDetails,
      createdBy: {
<<<<<<< HEAD
        name: user.currentUser.displayName,
        avatar: user.currentUser.photoURL,
=======
        name: user.displayName,
        avatar: user.photoURL,
>>>>>>> 04cba0af2e4fdeb9e5720a89d2b36b29e726732a
      },
    };
    channelsRef
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
    setActiveChannel(channel);
    setCurrentChannel(channel);
  };
<<<<<<< HEAD

  const isFormValid = (channelName, channelDetails) =>
    channelName && channelDetails;
=======
  const setActiveChannel = (channel) => {
    setChannal({ ...channal, activeChannel: channel.id });
    console.log(channal);
  };
>>>>>>> 04cba0af2e4fdeb9e5720a89d2b36b29e726732a

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isFormValid(value.channelName, value.channelDetails)) {
      addChannel();
    }
  };

  const handleChange = (e) => {
    setValue({ ...value, [e.target.name]: e.target.value });
  };

  return (
    <Fragment>
      <Menu.Menu style={{ paddingBottom: "2em" }}>
        <Menu.Item>
          <span>
            <Icon name="exchange" />
            CHANNELS
          </span>{" "}
          ({channels.length ? channels.length : 0}){" "}
          <Icon name="add" onClick={openModal} />
        </Menu.Item>
        {channels.length > 0 &&
          channels.map((channel) => (
            <Menu.Item
              key={channel.id}
              onClick={() => changeChannel(channel)}
              name={channel.name}
              style={{ opacity: 0.7 }}
              active={channel.id === activeChannel}
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
