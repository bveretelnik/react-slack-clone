import React, { useContext } from "react";
import "./App.css";
import { Grid } from "semantic-ui-react";
import ColorPanel from "./ColorPanel/ColorPanel";
import SidePanel from "./SidePanel/SidePanel";
import Messages from "./Messages/Messages";
import MetaPanel from "./MetaPanel/MetaPanel";
import { ChannelContext } from "./context/channel/channelContext";
import { ColorsContext } from "./context/colors/colorsContext";

function App() {
  const { channel } = useContext(ChannelContext);
  const { colors } = useContext(ColorsContext);
  const { primaryColor, secondaryColor } = colors;
  const { isPrivateChannel, currentChannel, userPosts } = channel;
  return (
    <Grid
      columns="equal"
      className="app"
      style={{ background: secondaryColor }}
    >
      <ColorPanel />
      <SidePanel primaryColor={primaryColor} />

      <Grid.Column style={{ marginLeft: 320 }}>
        <Messages />
      </Grid.Column>
      <Grid.Column width={4}>
        <MetaPanel
          key={currentChannel && currentChannel.id}
          currentChannel={currentChannel}
          isPrivateChannel={isPrivateChannel}
          userPosts={userPosts}
        />
      </Grid.Column>
    </Grid>
  );
}

export default App;
