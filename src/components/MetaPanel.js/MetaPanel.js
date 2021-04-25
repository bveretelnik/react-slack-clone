import React, { useState } from "react";
import { useSelector } from "react-redux";
import {
  Segment,
  Accordion,
  Header,
  Icon,
  Image,
  List,
} from "semantic-ui-react";

function MetaPanel({ privateChannel, channel }) {
  const initialState = {
    activeIndex: 0,
  };
  const [state, setState] = useState(initialState);
  const userPosts = useSelector((state) => state.channel.userPosts);
  const { primaryColor } = useSelector((state) => state.colors);
  const setActiveIndex = (event, titleProps) => {
    const { index } = titleProps;
    const { activeIndex } = state;
    const newIndex = activeIndex === index ? -1 : index;
    setState({ ...state, activeIndex: newIndex });
  };

  const formatCount = (num) =>
    num > 1 || num === 0 ? `${num} posts` : `${num} post`;

  const displayTopPosters = (posts) =>
    Object.entries(posts)
      .sort((a, b) => b[1] - a[1])
      .map(([key, val], i) => (
        <List.Item key={i}>
          <Image avatar src={val.avatar} />
          <List.Content>
            <List.Header as="a">{key}</List.Header>
            <List.Description style={{ color: "white" }}>
              {formatCount(val.count)}
            </List.Description>
          </List.Content>
        </List.Item>
      ))
      .slice(0, 5);

  const { activeIndex } = state;
  return (
    !privateChannel && (
      <Segment loading={!channel} style={{ background: primaryColor }}>
        <Header
          as="h3"
          attached="top"
          style={{ background: primaryColor, color: "white" }}
        >
          About # {channel && channel.name}
        </Header>
        <Accordion
          styled
          attached="true"
          style={{ background: primaryColor, color: "white" }}
        >
          <Accordion.Title
            active={activeIndex === 0}
            index={0}
            style={{ color: "white" }}
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
            style={{ color: "white" }}
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
            style={{ color: "white" }}
            onClick={setActiveIndex}
          >
            <Icon name="dropdown" />
            <Icon name="pencil alternate" />
            Created By
          </Accordion.Title>
          <Accordion.Content active={activeIndex === 2}>
            <Header style={{ color: "white" }}>
              <Image circular src={channel && channel.createdBy.avatar} />
              {channel && channel.createdBy.name}
            </Header>
          </Accordion.Content>
        </Accordion>
      </Segment>
    )
  );
}

export default MetaPanel;
