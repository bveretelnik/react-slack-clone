import React, { Fragment } from "react";
import { Divider } from "semantic-ui-react";

export default function UserColors({ colors, setColors }) {
  return (
    colors.length > 0 &&
    colors.map((color, i) => (
      <Fragment key={i}>
        <Divider />
        <div
          className="color__container"
          onClick={() => setColors(color.primary, color.secondary)}
        >
          <div className="color__square" style={{ background: color.primary }}>
            <div
              className="color__overlay"
              style={{ background: color.secondary }}
            ></div>
          </div>
        </div>
      </Fragment>
    ))
  );
}
