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

  const [isInputFocused, setInputFocused] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const handleFocus = () => {
    setInputFocused(true);
  };

  const handleBlur = () => {
    setInputFocused(false);
  };

  const handleCloseBtnClick = () => {
    navigation.navigate("Home");
  };

  const handleInputChange = (text) => {
    // 9자 이하일 때만 상태를 업데이트
    if (text.length <= 9) {
      setInputValue(text);
    }
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
          onFocus={handleFocus}
          onBlur={handleBlur}
          maxLength={9}
          style={styles.textInput}
        />
        <Text style={styles.textCount}>{inputValue.length} / 9</Text>
        {/* 이동 시간 및 도착 시간 */}
        <View style={styles.timeContainer}>
          <View style={styles.timeSection}>
            <View style={{ flexDirection: "row", gap: 8 }}>
              <Text style={styles.topText}>이동 시간:</Text>
              <Text style={[styles.topSubText, { color: "#B9B9B9" }]}>
                00 시간
              </Text>
              <Text style={[styles.topSubText, , { color: "#B9B9B9" }]}>
                00 분
              </Text>
            </View>
            <TouchableOpacity onPress={() => {}} style={{}}>
              <Image
                source={require("../../assets/img/Icon/control.png")}
                style={styles.icon}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.timeSection}>
            <View style={{ flexDirection: "row", gap: 8 }}>
              <Text style={styles.topText}>도착 시간:</Text>
              <Text style={[styles.topSubText, { color: "#B9B9B9" }]}>
                00 시간
              </Text>
              <Text style={[styles.topSubText, , { color: "#B9B9B9" }]}>
                00 분
              </Text>
            </View>
            <TouchableOpacity onPress={() => {}} style={{}}>
              <Image
                source={require("../../assets/img/Icon/control.png")}
                style={styles.icon}
              />
            </TouchableOpacity>
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
      {/* {open && (
        <BottomSheetScreen
          title={"정렬기준"}
          data={COMMUNITY_SORT}
          modalVisible={open}
          modalDisable={handleSortClick}
          onCategorySelect={handleCategorySelect}
        />
      )} */}
    </View>
  );
};

export default ProcessScreen;
