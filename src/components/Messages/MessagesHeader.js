import React from "react";
import { Header, Segment, Input, Icon } from "semantic-ui-react";

export default function MessagesHeader({
  searchLoading,
  handleSearchChange,
  channelName,
  numUniqueUsers,
  isPrivateChannel,
  handleStar,
  isChannelStarred,
}) {
  return (
    <Segment clearing>
      {/* Channel Title */}
      <Header fliud="true" as="h2" floated="left" style={{ marginBottom: 0 }}>
        <span>
          {channelName()}
          {!isPrivateChannel && (
            <Icon
              onClick={handleStar}
              name={isChannelStarred ? "star" : "star outline"}
              color={isChannelStarred ? "yellow" : "black"}
            />
          )}
        </span>
        <Header.Subheader>
          {!isPrivateChannel && numUniqueUsers}
        </Header.Subheader>
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
