import React from "react";
import { connect } from "react-redux";
import "./App.css";
import ColorPanel from "../components/ColorPanel/ColorPanel";
import SidePanel from "../components/SidePanel/SidePanel";
import Messages from "../components/Messages/Messages";
import MetaPanel from "../components/MetaPanel.js/MetaPanel";
import { Grid } from "semantic-ui-react";

function App({ currentUser, currentChannel, isPrivateChannel }) {
  return (
    <Grid columns="equal" className="app" style={{ background: "#eee" }}>
      <ColorPanel />
      <SidePanel key={currentUser && currentUser.uid} />

      <Grid.Column style={{ marginLeft: 320 }}>
        <Messages
          key={currentChannel && currentChannel.id}
          currentChannel={currentChannel}
          currentUser={currentUser}
          isPrivateChannel={isPrivateChannel}
        />
      </Grid.Column>

      <Grid.Column width={4}>
        <MetaPanel />
      </Grid.Column>
    </Grid>
  );
}
const mapStateToProps = (state) => ({
  currentUser: state.user.currentUser,
  currentChannel: state.channel.currentChannel,
  isPrivateChannel: state.channel.isPrivateChannel,
});
export default connect(mapStateToProps)(App);
