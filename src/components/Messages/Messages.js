import React, { Fragment, useState, useEffect, useContext } from "react";
import { Segment, Comment } from "semantic-ui-react";
import firebase from "../../firebase";
import { ChannelContext } from "../context/channel/channelContext";
import { UserContext } from "../context/user/userContext";
import Message from "./Message";
import MessagesForm from "./MessagesForm";
import MessagesHeader from "./MessagesHeader";

export default function Messages() {
  const { channel } = useContext(ChannelContext);
  const { user } = useContext(UserContext);
  const [messag, setMessag] = useState({
    messagesRef: firebase.database().ref("messages"),
    messages: [],
    messagesLoading: true,
    channel: channel.currentChannel,
    user: user.currentUser,
  });

  useEffect(() => {
    const { channel, user } = messag;
    if (channel && user) {
      addListeners(channel.id);
    }
    // eslint-disable-next-line
  }, []);
  const addListeners = (channelId) => {
    addMessageListener(channelId);
  };

  const addMessageListener = (channelId) => {
    let loadedMessages = [];
    messag.messagesRef.child(channelId).on("child_added", (snap) => {
      loadedMessages.push(snap.val());
      setMessag({
        messages: loadedMessages,
        messagesLoading: false,
      });
    });
  };
  // displayMessages = messages =>
  // messages.length > 0 &&
  // messages.map(message => (
  //   <Message
  //     key={message.timestamp}
  //     message={message}
  //     user={this.state.user}
  //   />
  // ));

  const { messagesRef, messages } = messag;
  return (
    <Fragment>
      <MessagesHeader />

      <Segment>
        <Comment.Group className="messages">
          {messages.length > 0 &&
            messages.map((message) => {
              <Message
                key={message.timestamp}
                message={message}
                user={messag.user}
              />;
            })}
        </Comment.Group>
      </Segment>

      <MessagesForm
        messagesRef={messagesRef}
        // currentChannel={channel}
        // currentUser={user}
        //s
      />
    </Fragment>
  );
}
