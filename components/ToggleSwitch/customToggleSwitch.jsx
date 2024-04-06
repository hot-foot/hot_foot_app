import React, { useState } from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";

const CustomToggleSwitch = ({ isEnable }) => {
  console.log(isEnable);
  const [isEnabled, setIsEnabled] = useState(!isEnable);

  const toggleSwitch = () => setIsEnabled(!isEnabled);

  return (
    <TouchableOpacity
      style={[
        styles.switch,
        isEnabled ? styles.switchEnabled : styles.switchDisabled,
      ]}
      onPress={toggleSwitch}
    >
      <View
        style={[
          styles.thumb,
          isEnabled ? styles.thumbEnabled : styles.thumbDisabled,
        ]}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  switch: {
    width: 50, // Track width
    height: 30, // Track height
    borderRadius: 15,
    justifyContent: "center",
    padding: 3,
  },
  switchEnabled: {
    backgroundColor: "#F4595D",
  },
  switchDisabled: {
    backgroundColor: "#969696",
  },
  thumb: {
    width: 24, // Thumb width
    height: 24, // Thumb height
    borderRadius: 12,
  },
  thumbEnabled: {
    alignSelf: "flex-end",
    backgroundColor: "#fff",
  },
  thumbDisabled: {
    alignSelf: "flex-start",
    backgroundColor: "#fff",
  },
});

export default CustomToggleSwitch;
