import React, { useEffect, useRef } from "react";
import { useNavigation } from "@react-navigation/native";
import { Text, TouchableOpacity, View } from "react-native";
import styles from "./styles";
import LottieView from "lottie-react-native";
import { useNotification } from "../../hooks/useNotification";

const CompleteScreen = ({ route }) => {
  const { course } = route.params;
  const { sendNotification } = useNotification();

  useEffect(() => {
    const sendCompleteNotification = async () => {
      await sendNotification({
        title: "${course.name}",
        body: `나가야 할 시간이에요! 빠르게 준비를 마무리하세요!`,
        sound: "BB-06_finish.mp3", // 번들에 포함된 사운드 파일 이름
        trigger: null, // 즉시 알림
      });
    };

    sendCompleteNotification();
  }, [course.name, sendNotification]);

  const navigation = useNavigation();
  const animation = useRef(null);

  const handleComplete = () => {
    navigation.navigate("Home");
  };

  return (
    <View style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.text}>타이머</Text>
      </View>
      <View style={styles.completeSection}>
        <Text style={styles.completeTitle}>{course.name}</Text>
        <Text style={styles.completeText}>{`\’${course.name}\’`}</Text>
        <Text style={styles.completeText}>과정을 완료했어요!</Text>
        <View style={styles.animationSection}>
          <LottieView
            autoPlay
            ref={animation}
            style={{
              width: 160,
              height: 210,
            }}
            source={require("../../data/lottie/flame_animation.json")}
          />
        </View>
        <Text style={styles.questionText}>이제 밖으로 나가볼까요?</Text>
      </View>
      <View style={styles.bottomSection}>
        <TouchableOpacity onPress={handleComplete} activeOpacity={0.6}>
          <View style={styles.completeButton}>
            <Text style={styles.buttonText}>종료하고 외출하기</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CompleteScreen;
