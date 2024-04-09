import React from "react";
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Dimensions,
  Image,
} from "react-native";
import TodoCard from "../Card/todoCard";
import PlusBtn from "../Btn/plusBtn";
import { TODO_LIST } from "../../data/processData";

const ProcessListSheet = ({ isVisible, onClose, onAdd, onPlus, todoList }) => {
  const screenHeight = Dimensions.get("window").height;
  const halfScreenHeight = screenHeight * 0.4;

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
              <Text style={styles.sheetTitle}>할 일 목록</Text>
              <TouchableOpacity onPress={onClose}>
                <Image
                  source={require("../../assets/img/Icon/close.png")}
                  style={styles.icon}
                />
              </TouchableOpacity>
            </View>
            <ScrollView style={{ maxHeight: halfScreenHeight }}>
              <View style={{ gap: 8 }}>
                {/* {TODO_LIST.map((item) => ( */}
                {todoList.map((item) => (
                  <TouchableOpacity
                    key={item.id}
                    activeOpacity={0.8}
                    onPress={() => onAdd(item)}
                  >
                    <TodoCard
                      id={item.id}
                      title={item.title}
                      time={item.time}
                      imagePath={item.imagePath}
                      onDelete={() => {}}
                    />
                  </TouchableOpacity>
                ))}
              </View>
            </ScrollView>
            <View style={styles.actionItem}>
              <PlusBtn
                color={"#FEAC54"}
                width={40}
                height={40}
                onPress={onPlus}
              />
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
    left: 8,
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
  icon: {
    width: 18,
    height: 18,
  },
});

export default ProcessListSheet;
