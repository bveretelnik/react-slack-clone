import React, { useContext } from "react";
import "./App.css";
import { Grid } from "semantic-ui-react";
import ColorPanel from "./ColorPanel/ColorPanel";
import SidePanel from "./SidePanel/SidePanel";
import Messages from "./Messages/Messege/Messages";
import MetaPanel from "./MetaPanel/MetaPanel";
import { ChannelContext } from "./context/channel/channelContext";
import { ColorsContext } from "./context/colors/colorsContext";
import InformationPanel from "./MetaPanel/InformationPanel";
import { UserContext } from "./context/user/userContext";

function App() {
  const {
    channel,
    setUserPost,
    setCurrentChannel,
    setPrivateChannel,
  } = useContext(ChannelContext);
  const { user } = useContext(UserContext);
  const {
    colors: { primaryColor, secondaryColor, userColors, usersRef },
    setColors,
    addListener,
  } = useContext(ColorsContext);
  const { isPrivateChannel, currentChannel, userPosts } = channel;
  return (
    <Grid
      columns="equal"
      className="app"
      style={{ background: secondaryColor }}
    >
      <ColorPanel
        user={user}
        setColors={setColors}
        addListener={addListener}
        userColors={userColors}
        usersRef={usersRef}
      />
      <SidePanel
        primaryColor={primaryColor}
        user={user}
        setCurrentChannel={setCurrentChannel}
        setPrivateChannel={setPrivateChannel}
      />

      <Grid.Column style={{ marginLeft: 320 }}>
        <Messages channel={channel} setUserPost={setUserPost} user={user} />
      </Grid.Column>
      <Grid.Column width={4}>
        <MetaPanel
          key={currentChannel && currentChannel.id}
          currentChannel={currentChannel}
          isPrivateChannel={isPrivateChannel}
          userPosts={userPosts}
        />
        <InformationPanel />
      </Grid.Column>
    </Grid>
  );
}

export default App;
