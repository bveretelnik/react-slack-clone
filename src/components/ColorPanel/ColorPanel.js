import React, { useState, useEffect } from "react";
import { Sidebar, Menu, Divider, Button } from "semantic-ui-react";

import ColorPanelModal from "./ColorPanelModal";
import UserColors from "./UserColors";

export default function ColorPanel({
  user,
  setColors,
  addListener,
  userColors,
  usersRef,
}) {
  const [state, setstate] = useState({
    modal: false,
    primary: "",
    secondary: "",
  });

  useEffect(() => {
    if (user) addListener(user.currentUser.uid);
    // eslint-disable-next-line
  }, []);

  const handleChangePrimary = (color) =>
    setstate({
      ...state,
      primary: color.hex,
    });

  const handleChangeSecondary = (color) =>
    setstate({
      ...state,
      secondary: color.hex,
    });

  const handleSaveColors = () => {
    if (state.primary && state.secondary) {
      saveColors(state.primary, state.secondary);
    }
  };
  const saveColors = (primary, secondary) => {
    usersRef
      .child(`${user.currentUser.uid}/colors`)
      .push()
      .update({
        primary,
        secondary,
      })
      .then(() => {
        console.log("Colors added");
        closeModal();
      })
      .catch((err) => console.error(err));
  };

  const openModal = () => setstate({ ...state, modal: true });
  const closeModal = () => setstate({ ...state, modal: false });

  const { modal, primary, secondary } = state;
  return (
    <Sidebar
      as={Menu}
      icon="labeled"
      inverted
      vertical
      visible
      width="very thin"
    >
      <Divider />
      <Button icon="add" size="small" color="blue" onClick={openModal} />

      <UserColors colors={userColors} setColors={setColors} />
      {/* Color Picker Modal */}
      <ColorPanelModal
        modal={modal}
        closeModal={closeModal}
        handleChangePrimary={handleChangePrimary}
        handleChangeSecondary={handleChangeSecondary}
        primary={primary}
        secondary={secondary}
        handleSaveColors={handleSaveColors}
      />

      <Divider />
      <Button
        icon="undo"
        size="small"
        color="red"
        onClick={() => setColors("#4c3c4c", "#eee")}
      />
      <Divider />
    </Sidebar>
  );
}
