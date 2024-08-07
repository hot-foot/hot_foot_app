import * as React from "react";
import Svg, { Path, Rect } from "react-native-svg";

const AosList1 = (props) => (
  <Svg
    width="360"
    height="100"
    viewBox="0 0 360 100"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    style={[{ position: "absolute", zIndex: -1 }, props.style]}
  >
    <Rect width="360" height="98" transform="translate(0 1)" fill="white" />
    <Path d="M0 1H104V99H0V1Z" fill="#B9B9B9" />
    <Path
      d="M104 1H105V0H104V1ZM104 99V100H105V99H104ZM0 2H104V0H0V2ZM103 1V99H105V1H103ZM104 98H0V100H104V98Z"
      fill="#4B4B4B"
      strokeWidth="2"
    />
  </Svg>
);

export default AosList1;
