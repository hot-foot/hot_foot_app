import React, { useEffect, useState } from "react";
import styles from "./styles";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  Animated,
} from "react-native";
import PlusBtn from "../../components/Btn/plusBtn";
import { useNavigation } from "@react-navigation/native";
import { useDatabase } from "../../hooks/useDatabase";
import { useCourse } from "../../hooks/useCourse";
import { useTodo } from "../../hooks/useTodo";
import { usePushSetting } from "../../hooks/usePushSetting";
import PreparationCard from "../../components/Card/preparationCard";
import ToastMsg from "../../components/Modal/toastMsg";
import * as Notifications from "expo-notifications";

const HomeScreen = ({ route }) => {
  const processName = route.params?.processName;
  const startTime = route.params?.startTime;
  const { openDatabase, createTables } = useDatabase();
  const db = openDatabase();
  const { fetchData } = useCourse(db);
  const { initDefaultTodo } = useTodo(db);
  const { initDefaultPush } = usePushSetting(db);

  const [dataKey, setDataKey] = useState(0);
  const [courses, setCourses] = useState([]);
  const [activeModalId, setActiveModalId] = useState(null);
  const [isVisible, setIsVisible] = useState(false);

  console.log("courses :::", courses);
  console.log("startTime :::", startTime);

  const windowHeight = Dimensions.get("window").height;
  const navigation = useNavigation();

  const translateY = new Animated.Value(0);

  const showMessage = () => {
    setIsVisible(true);
  };

  const handleClose = () => {
    setIsVisible(false);
  };

  useEffect(() => {
    if (route.params?.startTime) {
      showMessage();
    }
    setTimeout(() => {
      fetchData(setCourses);
    }, 200);
  }, [dataKey, route.params?.statusMessage]);

  const handleBtnClick = () => {
    navigation.replace("Process");
  };

  const handleSettingBtnClick = () => {
    navigation.navigate("Setting");
  };

  const handleCardPress = (id) => {
    navigation.navigate("Process", { courseId: id });
  };

  const initData = () => {
    createTables(db);
    initDefaultTodo();
    initDefaultPush();
  };

  useEffect(() => {
    setTimeout(() => {
      fetchData(setCourses);
    }, 200);
  }, [dataKey]);

  useEffect(() => {
    initData();
    let animation = Animated.loop(
      Animated.sequence([
        // 위로 10픽셀 이동
        Animated.timing(translateY, {
          toValue: -10,
          duration: 500,
          useNativeDriver: true,
        }),
        // 원래 위치로 이동
        Animated.timing(translateY, {
          toValue: 0,
          duration: 500,
          useNativeDriver: true,
        }),
      ])
    );
    animation.start();

    // 3번만 실행 (시간 계산...)
    setTimeout(() => {
      animation.stop();
    }, 3240);

    return () => {
      animation.stop();
    };
  }, []);

  const dateToString = (dateStr) => {
    let hour = dateStr.slice(0, 2);
    let minutes = dateStr.slice(3, 5);
    let noon = hour >= "12" ? "PM" : "AM";
    hour = hour % 12 || 12;

    minutes = minutes.length == 1 ? `0${minutes}` : minutes;
    hour = hour < 10 ? `0${hour}` : hour;

    return `${hour}:${minutes} ${noon}`;
  };

  const minuteToString = (totalMinutes) => {
    // 시간과 분으로 변환
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    // 포맷에 맞게 설정
    const formattedTime =
      hours > 0
        ? `${hours}시간 ${formatTime(minutes)}분`
        : `${formatTime(minutes)}분`;
    return formattedTime;
  };
  // 시간을 두 자리 문자열로 변환
  const formatTime = (time) => {
    return time < 10 ? `0${time}` : `${time}`;
  };

  // 알림 울리기
  async function schedulePushNotification(data) {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "발등에 불",
        body: data,
        sound: "BB-06_start.mp3",
      },
      trigger: {
        seconds: 3,
      },
    });
  }

  const handleTestBtnClick = () => {
    const data = "테스트 알림입니다.";
    schedulePushNotification(data);
  };

  return (
    <View style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.text}>외출 준비 과정</Text>
        <TouchableOpacity
          style={styles.iconBox}
          onPress={handleSettingBtnClick}
        >
          <Image
            source={require("../../assets/img/Icon/settingIcon.png")}
            style={styles.icon}
          />
        </TouchableOpacity>
      </View>
      <ScrollView>
        <View style={styles.content}>
          {courses?.length === 0 && (
            <Text style={styles.contentText}>
              아직 준비 과정이 없어요.
              {"\n"}과정을 꾸려보세요!
            </Text>
          )}
          {courses?.map((course) => (
            <PreparationCard
              key={`${course.id}_${dataKey}`}
              isDisabled={course.active === 0}
              routineName={course.name}
              count={course.todoIds?.length}
              startTime={dateToString(course.startTime)}
              totalTime={minuteToString(course.totalMinute)}
              isModify={false}
              id={course.id}
              setActiveModalId={setActiveModalId}
              activeModalId={activeModalId}
              updateData={() => {
                setDataKey((x) => x + 1);
              }}
              onPress={handleCardPress}
            />
          ))}
        </View>
      </ScrollView>
      <Animated.View
        style={[styles.plusButtonContainer, { transform: [{ translateY }] }]}
      >
        <PlusBtn
          color={"#9BED94"}
          width={64}
          height={64}
          onPress={handleBtnClick}
        />
        <PlusBtn
          color={"#FFFFFF"}
          width={64}
          height={64}
          onPress={() => {
            navigation.navigate("Timer", {
              course: courses[0],
            });
          }}
        />
        <PlusBtn
          color={"#ffd8f6"}
          width={64}
          height={64}
          onPress={handleTestBtnClick}
        />
      </Animated.View>
      {isVisible && (
        <ToastMsg
          isVisible={isVisible}
          message={`${processName} 과정이 ${startTime}에 시작됩니다.`}
          onClose={handleClose}
        />
      )}
    </View>
  );
};

export default HomeScreen;
