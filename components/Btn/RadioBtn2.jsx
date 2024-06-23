import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

const RadioBtn2 = ({ label, value, checked, onCheck }) => {
  return (
    <TouchableOpacity
      style={styles.radioButton}
      onPress={() => onCheck(value)}
      activeOpacity={0.6}
    >
      <View style={[styles.outerCircle, checked && styles.selectedOuterCircle]}>
        {checked && <View style={styles.innerCircle} />}
      </View>
      <Text
        style={[
          styles.radioText,
          checked ? styles.checkedText : styles.noCheckedText,
        ]}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
};

// 스타일 시트
const styles = StyleSheet.create({
  radioButton: {
    flexDirection: "row",
    alignItems: "center",
  },
  outerCircle: {
    height: 20,
    width: 20,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "#777777",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 8,
  },
  selectedOuterCircle: {
    borderColor: "#F4595D",
    backgroundColor: "#F4595D",
  },
  innerCircle: {
    height: 7,
    width: 7,
    borderRadius: 6,
    backgroundColor: "#fff",
  },
  radioText: {
    fontSize: 16,
    fontFamily: "Pretendard_Regular",
  },
  checkedText: {
    color: "#1B1B1B",
  },
  noCheckedText: {
    color: "#777777",
  },
});

export default RadioBtn2;
