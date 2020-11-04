import React, { Fragment, useState, useContext, useEffect } from "react";
import { Menu, Icon, Modal, Form, Input, Button } from "semantic-ui-react";
import { UserContext } from "../context/user/userContext";
import { ChannelContext } from "../context/channel/channelContext";

export default function Channels() {
  const { user } = useContext(UserContext);
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
    channelName: "",
    channelDetails: "",
  });

  useEffect(() => {
    setFirstChannel();
    //eslint-disable-next-line
  }, [channels]);

  const setFirstChannel = () => {
    const firstChannel = channels[0];
    if (firstLoad && channels.length > 0) {
      setCurrentChannel(firstChannel);
      setActiveChannel(firstChannel);
    }
  };

  const addChannel = () => {
    const key = channelsRef.push().key;
    const newChannel = {
      id: key,
      name: value.channelName,
      details: value.channelDetails,
      createdBy: {
        name: user.currentUser.displayName,
        avatar: user.currentUser.photoURL,
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
    console.log(channel);
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
