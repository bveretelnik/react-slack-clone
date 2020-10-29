import React, { useContext } from "react";
import firebase from "../../firebase";
import { Grid, Header, Icon, Dropdown } from "semantic-ui-react";
import { UserContext } from "../context/user/userContext";

export default function UserPanel() {
  const { state } = useContext(UserContext);
  // const [userData, setUserData] = useState({
  //   user: state.currentUser,
  // });
  const dropdownOptions = () => [
    {
      key: "user",
      text: (
        <span>
          Signed in as <strong>{state.currentUser.displayName}</strong>
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
    <Grid style={{ background: "#4c3c4c" }}>
      <Grid.Column>
        <Grid.Row style={{ padding: "1.2em", margin: 0 }}>
          {/* App Header */}
          <Header inverted floated="left" as="h2">
            <Icon name="code" />
            <Header.Content>SlackChat</Header.Content>
          </Header>
        </Grid.Row>
        {/* User Dropdown */}
        <Header style={{ padding: "0.25em" }} as="h4" inverted>
          <Dropdown
            trigger={<span>{state.currentUser.displayName}</span>}
            options={dropdownOptions()}
          />
        </Header>
      </Grid.Column>
    </Grid>
  );
}
