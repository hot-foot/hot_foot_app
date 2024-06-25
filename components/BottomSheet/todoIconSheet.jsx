import React, { useState } from "react";
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Image,
} from "react-native";
import { TODO_ICON } from "../../data/processData";

const TodoIconSheet = ({ isVisible, onClose, onAdd }) => {
  const screenHeight = Dimensions.get("window").height;
  const halfScreenHeight = screenHeight * 0.4;
  const [isPressed, setIsPressed] = useState(null);
  const [selectedIconId, setSelectedIconId] = useState(null);

  return (
    <Modal
      animationType="none"
      transparent={true}
      visible={isVisible}
      onRequestClose={onClose}
    >
      <TouchableOpacity
        style={styles.overlay}
        onPress={onClose}
        activeOpacity={1}
      >
        <View>
          <View style={styles.actionSheet}>
            <View style={styles.header}>
              <Text style={styles.sheetTitle}>할 일 아이콘</Text>
              <TouchableOpacity onPress={onClose}>
                <Image
                  source={require("../../assets/img/Icon/close.png")}
                  style={styles.icon}
                />
              </TouchableOpacity>
            </View>
            <View
              style={{
                flexDirection: "row",
                flexWrap: "wrap",
                alignItems: "flex-start",
                gap: 16,
                marginBottom: 48,
                justifyContent: "center",
              }}
            >
              {TODO_ICON.map((item) => (
                <TouchableOpacity
                  key={item.id}
                  activeOpacity={1}
                  onPress={() => {
                    setSelectedIconId(item.id);
                    onAdd(item.imagePath);
                    setIsPressed(null);
                  }}
                  onPressIn={() => setIsPressed(item.id)}
                  onPressOut={() => setIsPressed(null)}
                  style={[
                    styles.iconContainer,
                    {
                      backgroundColor:
                        selectedIconId === item.id
                          ? "#777777"
                          : isPressed === item.id
                          ? "#969696"
                          : "#E1E1E1",
                      borderColor:
                        selectedIconId === item.id
                          ? "#777777"
                          : isPressed === item.id
                          ? "#969696"
                          : "#E1E1E1",
                    },
                  ]}
                >
                  <Image source={item.imagePath} style={styles.todoIcon} />
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0, 0, 0, 0.7)",
  },
  actionSheet: {
    backgroundColor: "white",
    // alignItems: "center",
    paddingLeft: 24,
    paddingRight: 24,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 33,
    marginTop: 18,
  },
  sheetTitle: {
    color: "#000",
    fontSize: 14,
    fontFamily: "Pretendard_SemiBold",
    flex: 1,
    textAlign: "center",
  },
  actionItem: {
    // paddingVertical: 34,
    paddingBottom: 34,
    paddingTop: 16,
    width: "100%",
    alignItems: "center",
  },
  actionText: {
    fontSize: 20,
    fontWeight: 500,
    color: "#1F1F1F",
    paddingTop: 10,
    paddingBottom: 10,
  },
  iconContainer: {
    borderRadius: 50,
    backgroundColor: "#E1E1E1",
    borderWidth: 2,
    borderColor: "#E1E1E1",
    borderStyle: "solid",
    padding: 8,
  },
  icon: {
    width: 18,
    height: 18,
  },
  todoIcon: {
    width: 40,
    height: 40,
  },
});

export default TodoIconSheet;
