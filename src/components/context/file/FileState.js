import React, { useReducer } from "react";
import firebase from "../../../firebase";
import { v4 as uuidv4 } from "uuid";
import { FileContext } from "./fileContext";
import { fileReducer } from "./fileReducer";
import { UPLOAD_FILE } from "../types";

export default function FileState({ children }) {
  const initialState = {
    storageRef: firebase.storage().ref(),
    uploadTask: null,
    uploadState: "",
  };
  const [state, dispatch] = useReducer(fileReducer, initialState);

  const uploadFile = (file, metadata) => {
    const filePath = `chat/public/${uuidv4()}.jpg`;
    dispatch({
      type: UPLOAD_FILE,
      ...state,
      payload: state.storageRef.child(filePath).put(file, metadata),
    });
    console.log(state);
  };

  return (
    <FileContext.Provider
      value={{
        uploadFile,
        file: state,
      }}
    >
      {children}
    </FileContext.Provider>
  );
}
