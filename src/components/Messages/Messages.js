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
    privateMessagesRef: firebase.database().ref("privateMessages"),
    messagesRef: firebase.database().ref("messages"),
    messages: [],
    messagesLoading: true,
    numUniqueUsers: "",
    isChannelStarred: false,
    usersRef: firebase.database().ref("user"),
    searchTerm: "",
    searchLoading: false,
    searchResults: [],
  });

  useEffect(() => {
    if (channel.currentChannel && user.currentUser) {
      addMessageListener(channel.currentChannel.id);
      addUserStarsListener(channel.currentChannel.id, user.currentUser.uid);
    }
  }, [channel.currentChannel]);

  useEffect(() => {
    countUniqueUsers(search.messages);
  }, [search.messages]);

  useEffect(() => {
    if (search.searchTerm && search.searchLoading) handleSearchMessages();
  }, [search.searchTerm]);

  useEffect(() => {
    if (search.isChannelStarred) starChannel();
  }, [search.isChannelStarred]);

  const addMessageListener = (channelId) => {
    let loadedMessages = [];
    const ref = getMessagesRef();
    ref.child(channelId).on("child_added", (snap) => {
      loadedMessages.push(snap.val());
      if (search.messages) {
        setSearch({
          ...search,
          messages: loadedMessages,
          messagesLoading: false,
        });
      } else {
        setSearch({
          ...search,
          messages: [],
          messagesLoading: false,
        });
      }
    });
  };

  const getMessagesRef = () => {
    const { messagesRef, privateMessagesRef } = search;
    return channel.isPrivateChannel ? privateMessagesRef : messagesRef;
  };

  const addUserStarsListener = (channelId, userId) => {
    search.usersRef
      .child(userId)
      .child("starred")
      .once("value")
      .then((data) => {
        if (data.val() !== null) {
          const channelIds = Object.keys(data.val());
          const prevStarred = channelIds.includes(channelId);
          setSearch({
            ...search,
            isChannelStarred: prevStarred,
          });
        }
      });
  };

  const handleStar = () => {
    setSearch({
      ...search,
      isChannelStarred: !isChannelStarred,
    });
  };
  const starChannel = () => {
    if (search.isChannelStarred) {
      search.usersRef.child(`${user.currentUser.uid}/starred`).update({
        [channel.currentChannel.id]: {
          name: channel.currentChannel.name,
          details: channel.currentChannel.details,
          createdBy: {
            name: channel.currentChannel.createdBy.name,
            avatar: channel.currentChannel.createdBy.avatar,
          },
        },
      });
    } else {
      search.usersRef
        .child(`${user.currentUser.uid}/starred`)
        .child(channel.currentChannel.id)
        .remove((err) => {
          if (err !== null) {
            console.error(err);
          }
        });
    }
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

  const displayChannelName = (channel) => (channel ? `#${channel.name}` : " ");

  const {
    searchResults,
    searchLoading,
    searchTerm,
    messages,
    numUniqueUsers,
    isChannelStarred,
  } = search;
  return (
    <Fragment>
      <MessagesHeader
        channelName={() => displayChannelName(channel.currentChannel)}
        numUniqueUsers={numUniqueUsers}
        handleSearchChange={handleSearchChange}
        searchLoading={searchLoading}
        isPrivateChannel={channel.isPrivateChannel}
        handleStar={handleStar}
        isChannelStarred={isChannelStarred}
      />

      <Segment>
        <Comment.Group className="messages">
          {searchTerm
            ? displayMessages(searchResults)
            : displayMessages(messages)}
        </Comment.Group>
      </Segment>

      <MessagesForm getMessagesRef={getMessagesRef} />
    </Fragment>
  );
}
