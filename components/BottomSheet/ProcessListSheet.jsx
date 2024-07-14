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

const ProcessListSheet = ({
  isVisible,
  onClose,
  onAdd,
  onPlus,
  todoList,
  onDeleteTask,
}) => {
  const screenHeight = Dimensions.get("window").height;
  const halfScreenHeight = screenHeight * 0.4;

  const handleDeleteTask = (id) => {
    onDeleteTask(id);
  };

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
                {todoList &&
                  todoList.map((item) => (
                    <TouchableOpacity
                      key={item.id}
                      activeOpacity={0.8}
                      onPress={() => onAdd(item)}
                    >
                      <TodoCard
                        id={item.id}
                        title={item.name}
                        time={item.minutes}
                        iconId={item.iconId}
                        onDelete={() => handleDeleteTask(item.id)}
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
    paddingBottom: 34,
    paddingTop: 16,
    width: "100%",
    alignItems: "center",
  },
  icon: {
    width: 18,
    height: 18,
  },
});

export default ProcessListSheet;
