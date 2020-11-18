import React, { useContext } from "react";
import "./App.css";
import { Grid } from "semantic-ui-react";
import ColorPanel from "./ColorPanel/ColorPanel";
import SidePanel from "./SidePanel/SidePanel";
import Messages from "./Messages/Messages";
import MetaPanel from "./MetaPanel/MetaPanel";
import { ChannelContext } from "./context/channel/channelContext";

function App() {
  const { channel } = useContext(ChannelContext);
  const { isPrivateChannel, currentChannel } = channel;
  return (
    <Grid columns="equal" className="app" style={{ background: "#eee" }}>
      <ColorPanel />
      <SidePanel />

      <Grid.Column style={{ marginLeft: 320 }}>
        <Messages />
      </Grid.Column>
      <Grid.Column width={4}>
        <MetaPanel
          key={currentChannel && currentChannel.id}
          isPrivateChannel={isPrivateChannel}
        />
      </Grid.Column>
    </Grid>
  );
}

export default App;
