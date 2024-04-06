import React from "react";
import { Modal, View, Text, StyleSheet, TouchableOpacity } from "react-native";

const MsgModal = ({
  isVisible,
  message1,
  message2,
  onClose,
  leftBtnText,
  rightBtnText,
}) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isVisible}
      onRequestClose={onClose}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <View style={styles.messageContainer}>
            <Text style={styles.message}>{message1}</Text>
            <Text style={styles.message}>{message2}</Text>
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              onPress={onClose}
              style={styles.leftBtn}
              activeOpacity={1}
            >
              <Text style={styles.leftBtnText}>{leftBtnText}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={onClose}
              style={styles.rightBtn}
              activeOpacity={1}
            >
              <Text style={styles.rightBtnText}>{rightBtnText}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.80)",
  },
  modalView: {
    width: 304,
    borderWidth: 2,
    borderColor: "#4B4B4B",
    borderStyle: "solid",
    borderRadius: 8,
  },
  messageContainer: {
    padding: 10,
    backgroundColor: "#fff",
    paddingTop: 40,
    paddingBottom: 40,
    paddingRight: 24,
    paddingLeft: 24,
    borderTopLeftRadius: 6,
    borderTopRightRadius: 6,
  },
  message: {
    textAlign: "center",
    fontSize: 16,
    fontWeight: "400",
  },
  buttonContainer: {
    flexDirection: "row",
    borderTopWidth: 2,
    borderTopColor: "#4B4B4B",
    borderTopStyle: "solid",
  },
  leftBtn: {
    backgroundColor: "#B9B9B9",
    width: "50%",
    padding: 18,
    paddingRight: 16,
    paddingLeft: 16,
    borderRightWidth: 2,
    borderRightColor: "#4B4B4B",
    borderRightStyle: "solid",
    borderBottomLeftRadius: 6,
  },
  rightBtn: {
    backgroundColor: "#F90013",
    width: "50%",
    padding: 18,
    paddingRight: 16,
    paddingLeft: 16,
    borderBottomRightRadius: 6,
  },
  rightBtnText: {
    color: "#FFFFFF",
    textAlign: "center",
    fontSize: 16,
    fontWeight: "700",
  },
  leftBtnText: {
    color: "#1B1B1B",
    textAlign: "center",
    fontSize: 16,
    fontWeight: "700",
  },
});

export default MsgModal;

// ** modal component 사용 방법 **

// <MsgModal
// isVisible={modalVisible}
// message="'@' 과정을 시작할까요?시작한 과정은 늦추거나 멈출 수 없어요."
// onClose={handleCloseModal}
// leftBtnText={"취소"}
// rightBtnText={"삭제하기"}
// />
