import React, { useState } from "react";
import { Segment, Accordion, Header, Icon } from "semantic-ui-react";

export default function MetaPanel({ isPrivateChannel }) {
  const [state, setstate] = useState({
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

  const { privateChannel, activeIndex } = state;
  return privateChannel ? null : (
    <Segment>
      <Header as="h3" attached="top">
        About # Channel
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
          details
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
          posters
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
          creator
        </Accordion.Content>
      </Accordion>
    </Segment>
  );
}
