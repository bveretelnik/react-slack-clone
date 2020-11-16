import React, { useState } from "react";
import { Header, Segment, Input, Icon } from "semantic-ui-react";

export default function MessagesHeader({
  searchLoading,
  handleSearchChange,
  channelName,
  numUniqueUsers,
  isPrivateChannel,
}) {
  const [isChannelStarred, setIsChannelStarred] = useState(false);
  const handleStar = () => {
    setIsChannelStarred(!isChannelStarred);
  };
  return (
    <Segment clearing>
      {/* Channel Title */}
      <Header fliud="true" as="h2" floated="left" style={{ marginBottom: 0 }}>
        <span>
          {channelName()}
          {!isPrivateChannel && (
            <Icon
              onClick={() => handleStar()}
              name={isChannelStarred ? "star" : "star outline"}
              color={isChannelStarred ? "yellow" : "black"}
            />
          )}
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
