import React, { useEffect, useState } from "react";
import styles from "./styles";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  Button,
  Animated,
} from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { useNavigation } from "@react-navigation/native";
import SlimToggleSwitch from "../../components/ToggleSwitch/slimToggleSwitch";
import RadioBtn2 from "../../components/Btn/RadioBtn2";
import { SETTING_ALARM } from "../../data/settingData";

const SettingScreen = () => {
  const windowHeight = Dimensions.get("window").height;
  const navigation = useNavigation();
  const [selectedValue, setSelectedValue] = useState("단호하게");

  const handleRadioChange = (value) => {
    setSelectedValue(value);
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

  const [isTimePickerVisible, setTimePickerVisibility] = useState(false);
  const [selectedTime, setSelectedTime] = useState(new Date());

  const showTimePicker = () => {
    setTimePickerVisibility(true);
  };

  const hideTimePicker = () => {
    setTimePickerVisibility(false);
  };

  const handleTimeConfirm = (time) => {
    setSelectedTime(time);
    hideTimePicker();
  };

  const formatAMPM = (date) => {
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
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.iconBox}
        >
          <Image
            source={require("../../assets/img/Icon/arrow.png")}
            style={styles.icon}
          />
        </TouchableOpacity>
        <Text style={styles.text}>앱 설정</Text>
        <View style={styles.iconBox}></View>
      </View>
      <ScrollView style={{ backgroundColor: "#fff" }}>
        <View style={styles.content}>
          <Text style={styles.contentTitle}>알림</Text>
          {SETTING_ALARM.map((item) => (
            <View style={styles.padding}>
              <View style={styles.contentContainer}>
                <View style={{ gap: 6 }}>
                  <Text style={styles.contentText}>{item.title}</Text>
                  <Text style={styles.contentDes}>{item.description}</Text>
                </View>
                <View>
                  <SlimToggleSwitch
                    id={item.id}
                    isEnable={false}
                    onClick={() => {}}
                  />
                </View>
              </View>
              <View style={[styles.line, { height: 2 }]} />
            </View>
          ))}
          <View style={styles.padding}>
            <View style={styles.contentContainer}>
              <View style={{ gap: 6 }}>
                <Text style={styles.contentText}>준비 과정 관리 알람</Text>
                <Text style={styles.contentDes}>
                  준비 과정 활성화를 위한 알림을 보내드려요
                </Text>
                <TouchableOpacity onPress={showTimePicker}>
                  <View style={styles.timeSection}>
                    <Text style={styles.time}>{formatAMPM(selectedTime)}</Text>
                  </View>
                </TouchableOpacity>
              </View>
              <View>
                <SlimToggleSwitch id={0} isEnable={false} onClick={() => {}} />
              </View>
            </View>
          </View>
          <View style={[styles.line, { height: 4 }]} />
          <Text style={styles.contentTitle}>알림 어조</Text>
          <View style={styles.padding}>
            <Text style={[styles.contentText, { marginBottom: 8 }]}>어조</Text>
            <View style={{ flexDirection: "row", gap: 24 }}>
              <RadioBtn2
                label="단호하게"
                value="단호하게"
                checked={selectedValue === "단호하게"}
                onCheck={handleRadioChange}
              />
              <RadioBtn2
                label="부드럽게"
                value="부드럽게"
                checked={selectedValue === "부드럽게"}
                onCheck={handleRadioChange}
              />
            </View>
          </View>
          <View style={[styles.line, { height: 4 }]} />
          <Text style={styles.contentTitle}>음량</Text>
          <View style={styles.padding}>
            <View style={styles.contentContainer}>
              <View style={{ gap: 6 }}>
                <Text style={styles.contentText}>음량 설정</Text>
                <Text style={styles.contentDes}>
                  시스템 자체 음량 설정으로 이동해요
                </Text>
              </View>
              <View>
                <TouchableOpacity>
                  <Image
                    source={require("../../assets/img/Icon/arrowRight.png")}
                    style={styles.icon}
                  />
                </TouchableOpacity>
              </View>
            </View>
            <View style={[styles.line, { height: 2 }]} />
          </View>
        </View>
      </ScrollView>
      <DateTimePickerModal
        isVisible={isTimePickerVisible}
        mode="time"
        onConfirm={handleTimeConfirm}
        onCancel={hideTimePicker}
        date={selectedTime}
        is24Hour={true}
      />
    </View>
  );
};

export default SettingScreen;
