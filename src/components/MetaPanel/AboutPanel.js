import React, { useState } from "react";
import { Accordion, Icon, Segment } from "semantic-ui-react";

export default function AboutPanel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const handleClick = (e, titlePost) => {
    const { index } = titlePost;
    const newIndex = activeIndex === index ? -1 : index;
    setActiveIndex(newIndex);
  };
  return (
    <Segment inverted>
      <Accordion inverted>
        <Accordion.Title
          active={activeIndex === 0}
          index={0}
          onClick={handleClick}
        >
          <Icon name="dropdown" />
          Weather in Kyiv
        </Accordion.Title>
        <Accordion.Content active={activeIndex === 0}>
          <p>+6° Cloudy</p>
        </Accordion.Content>

        <Accordion.Title
          active={activeIndex === 1}
          index={1}
          onClick={handleClick}
        >
          <Icon name="dropdown" />
          Currency USD
        </Accordion.Title>
        <Accordion.Content active={activeIndex === 1}>
          <p>28.28</p>
        </Accordion.Content>
      </Accordion>
    </Segment>
  );
}
