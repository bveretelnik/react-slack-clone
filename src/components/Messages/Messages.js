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
    channal: channel.currentChannel,
    user: user.currentUser,
  });

<<<<<<< HEAD
  const addListeners = (channelId) => {
    setMessag({ ...messag, channal: channel.currentChannel });
=======
  useEffect(() => {
    const { channal, user } = messag;
    if (channal && user) {
      addListeners(channal.id);
    }
    // eslint-disable-next-line
  }, []);

  const addListeners = (channelId) => {
>>>>>>> 04cba0af2e4fdeb9e5720a89d2b36b29e726732a
    addMessageListener(channelId);
  };

  const addMessageListener = (channelId) => {
    let loadedMessages = [];
    messag.messagesRef.child(channelId).on("child_added", (snap) => {
      loadedMessages.push(snap.val());
      setMessag({
<<<<<<< HEAD
        ...messag,
=======
>>>>>>> 04cba0af2e4fdeb9e5720a89d2b36b29e726732a
        messages: loadedMessages,
        messagesLoading: false,
      });
    });
    console.log(messag);
  };
<<<<<<< HEAD
=======
  // displayMessages = messages =>
  // messages.length > 0 &&
  // messages.map(message => (
  //   <Message
  //     key={message.timestamp}
  //     message={message}
  //     user={this.state.user}
  //   />
  // ));
>>>>>>> 04cba0af2e4fdeb9e5720a89d2b36b29e726732a

  const { messagesRef, messages } = messag;
  return (
    <Fragment>
      <MessagesHeader />

      <Segment>
        <Comment.Group className="messages">
          {messages.length > 0 &&
            messages.map((message) => (
              <Message
                key={message.timestamp}
                message={message}
                user={messag.user}
              />
            ))}
        </Comment.Group>
      </Segment>

      <MessagesForm messagesRef={messagesRef} />
    </Fragment>
  );
}
