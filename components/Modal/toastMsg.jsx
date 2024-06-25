import React, { useEffect } from "react";
import { View, Text, Modal, Dimensions, Image, StyleSheet } from "react-native";

const screenWidth = Dimensions.get("window").width;

const ToastMsg = ({ isVisible, message, onClose }) => {
  useEffect(() => {
    let timer;
    if (isVisible) {
      timer = setTimeout(() => {
        onClose();
      }, 1500);
    }
    return () => {
      if (timer) {
        clearTimeout(timer);
      }
    };
  }, [isVisible, onClose]);

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isVisible}
      //   onRequestClose={onClose}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <View style={styles.iconContainer}>
            <Image
              source={require("../../assets/img/action/BB1.png")}
              style={styles.icon}
            />
          </View>
          <Text style={styles.modalText}>{message}</Text>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "flex-start",
    marginTop: 64,
  },
  modalView: {
    marginHorizontal: 24,
    backgroundColor: "#FFC4CA",
    borderRadius: 4,
    paddingTop: 18,
    paddingBottom: 18,
    paddingLeft: 24,
    paddingRight: 24,
    alignItems: "center",
    shadowColor: "#000",
    borderWidth: 2,
    borderColor: "#4B4B4B",
    gap: 4,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    flexDirection: "row",
    width: screenWidth - 48,
  },
  iconContainer: {
    backgroundColor: "#fff",
    borderRadius: 50,
    padding: 4,
    marginRight: 2,
  },
  icon: {
    width: 24,
    height: 24,
  },
  modalText: {
    flexShrink: 1,
  },
});

export default ToastMsg;
