import React from "react";
import { connect } from "react-redux";
import "./App.css";
import ColorPanel from "../components/ColorPanel/ColorPanel";
import SidePanel from "../components/SidePanel/SidePanel";
import Messages from "../components/Messages/Messages";
import MetaPanel from "../components/MetaPanel.js/MetaPanel";
import { Grid } from "semantic-ui-react";
import MetaInfoPanel from "./MetaInfoPanel/MetaInfoPanel";

function App({ currentUser, currentChannel, isPrivateChannel, primaryColor }) {
  return (
    <Grid columns="equal" className="app" style={{ background: "#eee" }}>
      <ColorPanel key={currentUser && currentUser.name} user={currentUser} />
      <SidePanel key={currentUser && currentUser.uid} />

      <Grid.Column style={{ marginLeft: 320 }}>
        <Messages
          key={currentChannel && currentChannel.id}
          currentChannel={currentChannel}
          currentUser={currentUser}
          isPrivateChannel={isPrivateChannel}
          primaryColor={primaryColor}
        />
      </Grid.Column>

      <Grid.Column width={4}>
        <MetaPanel
          channel={currentChannel}
          key={currentChannel && currentChannel.name}
          privateChannel={isPrivateChannel}
        />
        <MetaInfoPanel />
      </Grid.Column>
    </Grid>
  );
}
const mapStateToProps = (state) => ({
  currentUser: state.user.currentUser,
  currentChannel: state.channel.currentChannel,
  isPrivateChannel: state.channel.isPrivateChannel,
  primaryColor: state.colors.primaryColor,
  secondaryColor: state.colors.secondaryColor,
});
export default connect(mapStateToProps)(App);
