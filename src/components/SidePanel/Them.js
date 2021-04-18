import React, { useState } from "react";
import { Checkbox, Grid, Icon } from "semantic-ui-react";

function Them() {
  const [them, setThem] = useState(true);
  return (
    <Grid.Row style={{ display: "flex" }}>
      <Checkbox slider onClick={() => setThem(!them)} />
      <div style={{ padding: "0px 15px 0px" }}>
        {them ? (
          <Icon name="sun" size="large" style={{ color: "white" }} />
        ) : (
          <Icon name="moon" size="large" style={{ color: "white" }} />
        )}
      </div>
    </Grid.Row>
  );
}

export default Them;
