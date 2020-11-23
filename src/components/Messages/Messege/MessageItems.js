import React, { Fragment } from "react";
import Message from "./Message";

export default function MessageItems({
  messages,
  searchTerm,
  searchResults,
  user,
}) {
  const displayMessages = (messages) => {
    return messages.length !== 0 ? (
      messages.map((message) => (
        <Message key={message.timestamp} message={message} user={user} />
      ))
    ) : (
      <h3>Empty</h3>
    );
  };
  return (
    <Fragment>
      {searchTerm ? displayMessages(searchResults) : displayMessages(messages)}
    </Fragment>
  );
}
