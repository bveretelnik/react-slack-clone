import React from "react";
import { useSelector } from "react-redux";
import { Header, Segment, Input, Icon } from "semantic-ui-react";

function MessagesHeader({
  channelName,
  numUniqueUsers,
  handleSearchChange,
  searchLoading,
  privateChannel,
  handleStar,
  isChannelStarred,
}) {
  const { primaryColor } = useSelector((state) => state.colors);
  return (
    <Segment clearing style={{ background: primaryColor }}>
      {/* Channel Title */}
      <Header
        fluid="true"
        as="h2"
        floated="left"
        style={{ marginBottom: 0, color: "white" }}
      >
        <span>
          {channelName}
          {!privateChannel && (
            <Icon
              onClick={handleStar}
              name={isChannelStarred ? "star" : "star outline"}
              color={isChannelStarred ? "yellow" : "grey"}
            />
          )}
        </span>
        <Header.Subheader style={{ color: "white" }}>
          {numUniqueUsers}
        </Header.Subheader>
      </Header>
      {/* Channel Search Input */}
      <Header floated="right">
        <Input
          loading={searchLoading}
          onChange={handleSearchChange}
          size="mini"
          icon="search"
          name="searchTerm"
          placeholder="Search Messages"
        />
      </Header>
    </Segment>
  );
}

export default MessagesHeader;
