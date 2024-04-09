import React, { useState } from "react";
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Image,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import LargeBtn from "../../components/Btn/largeBtn";

const AddProcessSheet = ({
  isVisible,
  onClose,
  onChange,
  selectedIconPath,
  onAddTodo,
}) => {
  const screenHeight = Dimensions.get("window").height;
  const [isPressed, setIsPressed] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [timeValue, setTimeValue] = useState("");

  const isFormValid = inputValue.trim() !== "" && timeValue !== "";

  const handleInputChange = (text) => {
    // 9자 이하일 때만 상태를 업데이트
    if (text.length <= 9) {
      setInputValue(text);
    }
  };

  const handleTimeChange = (text) => {
    const number = parseInt(text, 10);
    if (!isNaN(number) && number >= 0 && number <= 360) {
      // 유효한 경우에만 상태 업데이트
      setTimeValue(text);
    } else if (text === "") {
      // 사용자가 입력을 모두 지운 경우를 처리
      setTimeValue(text);
    }
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
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"} // 플랫폼에 맞게 behavior 설정
          style={styles.container}
        >
          <View style={styles.actionSheet}>
            <View style={styles.header}>
              <Text style={styles.sheetTitle}>할 일 직접 추가</Text>
              <TouchableOpacity onPress={onClose}>
                <Image
                  source={require("../../assets/img/Icon/close.png")}
                  style={styles.icon}
                />
              </TouchableOpacity>
            </View>
            <View style={{ marginBottom: 34 }}>
              <Text style={styles.inputTitle}>할 일 이름</Text>
              <TextInput
                id="todoName"
                placeholder={"할 일 이름"}
                placeholderTextColor={"#B9B9B9"}
                value={inputValue}
                onChangeText={handleInputChange}
                maxLength={9}
                style={styles.textInput}
              />
              <Text style={styles.textCount}>{inputValue.length} / 9</Text>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  marginBottom: 24,
                  marginTop: 16,
                }}
              >
                <View>
                  <Text style={styles.inputTitle}>아이콘</Text>
                  <View>
                    <TouchableOpacity
                      activeOpacity={1}
                      style={[
                        styles.iconContainer,
                        {
                          backgroundColor: isPressed ? "#969696" : "#E1E1E1",
                          borderColor: isPressed ? "#969696" : "#E1E1E1",
                        },
                      ]}
                      onPress={() => {
                        onChange();
                      }}
                      onPressIn={() => setIsPressed(true)}
                      onPressOut={() => setIsPressed(false)}
                    >
                      <Image
                        source={selectedIconPath}
                        style={styles.todoIcon}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
                <View>
                  <Text style={styles.inputTitle}>소요 시간</Text>
                  <View style={{ flexDirection: "row", marginTop: 4 }}>
                    <TextInput
                      id="360"
                      placeholder={"0"}
                      placeholderTextColor={"#B9B9B9"}
                      value={timeValue}
                      onChangeText={handleTimeChange}
                      maxLength={3}
                      keyboardType="number-pad"
                      style={[styles.textInput, { width: 120, height: 35 }]}
                    />
                    <Text
                      style={{
                        color: "#1B1B1B",
                        fontSize: 20,
                        alignSelf: "center",
                        fontFamily: "Pretendard_SemiBold",
                      }}
                    >
                      분
                    </Text>
                  </View>
                  <Text style={[styles.subText]}>최대 360분</Text>
                </View>
              </View>
              <LargeBtn
                text={"추가하기"}
                onClick={() => {
                  const newTodo = {
                    id: Date.now(),
                    title: inputValue,
                    time: timeValue,
                    imagePath: selectedIconPath,
                  };
                  onAddTodo(newTodo);
                  onClose();
                }}
                backgroundColor={""}
                isDisable={!isFormValid}
              />
              <Text style={styles.noticeText}>
                할 일 이름, 아이콘, 소요 시간을 모두 입력해 주세요.
              </Text>
            </View>
          </View>
        </KeyboardAvoidingView>
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
  inputTitle: {
    paddingLeft: 8,
    paddingBottom: 4,
    color: "#636363",
    fontSize: 10,
    fontFamily: "Pretendard_Regular",
  },
  textInput: {
    backgroundColor: "#fff",
    paddingLeft: 12,
    paddingRight: 12,
    paddingTop: 8,
    paddingBottom: 8,
    borderBottomColor: "#B9B9B9",
    borderBottomWidth: 2,
    height: 50,
    fontSize: 16,
    fontFamily: "Pretendard_Regular",
  },
  textCount: {
    textAlign: "right",
    color: "#636363",
    fontSize: 12,
    fontFamily: "Pretendard_Regular",
    paddingRight: 8,
    paddingTop: 2,
  },
  icon: {
    height: 18,
    width: 18,
  },
  noticeText: {
    padding: 8,
    color: "#636363",
    fontSize: 10,
    fontFamily: "Pretendard_Medium",
    textAlign: "center",
  },
  iconContainer: {
    borderRadius: 50,
    // backgroundColor: "#E1E1E1",
    borderWidth: 2,
    // borderColor: "#E1E1E1",
    borderStyle: "solid",
    padding: 8,
    marginLeft: 28,
  },
  todoIcon: {
    width: 40,
    height: 40,
  },
  subText: {
    color: "#636363",
    fontSize: 12,
    fontFamily: "Pretendard_Regular",
    paddingLeft: 7,
  },
});

export default AddProcessSheet;
