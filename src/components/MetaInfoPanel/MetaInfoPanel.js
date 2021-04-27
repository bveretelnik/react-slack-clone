import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Segment, Accordion, Header, Icon, List } from "semantic-ui-react";

const MetaInfoPanel = () => {
  const [state, setState] = useState({ activeIndex: 0 });
  const { primaryColor } = useSelector((state) => state.colors);
  const setActiveIndex = (event, titleProps) => {
    const { index } = titleProps;
    const { activeIndex } = state;
    const newIndex = activeIndex === index ? -1 : index;
    setState({ ...state, activeIndex: newIndex });
  };

  const { activeIndex } = state;
  return (
    <>
      <Segment style={{ background: primaryColor }}>
        <Header
          as="h3"
          attached="top"
          style={{ background: primaryColor, color: "white" }}
        >
          Informations
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
            <Icon name="currency" />
            Currency
          </Accordion.Title>
          <Accordion.Content active={activeIndex === 0}>
            <List>
              <List.Item>
                <Icon name="usd" />
                USD - 28,10
              </List.Item>
              <List.Item>
                <Icon name="euro" />
                EUR - 33,40
              </List.Item>
            </List>
          </Accordion.Content>

          <Accordion.Title
            active={activeIndex === 1}
            index={1}
            style={{ color: "white" }}
            onClick={setActiveIndex}
          >
            <Icon name="dropdown" />
            <Icon name="skyatlas" />
            Weather
          </Accordion.Title>
          <Accordion.Content active={activeIndex === 1}></Accordion.Content>
        </Accordion>
      </Segment>
    </>
  );
};

export default MetaInfoPanel;
