import React, { useRef } from "react";
import { useNavigation } from "@react-navigation/native";
import { Text, TouchableOpacity, View, Dimensions } from "react-native";
import styles from "./styles";
import LottieView from "lottie-react-native";

const CompleteScreen = () => {
  const navigation = useNavigation();
  const windowWidth = Dimensions.get("window").width;
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
        <Text style={styles.completeTitle}>출근 준비 과정명</Text>
        <Text style={styles.completeText}>출근 준비 과정명</Text>
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
        <TouchableOpacity onPress={handleComplete}>
          <View style={styles.completeButton}>
            <Text style={styles.buttonText}>종료하고 외출하기</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CompleteScreen;
