import React, { useState } from "react";
import {
  Segment,
  Accordion,
  Header,
  Icon,
  Image,
  List,
} from "semantic-ui-react";

export default function MetaPanel({
  isPrivateChannel,
  currentChannel,
  userPosts,
}) {
  const [state, setstate] = useState({
    channel: currentChannel,
    privateChannel: isPrivateChannel,
    activeIndex: 0,
  });
  const setActiveIndex = (event, titleProps) => {
    const { index } = titleProps;
    const { activeIndex } = state;
    const newIndex = activeIndex === index ? -1 : index;
    setstate({
      ...state,
      activeIndex: newIndex,
    });
  };
  const formatCount = (num) =>
    num > 1 || num === 0 ? `${num} posts` : `${num} post`;

  const displayTopPosters = (post) => {
    return Object.entries(post)
      .sort((a, b) => b[1] - a[1])
      .map(([key, val], i) => (
        <List.Item key={i}>
          <Image avatar src={val.avatar} />
          <List.Content>
            <List.Header as="a">{key}</List.Header>
            <List.Description>{formatCount(val.count)}</List.Description>
          </List.Content>
        </List.Item>
      ))
      .slice(0, 5);
  };

  const { privateChannel, activeIndex, channel } = state;
  return privateChannel ? null : (
    <Segment loading={!channel}>
      <Header as="h3" attached="top">
        About # {channel && channel.name}
      </Header>
      <Accordion styled attached="true">
        <Accordion.Title
          active={activeIndex === 0}
          index={0}
          onClick={setActiveIndex}
        >
          <Icon name="dropdown" />
          <Icon name="info" />
          Channel Details
        </Accordion.Title>
        <Accordion.Content active={activeIndex === 0}>
          {channel && channel.details}
        </Accordion.Content>

        <Accordion.Title
          active={activeIndex === 1}
          index={1}
          onClick={setActiveIndex}
        >
          <Icon name="dropdown" />
          <Icon name="user circle" />
          Top Posters
        </Accordion.Title>
        <Accordion.Content active={activeIndex === 1}>
          <List>{userPosts && displayTopPosters(userPosts)}</List>
        </Accordion.Content>

        <Accordion.Title
          active={activeIndex === 2}
          index={2}
          onClick={setActiveIndex}
        >
          <Icon name="dropdown" />
          <Icon name="pencil alternate" />
          Created by
        </Accordion.Title>
        <Accordion.Content active={activeIndex === 2}>
          <Header as="h3">
            <Image circular src={channel && channel.createdBy.avatar} />
            {channel && channel.createdBy.name}
          </Header>
        </Accordion.Content>
      </Accordion>
    </Segment>
  );
}
