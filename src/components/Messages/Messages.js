import React, { Fragment, useContext, useEffect, useState } from "react";
import firebase from "../../firebase";
import { Segment, Comment } from "semantic-ui-react";
import { ChannelContext } from "../context/channel/channelContext";
import { UserContext } from "../context/user/userContext";
import Message from "./Message";
import MessagesForm from "./MessagesForm";
import MessagesHeader from "./MessagesHeader";

export default function Messages() {
  const { channel } = useContext(ChannelContext);
  const { user } = useContext(UserContext);
  const [search, setSearch] = useState({
    messagesRef: firebase.database().ref("messages"),
    messages: [],
    messagesLoading: true,
    numUniqueUsers: "",
    searchTerm: "",
    searchLoading: false,
    searchResults: null,
  });

  useEffect(() => {
    if (channel.currentChannel && user.currentUser)
      addMessageListener(channel.currentChannel.id);

    console.log(search);
  }, [channel.currentChannel]);
  useEffect(() => {
    countUniqueUsers(search.messages);
  }, [search.messages]);

  useEffect(() => {
    if (search.searchTerm && search.searchLoading) handleSearchMessages();
  }, [search.searchTerm]);

  const addMessageListener = (channelId) => {
    let loadedMessages = [];
    search.messagesRef.child(channelId).on("child_added", (snap) => {
      loadedMessages.push(snap.val());
      return setSearch({
        ...search,
        messages: loadedMessages,
        messagesLoading: false,
      });
    });
  };

  const handleSearchChange = (e) => {
    setSearch({
      ...search,
      searchTerm: e.target.value,
      searchLoading: true,
    });
  };
  const handleSearchMessages = () => {
    const { messages } = search;
    const channelMessages = [...messages];
    const regex = new RegExp(search.searchTerm, "gi");
    const searchResult = channelMessages.reduce((acc, message) => {
      if (
        (message.content && message.content.match(regex)) ||
        message.user.name.match(regex)
      ) {
        acc.push(message);
      }
      return acc;
    }, []);
    setSearch({
      ...search,
      searchResults: searchResult,
    });
    setTimeout(() => setSearch({ ...search, searchLoading: false }), 1000);
  };

  const countUniqueUsers = (messages) => {
    const uniqueUsers = messages.reduce((acc, message) => {
      if (!acc.includes(message.user.name)) {
        acc.push(message.user.name);
      }
      return acc;
    }, []);
    const plural = uniqueUsers.length > 1 || uniqueUsers.length === 0;
    const numUniqueUsers = `${uniqueUsers.length} user${plural ? "s" : ""}`;
    setSearch({ ...search, numUniqueUsers: numUniqueUsers });
  };

  const displayMessages = (messages) =>
    messages.length > 0 &&
    messages.map((message) => (
      <Message key={message.timestamp} message={message} user={user} />
    ));
  const displayChannelName = (channel) => (channel ? `#${channel.name}` : "");

  const {
    searchResults,
    searchLoading,
    searchTerm,
    messages,
    numUniqueUsers,
    messagesRef,
  } = search;
  return (
    <Fragment>
      <MessagesHeader
        displayChannelName={displayChannelName}
        numUniqueUsers={numUniqueUsers}
        handleSearchChange={handleSearchChange}
        searchLoading={searchLoading}
      />

      <Segment>
        <Comment.Group className="messages">
          {searchTerm
            ? displayMessages(searchResults)
            : displayMessages(messages)}
        </Comment.Group>
      </Segment>

      <MessagesForm messagesRef={messagesRef} />
    </Fragment>
  );
}
