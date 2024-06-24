import React, { useEffect, useState } from "react";
import styles from "./styles";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  Platform,
} from "react-native";
import * as Linking from "expo-linking";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { useNavigation } from "@react-navigation/native";
import SlimToggleSwitch from "../../components/ToggleSwitch/slimToggleSwitch";
import RadioBtn2 from "../../components/Btn/RadioBtn2";
import { SETTING_ALARM } from "../../data/settingData";
import { useDatabase } from "../../hooks/useDatabase";
import { usePushSetting } from "../../hooks/usePushSetting";
import * as IntentLauncher from "expo-intent-launcher";

const SettingScreen = () => {
  const windowHeight = Dimensions.get("window").height;
  const navigation = useNavigation();
  const [settingValue, setSettingValue] = useState({});
  const [dataKey, setDataKey] = useState(0);

  const { openDatabase, createTables } = useDatabase();
  const db = openDatabase();
  const { updatePushSetting, fetchPushData } = usePushSetting(db);

  useEffect(() => {
    setTimeout(() => {
      fetchPushData((r) => {
        let hour = r.time.slice(0, 2);
        let minutes = r.time.slice(3, 5);

        const toDate = new Date("2024-04-28T00:00:00+09:00");
        toDate.setHours(hour);
        toDate.setMinutes(minutes);

        console.log("date", r.time, toDate);

        setSelectedTime(toDate);
        setSettingValue(r);
        setDataKey((a) => {
          a + 1;
        });
      });
    }, 200);
  }, []);

  const openSettings = () => {
    if (Platform.OS === "ios") {
      // iOS: 사운드 및 햅틱 설정 화면으로 직접 이동
      Linking.openURL("App-Prefs:root=SOUNDS");
    } else {
      // Android: 시스템 음량 설정 화면으로 이동
      IntentLauncher.startActivityAsync(
        IntentLauncher.ActivityAction.HOME_SETTINGS
      );
    }
  };

  const handleRadioChange = (value) => {
    updatePushSetting("style", value);
    setSettingValue({
      ...settingValue,
      style: value,
    });
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
    const localeTime = koreanLocaleTime(time);
    const pushTime = new Date();
    pushTime.setHours(localeTime.hour);
    pushTime.setMinutes(localeTime.minute);
    updatePushSetting("time", pushTime.toTimeString());
    setSettingValue({
      ...settingValue,
      time,
    });
    setSelectedTime(time);
    hideTimePicker();
  };

  const koreanLocaleTime = (date) => {
    const time = new Intl.DateTimeFormat("ko-KR", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    }).format(date);
    const splitTime = time.split(":");
    return { hour: Number(splitTime[0]), minute: Number(splitTime[1]) };
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
            <View style={styles.padding} key={item.title}>
              <View style={styles.contentContainer}>
                <View style={{ gap: 6 }}>
                  <Text style={styles.contentText}>{item.title}</Text>
                  <Text style={styles.contentDes}>{item.description}</Text>
                </View>
                <View>
                  <SlimToggleSwitch
                    key={`${item.id}_${dataKey}`}
                    id={item.id}
                    isEnable={settingValue[item.column] === 1}
                    onClick={() => {
                      updatePushSetting(
                        item.column,
                        !settingValue[item.column]
                      );
                      setSettingValue({
                        ...settingValue,
                        [item.column]: !settingValue[item.column],
                      });
                    }}
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
                <SlimToggleSwitch
                  key={`0_${dataKey}`}
                  id={0}
                  isEnable={settingValue["push"] === 1}
                  onClick={() => {
                    updatePushSetting("push", !settingValue["push"]);
                    setSettingValue({
                      ...settingValue,
                      push: !settingValue["push"],
                    });
                  }}
                />
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
                checked={settingValue.style === "단호하게"}
                onCheck={handleRadioChange}
              />
              <RadioBtn2
                label="부드럽게"
                value="부드럽게"
                checked={settingValue.style === "부드럽게"}
                onCheck={handleRadioChange}
              />
            </View>
          </View>
          <View style={[styles.line, { height: 4 }]} />
          <Text style={styles.contentTitle}>음량</Text>
          <View style={styles.padding}>
            <TouchableOpacity
              style={styles.contentContainer}
              activeOpacity={0.8}
              onPress={openSettings}
            >
              <View style={{ gap: 6 }}>
                <Text style={styles.contentText}>음량 설정</Text>
                <Text style={styles.contentDes}>
                  시스템 자체 음량 설정으로 이동해요
                </Text>
              </View>
              <View>
                <Image
                  source={require("../../assets/img/Icon/arrowRight.png")}
                  style={[styles.icon, { top: 10 }]}
                />
              </View>
            </TouchableOpacity>

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
