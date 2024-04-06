import React, { useState, useRef } from "react";
import {
  View,
  Animated,
  TouchableWithoutFeedback,
  StyleSheet,
} from "react-native";

const SlimToggleSwitch = ({ isEnable, onClick }) => {
  const [isEnabled, setIsEnabled] = useState(isEnable);
  const animatedValue = useRef(new Animated.Value(0)).current;

  const padding = 2;
  const size = 20;
  const switchWidth = 34;
  const switchHeight = 14;
  const movement = switchWidth - size - padding * 2;

  const toggleSwitch = () => {
    onClick();
    setIsEnabled(!isEnabled);
    Animated.timing(animatedValue, {
      toValue: isEnabled ? 0 : 1,
      duration: 250,
      useNativeDriver: true,
    }).start();
  };

  const switchTranslate = animatedValue.interpolate({
    inputRange: [0.2, 0.8],
    outputRange: [0, movement],
  });

  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback onPress={toggleSwitch}>
        <View
          style={[
            styles.switchBackground,
            {
              width: switchWidth,
              height: switchHeight,
              backgroundColor: isEnabled ? "#FFC4CA" : "#969696",
            },
          ]}
        >
          <Animated.View
            style={[
              styles.toggle,
              {
                width: size,
                height: size,
                borderRadius: size / 2,
                transform: [{ translateX: switchTranslate }],
                backgroundColor: isEnabled ? "#F4595D" : "#E1E1E1",
              },
            ]}
          />
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  switchBackground: {
    justifyContent: "center",
    borderRadius: 20,

    padding: 2,
  },
  toggle: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
});

export default SlimToggleSwitch;
