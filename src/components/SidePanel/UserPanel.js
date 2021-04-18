import React from "react";
import firebase from "../../firebase";
import { Grid, Header, Icon, Dropdown, Image } from "semantic-ui-react";
import { useSelector } from "react-redux";
import Them from "./Them";

const UserPanel = () => {
  const user = useSelector((state) => state.user.currentUser);

  const dropdownOptions = () => [
    {
      key: "user",
      text: (
        <span>
          Signed in as <strong>{user.displayName}</strong>
        </span>
      ),
      disabled: true,
    },
    {
      key: "avatar",
      text: <span>Change Avatar</span>,
    },
    {
      key: "signout",
      text: <span onClick={handleSignout}>Sign Out</span>,
    },
  ];

  const handleSignout = () => {
    firebase
      .auth()
      .signOut()
      .then(() => console.log("signed out!"));
  };

  return (
    <>
      <Grid style={{ background: "#3F0E40" }}>
        <Grid.Column>
          <Grid.Row style={{ padding: "1.2em", margin: 0 }}>
            {/* App Header */}
            <Header inverted floated="left" as="h2">
              <Icon name="slack hash" />
              <Header.Content>SlackChat</Header.Content>
            </Header>

            {/* User Dropdown  */}
            <Header style={{ padding: "0.25em" }} as="h4" inverted>
              <Dropdown
                trigger={
                  <span>
                    <Image src={user.photoURL} spaced="right" avatar />
                    {user.displayName}
                  </span>
                }
                options={dropdownOptions()}
              />
            </Header>
          </Grid.Row>
          <Them />
        </Grid.Column>
      </Grid>
    </>
  );
};

export default UserPanel;
