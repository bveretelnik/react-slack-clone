import React, { useRef, useState, useEffect } from "react";
import { Grid, Icon, Modal, Input, Button, Image } from "semantic-ui-react";
import firebase from "../../firebase";
import AvatarEditor from "react-avatar-editor";

function ChangeAvatarModal({ user, modal, closeModal }) {
  const initialState = {
    previewImage: "",
    croppedImage: "",
    blob: "",
    uploadedCroppedImage: "",
    storageRef: firebase.storage().ref(),
    userRef: firebase.auth().currentUser,
    usersRef: firebase.database().ref("user"),
    metadata: {
      contentType: "image/jpeg",
    },
  };
  const [state, setState] = useState(initialState);
  let avatarEd = useRef(null);

  useEffect(() => {
    if (state.uploadedCroppedImage) changeAvatar();
  }, [state.uploadedCroppedImage]);

  const uploadCroppedImage = () => {
    const { storageRef, userRef, blob, metadata } = state;

    storageRef
      .child(`avatars/user-${userRef.uid}`)
      .put(blob, metadata)
      .then((snap) => {
        snap.ref.getDownloadURL().then((downloadURL) => {
          setState({ ...state, uploadedCroppedImage: downloadURL });
          //   changeAvatar();
        });
      });
  };

  const changeAvatar = () => {
    state.userRef
      .updateProfile({
        photoURL: state.uploadedCroppedImage,
      })
      .then(() => {
        console.log("PhotoURL updated");
        closeModal();
      })
      .catch((err) => {
        console.error(err);
      });

    state.usersRef
      .child(user.uid)
      .update({ avatar: state.uploadedCroppedImage })
      .then(() => {
        console.log("User avatar updated");
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const handleChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    if (file) {
      reader.readAsDataURL(file);
      reader.addEventListener("load", () => {
        setState({ ...state, previewImage: reader.result });
      });
    }
  };
  const handleCropImage = () => {
    if (avatarEd) {
      avatarEd.getImageScaledToCanvas().toBlob((blob) => {
        let imageUrl = URL.createObjectURL(blob);
        setState({
          ...state,
          croppedImage: imageUrl,
          blob,
        });
      });
    }
  };

  const { previewImage, croppedImage } = state;
  return (
    <>
      <Modal basic open={modal} onClose={closeModal}>
        <Modal.Header>Change Avatar</Modal.Header>
        <Modal.Content>
          <Input
            onChange={handleChange}
            fluid
            type="file"
            label="New Avatar"
            name="previewImage"
          />
          <Grid centered stackable columns={2}>
            <Grid.Row centered>
              <Grid.Column className="ui center aligned grid">
                {previewImage && (
                  <AvatarEditor
                    ref={(node) => (avatarEd = node)}
                    image={previewImage}
                    width={120}
                    height={120}
                    border={50}
                    scale={1.2}
                  />
                )}
              </Grid.Column>
              <Grid.Column>
                {croppedImage && (
                  <Image
                    style={{ margin: "3.5em auto" }}
                    width={100}
                    height={100}
                    src={croppedImage}
                  />
                )}
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Modal.Content>
        <Modal.Actions>
          {croppedImage && (
            <Button color="green" inverted onClick={uploadCroppedImage}>
              <Icon name="save" /> Change Avatar
            </Button>
          )}
          <Button color="green" inverted onClick={handleCropImage}>
            <Icon name="image" /> Preview
          </Button>
          <Button color="red" inverted onClick={closeModal}>
            <Icon name="remove" /> Cancel
          </Button>
        </Modal.Actions>
      </Modal>
    </>
  );
}

export default ChangeAvatarModal;
