import React, { Fragment, useContext, useEffect } from "react";
import { Segment, Comment } from "semantic-ui-react";
import { ChannelContext } from "../context/channel/channelContext";
import { MessegesContext } from "../context/messeges/messegesContext";
import { UserContext } from "../context/user/userContext";
import Message from "./Message";
import MessagesForm from "./MessagesForm";
import MessagesHeader from "./MessagesHeader";

export default function Messages() {
  const { channel } = useContext(ChannelContext);
  const { user } = useContext(UserContext);
  const { addMessageListener, messege } = useContext(MessegesContext);
  const { messages } = messege;

  useEffect(() => {
    if (channel.currentChannel && user) {
      addMessageListener(channel.currentChannel.id);
    }
  }, [channel.currentChannel]);

  return (
    <Fragment>
      <MessagesHeader />

      <Segment>
        <Comment.Group className="messages">
          {messages.length > 0 &&
            messages.map((message) => (
              <Message key={message.timestamp} message={message} user={user} />
            ))}
        </Comment.Group>
      </Segment>

      <MessagesForm />
    </Fragment>
  );
}
