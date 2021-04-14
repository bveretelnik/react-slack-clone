import React, { Fragment } from "react";
import Typing from "../Typing";
import Message from "./Message";

export default function MessageItems({
  messages,
  searchTerm,
  searchResults,
  user,
  typingUsers,
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

  const displayTypingUsers = (users) => {
    users.length > 0 &&
      users.map((user) => (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: "0.2em",
          }}
          key={user.id}
        >
          <span className="user__typing">{user.name} is typing</span> <Typing />
        </div>
      ));
  };
  return (
    <Fragment>
      {searchTerm ? displayMessages(searchResults) : displayMessages(messages)}
      {displayTypingUsers(typingUsers)}
    </Fragment>
  );
}
