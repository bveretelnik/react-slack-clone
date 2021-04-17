import React from "react";
import { Header, Segment, Input, Icon } from "semantic-ui-react";

function MessagesHeader() {
  return (
    <Segment clearing style={{ background: "#350d36" }}>
      {/* Channel Title */}
      <Header
        fluid="true"
        as="h2"
        floated="left"
        style={{ marginBottom: 0, color: "white" }}
      >
        <span>
          Channel
          <Icon name={"star outline"} color="white" />
        </span>
        <Header.Subheader style={{ color: "white" }}>2 Users</Header.Subheader>
      </Header>

      {/* Channel Search Input */}
      <Header floated="right">
        <Input
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
