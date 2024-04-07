import React, { useState } from "react";
import styles from "./styels";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Image,
} from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { useNavigation } from "@react-navigation/native";
import TodoCard from "../../components/Card/todoCard";
import PlusBtn from "../../components/Btn/plusBtn";
import LargeBtn from "../../components/Btn/largeBtn";

const TODO_LIST = [
  {
    title: "세수하기",
    time: "3",
    imagePath: "../../assets/img/action/clothing.png",
  },
  {
    title: "옷입기",
    time: "2",
    imagePath: "../../assets/img/action/clothing.png",
  },
];

const ProcessScreen = () => {
  const navigation = useNavigation();
  const [inputValue, setInputValue] = useState("");

  const handleCloseBtnClick = () => {
    navigation.navigate("Home");
  };

  const handleInputChange = (text) => {
    // 9자 이하일 때만 상태를 업데이트
    if (text.length <= 9) {
      setInputValue(text);
    }
  };

  // 이동 시간 상태
  const [isDepartureTimePickerVisible, setDepartureTimePickerVisibility] =
    useState(false);
  const [selectedDepartureTime, setSelectedDepartureTime] = useState(
    new Date()
  );

  // 도착 시간 상태
  const [isArrivalTimePickerVisible, setArrivalTimePickerVisibility] =
    useState(false);
  const [selectedArrivalTime, setSelectedArrivalTime] = useState(new Date());

  // 이동 시간 피커 보여주기
  const showDepartureTimePicker = () => {
    setDepartureTimePickerVisibility(true);
  };

  // 이동 시간 피커 숨기기
  const hideDepartureTimePicker = () => {
    setDepartureTimePickerVisibility(false);
  };

  // 이동 시간 선택 시
  const handleDepartureTimeConfirm = (time) => {
    setSelectedDepartureTime(time);
    hideDepartureTimePicker();
  };

  // 도착 시간 피커 보여주기
  const showArrivalTimePicker = () => {
    setArrivalTimePickerVisibility(true);
  };

  // 도착 시간 피커 숨기기
  const hideArrivalTimePicker = () => {
    setArrivalTimePickerVisibility(false);
  };

  // 도착 시간 선택 시
  const handleArrivalTimeConfirm = (time) => {
    setSelectedArrivalTime(time);
    hideArrivalTimePicker();
  };

  // 시간을 두 자리 문자열로 변환
  const formatTime = (time) => {
    return time < 10 ? `0${time}` : `${time}`;
  };

  // 24시간제 시간을 12시간제로 변환
  const formatTo12HourClock = (hours) => {
    const newHours = hours % 12 || 12;
    return formatTime(newHours);
  };

  // 시간과 분을 AM/PM 형식으로 변환
  const formatAMPM = (date) => {
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const formattedTime = `${formatTo12HourClock(hours)} 시간  ${formatTime(
      minutes
    )} 분 `;
    return formattedTime;
  };

  const formatAMPM2 = (date) => {
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? "PM" : "AM";
    const formattedTime = `${formatTo12HourClock(hours)} : ${formatTime(
      minutes
    )}  ${ampm}`;
    return formattedTime;
  };

  return (
    <View style={styles.container}>
      <View style={styles.section}>
        <TouchableOpacity onPress={handleCloseBtnClick} style={{}}>
          <Image
            source={require("../../assets/img/Icon/close.png")}
            style={styles.icon}
          />
        </TouchableOpacity>
        <Text style={styles.text}>준비 과정 추가</Text>
      </View>
      {/* 준비 과정 이름 입력 */}
      <View style={styles.middleSection}>
        <Text style={styles.inputTitle}>준비 과정 이름</Text>
        <TextInput
          placeholder={"과정 이름"}
          placeholderTextColor={"#B9B9B9"}
          value={inputValue}
          onChangeText={handleInputChange}
          maxLength={9}
          style={styles.textInput}
        />
        <Text style={styles.textCount}>{inputValue.length} / 9</Text>
        {/* 이동 시간 및 도착 시간 */}
        <View style={styles.timeContainer}>
          <View style={styles.timeSection}>
            <View style={{ flexDirection: "row", gap: 8 }}>
              <Text style={styles.topText}>이동 시간:</Text>
              <Text style={[styles.topSubText, { color: "#1B1B1B" }]}>
                {formatAMPM(selectedDepartureTime)} {/* 이동 시간 표시 */}
              </Text>
              {/* <Text style={[styles.topSubText, { color: "#B9B9B9" }]}>
                00 시간
              </Text>
              <Text style={[styles.topSubText, , { color: "#B9B9B9" }]}>
                00 분
              </Text> */}
            </View>
            <TouchableOpacity onPress={showDepartureTimePicker} style={{}}>
              <Image
                source={require("../../assets/img/Icon/control.png")}
                style={styles.icon}
              />
            </TouchableOpacity>
            {/* 이동 시간 선택 모달 */}
            <DateTimePickerModal
              isVisible={isDepartureTimePickerVisible}
              mode="time"
              onConfirm={handleDepartureTimeConfirm}
              onCancel={hideDepartureTimePicker}
              date={selectedDepartureTime}
              is24Hour={true}
            />
          </View>
          <View style={styles.timeSection}>
            <View style={{ flexDirection: "row", gap: 8 }}>
              <Text style={styles.topText}>도착 시간:</Text>
              <Text style={[styles.topSubText, { color: "#1B1B1B" }]}>
                {formatAMPM2(selectedArrivalTime)} {/* 도착 시간 표시 */}
              </Text>
              {/* <Text style={[styles.topSubText, { color: "#B9B9B9" }]}>
                00 시간
              </Text>
              <Text style={[styles.topSubText, , { color: "#B9B9B9" }]}>
                00 분
              </Text> */}
            </View>
            <TouchableOpacity onPress={showArrivalTimePicker} style={{}}>
              <Image
                source={require("../../assets/img/Icon/control.png")}
                style={styles.icon}
              />
            </TouchableOpacity>
            {/* 도착 시간 선택 모달 */}
            <DateTimePickerModal
              isVisible={isArrivalTimePickerVisible}
              mode="time"
              onConfirm={handleArrivalTimeConfirm}
              onCancel={hideArrivalTimePicker}
              date={selectedArrivalTime}
              is24Hour={true}
            />
          </View>
        </View>
      </View>
      <View style={styles.line} />
      {/* todo card 추가 */}
      <ScrollView style={styles.middleSection}>
        <View style={{ gap: 8 }}>
          {/* {TODO_LIST.map((itme) => (
            <>
              <TodoCard
                title={itme.title}
                time={itme.time}
                imagePath={itme.imagePath}
              />
            </>
          ))} */}
          <Text style={styles.buttonTopText}>
            할 일은 최대 30개까지 추가 가능합니다.
          </Text>
        </View>
        <View style={styles.plusButtonContainer}>
          <PlusBtn
            color={"#9BED94"}
            width={40}
            height={40}
            onPress={() => {}}
          />
        </View>
      </ScrollView>
      <View
        style={{ marginBottom: 34 }}
        // style={{ position: "relative", bottom: 0, backgroundColor: "#D5F8D1" }}
      >
        <View style={styles.line} />
        <View style={[styles.middleSection, { paddingBottom: 11 }]}>
          <View style={styles.bottomSection}>
            <View style={styles.bottomBox}>
              <Text style={styles.bottomText}>소요 시간:</Text>
              <Text style={[styles.bottomSubText, { color: "#B9B9B9" }]}>
                총
              </Text>
              <Text style={[styles.bottomSubText, { color: "#B9B9B9" }]}>
                00 시간
              </Text>
              <Text style={[styles.bottomSubText, { color: "#B9B9B9" }]}>
                00 분
              </Text>
            </View>
            <View style={styles.bottomBox}>
              <Text style={styles.bottomText}>시작 시간:</Text>
              <Text style={[styles.bottomSubText, { color: "#B9B9B9" }]}>
                -- : 00 AM
              </Text>
            </View>
          </View>
          <LargeBtn
            text={"저장하기"}
            onClick={() => {}}
            backgroundColor={""}
            isDisable={true}
          />
          <Text style={styles.noticeText}>
            과정 이름, 이동 시간, 도착 시간, 할 일 카드(1개 이상)를 모두 입력해
            주세요.
          </Text>
        </View>
      </View>
    </View>
  );
};

export default ProcessScreen;
