import React, { useState, useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  StyleSheet,
  Image,
} from "react-native";

const DotMenu = ({ onCopy, onDelete, onPress }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [buttonLayout, setButtonLayout] = useState({
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  });
  const buttonRef = useRef < TouchableOpacity > null;

  const openModal = () => {
    buttonRef.current?.measure((x, y, width, height, pageX, pageY) => {
      setButtonLayout({ x: pageX, y: pageY, width, height });
      setModalVisible(true);
      onPress();
    });
  };

  const handleDeletePress = () => {
    onDelete();
    setModalVisible(false);
  };

  const handleCopyPress = () => {
    onCopy();
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity ref={buttonRef} onPress={openModal}>
        <Image
          source={require("../../assets/img/Icon/dotMenuIcon.png")}
          style={[styles.icon, { alignSelf: "center" }]}
        />
      </TouchableOpacity>
      <Modal
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
        // animationType="fade"
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          onPress={() => setModalVisible(false)}
        >
          <View
            style={[
              styles.modalContent,
              { top: buttonLayout.y, left: buttonLayout.x - 90 },
            ]}
          >
            <TouchableOpacity
              style={styles.topBtn}
              onPress={handleCopyPress}
              activeOpacity={1}
            >
              <Image
                source={require("../../assets/img/Icon/copyIcon.png")}
                style={styles.icon}
              />
              <Text style={[styles.text, { color: "#1B1B1B" }]}>복사하기</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.bottomBtn}
              onPress={handleDeletePress}
              activeOpacity={1}
            >
              <Image
                source={require("../../assets/img/Icon/deleteIcon.png")}
                style={styles.icon}
              />

              <Text style={[styles.text, { color: "#EB0016" }]}>삭제하기</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  button: {
    position: "absolute",
    right: 10,
    bottom: 10,
  },
  modalOverlay: {
    position: "absolute",
    start: 0,
    end: 0,
    top: 0,
    bottom: 0,
  },
  modalContent: {
    position: "absolute",
    width: 128,
    borderWidth: 2,
    borderColor: "#4B4B4B",
    borderStyle: "solid",
    borderRadius: 4,
    backgroundColor: "#fff",
  },
  topBtn: {
    flexDirection: "row",
    gap: 8,
    padding: 8,
    paddingLeft: 16,
    paddingRight: 16,
    borderBottomWidth: 2,
    borderBottomColor: "#4B4B4B",
    alignItems: "center",
  },
  bottomBtn: {
    flexDirection: "row",
    gap: 8,
    padding: 8,
    paddingLeft: 16,
    paddingRight: 16,
    alignItems: "center",
  },
  text: { fontSize: 15, fontWeight: "700" },
  icon: {
    width: 24,
    height: 24,
  },
});

export default DotMenu;
