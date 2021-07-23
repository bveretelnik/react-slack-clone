import axios from "axios";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Segment, Accordion, Header, Icon, List } from "semantic-ui-react";

const MetaInfoPanel = () => {
  const [currency, setCurrency] = useState("");
  const [weather, setWeather] = useState("");
  const [state, setState] = useState({ activeIndex: 0 });

  const { primaryColor } = useSelector((state) => state.colors);

  const setActiveIndex = (event, titleProps) => {
    const { index } = titleProps;
    const { activeIndex } = state;
    const newIndex = activeIndex === index ? -1 : index;
    setState({ ...state, activeIndex: newIndex });
  };

  const getCurrency = async () => {
    return await axios
      .get(
        "https://bank.gov.ua/NBUStatService/v1/statdirectory/exchangenew?json"
      )
      .then((res) =>
        setCurrency(
          res.data.filter((item) => item.cc === "EUR" || item.cc === "USD")
        )
      )
      .catch((err) => console.log(err));
  };

  const getWeather = async () => {
    return await axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=Kyiv&appid=${process.env.REACT_APP_WEATHER_KEY}`
      )
      .then((res) => {
        setWeather(res.data.weather[0]);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getCurrency();
    getWeather();
  }, []);

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
                {currency && `UDS - ${currency[0].rate}`}
              </List.Item>
              <List.Item>
                <Icon name="euro" />
                {currency && `EUR - ${currency[1].rate}`}
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
          <Accordion.Content active={activeIndex === 1}>
            {weather && weather.description}
          </Accordion.Content>
        </Accordion>
      </Segment>
    </>
  );
};

export default MetaInfoPanel;
