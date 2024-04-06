import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";

const TodoCard = ({ title, time, imagePath }) => {
  const localImage = require("../../assets/img/Icon/clothing.png");

  return (
    <View>
      <View style={styles.containter}>
        <View style={styles.section}>
          <View style={{ flexDirection: "row", gap: 8 }}>
            <View
              style={{
                backgroundColor: "#E1E1E1",
                borderRadius: 50,
                padding: 4,
              }}
            >
              <Image source={localImage} style={styles.icon} />
            </View>
            <Text style={styles.text}>{title}</Text>
          </View>
          <Text style={styles.text}>{time} 분</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  containter: {
    borderWidth: 2,
    borderColor: "#4B4B4B",
    borderStyle: "solid",
    padding: 12,
    backgroundColor: "#fff",
    borderRadius: 4,
  },
  section: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  icon: {
    width: 32,
    height: 32,
  },
  text: {
    color: "#1B1B1B",
    fontSize: 16,
    fontWeight: "400",
    alignSelf: "center",
  },
});

export default TodoCard;
