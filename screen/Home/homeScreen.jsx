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
import PreparationCard from "../../components/Card/preparationCard";

const HomeScreen = () => {
  const { openDatabase, createTables } = useDatabase();
  const db = openDatabase();
  const { fetchData } = useCourse(db);
  const { initDefaultTodo } = useTodo(db);
  const [dataKey, setDataKey] = useState(0);
  const [courses, setCourses] = useState([]);
  const [activeModalId, setActiveModalId] = useState(null);

  const windowHeight = Dimensions.get("window").height;
  const navigation = useNavigation();

  const translateY = new Animated.Value(0);

  const handleBtnClick = () => {
    navigation.replace("Process");
  };

  const handleSettingBtnClick = () => {
    navigation.navigate("Setting");
  };

  const initData = () => {
    createTables(db);
    initDefaultTodo();
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

  const handleTimerClick = () => {
    navigation.navigate("Timer", {
      course: courses[0],
    });
  };

  const handleLottieClick = () => {
    navigation.navigate("Complete", { course: { name: "출근준비과정명" } });
  };

  const dateToString = (str) => {
    const date = new Date(str);
    let hour = date.getHours();
    let noon = "AM";
    if (hour >= 12) {
      noon = "PM";
    }
    if (hour >= 13) {
      hour = hour - 12;
    }
    return `${hour}:${date.getMinutes()} ${noon}`;
  };
  const minuteToString = (minutes) => {
    const hh = Math.floor(minutes / 60);
    const mm = minutes % 60;
    return `${hh}시간 ${mm}분`;
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
            />
          ))}
        </View>
      </ScrollView>
      <View style={{ padding: 30 }}>
        <Text style={{ fontFamily: "Pretendard_Bold" }}>화면 확인용</Text>
        <PlusBtn
          color={"#FF8989"}
          width={64}
          height={64}
          onPress={handleTimerClick}
        />
        <PlusBtn
          color={"#FEAB53"}
          width={64}
          height={64}
          onPress={handleLottieClick}
        />
      </View>
      <Animated.View
        style={[styles.plusButtonContainer, { transform: [{ translateY }] }]}
      >
        <PlusBtn
          color={"#9BED94"}
          width={64}
          height={64}
          onPress={handleBtnClick}
        />
      </Animated.View>
    </View>
  );
};

export default HomeScreen;
