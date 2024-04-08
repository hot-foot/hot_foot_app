import moment from "moment";
import { useEffect, useState } from "react";
import { Text, TouchableOpacity, View, Image } from "react-native";
import styles from "./styles";
import TodoTimerList from "./todoTimerList";
import { useNavigation } from "@react-navigation/native";
import Svg, { Polygon } from "react-native-svg";
import MsgModal from "../../components/Modal/msgModal";

const tempData = [
  { name: "Todo 1", minutes: 30 },
  { name: "Todo 2", minutes: 45 },
  { name: "Todo 3", minutes: 60 },
];

const TimerScreen = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <View style={styles.section}>
        <TouchableOpacity onPress={() => {}}>
          <Image
            source={require("../../assets/img/Icon/close.png")}
            style={styles.icon}
          />
        </TouchableOpacity>
        <Text style={styles.text}>타이머</Text>
      </View>
      <View style={styles.totalSection}>
        <Text style={styles.totalTitleText}>출근 준비(준비 과정명)</Text>
        <Text style={styles.totalSubTitleText}>총 잔여 시간</Text>
        <Text style={styles.totalTimerText}>
          {/* {moment.utc(totalTime.asMilliseconds()).format("HH : mm : ss")} */}
          00 : 00 : 00
        </Text>
        <View style={styles.todoImageBackgound}>
          {/* <Image source={images[todo.icon]} style={styles.todoImage} /> */}
        </View>
      </View>
      <View style={styles.todoSection}>
        <Text style={styles.todoTitleText}>세수하기 (할 일 이름)</Text>
        <Text style={styles.todoTimerText}>
          {/* {moment.utc(todoTime.asMilliseconds()).format("HH : mm : ss")} */}
          00 : 00 : 00
        </Text>
        <View style={styles.skipSection}>
          <View style={styles.buttonSection}></View>
          <TouchableOpacity onPress={() => {}}>
            <View style={styles.todoButton}>
              <Image
                source={require("../../assets/img/Icon/skip.png")}
                style={styles.skip}
              />
            </View>
          </TouchableOpacity>
          <View style={styles.skipTooltip}>
            <Text style={styles.skipTooltipText}>
              다음 할 일로 넘어가며 총 잔여 시간도 감소해요.
            </Text>
            <Svg style={{ zIndex: 0, position: "absolute" }}>
              <Polygon
                points="137,0 10,0, 10,16 0,22, 10,28 10,44 137,44"
                fill="#4B4B4B"
                strokeWidth="2"
              />
            </Svg>
          </View>
        </View>
      </View>
      <View style={styles.todoListSection}>
        <TodoTimerList lastes={tempData} />
      </View>
      {/* <MsgModal
        isVisible={modalVisible}
        message1="타이머를 종료하면 알림을 보내드리지 않아요."
        message2="종료하시겠어요?"
        onClose={() => {}}
        leftBtnText={"취소"}
        rightBtnText={"나가기"}
        onAction={completeProcess}
      /> */}
    </View>
  );
};

export default TimerScreen;
