import React, { useContext, useState } from "react";
import firebase from "../../firebase";
import { Grid, Header, Icon, Dropdown, Image } from "semantic-ui-react";
import { UserContext } from "../context/user/userContext";

import ModalChangeAvatar from "./ModalChangeAvatar";

export default function UserPanel({ primaryColor }) {
  const { user } = useContext(UserContext);
  const [modal, setModal] = useState(false);

  const openModal = () => setModal(true);
  const closeModal = () => setModal(false);
  const dropdownOptions = () => [
    {
      key: "user",
      text: (
        <span>
          Signed in as <strong>{user.currentUser.displayName}</strong>
        </span>
      ),
      disabled: true,
    },
    {
      key: "avatar",
      text: <span onClick={openModal}>Change Avatar</span>,
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

  const { currentUser } = user;
  return (
    <Grid style={{ background: primaryColor }}>
      <Grid.Column>
        <Grid.Row style={{ padding: "1.2em", margin: 0 }}>
          {/* App Header */}
          <Header inverted floated="left" as="h2">
            <Icon name="code" />
            <Header.Content>SlackChat</Header.Content>
          </Header>

          {/* User Dropdown */}
          <Header style={{ padding: "0.25em" }} as="h4" inverted>
            <Dropdown
              trigger={
                <span>
                  <Image src={currentUser.photoURL} spaced="right" avatar />
                  {currentUser.displayName}
                </span>
              }
              options={dropdownOptions()}
            />
          </Header>
        </Grid.Row>
        {/* Change User Avatar Modal   */}
        <ModalChangeAvatar modal={modal} closeModal={closeModal} />
      </Grid.Column>
    </Grid>
  );
}
