import React, { useState, useEffect } from "react";
import firebase from "../../firebase";
import { Sidebar, Menu, Divider, Button } from "semantic-ui-react";
import { setColor } from "../redux/colors/colorAction";
import ModalColor from "./ModalColor";
import { connect, useDispatch, useSelector } from "react-redux";

function ColorPanel({ user }) {
  const { primaryColor } = useSelector((state) => state.colors);
  const initialState = {
    usersRef: firebase.database().ref("user"),
    userColors: [],
    modal: false,
    them: true,
  };
  const dispatch = useDispatch();
  const [state, setState] = useState(initialState);

  useEffect(() => {
    if (user) addListener(user.uid);
  }, []);

  const addListener = (userId) => {
    let userColors = [];
    state.usersRef.child(`${userId}/colors`).on("child_added", (snap) => {
      userColors.unshift(snap.val());
      setState({ ...state, userColors });
    });
  };

  const openModal = () => setState({ ...state, modal: true });
  const closeModal = () => setState({ ...state, modal: false });

  const displayUserColors = (colors) =>
    colors.length > 0 &&
    colors.map((color, i) => (
      <React.Fragment key={i}>
        <Divider />
        <div
          className="color__container"
          onClick={() => dispatch(setColor(color.primary, color.secondary))}
        >
          <div className="color__square" style={{ background: color.primary }}>
            <div
              className="color__overlay"
              style={{ background: color.secondary }}
            ></div>
          </div>
        </div>
      </React.Fragment>
    ));

  const { them, modal, userColors } = state;

  return (
    <Sidebar
      style={{ background: primaryColor }}
      as={Menu}
      icon="labeled"
      inverted
      vertical
      visible
      width="very thin"
    >
      <Divider />
      <Button icon="add" size="small" inverted onClick={openModal} />

      {displayUserColors(userColors)}
      <Divider />
      <Divider />
      <div>
        <Button
          onClick={() => dispatch(setColor("#121417", "#191A1C"))}
          icon="moon"
          inverted
          size="small"
        />
        <Divider />
        <Button
          onClick={() => dispatch(setColor("#350d36", "#3F0E40"))}
          icon="sun"
          inverted
          size="small"
        />
      </div>
      {/* Color Picker Modal */}
      <ModalColor user={user} closeModal={closeModal} modal={modal} />
    </Sidebar>
  );
}

export default connect(null, { setColor })(ColorPanel);
