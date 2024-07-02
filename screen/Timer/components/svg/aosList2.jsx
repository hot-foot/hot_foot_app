import * as React from "react";
import Svg, { Path, G, ClipPath, Rect, Defs } from "react-native-svg";

const AosList2 = (props) => (
  <Svg
    width="360"
    height="100"
    viewBox="0 0 360 100"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    style={[{ position: "absolute", zIndex: -1 }, props.style]}
  >
    <Rect width="360" height="100" fill="white" />
    <G clipPath="url(#clip0_876_15615)">
      <Path
        d="M104 1H1V99H104L128 50L104 1Z"
        fill="#B9B9B9"
        stroke="#4B4B4B"
        strokeWidth="2"
        strokeMiterlimit="10"
        strokeLinecap="round"
      />
    </G>
    <G clipPath="url(#clip1_876_15615)">
      <Path
        d="M104.51 1L128.51 50L104.51 99H231.51V1H104.51Z"
        fill="#F5F5F5"
        stroke="#4B4B4B"
        strokeWidth="2"
        strokeMiterlimit="10"
        strokeLinecap="round"
      />
    </G>
    <Defs>
      <clipPath id="clip0_876_15615">
        <Rect width="129.11" height="100" fill="white" />
      </clipPath>
      <clipPath id="clip1_876_15615">
        <Rect
          width="129.6"
          height="100"
          fill="white"
          transform="translate(102.91)"
        />
      </clipPath>
    </Defs>
  </Svg>
);

export default AosList2;
