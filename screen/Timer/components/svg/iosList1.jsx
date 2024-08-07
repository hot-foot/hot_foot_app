import * as React from "react";
import Svg, { Path, G, ClipPath, Rect, Defs, Mask } from "react-native-svg";

const IosList1 = (props) => (
  <Svg
    width={props.width || "375"}
    height={props.height || "104"}
    viewBox="0 0 375 104"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    style={[{ position: "absolute", zIndex: -1 }, props.style]}
  >
    <Rect width="375" height="100" transform="translate(0 2)" fill="white" />
    <Mask
      id="path-1-outside-1_871_6241"
      maskUnits="userSpaceOnUse"
      x="0"
      y="0"
      width="111"
      height="104"
      fill="black"
    >
      <Rect fill="white" width="111" height="104" />
      <Path d="M0 2H109V102H0V2Z" />
    </Mask>
    <Path d="M0 2H109V102H0V2Z" fill="#B9B9B9" />
    <Path
      d="M109 2H111V0H109V2ZM109 102V104H111V102H109ZM0 4H109V0H0V4ZM107 2V102H111V2H107ZM109 100H0V104H109V100Z"
      fill="#4B4B4B"
      mask="url(#path-1-outside-1_871_6241)"
      strokeWidth="2"
    />
  </Svg>
);

export default IosList1;
