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
import PlusBtn from "../../components/Btn/plusBtn";
import { useNavigation } from "@react-navigation/native";

const HomeScreen = () => {
  const windowHeight = Dimensions.get("window").height;
  const navigation = useNavigation();

  const translateY = new Animated.Value(0);

  const handleBtnClick = () => {
    navigation.replace("Process");
  };

  const handleSettingBtnClick = () => {
    navigation.navigate("Setting");
  };

  useEffect(() => {
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
    navigation.navigate("Timer");
  };

  const handleLottieClick = () => {
    navigation.navigate("Complete");
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
          <Text style={styles.contentText}>
            아직 준비 과정이 없어요.
            {"\n"}과정을 꾸려보세요!
          </Text>
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
