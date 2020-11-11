import React, { Fragment, useContext, useEffect, useState } from "react";
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
  const [search, setSearch] = useState({
    searchTerm: "",
    searchLoading: false,
    searchResults: null,
  });
  useEffect(() => {
    if (channel.currentChannel && user.currentUser) {
      addMessageListener(channel.currentChannel.id);
    }
    //eslint-disable-next-line
  }, [channel.currentChannel]);

  useEffect(() => {
    if (search.searchTerm && search.searchLoading) handleSearchMessages();
    console.log(search);
    //eslint-disable-next-line
  }, [search.searchTerm]);

  const handleSearchChange = (e) => {
    setSearch({
      ...search,
      searchTerm: e.target.value,
      searchLoading: true,
    });
  };
  const handleSearchMessages = () => {
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
  const { searchResults, searchLoading, searchTerm } = search;
  return (
    <Fragment>
      <MessagesHeader
        handleSearchChange={handleSearchChange}
        searchLoading={searchLoading}
      />

      <Segment>
        <Comment.Group className="messages">
          {searchResults && searchTerm !== ""
            ? searchResults.length > 0 &&
              searchResults.map((item) => (
                <Message key={item.timestamp} message={item} user={user} />
              ))
            : messages.length > 0 &&
              messages.map((message) => (
                <Message
                  key={message.timestamp}
                  message={message}
                  user={user}
                />
              ))}
        </Comment.Group>
      </Segment>

      <MessagesForm />
    </Fragment>
  );
}
