import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import {
  Swipeable,
  GestureHandlerRootView,
} from "react-native-gesture-handler";

const TodoCard = ({ id, title, time, imagePath, onDelete }) => {
  const localImage = require("../../assets/img/action/clothing.png");

  const renderRightActions = () => (
    <TouchableOpacity onPress={() => onDelete(id)} style={styles.deleteButton}>
      <Text style={styles.deleteButtonText}>삭제</Text>
    </TouchableOpacity>
  );

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Swipeable renderRightActions={renderRightActions}>
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
                <Image source={imagePath} style={styles.icon} />
              </View>
              <Text style={styles.text}>{title}</Text>
            </View>
            <Text style={styles.text}>{time} 분</Text>
          </View>
        </View>
      </Swipeable>
    </GestureHandlerRootView>
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
    fontFamily: "Pretendard_Regular",
    alignSelf: "center",
  },
  deleteButton: {
    backgroundColor: "#F4595D",
    justifyContent: "center",
    alignItems: "center",
    width: 75,
    height: "100%",
  },
  deleteButtonText: {
    color: "#1B1B1B",
    fontSize: 16,
  },
});

export default TodoCard;
