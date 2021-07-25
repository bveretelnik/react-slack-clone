import React, { useState, useEffect } from "react";
import firebase from "../../firebase";
import { Sidebar, Menu, Divider, Button } from "semantic-ui-react";
import { setColor } from "../redux/colors/colorAction";
import ModalColor from "./ModalColor";
import { connect, useDispatch, useSelector } from "react-redux";
import InfoModal from "./InfoModal";
import axios from "axios";

function ColorPanel({ user }) {
  const { primaryColor } = useSelector((state) => state.colors);
  const initialState = {
    usersRef: firebase.database().ref("user"),
    userColors: [],
    modal: false,
    infoModal: false,
    them: true,
    removeColors: true,
  };
  const dispatch = useDispatch();
  const [state, setState] = useState(initialState);

  useEffect(() => {
    if (user) {
      addListener(user.uid);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.removeColors]);

  useEffect(() => {
    if (user) {
      return () => removeListener();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const removeListener = () => {
    state.usersRef.child(`${user.uid}/colors`).off();
  };

  const addListener = (userId) => {
    let userColors = [];

    return state.usersRef
      .child(`${userId}/colors`)
      .on("child_added", (snap) => {
        userColors.unshift(snap.val());
        setState((prevState) => ({
          ...prevState,
          userColors,
          removeColors: true,
        }));
      });
  };

  const openModal = () => setState({ ...state, modal: true });
  const closeModal = () => setState({ ...state, modal: false });
  const openInfoModal = () => setState({ ...state, infoModal: true });
  const closeInfoModal = () => setState({ ...state, infoModal: false });

  const setThem = () => {
    setState({ ...state, them: !state.them });
    if (them) {
      dispatch(setColor("#121417", "#191A1C"));
    } else {
      dispatch(setColor("#350d36", "#3F0E40"));
    }
  };

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

  const removeAllThems = async () => {
    await axios.delete(
      `${process.env.REACT_APP_FIREBASE_DATABASE_URL}/user/${user.uid}/colors.json`
    );
    setState((prevState) => ({
      ...prevState,
      userColors: [],
      removeColors: false,
    }));
    dispatch(setColor("#350d36", "#3F0E40"));
  };

  function addColor(newColor) {
    setState((prevState) => ({
      ...prevState,
      userColors: [...prevState.userColors, newColor],
    }));
  }

  const { infoModal, them, modal, userColors } = state;
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

      <Button
        disabled={userColors.length === 0}
        icon="caret up"
        color="red"
        size="small"
        onClick={removeAllThems}
      />

      <Divider />
      <div style={{ position: "absolute", bottom: "30px" }}>
        <Divider />
        <Button
          onClick={setThem}
          icon={them ? "moon" : "sun"}
          inverted
          size="small"
        />
        <Divider />

        <Button
          onClick={openInfoModal}
          icon={"info circle"}
          inverted
          color="blue"
          size="small"
        />
      </div>
      {/* Color Picker Modal */}
      <ModalColor
        user={user}
        closeModal={closeModal}
        modal={modal}
        onAddColor={addColor}
      />
      {/* Info  Modal */}
      <InfoModal closeModal={closeInfoModal} modal={infoModal} />
    </Sidebar>
  );
}

export default connect(null, { setColor })(ColorPanel);
