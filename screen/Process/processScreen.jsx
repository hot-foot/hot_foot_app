import React, { useState, useEffect } from "react";
import _ from "lodash";
import styles from "./styles";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Image,
} from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { useNavigation, useRoute } from "@react-navigation/native";
import TodoCard from "../../components/Card/todoCard";
import PlusBtn from "../../components/Btn/plusBtn";
import LargeBtn from "../../components/Btn/largeBtn";
import ToastMsg from "../../components/Modal/toastMsg";
import MsgModal from "../../components/Modal/msgModal";
import { useDatabase } from "../../hooks/useDatabase";
import { useCourse } from "../../hooks/useCourse";
import AddProcessComponent from "../../components/BottomSheet/addProcessComponent";

const ProcessScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const courseId = route.params?.courseId;

  const [toastMsg, setToastMsg] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [msgModal, setMsgModal] = useState(false);
  const [isActionSheetVisible, setActionSheetVisible] = useState(false);
  const [selectedTasks, setSelectedTasks] = useState([]);
  const [isToastVisible, setIsToastVisible] = useState(false);
  const [totalTime, setTotalTime] = useState("00시간 00분");
  const [form, setForm] = useState({});
  const [isSaveDisabled, setIsSaveDisabled] = useState(true);
  const { openDatabase } = useDatabase();
  const db = openDatabase();
  const { createCourse, updateCourse, fetchCourseById } = useCourse(db);

  const [isDepartureTimePickerVisible, setDepartureTimePickerVisibility] =
    useState(false);
  const [selectedDepartureTime, setSelectedDepartureTime] = useState(
    new Date()
  );
  const [isArrivalTimePickerVisible, setArrivalTimePickerVisibility] =
    useState(false);
  const [selectedArrivalTime, setSelectedArrivalTime] = useState(new Date());
  const [isStartTimePickerVisible, setStartTimePickerVisibility] =
    useState(false);
  const [selectedStartTime, setSelectedStartTime] = useState(new Date());

  useEffect(() => {
    if (courseId) {
      fetchCourseById(courseId, (course) => {
        console.log("course :::", course);
        console.log("selectedArrivalTime :::", selectedArrivalTime);
        setInputValue(course.name);
        setSelectedTasks(course.todos);
        // setSelectedDepartureTime(new Date());
        // setSelectedArrivalTime(new Date(course.arrivalTime));
        // setSelectedStartTime(new Date(course.startTime));
        setForm(course);
      });
    }
  }, [courseId]);

  useEffect(() => {
    const totalMinutes = selectedTasks.reduce(
      (acc, task) => acc + Number(task.minutes),
      0
    );
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    const formattedTime =
      hours > 0
        ? `${hours}시간 ${formatTime(minutes)}분`
        : `${formatTime(minutes)}분`;
    setTotalTime(formattedTime);

    if (
      inputValue.trim() &&
      selectedTasks.length > 0 &&
      selectedDepartureTime &&
      selectedArrivalTime
    ) {
      setIsSaveDisabled(false);
      calculateStartTime();
    } else {
      setIsSaveDisabled(true);
    }
  }, [inputValue, selectedTasks, selectedDepartureTime, selectedArrivalTime]);

  const koreanLocaleTime = (date) => {
    const time = new Intl.DateTimeFormat("ko-KR", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    }).format(date);
    const splitTime = time.split(":");
    return { hour: Number(splitTime[0]), minute: Number(splitTime[1]) };
  };

  const calculateStartTime = () => {
    if (selectedArrivalTime && selectedDepartureTime && selectedTasks.length) {
      const totalTaskMinutes = selectedTasks.reduce(
        (acc, task) => acc + Number(task.minutes),
        0
      );
      const travelMinutes =
        selectedDepartureTime.getHours() * 60 +
        selectedDepartureTime.getMinutes();
      const arrivalMinutes =
        selectedArrivalTime.getHours() * 60 + selectedArrivalTime.getMinutes();
      const startMinutes = arrivalMinutes - travelMinutes - totalTaskMinutes;
      const startTime = new Date();
      startTime.setHours(
        Math.floor(startMinutes / 60),
        startMinutes % 60,
        0,
        0
      );
      setSelectedStartTime(startTime);
      setForm({
        ...form,
        startTime: startTime.toISOString(),
      });
    }
  };

  const showMessage = () => {
    setIsToastVisible(true);
  };

  const handleCloseToast = () => {
    setIsToastVisible(false);
  };

  const handleDeleteTask = (id, index) => {
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
    if (isSaveDisabled) return;

    const totalMinutes = selectedTasks.reduce(
      (acc, task) => acc + Number(task.time),
      0
    );

    setForm((prevForm) => ({
      ...prevForm,
      totalMinute: totalMinutes,
    }));

    const updatedForm = {
      ...form,
      totalMinute: totalMinutes,
      todoIds: _.map(selectedTasks, "id"),
      travelMinute: form.travelMinute,
      arrivalTime: selectedArrivalTime,
      departureTime: selectedDepartureTime,
    };

    if (form.id) {
      updateCourse(updatedForm, {
        onSuccess: () => {
          navigation.navigate("Home", {
            processName: inputValue,
            startTime: form.startTime,
          });
        },
        onError: (error) => {
          setToastMsg("에러가 발생했습니다.");
          showMessage();
        },
      });
    } else {
      createCourse(updatedForm, {
        onSuccess: () => {
          navigation.navigate("Home", {
            processName: inputValue,
            startTime: formatAMPM3(selectedStartTime),
          });
        },
        onError: () => {
          setToastMsg("에러가 발생했습니다.");
          showMessage();
        },
      });
    }
  };

  const handleInputChange = (text) => {
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
      setForm({ ...form, todoIds: [...selectedTasks, task.id] });
      setActionSheetVisible(false);
    }
  };

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
    if (selectedDepartureTime) {
      const hours = date.getHours();
      const minutes = date.getMinutes();
      const formattedTime = `${formatTo12HourClock(hours)} 시간  ${formatTime(
        minutes
      )} 분 `;
      return formattedTime;
    }
  };

  const formatAMPM2 = (date) => {
    if (selectedArrivalTime) {
      const hours = date.getHours();
      const minutes = date.getMinutes();
      const ampm = hours >= 12 ? "PM" : "AM";
      const formattedTime = `${formatTo12HourClock(hours)} : ${formatTime(
        minutes
      )} ${ampm}`;
      return formattedTime;
    }
  };

  const formatAMPM3 = (date) => {
    if (selectedStartTime) {
      const hours = date.getHours();
      const minutes = date.getMinutes();
      const ampm = hours >= 12 ? "PM" : "AM";
      const formattedTime = `${formatTo12HourClock(hours)} : ${formatTime(
        minutes
      )} ${ampm}`;
      return formattedTime;
    }
  };

  const handleDeleteDefaultTodoAttempt = () => {
    setToastMsg("삭제할 수 없는 할 일입니다.");
    showMessage();
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
        <Text style={styles.text}>
          {courseId ? "준비 과정 수정" : "준비 과정 추가"}
        </Text>
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
              <Text
                style={[
                  styles.topSubText,
                  { color: selectedDepartureTime ? "#1B1B1B" : "#B9B9B9" },
                ]}
              >
                {selectedDepartureTime
                  ? formatAMPM(selectedDepartureTime)
                  : "00시 00분"}
                {/* 이동 시간 표시 */}
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
              <Text
                style={[
                  styles.topSubText,
                  { color: selectedArrivalTime ? "#1B1B1B" : "#B9B9B9" },
                ]}
              >
                {selectedArrivalTime
                  ? formatAMPM2(selectedArrivalTime)
                  : "00 : 00 PM"}
                {/* 도착 시간 표시 */}
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
            <TodoCard
              key={task.id}
              id={task.id}
              title={task.name}
              time={task.minutes}
              imagePath={task.iconId}
              onDelete={() => handleDeleteTask(task.id, index)}
            />
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
      <View style={{ marginBottom: 34 }}>
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
                    fontFamily: "Pretendard_SemiBold",
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
                    { color: selectedStartTime ? "#1B1B1B" : "#B9B9B9" },
                  ]}
                >
                  {selectedStartTime
                    ? formatAMPM3(selectedStartTime)
                    : "-- : 00 AM"}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
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
            backgroundColor={isSaveDisabled ? "#B9B9B9" : ""}
            isDisable={isSaveDisabled}
          />
          <Text style={styles.noticeText}>
            과정 이름, 이동 시간, 도착 시간, 할 일 카드(1개 이상)를 모두 입력해
            주세요.
          </Text>
        </View>
      </View>
      {isActionSheetVisible && !isToastVisible && (
        <AddProcessComponent
          onAdd={handleAddProcess}
          isSheetVisible={isActionSheetVisible}
          closeSheet={closeActionSheet}
          onDeleteDefaultTodoAttempt={handleDeleteDefaultTodoAttempt}
        />
      )}
      {isToastVisible && (
        <ToastMsg
          isVisible={isToastVisible}
          message={toastMsg}
          onClose={handleCloseToast}
        />
      )}
      <MsgModal
        isVisible={msgModal}
        message1={"설정 중이던 준비 과정은 저장되지 않아요."}
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
