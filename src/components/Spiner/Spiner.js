import React from "react";
import { Loader, Dimmer } from "semantic-ui-react";

export default function Spiner() {
  return (
    <Dimmer active>
      <Loader size="huge" content={"Preparing Chat..."} />
    </Dimmer>
  );
}
