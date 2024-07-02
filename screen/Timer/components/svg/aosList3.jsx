import * as React from "react";
import Svg, { Path, G, ClipPath, Rect, Defs } from "react-native-svg";

const AosList3 = (props) => (
  <Svg
    width="361"
    height="100"
    viewBox="0 0 361 100"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    style={[{ position: "absolute", zIndex: -1 }, props.style]}
  >
    <G clipPath="url(#clip0_871_16031)">
      <Path
        d="M104 1H1V99H104L128 50L104 1Z"
        fill="#B9B9B9"
        stroke="#4B4B4B"
        strokeWidth="2"
        strokeMiterlimit="10"
        strokeLinecap="round"
      />
    </G>
    <G clipPath="url(#clip1_871_16031)">
      <Path
        d="M231.51 1H104.51L128.51 50L104.51 99H231.51L255.51 50L231.51 1Z"
        fill="#F5F5F5"
        stroke="#4B4B4B"
        strokeWidth="2"
        strokeMiterlimit="10"
        strokeLinecap="round"
      />
    </G>
    <G clipPath="url(#clip2_871_16031)">
      <Path
        d="M232.03 1L256.03 50L232.03 99H359.03V1H232.03Z"
        fill="#F5F5F5"
        stroke="#4B4B4B"
        strokeWidth="2"
        strokeMiterlimit="10"
        strokeLinecap="round"
      />
    </G>
    <Defs>
      <clipPath id="clip0_871_16031">
        <Rect width="129.11" height="100" fill="white" />
      </clipPath>
      <clipPath id="clip1_871_16031">
        <Rect
          width="153.72"
          height="100"
          fill="white"
          transform="translate(102.91)"
        />
      </clipPath>
      <clipPath id="clip2_871_16031">
        <Rect
          width="129.6"
          height="100"
          fill="white"
          transform="translate(230.43)"
        />
      </clipPath>
    </Defs>
  </Svg>
);

export default AosList3;
