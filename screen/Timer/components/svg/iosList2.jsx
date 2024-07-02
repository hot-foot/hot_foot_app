import * as React from "react";
import Svg, { Path, G, ClipPath, Rect, Defs, Mask } from "react-native-svg";

const IosList2 = (props) => (
  <Svg
    width={props.width || "376"}
    height={props.height || "100"}
    viewBox="0 0 376 100"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    style={[{ position: "absolute", zIndex: -1 }, props.style]}
  >
    <Rect width="375" height="98" transform="translate(1 1)" fill="white" />
    <Path
      d="M109 1H1V99H109L133 50L109 1Z"
      fill="#B9B9B9"
      stroke="#4B4B4B"
      strokeWidth="2"
      strokeMiterlimit="10"
      strokeLinecap="round"
    />
    <Path
      d="M109 1L133 50L109 99H241V1H109Z"
      fill="#F5F5F5"
      stroke="#4B4B4B"
      strokeWidth="2"
      strokeMiterlimit="10"
      strokeLinecap="round"
    />
  </Svg>
);

export default IosList2;
