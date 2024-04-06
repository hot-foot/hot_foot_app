import React from "react";
import {
  Modal,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
} from "react-native";

const OptionModal = () => {
  return (
    <View>
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.topBtn}
          onPress={() => {}}
          activeOpacity={1}
        >
          <Image
            source={require("../../assets/copyIcon.png")}
            style={styles.icon}
          />
          <Text style={[styles.text, { color: "#1B1B1B" }]}>복사하기</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.bottomBtn}
          onPress={() => {}}
          activeOpacity={1}
        >
          <Image
            source={require("../../assets/deleteIcon.png")}
            style={styles.icon}
          />
          <Text style={[styles.text, { color: "#EB0016" }]}>삭제하기</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
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
    borderBottomStyle: "solid",
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
  text: { fontSize: 15, fontWeight: 700 },
  icon: {
    width: 24,
    height: 24,
  },
});

export default OptionModal;
