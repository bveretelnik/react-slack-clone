import React from "react";
import { Progress } from "semantic-ui-react";
export default function ProgressBar({ uploadState, percentUploaded }) {
  return (
    uploadState === "uploading" && (
      <Progress
        className="progress__bar"
        percent={100}
        progress
        indicating
        size="medium"
        inverted
      />
    )
  );
}
