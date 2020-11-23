import React, { Fragment, useEffect, useState } from "react";
import firebase from "../../firebase";
import { Segment, Comment } from "semantic-ui-react";
import MessagesForm from "./MessagesForm";
import MessagesHeader from "./MessagesHeader";
import DisplayMessage from "./DisplayMessage";

export default function Messages({ channel, setUserPost, user }) {
  const [state, setState] = useState({
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
    // eslint-disable-next-line
  }, [channel.currentChannel]);

  useEffect(() => {
    countUniqueUsers(state.messages);
    countUserPosts(state.messages);
    // eslint-disable-next-line
  }, [state.messages]);

  useEffect(() => {
    if (state.searchTerm && state.searchLoading) handleSearchMessages();
    // eslint-disable-next-line
  }, [state.searchTerm]);

  useEffect(() => {
    if (channel.currentChannel) starChannel();
    // eslint-disable-next-line
  }, [state.isChannelStarred]);

  const addMessageListener = (channelId) => {
    let loadedMessages = [];
    const ref = getMessagesRef();
    ref.child(channelId).on("child_added", (snap) => {
      loadedMessages.push(snap.val() ? snap.val() : null);
      setState({
        ...state,
        messages: loadedMessages,
        messagesLoading: false,
      });
    });
  };

  const getMessagesRef = () => {
    const { messagesRef, privateMessagesRef } = state;
    return channel.isPrivateChannel ? privateMessagesRef : messagesRef;
  };

  const addUserStarsListener = (channelId, userId) => {
    state.usersRef
      .child(userId)
      .child("starred")
      .once("value")
      .then((data) => {
        if (data.val() !== null) {
          const channelIds = Object.keys(data.val());
          const prevStarred = channelIds.includes(channelId);
          setState({
            ...state,
            isChannelStarred: prevStarred,
          });
        }
      });
  };

  const handleStar = () => {
    setState({
      ...state,
      isChannelStarred: !isChannelStarred,
    });
  };
  const starChannel = () => {
    if (state.isChannelStarred) {
      state.usersRef.child(`${user.currentUser.uid}/starred`).update({
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
      state.usersRef
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
    setState({
      ...state,
      searchTerm: e.target.value,
      searchLoading: true,
    });
  };
  const handleSearchMessages = () => {
    const { messages } = state;
    const channelMessages = [...messages];
    const regex = new RegExp(state.searchTerm, "gi");
    const searchResult = channelMessages.reduce((acc, message) => {
      if (
        (message.content && message.content.match(regex)) ||
        message.user.name.match(regex)
      ) {
        acc.push(message);
      }
      return acc;
    }, []);
    setState({
      ...state,
      searchResults: searchResult,
    });
    setTimeout(() => setState({ ...state, searchLoading: false }), 1000);
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
    setState({ ...state, numUniqueUsers: numUniqueUsers });
  };

  const countUserPosts = (messages) => {
    let userPosts = messages.reduce((acc, message) => {
      if (message.user.name in acc) {
        acc[message.user.name].count += 1;
      } else {
        acc[message.user.name] = {
          avatar: message.user.avatar,
          count: 1,
        };
      }
      return acc;
    }, {});
    setUserPost(userPosts);
  };

  const displayChannelName = (channel) => (channel ? `#${channel.name}` : " ");

  const {
    searchResults,
    searchLoading,
    searchTerm,
    messages,
    numUniqueUsers,
    isChannelStarred,
  } = state;
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
          <DisplayMessage
            searchTerm={searchTerm}
            searchResults={searchResults}
            messages={messages}
            user={user}
          />
        </Comment.Group>
      </Segment>

      <MessagesForm
        getMessagesRef={getMessagesRef}
        user={user}
        channel={channel}
      />
    </Fragment>
  );
}
