import React, { useState } from "react";
import { View, Switch, StyleSheet } from "react-native";

const ToggleSwitch = ({ isEnable }) => {
  const [isEnabled, setIsEnabled] = useState(!isEnable);

  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);

  return (
    <>
      <Switch
        trackColor={{ false: "#969696", true: "#F4595D" }}
        thumbColor={isEnabled ? "#fff" : "#fff"}
        ios_backgroundColor="#969696"
        onValueChange={toggleSwitch}
        value={isEnabled}
      />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default ToggleSwitch;
