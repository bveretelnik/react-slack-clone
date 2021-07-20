import React, { useState } from "react";
import firebase from "../../firebase";
import { Grid, Header, Icon, Dropdown, Image } from "semantic-ui-react";
import { useSelector } from "react-redux";
import ChangeAvatarModal from "./ChangeAvatarModal";

const UserPanel = () => {
  const user = useSelector((state) => state.user.currentUser);
  const { secondaryColor } = useSelector((state) => state.colors);
  const [modal, setModal] = useState(false);

  const openModal = () => setModal(true);
  const closeModal = () => setModal(false);

  const dropdownOptions = () => [
    {
      key: "user",
      text: (
        <span>
          Signed in as <strong>{user && user.displayName}</strong>
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

  return (
    <>
      <Grid style={{ background: secondaryColor }}>
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
                    <Image src={user && user.photoURL} spaced="right" avatar />
                    {user && user.displayName}
                  </span>
                }
                options={dropdownOptions()}
              />
            </Header>
          </Grid.Row>
          {/* Change User Avatar Modal   */}
          <ChangeAvatarModal
            user={user}
            modal={modal}
            closeModal={closeModal}
          />
        </Grid.Column>
      </Grid>
    </>
  );
};

export default UserPanel;
