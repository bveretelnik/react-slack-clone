import React, { useContext } from "react";
import { Header, Segment, Input, Icon } from "semantic-ui-react";
import { ChannelContext } from "../context/channel/channelContext";

export default function MessagesHeader({
  searchLoading,
  handleSearchChange,
  channelName,
  numUniqueUsers,
  isPrivateChannel,
}) {
  const { channel } = useContext(ChannelContext);

  return (
    <Segment clearing>
      {/* Channel Title */}
      <Header fliud="true" as="h2" floated="left" style={{ marginBottom: 0 }}>
        <span>
          {channelName()}
          {!isPrivateChannel && <Icon name={"star outline"} color="black" />}
        </span>
        <Header.Subheader>{numUniqueUsers}</Header.Subheader>
      </Header>

      {/* Channel Search Input */}
      <Header floated="right">
        <Input
          loading={searchLoading}
          onChange={handleSearchChange}
          sixe="mini"
          icon="search"
          name="searchTerm"
          placeholder="Search Messages"
        />
      </Header>
    </Segment>
  );
}
