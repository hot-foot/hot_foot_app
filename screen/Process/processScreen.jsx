import React, { useState, useEffect } from "react";
import _ from "lodash";
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
import { TODO_LIST } from "../../data/processData";
import ToastMsg from "../../components/Modal/toastMsg";
import MsgModal from "../../components/Modal/msgModal";
import { useDatabase } from "../../hooks/useDatabase";
import { useCourse } from "../../hooks/useCourse";
import AddProcessComponent from "../../components/BottomSheet/addProcessComponent";

const ProcessScreen = () => {
  const navigation = useNavigation();
  const [toastMsg, setToastMsg] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [msgModal, setMsgModal] = useState(false);
  const [isActionSheetVisible, setActionSheetVisible] = useState(false);
  const [selectedTasks, setSelectedTasks] = useState([]);
  const [todoList, setTodoList] = useState(TODO_LIST);
  const [isVisible, setIsVisible] = useState(false);
  const [totalTime, setTotalTime] = useState("00시간 00분");
  const [form, setForm] = useState({});
  const { openDatabase } = useDatabase();
  const db = openDatabase();
  const { createCourse } = useCourse(db);

  console.log("선택함:::", selectedTasks);

  const koreanLocaleTime = (date) => {
    const time = new Intl.DateTimeFormat("ko-KR", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    }).format(date);
    const splitTime = time.split(":");
    return { hour: Number(splitTime[0]), minute: Number(splitTime[1]) };
  };

  const showMessage = () => {
    setIsVisible(true);
  };

  const handleClose = () => {
    setIsVisible(false);
  };

  const handleDeleteTask = (id, index) => {
    console.log("삭제", id, index);
    // 앱 상태에서 작업 삭제 (인덱스 기반)
    setSelectedTasks((currentTasks) =>
      currentTasks.filter((task, taskIndex) => taskIndex !== index)
    );
  };

  const handleCloseBtnClick = () => {
    setMsgModal(true);
  };

  const handleConfirm = () => {
    setMsgModal(false);
    navigation.navigate("Home");
  };
  const handleSaveForm = () => {
    if (!inputValue.trim()) {
      setToastMsg("과정 이름을 입력해주세요.");
      showMessage();
      return;
    } else if (selectedTasks.length === 0) {
      setToastMsg("하나 이상의 할 일을 추가해야 합니다.");
      showMessage();
      return;
    }
    const totalMinutes = selectedTasks.reduce(
      (acc, task) => acc + Number(task.time),
      0
    );

    setForm((prevForm) => ({
      ...prevForm,
      totalMinute: totalMinutes,
    }));

    db.transaction((tx) => {
      if (form.id) {
        // 기존 코스 업데이트
        // feedback: createCourse처럼 useCourse에 작성해서 호출하면 좋을거같아요!
        updateCourse(
          { ...form, totalMinute: calculateTotalMinutes(form) },
          {
            onSuccess: () => {
              console.log("코스 업데이트 성공");
              navigation.navigate("Home", {
                processName: inputValue,
                startTime: form.startTime,
              });
            },
            onError: (error) => {
              console.log("코스 업데이트 실패", error);
              setToastMsg("에러가 발생했습니다.");
              showMessage();
            },
          }
        );
      } else {
        // 새 코스 추가
        // feedback: 기존에 custom hook으로 작성된 코드로 추가할 수 있습니다. 성공/실패에 따른 동작을 추가했습니다.
        createCourse(
          { ...form, todoIds: _.map(selectedTasks, "id") },
          {
            onSuccess: () => {
              navigation.navigate("Home", {
                processName: inputValue,
                startTime: form.startTime,
              });
            },
            onError: () => {
              setToastMsg("에러가 발생했습니다.");
              showMessage();
            },
          }
        );
      }
    });
    console.log(form);
  };

  const handleInputChange = (text) => {
    // 9자 이하일 때만 상태를 업데이트
    if (text.length <= 9) {
      setInputValue(text);
      setForm({ ...form, name: text });
    }
  };

  const handlePluBtn = () => {
    setActionSheetVisible(true);
  };
  const closeActionSheet = () => {
    setActionSheetVisible(false);
  };

  const handleAddProcess = (task) => {
    if (selectedTasks.length >= 30) {
      setToastMsg("할 일은 최대 30개까지 추가할 수 있어요.");
      showMessage();
    } else {
      setSelectedTasks([...selectedTasks, task]);
      setForm({ ...form, todoIds: [...selectedTasks] });
      setActionSheetVisible(false);
    }
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

  // 시작 시간 상태
  const [isStartTimePickerVisible, setStartTimePickerVisibility] =
    useState(false);
  const [selectedStartTime, setSelectedStartTime] = useState(new Date());

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
    const localeTime = koreanLocaleTime(time);
    console.log(form);
    setForm({
      ...form,
      travelMinute: localeTime.hour * 60 + localeTime.minute,
    });

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
    const localeTime = koreanLocaleTime(time);
    const arrivalTime = new Date();
    arrivalTime.setHours(localeTime.hour);
    arrivalTime.setMinutes(localeTime.minute);
    console.log(form);
    setForm({
      ...form,
      arrivalTime,
    });
    setSelectedArrivalTime(time);
    hideArrivalTimePicker();
  };

  // 시작 시간 피커 보이기
  const showStartTimePicker = () => {
    setStartTimePickerVisibility(true);
  };

  // 시작 시간 피커 숨기기
  const hideStartTimePicker = () => {
    setStartTimePickerVisibility(false);
  };

  // 시작 시간 선택 시
  const handleStartTimeConfirm = (time) => {
    const localeTime = koreanLocaleTime(time);
    const startTime = new Date();
    startTime.setHours(localeTime.hour, localeTime.minute, 0, 0);
    setForm({
      ...form,
      startTime: startTime.toISOString(),
    });

    // 데이터베이스에 시작 시간 저장
    db.transaction((tx) => {
      tx.executeSql(
        "UPDATE courses SET startTime = ? WHERE id = ?;",
        [startTime.toISOString(), form.id],
        () => console.log("시작 시간 업데이트 성공"),
        (_, error) => console.log("시작 시간 업데이트 실패", error)
      );
    });
    setSelectedStartTime(startTime);
    hideStartTimePicker();
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

  // 총 소요시간 계산
  useEffect(() => {
    const totalMinutes = selectedTasks.reduce(
      (acc, task) => acc + Number(task.time),
      0
    );
    console.log(totalMinutes);
    setForm({
      ...form,
      totalMinute: totalMinutes.hour * 60 + totalMinutes.minute,
    });
    // 시간과 분으로 변환
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    // 포맷에 맞게 설정
    const formattedTime =
      hours > 0
        ? `${hours}시간 ${formatTime(minutes)}분`
        : `${formatTime(minutes)}분`;
    setTotalTime(formattedTime);
  }, [selectedTasks]);

  console.log("isActionSheetVisible::", isActionSheetVisible);

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
                onDelete={() => handleDeleteTask(task.id, index)}
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
              <Text
                style={[
                  styles.bottomSubText,
                  {
                    color: totalTime === "00시간 00분" ? "#B9B9B9" : "#1B1B1B",
                    // // fontFamily: "Pretendard_SemiBold",
                  },
                ]}
              >
                총 {totalTime}
              </Text>
            </View>
            <View style={styles.bottomBox}>
              <Text style={styles.bottomText}>시작 시간:</Text>
              <TouchableOpacity onPress={showStartTimePicker} style={{}}>
                <Text
                  style={[
                    styles.bottomSubText,
                    {
                      color: "#B9B9B9",
                      // // fontFamily: "Pretendard_SemiBold"
                    },
                  ]}
                >
                  {/* -- : 00 AM */}
                  {formatAMPM2(selectedStartTime)} {/* 시작 시간 표시 */}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          {/* 시작 시간 선택 모달 */}
          <DateTimePickerModal
            isVisible={isStartTimePickerVisible}
            mode="time"
            onConfirm={handleStartTimeConfirm}
            onCancel={hideStartTimePicker}
            date={selectedStartTime}
            is24Hour={true}
          />
          <LargeBtn
            text={"저장하기"}
            onClick={handleSaveForm}
            backgroundColor={""}
            isDisable={false}
          />
          <Text style={styles.noticeText}>
            과정 이름, 이동 시간, 도착 시간, 할 일 카드(1개 이상)를 모두 입력해
            주세요.
          </Text>
        </View>
      </View>
      {isActionSheetVisible && (
        <AddProcessComponent
          onAdd={handleAddProcess}
          isSheetVisible={isActionSheetVisible}
          closeSheet={closeActionSheet}
        />
      )}
      {isVisible && (
        <ToastMsg
          isVisible={isVisible}
          message={toastMsg}
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
