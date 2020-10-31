import React, { Fragment, useState } from "react";
import { Segment, Comment } from "semantic-ui-react";
import firebase from "../../firebase";

import MessagesForm from "./MessagesForm";
import MessagesHeader from "./MessagesHeader";

export default function Messages() {
  const [messag, setMessag] = useState({
    messagesRef: firebase.database().ref("messages"),
    // channel: props.currentChannel,
    // user: props.currentUser,
  });
  const { messagesRef } = messag;
  return (
    <Fragment>
      <MessagesHeader />

      <Segment>
        <Comment.Group className="messages">{/* Messages */}</Comment.Group>
      </Segment>

      <MessagesForm
        messagesRef={messagesRef}
        // currentChannel={channel}
        // currentUser={user}
      />
    </Fragment>
  );
}
