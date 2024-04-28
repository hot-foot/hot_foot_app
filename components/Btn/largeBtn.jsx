import React from "react";
import { View, Text, TouchableOpacity } from "react-native";

const LargeBtn = ({ text, onClick, backgroundColor, isDisable }) => {
  const buttonStyle = {
    paddingVertical: 12,
    paddingHorizontal: 0,
    borderRadius: 8,
    borderWidth: 1.5,
    borderColor: isDisable ? "#B9B9B9" : "#1F1F1F",
    backgroundColor: isDisable ? "#E1E1E1" : backgroundColor || "#FFC891",
    shadowColor: "#1F1F1F",
    shadowOffset: { width: 1.5, height: 1.5 },
    shadowOpacity: 0,
    shadowRadius: 0,
    elevation: 2,
    width: 335,
    height: 48,
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
  };

  const textStyle = {
    color: isDisable ? "#636363" : "#000",
    fontSize: 20,
    // fontFamily: "Pretendard_Bold",
  };

  return (
    <TouchableOpacity
      style={buttonStyle}
      onPress={onClick}
      activeOpacity={isDisable ? 0.8 : 0.6}
      // disabled={isDisable}
    >
      <Text style={textStyle}>{text}</Text>
    </TouchableOpacity>
  );
};

export default LargeBtn;
