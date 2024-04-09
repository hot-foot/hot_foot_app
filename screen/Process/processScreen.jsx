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
import TodoIconSheet from "../../components/BottomSheet/todoIconSheet";
import AddProcessSheet from "../../components/BottomSheet/addProcessSheet";
import ProcessListSheet from "../../components/BottomSheet/ProcessListSheet";
import { TODO_ICON, TODO_LIST } from "../../data/processData";
import ToastMsg from "../../components/Modal/toastMsg";
import MsgModal from "../../components/Modal/msgModal";

const ProcessScreen = () => {
  const navigation = useNavigation();
  const [inputValue, setInputValue] = useState("");
  const [msgModal, setMsgModal] = useState(false);
  const [isIconSheetVisible, setIconSheetVisible] = useState(false);
  const [isAddSheetVisible, setAddSheetVisible] = useState(false);
  const [isActionSheetVisible, setActionSheetVisible] = useState(false);
  const [selectedTasks, setSelectedTasks] = useState([]);
  const [selectedIconPath, setSelectedIconPath] = useState(
    TODO_ICON[0].imagePath
  );
  const [todoList, setTodoList] = useState(TODO_LIST);
  const [isVisible, setIsVisible] = useState(false);

  const showMessage = () => {
    setIsVisible(true);
  };

  const handleClose = () => {
    setIsVisible(false);
  };

  const handleAddTodo = (newTodo) => {
    setTodoList([...todoList, newTodo]);
  };

  const handleDeleteTask = (id) => {
    console.log("삭제", id);
  };

  const handleCloseBtnClick = () => {
    setMsgModal(true);
  };

  const handleConfirm = () => {
    setMsgModal(false);
    navigation.navigate("Home");
  };

  const handleInputChange = (text) => {
    // 9자 이하일 때만 상태를 업데이트
    if (text.length <= 9) {
      setInputValue(text);
    }
  };

  const handlePluBtn = () => {
    setActionSheetVisible(true);
  };

  const handleAddProcess = (task) => {
    setSelectedTasks([...selectedTasks, task]);
    setActionSheetVisible(false);
  };

  const handleSheetPlusBtn = () => {
    if (selectedTasks.length >= 29) {
      showMessage();
    } else {
      setActionSheetVisible(false);
      setAddSheetVisible(true);
    }
  };

  const handleChangeIcon = () => {
    setAddSheetVisible(false);
    setIconSheetVisible(true);
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

  const handleTodoIconSheet = () => {
    setIconSheetVisible(false);
    setAddSheetVisible(true);
  };

  const handleAddProcessSheet = () => {
    setAddSheetVisible(false);
    setActionSheetVisible(true);
    setSelectedIconPath(TODO_ICON[0].imagePath);
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
              <Text style={[styles.topSubText, { color: "#B9B9B9" }]}>
                00 시간 00 분
              </Text>
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
              <Text style={[styles.topSubText, { color: "#B9B9B9" }]}>
                00 : 00 PM
              </Text>
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
        <View style={{ gap: 8, marginBottom: 16 }}>
          {selectedTasks.map((task, index) => (
            <>
              <TodoCard
                key={task.id}
                id={task.id}
                title={task.title}
                time={task.time}
                imagePath={task.imagePath}
                onDelete={() => handleDeleteTask(task.id)}
              />
            </>
          ))}
        </View>
        <Text style={styles.buttonTopText}>
          할 일은 최대 30개까지 추가 가능합니다.
        </Text>
        <View style={styles.plusButtonContainer}>
          <PlusBtn
            color={"#9BED94"}
            width={40}
            height={40}
            onPress={handlePluBtn}
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
      <ProcessListSheet
        isVisible={isActionSheetVisible}
        onClose={() => setActionSheetVisible(false)}
        onAdd={handleAddProcess}
        onPlus={handleSheetPlusBtn}
        todoList={todoList}
      />
      <TodoIconSheet
        isVisible={isIconSheetVisible}
        // onClose={() => setIconSheetVisible(false)}
        onClose={handleTodoIconSheet}
        onAdd={(iconPath) => {
          setSelectedIconPath(iconPath);
          setAddSheetVisible(true);
          setIconSheetVisible(false);
        }}
      />
      <AddProcessSheet
        isVisible={isAddSheetVisible}
        // onClose={() => setAddSheetVisible(false)}
        onClose={handleAddProcessSheet}
        onChange={handleChangeIcon}
        selectedIconPath={selectedIconPath}
        onAddTodo={handleAddTodo}
      />
      {isVisible && (
        <ToastMsg
          isVisible={isVisible}
          message="할 일은 최대 30개까지 추가 가능합니다!"
          onClose={handleClose}
        />
      )}
      <MsgModal
        isVisible={msgModal}
        message1={"설정 중이던 중비 과정은 저장되지 않아요."}
        message2={"나가시겠어요?"}
        leftBtnText={"취소"}
        rightBtnText={"나가기"}
        onClose={() => setMsgModal(false)}
        onConfirm={handleConfirm}
      />
    </View>
  );
};

export default ProcessScreen;
