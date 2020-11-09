import React, { useContext, useEffect } from "react";
import { Header, Segment, Input, Icon } from "semantic-ui-react";
import { ChannelContext } from "../context/channel/channelContext";
import { MessegesContext } from "../context/messeges/messegesContext";

export default function MessagesHeader() {
  const { channel } = useContext(ChannelContext);
  const { messege, displayChannelName } = useContext(MessegesContext);

  const { numUniqueUsers } = messege;
  return (
    <Segment clearing>
      {/* Channel Title */}
      <Header fliud="true" as="h2" floated="left" style={{ marginBottom: 0 }}>
        <span>
          {displayChannelName(channel.currentChannel)}
          <Icon name={"star outline"} color="black" />
        </span>
        <Header.Subheader>{numUniqueUsers}</Header.Subheader>
      </Header>

      {/* Channel Search Input */}
      <Header floated="right">
        <Input
          sixe="mini"
          icon="search"
          name="searchTerm"
          placeholder="Search Messages"
        />
      </Header>
    </Segment>
  );
}
