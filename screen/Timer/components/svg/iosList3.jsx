import * as React from "react";
import Svg, { Path, Rect } from "react-native-svg";

const IosList3 = (props) => (
  <Svg
    width={props.width || "378"}
    height={props.height || "100"}
    viewBox="0 0 378 100"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    style={[{ position: "absolute", zIndex: -1 }, props.style]}
  >
    <Path
      d="M109.871 1H1V99H109.871L134.065 50L109.871 1Z"
      fill="#B9B9B9"
      stroke="#4B4B4B"
      strokeWidth="2"
      strokeMiterlimit="10"
      strokeLinecap="round"
    />
    <Path
      d="M243.129 1H110.065L134.258 50L110.065 99H243.129L267.323 50L243.129 1Z"
      fill="#F5F5F5"
      stroke="#4B4B4B"
      strokeWidth="2"
      strokeMiterlimit="10"
      strokeLinecap="round"
    />
    <Path
      d="M243.323 1L267.516 50L243.323 99H376.387V1H243.323Z"
      fill="#F5F5F5"
      stroke="#4B4B4B"
      strokeWidth="2"
      strokeMiterlimit="10"
      strokeLinecap="round"
    />
  </Svg>
);

export default IosList3;
