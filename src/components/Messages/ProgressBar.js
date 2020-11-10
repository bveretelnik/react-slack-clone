import React, { useState, useEffect } from "react";
import { Progress } from "semantic-ui-react";
export default function ProgressBar({ uploadState }) {
  const [percent, setPercent] = useState(0);
  useEffect(() => {
    percentUpload();
  }, [percent]);
  const percentUpload = () => {
    return setPercent(100);
  };
  return (
    uploadState === "uploading" && (
      <Progress
        className="progress__bar"
        percent={percent}
        progress
        indicating
        size="medium"
        inverted
      />
    )
  );
}
