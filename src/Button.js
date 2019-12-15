import React from "react";

function Button(props) {
  const randomColour = () =>
    "#" + ((Math.random() * 0xffffff) << 0).toString(16);
  return (
    <button onClick={props.onClick} style={{ background: randomColour() }}>
      {props.children}
    </button>
  );
}

export default React.memo(Button);
