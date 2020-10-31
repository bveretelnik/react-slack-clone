import React, { Fragment } from "react";
import { Segment, Comment } from "semantic-ui-react";
import MessagesForm from "./MessagesForm";
import MessagesHeader from "./MessagesHeader";

export default function Messages() {
  return (
    <Fragment>
      <MessagesHeader />

      <Segment>
        <Comment.Group className="messages">{/* Messages */}</Comment.Group>
      </Segment>

      <MessagesForm />
    </Fragment>
  );
}
