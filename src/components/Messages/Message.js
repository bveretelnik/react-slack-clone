import React from "react";
import moment from "moment";
import { Comment } from "semantic-ui-react";

export default function Message({ message, user }) {
  const isOwnMessage = (message, user) => {
<<<<<<< HEAD
    return message.user.id === user.id ? "message__self" : "";
=======
    return message.user.id === user.uid ? "message__self" : "";
>>>>>>> 04cba0af2e4fdeb9e5720a89d2b36b29e726732a
  };
  const timeFromNow = (timestamp) => moment(timestamp).fromNow();

  return (
    <Comment>
      <Comment.Avatar src={message.user.avatar} />
      <Comment.Content className={isOwnMessage(message, user)}>
        <Comment.Author as="a">{message.user.name}</Comment.Author>
        <Comment.Metadata>{timeFromNow(message.timestamp)}</Comment.Metadata>
        <Comment.Text>{message.content}</Comment.Text>
      </Comment.Content>
    </Comment>
  );
}
